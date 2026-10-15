'use strict';
// HTTP API. Every route checks the session and the role on the server. Nothing is trusted from the browser.
const crypto = require('node:crypto');
const { HttpError, sendJson, readJson, parseCookies } = require('./http');
const { verifyPassword, DUMMY_HASH } = require('./passwords');
const { fromStorable, toStorable } = require('./national-id-vault');

const SESSION_COOKIE = '__Host-dk_sid';
const SESSION_MS = 8 * 60 * 60 * 1000;
const MAX_FAILED_LOGINS = 5;
const LOCK_MS = 15 * 60 * 1000;
const REVEAL_LIMIT_PER_HOUR = 10;
const TAXPAYER_ID_RE = /^[A-Za-z0-9_-]{1,64}$/;
const TOKEN_RE = /^[A-Za-z0-9_-]{43}$/;

const ROLES = {
  view: ['admin', 'revenue', 'finance', 'health', 'exec'],
  lookup: ['admin', 'revenue', 'finance'],
  register: ['admin', 'revenue'],
  reveal: ['admin'],
  audit: ['admin'],
};

const sha256 = (s) => crypto.createHash('sha256').update(s).digest('hex');
const sessionCookie = (value, maxAgeMs) =>
  `${SESSION_COOKIE}=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${Math.floor(maxAgeMs / 1000)}`;

function createApi({ store, vault, now = () => new Date() }) {
  if (!store || !vault) throw new Error('store and vault are required');

  async function currentUser(req) {
    const token = parseCookies(req.headers.cookie)[SESSION_COOKIE];
    if (!token || !TOKEN_RE.test(token)) return null;
    return store.findSession(sha256(token), now());
  }

  async function requireUser(req, roles) {
    const user = await currentUser(req);
    if (!user) throw new HttpError(401, 'unauthenticated');
    if (roles && !roles.includes(user.role)) throw new HttpError(403, 'forbidden');
    return user;
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

    if (!user) {
      await verifyPassword(body.password, await DUMMY_HASH); // equalize timing
      await store.insertAudit({ actor: username, action: 'login_failed' });
      throw new HttpError(401, 'invalid_credentials');
    }
    const locked = user.locked_until && new Date(user.locked_until) > t;
    if (locked) {
      await store.insertAudit({ actor: username, action: 'login_locked' });
      throw new HttpError(401, 'invalid_credentials');
    }

    const ok = await verifyPassword(body.password, user.password_hash);
    if (!ok) {
      // A lock that has expired starts the count again.
      const base = user.locked_until ? 0 : user.failed_logins;
      const failed = base + 1;
      const lockedUntil = failed >= MAX_FAILED_LOGINS ? new Date(t.getTime() + LOCK_MS) : null;
      await store.recordFailedLogin(user.id, failed, lockedUntil);
      await store.insertAudit({ actor: username, action: 'login_failed' });
      throw new HttpError(401, 'invalid_credentials');
    }

    await store.resetFailedLogins(user.id);
    const token = crypto.randomBytes(32).toString('base64url');
    await store.createSession({ tokenHash: sha256(token), userId: user.id, expiresAt: new Date(t.getTime() + SESSION_MS) });
    await store.insertAudit({ actor: user.username, action: 'login' });
    sendJson(res, 200, { username: user.username, role: user.role }, { 'Set-Cookie': sessionCookie(token, SESSION_MS) });
  });

  route('POST', /^\/api\/logout$/, async (req, res) => {
    const token = parseCookies(req.headers.cookie)[SESSION_COOKIE];
    const user = await currentUser(req);
    if (token && TOKEN_RE.test(token)) await store.deleteSession(sha256(token));
    if (user) await store.insertAudit({ actor: user.username, action: 'logout' });
    sendJson(res, 200, { ok: true }, { 'Set-Cookie': sessionCookie('', 0) });
  });

  route('GET', /^\/api\/me$/, async (req, res) => {
    const user = await requireUser(req);
    sendJson(res, 200, { username: user.username, role: user.role });
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
    const body = await readJson(req);
    const nationalId = parseNationalId(body.national_id);
    const row = await store.findByBlindIndex(vault.blindIndex(nationalId));
    await store.insertAudit({ actor: user.username, action: 'lookup', taxpayerId: row ? row.taxpayer_id : null });
    if (!row) throw new HttpError(404, 'not_found');
    sendJson(res, 200, { taxpayer_id: row.taxpayer_id, nid_masked: vault.mask(nationalId) });
  });

  route('GET', /^\/api\/taxpayers\/([^/]+)$/, async (req, res, [id]) => {
    const user = await requireUser(req, ROLES.view);
    const taxpayerId = parseTaxpayerId(pathId(id));
    const row = await store.findTaxpayer(taxpayerId);
    if (!row) throw new HttpError(404, 'not_found');
    const plain = await openRow(row, taxpayerId, user.username);
    await store.insertAudit({ actor: user.username, action: 'view', taxpayerId });
    sendJson(res, 200, { taxpayer_id: taxpayerId, nid_masked: vault.mask(plain) });
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
