'use strict';
// HTTP API. Every route checks the session and the role on the server. Nothing is trusted from the browser.
const crypto = require('node:crypto');
const { HttpError, sendJson, readJson, parseCookies } = require('./http');
const { hashPassword, verifyPassword, DUMMY_HASH } = require('./passwords');
const { fromStorable, toStorable, normalize } = require('./national-id-vault');
const totp = require('./totp');

const SESSION_COOKIE = '__Host-dk_sid';
const MFA_COOKIE = '__Host-dk_mfa';
const MFA_PENDING_MS = 5 * 60 * 1000;
const ISSUER = 'DK One Tax Bill';
const SESSION_MS = 8 * 60 * 60 * 1000;
const MAX_FAILED_LOGINS = 5;
const LOCK_MS = 15 * 60 * 1000;
const REVEAL_LIMIT_PER_HOUR = 10;
// Caps how many records one account can open per hour, so a stolen account cannot dump everything.
const VIEW_LIMIT_PER_HOUR = 100;
const TAXPAYER_ID_RE = /^[A-Za-z0-9_-]{1,64}$/;
const TOKEN_RE = /^[A-Za-z0-9_-]{43}$/;

const ROLES = {
  view: ['admin', 'revenue', 'finance', 'health', 'exec'],
  lookup: ['admin', 'revenue', 'finance'],
  register: ['admin', 'revenue'],
  reveal: ['admin'],
  audit: ['admin'],
  // Roles that see the full national ID directly. Others get the masked form.
  fullId: ['admin', 'revenue', 'finance'],
  users: ['admin'],
};
const VALID_ROLES = ['admin', 'revenue', 'finance', 'health', 'exec'];
const USERNAME_RE = /^[a-z0-9_.-]{3,32}$/;

const sha256 = (s) => crypto.createHash('sha256').update(s).digest('hex');
const cookie = (name, value, maxAgeMs) =>
  `${name}=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${Math.floor(maxAgeMs / 1000)}`;
const sessionCookie = (value, maxAgeMs) => cookie(SESSION_COOKIE, value, maxAgeMs);

// appKey: 32-byte master key for OTP secrets and pending-login tokens. Without it, OTP is off.
// requireMfa: when true, an account without OTP can only reach the OTP setup and password routes.
function createApi({ store, vault, now = () => new Date(), appKey = null, requireMfa = false }) {
  if (!store || !vault) throw new Error('store and vault are required');
  if (requireMfa && !appKey) throw new Error('requireMfa needs appKey');
  const mfaAvailable = Boolean(appKey);
  const totpKey = mfaAvailable ? totp.deriveKey(appKey, 'totp-secret') : null;
  const pendingKey = mfaAvailable ? totp.deriveKey(appKey, 'mfa-pending') : null;
  const totpAad = (userId) => `dk-one-tax:totp:user:${userId}`;

  // A pending login proves the password was right but carries no access. It expires in 5 minutes.
  const signPending = (userId, expiresMs) => {
    const body = `${userId}.${expiresMs}`;
    return `${body}.${crypto.createHmac('sha256', pendingKey).update(body).digest('base64url')}`;
  };
  const readPending = (req) => {
    const parts = String(parseCookies(req.headers.cookie)[MFA_COOKIE] || '').split('.');
    if (parts.length !== 3) return null;
    const [userId, expires, mac] = parts;
    const expected = crypto.createHmac('sha256', pendingKey).update(`${userId}.${expires}`).digest('base64url');
    const a = Buffer.from(mac);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
    if (!(Number(expires) > now().getTime())) return null;
    return Number(userId);
  };
  async function currentUser(req) {
    const token = parseCookies(req.headers.cookie)[SESSION_COOKIE];
    if (!token || !TOKEN_RE.test(token)) return null;
    return store.findSession(sha256(token), now());
  }

  async function requireUser(req, roles, { allowNoMfa = false, allowMustChange = false } = {}) {
    const user = await currentUser(req);
    if (!user) throw new HttpError(401, 'unauthenticated');
    // A temporary password must be replaced before anything else is allowed.
    if (user.must_change_password && !allowMustChange) throw new HttpError(403, 'password_change_required');
    if (requireMfa && !user.totp_enabled && !allowNoMfa) throw new HttpError(403, 'mfa_setup_required');
    if (roles && !roles.includes(user.role)) throw new HttpError(403, 'forbidden');
    return user;
  }

  // Counts a failed attempt and locks the account after too many. An expired lock starts the count again.
  async function registerFailure(user, t) {
    const failed = (user.locked_until ? 0 : user.failed_logins) + 1;
    const lockedUntil = failed >= MAX_FAILED_LOGINS ? new Date(t.getTime() + LOCK_MS) : null;
    await store.recordFailedLogin(user.id, failed, lockedUntil);
  }

  async function startSession(res, user, t) {
    await store.resetFailedLogins(user.id);
    const token = crypto.randomBytes(32).toString('base64url');
    await store.createSession({ tokenHash: sha256(token), userId: user.id, expiresAt: new Date(t.getTime() + SESSION_MS) });
    await store.insertAudit({ actor: user.username, action: 'login' });
    sendJson(res, 200, { username: user.username, role: user.role, mfa_enabled: Boolean(user.totp_enabled),
      mfa_enforced: requireMfa, must_change_password: Boolean(user.must_change_password) },
    { 'Set-Cookie': sessionCookie(token, SESSION_MS) });
  }

  function pathId(raw) {
    try {
      return decodeURIComponent(raw);
    } catch {
      throw new HttpError(400, 'invalid_taxpayer_id');
    }
  }

  function parseTaxpayerId(value) {
    if (typeof value !== 'string' || !TAXPAYER_ID_RE.test(value)) throw new HttpError(400, 'invalid_taxpayer_id');
    return value;
  }

  function parseNationalId(value) {
    if (typeof value !== 'string') throw new HttpError(400, 'invalid_national_id');
    try {
      vault.blindIndex(value); // validates format and check digit, throws a generic error otherwise
      return value;
    } catch {
      throw new HttpError(400, 'invalid_national_id');
    }
  }

  async function enforceViewLimit(user) {
    const since = new Date(now().getTime() - 60 * 60 * 1000);
    const views = await store.countRecentAudit({ actor: user.username, action: 'view', since });
    const lookups = await store.countRecentAudit({ actor: user.username, action: 'lookup', since });
    if (views + lookups >= VIEW_LIMIT_PER_HOUR) throw new HttpError(429, 'view_limit');
  }

  // Decrypt one stored row. An integrity failure is audited and reported without detail.
  async function openRow(row, taxpayerId, actor) {
    try {
      return vault.decrypt(fromStorable({
        v: row.nid_key_version,
        wrappedDek: row.nid_wrapped_dek,
        data: row.nid_data,
        blindIndex: row.nid_blind_index,
      }), taxpayerId);
    } catch {
      await store.insertAudit({ actor, action: 'integrity_failed', taxpayerId });
      throw new HttpError(500, 'integrity_error');
    }
  }

  const routes = [];
  const route = (method, pattern, handler) => routes.push({ method, pattern, handler });

  route('POST', /^\/api\/login$/, async (req, res) => {
    const body = await readJson(req);
    if (typeof body.username !== 'string' || typeof body.password !== 'string' ||
        body.username.length > 64 || body.password.length > 256) {
      throw new HttpError(400, 'bad_request');
    }
    const username = body.username.trim().toLowerCase();
    const user = await store.findUserByUsername(username);
    const t = now();

    if (!user || user.disabled) {
      await verifyPassword(body.password, await DUMMY_HASH); // equalize timing
      await store.insertAudit({ actor: username, action: user ? 'login_disabled' : 'login_failed' });
      throw new HttpError(401, 'invalid_credentials');
    }
    const locked = user.locked_until && new Date(user.locked_until) > t;
    if (locked) {
      await store.insertAudit({ actor: username, action: 'login_locked' });
      throw new HttpError(401, 'invalid_credentials');
    }

    const ok = await verifyPassword(body.password, user.password_hash);
    if (!ok) {
      await registerFailure(user, t);
      await store.insertAudit({ actor: username, action: 'login_failed' });
      throw new HttpError(401, 'invalid_credentials');
    }

    // With OTP on, the password alone grants nothing: hand out a short-lived pending token instead.
    if (mfaAvailable && user.totp_enabled) {
      const pending = signPending(user.id, t.getTime() + MFA_PENDING_MS);
      sendJson(res, 200, { mfa_required: true }, { 'Set-Cookie': cookie(MFA_COOKIE, pending, MFA_PENDING_MS) });
      return;
    }
    await startSession(res, user, t);
  });

  route('POST', /^\/api\/login\/otp$/, async (req, res) => {
    if (!mfaAvailable) throw new HttpError(404, 'not_found');
    const body = await readJson(req);
    const userId = readPending(req);
    if (!userId) throw new HttpError(401, 'invalid_credentials');
    const user = await store.findUserById(userId);
    if (!user || user.disabled || !user.totp_enabled) throw new HttpError(401, 'invalid_credentials');
    const t = now();
    if (user.locked_until && new Date(user.locked_until) > t) {
      await store.insertAudit({ actor: user.username, action: 'login_locked' });
      throw new HttpError(401, 'invalid_credentials');
    }
    let step = null;
    try {
      step = totp.verifyCode(totp.decryptSecret(user.totp_secret, totpKey, totpAad(user.id)), body.code, t, user.totp_last_step);
    } catch {
      step = null;
    }
    if (step === null) {
      await registerFailure(user, t);
      await store.insertAudit({ actor: user.username, action: 'login_failed', detail: 'otp' });
      throw new HttpError(401, 'invalid_code');
    }
    await store.updateTotpStep(user.id, step);
    await startSession(res, user, t);
  });

  route('POST', /^\/api\/mfa\/setup$/, async (req, res) => {
    if (!mfaAvailable) throw new HttpError(404, 'not_found');
    const user = await requireUser(req, null, { allowNoMfa: true });
    const full = await store.findUserById(user.id);
    if (full.totp_enabled) throw new HttpError(409, 'already_enabled');
    const secret = totp.generateSecret();
    await store.setPendingTotp(user.id, totp.encryptSecret(secret, totpKey, totpAad(user.id)));
    await store.insertAudit({ actor: user.username, action: 'mfa_setup_started' });
    sendJson(res, 200, { secret, otpauth_uri: totp.otpauthUri({ secret, account: user.username, issuer: ISSUER }) });
  });

  route('POST', /^\/api\/mfa\/enable$/, async (req, res) => {
    if (!mfaAvailable) throw new HttpError(404, 'not_found');
    const user = await requireUser(req, null, { allowNoMfa: true });
    const body = await readJson(req);
    const full = await store.findUserById(user.id);
    if (full.totp_enabled) throw new HttpError(409, 'already_enabled');
    if (!full.totp_secret) throw new HttpError(400, 'setup_first');
    let step = null;
    try {
      step = totp.verifyCode(totp.decryptSecret(full.totp_secret, totpKey, totpAad(user.id)), body.code, now(), 0);
    } catch {
      step = null;
    }
    if (step === null) throw new HttpError(401, 'invalid_code');
    await store.enableTotp(user.id, step);
    await store.insertAudit({ actor: user.username, action: 'mfa_enabled' });
    sendJson(res, 200, { mfa_enabled: true });
  });

  route('POST', /^\/api\/password$/, async (req, res) => {
    const user = await requireUser(req, null, { allowNoMfa: true, allowMustChange: true });
    const body = await readJson(req);
    if (typeof body.current_password !== 'string' || typeof body.new_password !== 'string') throw new HttpError(400, 'bad_request');
    const full = await store.findUserById(user.id);
    const t = now();
    if (full.locked_until && new Date(full.locked_until) > t) throw new HttpError(401, 'invalid_credentials');
    if (!(await verifyPassword(body.current_password, full.password_hash))) {
      await registerFailure(full, t);
      await store.insertAudit({ actor: user.username, action: 'password_change_failed' });
      throw new HttpError(401, 'invalid_credentials');
    }
    if (body.new_password === body.current_password) throw new HttpError(400, 'same_password');
    let passwordHash;
    try {
      passwordHash = await hashPassword(body.new_password);
    } catch {
      throw new HttpError(400, 'weak_password');
    }
    await store.updatePassword(user.id, passwordHash);
    await store.deleteUserSessions(user.id); // every device must sign in again
    await store.insertAudit({ actor: user.username, action: 'password_change' });
    sendJson(res, 200, { ok: true }, { 'Set-Cookie': sessionCookie('', 0) });
  });

  // ---------- staff management (admin only) ----------
  async function findTarget(rawName) {
    const target = await store.findUserByUsername(pathId(rawName).trim().toLowerCase());
    if (!target) throw new HttpError(404, 'not_found');
    return target;
  }

  route('GET', /^\/api\/users$/, async (req, res) => {
    await requireUser(req, ROLES.users);
    sendJson(res, 200, { users: await store.listUsers() });
  });

  route('POST', /^\/api\/users$/, async (req, res) => {
    const admin = await requireUser(req, ROLES.users);
    const body = await readJson(req);
    const username = typeof body.username === 'string' ? body.username.trim().toLowerCase() : '';
    if (!USERNAME_RE.test(username)) throw new HttpError(400, 'invalid_username');
    if (!VALID_ROLES.includes(body.role)) throw new HttpError(400, 'invalid_role');
    if (typeof body.password !== 'string') throw new HttpError(400, 'weak_password');
    let passwordHash;
    try {
      passwordHash = await hashPassword(body.password);
    } catch {
      throw new HttpError(400, 'weak_password');
    }
    try {
      await store.createUser({ username, passwordHash, role: body.role, mustChangePassword: true });
    } catch (err) {
      if (err.code === 'DUPLICATE') throw new HttpError(409, 'already_exists');
      throw err;
    }
    await store.insertAudit({ actor: admin.username, action: 'user_create', detail: `${username}:${body.role}` });
    sendJson(res, 201, { username, role: body.role });
  });

  // Closing an account ends its sessions at once and blocks new sign-ins.
  route('POST', /^\/api\/users\/([^/]+)\/disable$/, async (req, res, [name]) => {
    const admin = await requireUser(req, ROLES.users);
    const target = await findTarget(name);
    if (target.id === admin.id) throw new HttpError(400, 'cannot_disable_self');
    await store.setDisabled(target.id, true);
    await store.deleteUserSessions(target.id);
    await store.insertAudit({ actor: admin.username, action: 'user_disable', detail: target.username });
    sendJson(res, 200, { ok: true });
  });

  route('POST', /^\/api\/users\/([^/]+)\/enable$/, async (req, res, [name]) => {
    const admin = await requireUser(req, ROLES.users);
    const target = await findTarget(name);
    await store.setDisabled(target.id, false);
    await store.insertAudit({ actor: admin.username, action: 'user_enable', detail: target.username });
    sendJson(res, 200, { ok: true });
  });

  // Sets a temporary password. The person must replace it at next sign-in.
  route('POST', /^\/api\/users\/([^/]+)\/password$/, async (req, res, [name]) => {
    const admin = await requireUser(req, ROLES.users);
    const body = await readJson(req);
    const target = await findTarget(name);
    if (target.id === admin.id) throw new HttpError(400, 'use_password_page');
    if (typeof body.password !== 'string') throw new HttpError(400, 'weak_password');
    let passwordHash;
    try {
      passwordHash = await hashPassword(body.password);
    } catch {
      throw new HttpError(400, 'weak_password');
    }
    await store.resetPassword(target.id, passwordHash);
    await store.deleteUserSessions(target.id);
    await store.insertAudit({ actor: admin.username, action: 'password_reset', detail: target.username });
    sendJson(res, 200, { ok: true });
  });

  // An admin can clear a colleague's OTP (for example after a lost phone). The person must enroll again.
  route('POST', /^\/api\/users\/([^/]+)\/mfa\/reset$/, async (req, res, [name]) => {
    if (!mfaAvailable) throw new HttpError(404, 'not_found');
    const admin = await requireUser(req, ['admin']);
    const target = await store.findUserByUsername(pathId(name).trim().toLowerCase());
    if (!target) throw new HttpError(404, 'not_found');
    await store.disableTotp(target.id);
    await store.deleteUserSessions(target.id);
    await store.insertAudit({ actor: admin.username, action: 'mfa_reset', detail: target.username });
    sendJson(res, 200, { ok: true });
  });

  route('POST', /^\/api\/logout$/, async (req, res) => {
    const token = parseCookies(req.headers.cookie)[SESSION_COOKIE];
    const user = await currentUser(req);
    if (token && TOKEN_RE.test(token)) await store.deleteSession(sha256(token));
    if (user) await store.insertAudit({ actor: user.username, action: 'logout' });
    sendJson(res, 200, { ok: true }, { 'Set-Cookie': sessionCookie('', 0) });
  });

  route('GET', /^\/api\/me$/, async (req, res) => {
    const user = await requireUser(req, null, { allowNoMfa: true, allowMustChange: true });
    sendJson(res, 200, { username: user.username, role: user.role, mfa_enabled: Boolean(user.totp_enabled),
      mfa_enforced: requireMfa, must_change_password: Boolean(user.must_change_password) });
  });

  route('POST', /^\/api\/taxpayers$/, async (req, res) => {
    const user = await requireUser(req, ROLES.register);
    const body = await readJson(req);
    const taxpayerId = parseTaxpayerId(body.taxpayer_id);
    const nationalId = parseNationalId(body.national_id);
    const stored = toStorable(vault.encrypt(nationalId, taxpayerId));
    try {
      await store.insertTaxpayer({
        taxpayer_id: taxpayerId,
        nid_key_version: stored.v,
        nid_blind_index: stored.blindIndex,
        nid_wrapped_dek: stored.wrappedDek,
        nid_data: stored.data,
      });
    } catch (err) {
      if (err.code === 'DUPLICATE') throw new HttpError(409, 'already_exists');
      throw err;
    }
    await store.insertAudit({ actor: user.username, action: 'create', taxpayerId });
    sendJson(res, 201, { taxpayer_id: taxpayerId, nid_masked: vault.mask(nationalId) });
  });

  route('POST', /^\/api\/taxpayers\/lookup$/, async (req, res) => {
    const user = await requireUser(req, ROLES.lookup);
    await enforceViewLimit(user);
    const body = await readJson(req);
    const nationalId = parseNationalId(body.national_id);
    const row = await store.findByBlindIndex(vault.blindIndex(nationalId));
    await store.insertAudit({ actor: user.username, action: 'lookup', taxpayerId: row ? row.taxpayer_id : null });
    if (!row) throw new HttpError(404, 'not_found');
    const out = { taxpayer_id: row.taxpayer_id, nid_masked: vault.mask(nationalId) };
    if (ROLES.fullId.includes(user.role)) out.national_id = normalize(nationalId);
    sendJson(res, 200, out);
  });

  route('GET', /^\/api\/taxpayers\/([^/]+)$/, async (req, res, [id]) => {
    const user = await requireUser(req, ROLES.view);
    await enforceViewLimit(user);
    const taxpayerId = parseTaxpayerId(pathId(id));
    const row = await store.findTaxpayer(taxpayerId);
    if (!row) throw new HttpError(404, 'not_found');
    const plain = await openRow(row, taxpayerId, user.username);
    await store.insertAudit({ actor: user.username, action: 'view', taxpayerId });
    const out = { taxpayer_id: taxpayerId, nid_masked: vault.mask(plain) };
    if (ROLES.fullId.includes(user.role)) out.national_id = plain;
    sendJson(res, 200, out);
  });

  route('POST', /^\/api\/taxpayers\/([^/]+)\/reveal$/, async (req, res, [id]) => {
    const user = await requireUser(req, ROLES.reveal);
    const body = await readJson(req);
    if (typeof body.reason !== 'string' || body.reason.trim().length < 10 || body.reason.length > 200) {
      throw new HttpError(400, 'reason_required');
    }
    const taxpayerId = parseTaxpayerId(pathId(id));
    const since = new Date(now().getTime() - 60 * 60 * 1000);
    const recent = await store.countRecentAudit({ actor: user.username, action: 'reveal', since });
    if (recent >= REVEAL_LIMIT_PER_HOUR) throw new HttpError(429, 'reveal_limit');
    const row = await store.findTaxpayer(taxpayerId);
    if (!row) throw new HttpError(404, 'not_found');
    const plain = await openRow(row, taxpayerId, user.username);
    // Audit before responding, so an unlogged reveal cannot happen.
    await store.insertAudit({ actor: user.username, action: 'reveal', taxpayerId, detail: body.reason.trim() });
    sendJson(res, 200, { taxpayer_id: taxpayerId, national_id: plain });
  });

  route('GET', /^\/api\/audit$/, async (req, res) => {
    await requireUser(req, ROLES.audit);
    const url = new URL(req.url, 'http://localhost');
    const limit = Math.min(200, Math.max(1, Number(url.searchParams.get('limit')) || 50));
    sendJson(res, 200, { rows: await store.listAudit(limit) });
  });

  // Returns true when the request was handled here.
  return async function handleApi(req, res, pathname) {
    const matches = routes.filter((r) => r.pattern.test(pathname));
    if (matches.length === 0) return false;
    const r = matches.find((m) => m.method === req.method);
    if (!r) {
      sendJson(res, 405, { error: 'method_not_allowed' }, { Allow: matches.map((m) => m.method).join(', ') });
      return true;
    }
    const params = pathname.match(r.pattern).slice(1);
    try {
      await r.handler(req, res, params);
    } catch (err) {
      if (!(err instanceof HttpError)) throw err; // unexpected: the caller logs it and returns 500
      sendJson(res, err.status, { error: err.code });
    }
    return true;
  };
}

module.exports = { createApi, SESSION_COOKIE, ROLES };
