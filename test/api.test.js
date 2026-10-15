'use strict';
const { test, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { Readable } = require('node:stream');
const { createApi, SESSION_COOKIE } = require('../lib/api');
const { createNationalIdVault, checkDigit } = require('../lib/national-id-vault');
const { memoryStore } = require('../lib/store');
const { hashPassword } = require('../lib/passwords');
const totp = require('../lib/totp');

const validId = (twelve) => twelve + checkDigit(twelve);
const NID = validId('110170020345');
const NID2 = validId('220170020345');
const PW = 'test-password-long-enough';

// Minimal request/response doubles that exercise the real handlers.
function call(handle, { method = 'GET', url = '/', body, cookie, rawCookie, contentType = 'application/json', headers = {} } = {}) {
  const payload = body === undefined ? '' : JSON.stringify(body);
  const req = Readable.from(payload ? [Buffer.from(payload)] : []);
  req.method = method;
  req.url = url;
  req.headers = {
    ...(contentType ? { 'content-type': contentType } : {}),
    ...(payload ? { 'content-length': String(Buffer.byteLength(payload)) } : {}),
    ...(cookie ? { cookie: `${SESSION_COOKIE}=${cookie}` } : {}),
    ...(rawCookie ? { cookie: rawCookie } : {}),
    ...headers,
  };
  return new Promise((resolve, reject) => {
    const res = {
      writeHead(status, h) { this.status = status; this.headers = h; },
      end(text) {
        let parsed = text;
        try { parsed = JSON.parse(text); } catch { /* plain text */ }
        resolve({ status: this.status, headers: this.headers || {}, body: parsed, raw: text });
      },
    };
    const pathname = new URL(url, 'http://localhost').pathname;
    Promise.resolve(handle(req, res, pathname)).then((handled) => {
      // server.js answers 404 when the router does not claim a path; mirror that here.
      if (handled === false) res.writeHead(404, {}), res.end('{"error":"not_found"}');
    }).catch(reject);
  });
}

let store;
let vault;
let handle;
let clock;
let cookies;

beforeEach(async () => {
  store = memoryStore(() => clock);
  vault = createNationalIdVault({
    keks: { 1: crypto.randomBytes(32) }, currentVersion: 1, indexKey: crypto.randomBytes(32),
  });
  clock = new Date('2026-10-15T03:00:00Z');
  handle = createApi({ store, vault, now: () => clock });
  cookies = {};
  for (const [username, role] of [['admin', 'admin'], ['revenue', 'revenue'], ['finance', 'finance'], ['health', 'health']]) {
    store.addUser({ username, passwordHash: await hashPassword(PW), role });
  }
});

async function login(username, password = PW) {
  const r = await call(handle, { method: 'POST', url: '/api/login', body: { username, password } });
  if (r.status === 200) {
    const m = /__Host-dk_sid=([^;]+)/.exec(r.headers['Set-Cookie']);
    cookies[username] = m[1];
  }
  return r;
}

const as = (username, extra = {}) => ({ cookie: cookies[username], ...extra });

test('login sets a hardened session cookie and never returns the token in the body', async () => {
  const r = await login('admin');
  assert.equal(r.status, 200);
  assert.deepEqual(r.body, { username: 'admin', role: 'admin', mfa_enabled: false, mfa_enforced: false, must_change_password: false });
  const setCookie = r.headers['Set-Cookie'];
  assert.match(setCookie, /^__Host-dk_sid=[A-Za-z0-9_-]{43};/);
  assert.match(setCookie, /HttpOnly/);
  assert.match(setCookie, /Secure/);
  assert.match(setCookie, /SameSite=Strict/);
  assert.match(setCookie, /Path=\//);
  assert.equal(r.raw.includes(cookies.admin), false);
});

test('wrong password and unknown user return the same response', async () => {
  const wrong = await login('admin', 'wrong-password-here');
  const unknown = await call(handle, { method: 'POST', url: '/api/login', body: { username: 'nobody', password: PW } });
  assert.equal(wrong.status, 401);
  assert.equal(unknown.status, 401);
  assert.deepEqual(wrong.body, unknown.body);
});

test('account locks after 5 failures and unlocks after 15 minutes', async () => {
  for (let i = 0; i < 5; i++) await login('revenue', 'wrong-password-here');
  // Correct password is refused while locked.
  assert.equal((await login('revenue')).status, 401);
  clock = new Date(clock.getTime() + 16 * 60 * 1000);
  assert.equal((await login('revenue')).status, 200);
});

test('requests without a session are refused', async () => {
  assert.equal((await call(handle, { url: '/api/me' })).status, 401);
  assert.equal((await call(handle, { url: '/api/me', cookie: 'x'.repeat(43) })).status, 401);
  assert.equal((await call(handle, { url: '/api/me', cookie: 'short' })).status, 401);
});

test('logout invalidates the session', async () => {
  await login('admin');
  const token = cookies.admin;
  assert.equal((await call(handle, as('admin', { url: '/api/me' }))).status, 200);
  await call(handle, { method: 'POST', url: '/api/logout', cookie: token, body: {} });
  assert.equal((await call(handle, { url: '/api/me', cookie: token })).status, 401);
});

test('sessions expire after 8 hours', async () => {
  await login('admin');
  clock = new Date(clock.getTime() + 8 * 60 * 60 * 1000 + 1000);
  assert.equal((await call(handle, as('admin', { url: '/api/me' }))).status, 401);
});

test('writes require application/json (CSRF guard)', async () => {
  await login('revenue');
  const r = await call(handle, as('revenue', {
    method: 'POST', url: '/api/taxpayers', body: { taxpayer_id: 'tp-1', national_id: NID }, contentType: 'text/plain',
  }));
  assert.equal(r.status, 415);
});

test('oversized and malformed bodies are rejected', async () => {
  await login('revenue');
  const big = await call(handle, as('revenue', {
    method: 'POST', url: '/api/taxpayers', body: { taxpayer_id: 'tp-1', national_id: NID, pad: 'x'.repeat(5000) },
  }));
  assert.equal(big.status, 413);
  const bad = await call(handle, as('revenue', { method: 'POST', url: '/api/login', body: undefined, contentType: 'application/json' }));
  assert.equal(bad.status, 400);
});

test('register: revenue can create, finance cannot', async () => {
  await login('revenue');
  await login('finance');
  const ok = await call(handle, as('revenue', { method: 'POST', url: '/api/taxpayers', body: { taxpayer_id: 'tp-1', national_id: NID } }));
  assert.equal(ok.status, 201);
  assert.equal(ok.body.nid_masked, `x-xxxx-xxxxx-xx-${NID.slice(-4)}`);
  const denied = await call(handle, as('finance', { method: 'POST', url: '/api/taxpayers', body: { taxpayer_id: 'tp-2', national_id: NID2 } }));
  assert.equal(denied.status, 403);
});

test('duplicate taxpayer id and duplicate national id are both refused', async () => {
  await login('revenue');
  await call(handle, as('revenue', { method: 'POST', url: '/api/taxpayers', body: { taxpayer_id: 'tp-1', national_id: NID } }));
  const sameId = await call(handle, as('revenue', { method: 'POST', url: '/api/taxpayers', body: { taxpayer_id: 'tp-1', national_id: NID2 } }));
  assert.equal(sameId.status, 409);
  const sameNid = await call(handle, as('revenue', { method: 'POST', url: '/api/taxpayers', body: { taxpayer_id: 'tp-9', national_id: NID } }));
  assert.equal(sameNid.status, 409);
});

test('invalid national id is refused with a generic error', async () => {
  await login('revenue');
  const r = await call(handle, as('revenue', { method: 'POST', url: '/api/taxpayers', body: { taxpayer_id: 'tp-1', national_id: '1234567890123' } }));
  assert.equal(r.status, 400);
  assert.equal(r.body.error, 'invalid_national_id');
  assert.equal(JSON.stringify(r.body).includes('1234567890123'), false);
});

test('lookup by national id returns the full id to finance staff', async () => {
  await login('revenue');
  await call(handle, as('revenue', { method: 'POST', url: '/api/taxpayers', body: { taxpayer_id: 'tp-1', national_id: NID } }));
  await login('finance');
  const r = await call(handle, as('finance', { method: 'POST', url: '/api/taxpayers/lookup', body: { national_id: NID } }));
  assert.equal(r.status, 200);
  assert.deepEqual(r.body, { taxpayer_id: 'tp-1', nid_masked: `x-xxxx-xxxxx-xx-${NID.slice(-4)}`, national_id: NID });
});

test('full id for admin, revenue and finance; health sees it masked and cannot lookup', async () => {
  await login('revenue');
  await call(handle, as('revenue', { method: 'POST', url: '/api/taxpayers', body: { taxpayer_id: 'tp-1', national_id: NID } }));
  const own = await call(handle, as('revenue', { url: '/api/taxpayers/tp-1' }));
  assert.equal(own.body.national_id, NID);
  await login('health');
  const view = await call(handle, as('health', { url: '/api/taxpayers/tp-1' }));
  assert.equal(view.status, 200);
  assert.equal(view.body.national_id, undefined);
  assert.equal(view.raw.includes(NID.slice(0, 9)), false);
  const lookup = await call(handle, as('health', { method: 'POST', url: '/api/taxpayers/lookup', body: { national_id: NID } }));
  assert.equal(lookup.status, 403);
});

test('reveal is admin-only, needs a reason, and writes an audit entry', async () => {
  await login('revenue');
  await call(handle, as('revenue', { method: 'POST', url: '/api/taxpayers', body: { taxpayer_id: 'tp-1', national_id: NID } }));
  await login('admin');
  await login('finance');
  assert.equal((await call(handle, as('finance', { method: 'POST', url: '/api/taxpayers/tp-1/reveal', body: { reason: 'ตรวจสอบเอกสารตามคำร้อง' } }))).status, 403);
  assert.equal((await call(handle, as('admin', { method: 'POST', url: '/api/taxpayers/tp-1/reveal', body: { reason: 'short' } }))).status, 400);
  const ok = await call(handle, as('admin', { method: 'POST', url: '/api/taxpayers/tp-1/reveal', body: { reason: 'ตรวจสอบเอกสารตามคำร้อง' } }));
  assert.equal(ok.status, 200);
  assert.equal(ok.body.national_id, NID);
  const entry = store._audit.find((a) => a.action === 'reveal');
  assert.equal(entry.actor, 'admin');
  assert.equal(entry.taxpayer_id, 'tp-1');
});

test('reveal is rate-limited to 10 per hour', async () => {
  await login('revenue');
  await call(handle, as('revenue', { method: 'POST', url: '/api/taxpayers', body: { taxpayer_id: 'tp-1', national_id: NID } }));
  await login('admin');
  for (let i = 0; i < 10; i++) {
    const r = await call(handle, as('admin', { method: 'POST', url: '/api/taxpayers/tp-1/reveal', body: { reason: 'ตรวจสอบเอกสารตามคำร้อง' } }));
    assert.equal(r.status, 200);
  }
  const blocked = await call(handle, as('admin', { method: 'POST', url: '/api/taxpayers/tp-1/reveal', body: { reason: 'ตรวจสอบเอกสารตามคำร้อง' } }));
  assert.equal(blocked.status, 429);
});

test('audit log never contains a national id', async () => {
  await login('revenue');
  await call(handle, as('revenue', { method: 'POST', url: '/api/taxpayers', body: { taxpayer_id: 'tp-1', national_id: NID } }));
  await call(handle, as('revenue', { url: '/api/taxpayers/tp-1' }));
  await login('admin');
  await call(handle, as('admin', { method: 'POST', url: '/api/taxpayers/tp-1/reveal', body: { reason: 'ตรวจสอบเอกสารตามคำร้อง' } }));
  const all = JSON.stringify(store._audit);
  assert.equal(all.includes(NID), false);
  assert.equal(all.includes(NID.slice(0, 9)), false);
  const listed = await call(handle, as('admin', { url: '/api/audit?limit=5' }));
  assert.equal(listed.status, 200);
  assert.equal(listed.raw.includes(NID), false);
});

test('audit listing is admin-only', async () => {
  await login('revenue');
  assert.equal((await call(handle, as('revenue', { url: '/api/audit' }))).status, 403);
});

test('an unknown api path returns 404 and a wrong method returns 405', async () => {
  assert.equal((await call(handle, { url: '/api/nope' })).status, 404);
  const r = await call(handle, { method: 'PUT', url: '/api/me' });
  assert.equal(r.status, 405);
  assert.equal(r.headers.Allow, 'GET');
});

test('tampered stored ciphertext is reported as an integrity error and audited', async () => {
  await login('revenue');
  await call(handle, as('revenue', { method: 'POST', url: '/api/taxpayers', body: { taxpayer_id: 'tp-1', national_id: NID } }));
  const row = await store.findTaxpayer('tp-1');
  const bytes = Buffer.from(row.nid_data.ct, 'base64');
  bytes[0] ^= 1;
  row.nid_data = { ...row.nid_data, ct: bytes.toString('base64') };
  const r = await call(handle, as('revenue', { url: '/api/taxpayers/tp-1' }));
  assert.equal(r.status, 500);
  assert.equal(r.body.error, 'integrity_error');
  assert.equal(store._audit.some((a) => a.action === 'integrity_failed'), true);
});

// First-admin setup. Uses a fresh API with a setup token and an empty user table.
test('setup creates the first admin once, then the route disappears', async () => {
  const token = crypto.randomBytes(24).toString('hex');
  const empty = memoryStore();
  const setupApi = createApi({ store: empty, vault, now: () => clock, setupToken: token });
  const post = (body) => call(setupApi, { method: 'POST', url: '/api/setup', body });

  assert.equal((await post({ token: 'wrong', username: 'boss1', password: PW })).status, 403);
  assert.equal((await post({ token, username: 'boss1', password: 'short' })).status, 400);
  assert.equal((await post({ token, username: 'B', password: PW })).status, 400);
  const ok = await post({ token, username: 'Boss1', password: PW });
  assert.equal(ok.status, 201);
  assert.deepEqual(ok.body, { username: 'boss1', role: 'admin' });
  assert.equal((await post({ token, username: 'second', password: PW })).status, 404);
});

test('setup is disabled without a long-enough token', async () => {
  const noToken = createApi({ store: memoryStore(), vault, now: () => clock });
  assert.equal((await call(noToken, { method: 'POST', url: '/api/setup', body: { token: 'x', username: 'boss1', password: PW } })).status, 404);
  const shortToken = createApi({ store: memoryStore(), vault, now: () => clock, setupToken: 'short' });
  assert.equal((await call(shortToken, { method: 'POST', url: '/api/setup', body: { token: 'short', username: 'boss1', password: PW } })).status, 404);
});

test('setup is refused when users already exist', async () => {
  const token = crypto.randomBytes(24).toString('hex');
  const existing = memoryStore();
  existing.addUser({ username: 'admin', passwordHash: await hashPassword(PW), role: 'admin' });
  const setupApi = createApi({ store: existing, vault, now: () => clock, setupToken: token });
  assert.equal((await call(setupApi, { method: 'POST', url: '/api/setup', body: { token, username: 'boss2', password: PW } })).status, 404);
});

test('an account cannot open more than 100 records per hour', async () => {
  await login('revenue');
  await call(handle, as('revenue', { method: 'POST', url: '/api/taxpayers', body: { taxpayer_id: 'tp-1', national_id: NID } }));
  for (let i = 0; i < 100; i++) {
    assert.equal((await call(handle, as('revenue', { url: '/api/taxpayers/tp-1' }))).status, 200);
  }
  const blocked = await call(handle, as('revenue', { url: '/api/taxpayers/tp-1' }));
  assert.equal(blocked.status, 429);
  assert.equal(blocked.body.error, 'view_limit');
  clock = new Date(clock.getTime() + 61 * 60 * 1000);
  await login('revenue');
  assert.equal((await call(handle, as('revenue', { url: '/api/taxpayers/tp-1' }))).status, 200);
});

// ---------- OTP, password change and admin reset ----------
async function mfaWorld() {
  const st = memoryStore(() => clock);
  const key = crypto.randomBytes(32);
  const api = createApi({ store: st, vault, now: () => clock, appKey: key, requireMfa: true });
  for (const [username, role] of [['boss', 'admin'], ['staff', 'revenue']]) {
    st.addUser({ username, passwordHash: await hashPassword(PW), role });
  }
  const post = (url, body, cookieHeader) => call(api, { method: 'POST', url, body, rawCookie: cookieHeader });
  const get = (url, cookieHeader) => call(api, { url, rawCookie: cookieHeader });
  const sid = (r) => /__Host-dk_sid=([^;]+)/.exec(r.headers['Set-Cookie'])?.[1];
  const sidCookie = (r) => `__Host-dk_sid=${sid(r)}`;
  // Enroll an account: login without OTP, set up, confirm with a code.
  async function enroll(username) {
    const r = await post('/api/login', { username, password: PW });
    const cookie = sidCookie(r);
    const setup = await post('/api/mfa/setup', {}, cookie);
    const enabled = await post('/api/mfa/enable', { code: totp.codeAt(setup.body.secret, clock) }, cookie);
    assert.equal(enabled.status, 200);
    return setup.body.secret;
  }
  return { st, api, key, post, get, sid, sidCookie, enroll };
}

test('without OTP an account can only reach setup and password routes', async () => {
  const w = await mfaWorld();
  const r = await w.post('/api/login', { username: 'staff', password: PW });
  assert.equal(r.status, 200);
  const cookie = w.sidCookie(r);
  assert.equal((await w.get('/api/me', cookie)).body.mfa_enabled, false);
  assert.equal((await w.get('/api/taxpayers/tp-1', cookie)).status, 403);
  assert.equal((await w.get('/api/taxpayers/tp-1', cookie)).body.error, 'mfa_setup_required');
  assert.equal((await w.post('/api/mfa/setup', {}, cookie)).status, 200);
});

test('setup returns an authenticator secret, and enabling needs a correct code', async () => {
  const w = await mfaWorld();
  const cookie = w.sidCookie(await w.post('/api/login', { username: 'staff', password: PW }));
  const setup = await w.post('/api/mfa/setup', {}, cookie);
  assert.match(setup.body.secret, /^[A-Z2-7]{32}$/);
  assert.match(setup.body.otpauth_uri, /^otpauth:\/\/totp\/DK%20One%20Tax%20Bill:staff\?secret=/);
  assert.equal((await w.post('/api/mfa/enable', { code: '000000' }, cookie)).status, 401);
  assert.equal((await w.post('/api/mfa/enable', { code: totp.codeAt(setup.body.secret, clock) }, cookie)).status, 200);
  assert.equal((await w.get('/api/me', cookie)).body.mfa_enabled, true);
  assert.equal((await w.post('/api/mfa/setup', {}, cookie)).status, 409);
});

test('the stored OTP secret is encrypted', async () => {
  const w = await mfaWorld();
  const secret = await w.enroll('staff');
  const stored = (await w.st.findUserByUsername('staff')).totp_secret;
  assert.equal(String(stored).includes(secret), false);
});

test('with OTP on, the password alone gives no session; the right code does', async () => {
  const w = await mfaWorld();
  const secret = await w.enroll('staff');
  clock = new Date(clock.getTime() + 60 * 1000);
  const first = await w.post('/api/login', { username: 'staff', password: PW });
  assert.deepEqual(first.body, { mfa_required: true });
  assert.equal(/__Host-dk_sid=/.test(first.headers['Set-Cookie']), false);
  const pending = /__Host-dk_mfa=[^;]+/.exec(first.headers['Set-Cookie'])[0];
  assert.equal((await w.get('/api/me', pending)).status, 401); // pending token is not a session
  assert.equal((await w.post('/api/login/otp', { code: '000000' }, pending)).status, 401);
  const ok = await w.post('/api/login/otp', { code: totp.codeAt(secret, clock) }, pending);
  assert.equal(ok.status, 200);
  assert.equal((await w.get('/api/me', w.sidCookie(ok))).body.username, 'staff');
});

test('an OTP code cannot be reused', async () => {
  const w = await mfaWorld();
  const secret = await w.enroll('staff');
  clock = new Date(clock.getTime() + 60 * 1000);
  const code = totp.codeAt(secret, clock);
  const pendingOf = async () => /__Host-dk_mfa=[^;]+/.exec((await w.post('/api/login', { username: 'staff', password: PW })).headers['Set-Cookie'])[0];
  assert.equal((await w.post('/api/login/otp', { code }, await pendingOf())).status, 200);
  assert.equal((await w.post('/api/login/otp', { code }, await pendingOf())).status, 401);
});

test('pending tokens that are forged, tampered or expired are refused', async () => {
  const w = await mfaWorld();
  const secret = await w.enroll('staff');
  clock = new Date(clock.getTime() + 60 * 1000);
  const code = totp.codeAt(secret, clock);
  const user = await w.st.findUserByUsername('staff');
  assert.equal((await w.post('/api/login/otp', { code }, '__Host-dk_mfa=garbage')).status, 401);
  assert.equal((await w.post('/api/login/otp', { code }, `__Host-dk_mfa=${user.id}.${clock.getTime() + 60000}.AAAA`)).status, 401);
  const first = await w.post('/api/login', { username: 'staff', password: PW });
  const pending = /__Host-dk_mfa=[^;]+/.exec(first.headers['Set-Cookie'])[0];
  clock = new Date(clock.getTime() + 6 * 60 * 1000); // past the 5-minute limit
  assert.equal((await w.post('/api/login/otp', { code: totp.codeAt(secret, clock) }, pending)).status, 401);
});

test('five wrong OTP codes lock the account', async () => {
  const w = await mfaWorld();
  const secret = await w.enroll('staff');
  clock = new Date(clock.getTime() + 60 * 1000);
  const first = await w.post('/api/login', { username: 'staff', password: PW });
  const pending = /__Host-dk_mfa=[^;]+/.exec(first.headers['Set-Cookie'])[0];
  for (let i = 0; i < 5; i++) await w.post('/api/login/otp', { code: '111111' }, pending);
  assert.equal((await w.post('/api/login/otp', { code: totp.codeAt(secret, clock) }, pending)).status, 401);
  assert.equal((await w.post('/api/login', { username: 'staff', password: PW })).status, 401);
});

test('changing the password needs the current one, enforces length, and ends all sessions', async () => {
  const w = await mfaWorld();
  const r = await w.post('/api/login', { username: 'staff', password: PW });
  const cookie = w.sidCookie(r);
  assert.equal((await w.post('/api/password', { current_password: 'wrong-password-x', new_password: 'another-long-password' }, cookie)).status, 401);
  assert.equal((await w.post('/api/password', { current_password: PW, new_password: 'short' }, cookie)).status, 400);
  assert.equal((await w.post('/api/password', { current_password: PW, new_password: PW }, cookie)).status, 400);
  const ok = await w.post('/api/password', { current_password: PW, new_password: 'another-long-password' }, cookie);
  assert.equal(ok.status, 200);
  assert.equal((await w.get('/api/me', cookie)).status, 401);
  assert.equal((await w.post('/api/login', { username: 'staff', password: PW })).status, 401);
  assert.equal((await w.post('/api/login', { username: 'staff', password: 'another-long-password' })).status, 200);
});

test('an admin can reset a colleague OTP; others cannot', async () => {
  const w = await mfaWorld();
  const secrets = { boss: await w.enroll('boss'), staff: await w.enroll('staff') };
  clock = new Date(clock.getTime() + 60 * 1000);
  const signIn = async (username) => {
    const first = await w.post('/api/login', { username, password: PW });
    const pending = /__Host-dk_mfa=[^;]+/.exec(first.headers['Set-Cookie'])[0];
    return w.sidCookie(await w.post('/api/login/otp', { code: totp.codeAt(secrets[username], clock) }, pending));
  };
  const adminSession = await signIn('boss');
  clock = new Date(clock.getTime() + 60 * 1000); // next code window, since each code works once
  const staffSession = await signIn('staff');

  assert.equal((await w.post('/api/users/boss/mfa/reset', {}, staffSession)).status, 403);
  assert.equal((await w.post('/api/users/nobody/mfa/reset', {}, adminSession)).status, 404);
  assert.equal((await w.post('/api/users/staff/mfa/reset', {}, adminSession)).status, 200);
  assert.equal((await w.st.findUserByUsername('staff')).totp_enabled, 0);
  assert.equal((await w.get('/api/me', staffSession)).status, 401); // their sessions ended
  assert.equal(w.st._audit.some((a) => a.action === 'mfa_reset' && a.detail === 'staff'), true);
});

test('OTP routes do not exist when no app key is configured', async () => {
  const plain = createApi({ store: memoryStore(), vault, now: () => clock });
  assert.equal((await call(plain, { method: 'POST', url: '/api/mfa/setup', body: {} })).status, 404);
  assert.throws(() => createApi({ store: memoryStore(), vault, requireMfa: true }), /requireMfa needs appKey/);
});

// ---------- staff management ----------
const TEMP_PW = 'temporary-password-123';
const signIn = (username, password) => call(handle, { method: 'POST', url: '/api/login', body: { username, password } });
const cookieOf = (r) => /__Host-dk_sid=([^;]+)/.exec(r.headers['Set-Cookie'])[1];

test('only an admin can add staff, and the input is validated', async () => {
  await login('admin');
  await login('revenue');
  const make = (who, body) => call(handle, as(who, { method: 'POST', url: '/api/users', body }));
  assert.equal((await make('revenue', { username: 'newbie', role: 'health', password: TEMP_PW })).status, 403);
  assert.equal((await make('admin', { username: 'New Bie', role: 'health', password: TEMP_PW })).status, 400);
  assert.equal((await make('admin', { username: 'newbie', role: 'superuser', password: TEMP_PW })).status, 400);
  assert.equal((await make('admin', { username: 'newbie', role: 'health', password: 'short' })).status, 400);
  const ok = await make('admin', { username: 'Newbie', role: 'health', password: TEMP_PW });
  assert.equal(ok.status, 201);
  assert.deepEqual(ok.body, { username: 'newbie', role: 'health' });
  assert.equal((await make('admin', { username: 'newbie', role: 'health', password: TEMP_PW })).status, 409);
  const entry = store._audit.find((a) => a.action === 'user_create');
  assert.equal(entry.detail, 'newbie:health');
  assert.equal(JSON.stringify(store._audit).includes(TEMP_PW), false);
});

test('a new account must replace its temporary password before doing anything else', async () => {
  await login('admin');
  await call(handle, as('admin', { method: 'POST', url: '/api/users', body: { username: 'newbie', role: 'revenue', password: TEMP_PW } }));
  const first = await signIn('newbie', TEMP_PW);
  assert.equal(first.status, 200);
  assert.equal(first.body.must_change_password, true);
  const cookie = cookieOf(first);
  assert.equal((await call(handle, { url: '/api/me', cookie })).status, 200);
  const blocked = await call(handle, { url: '/api/taxpayers/anyone', cookie });
  assert.equal(blocked.status, 403);
  assert.equal(blocked.body.error, 'password_change_required');
  const changed = await call(handle, { method: 'POST', url: '/api/password', cookie,
    body: { current_password: TEMP_PW, new_password: 'my-own-long-password' } });
  assert.equal(changed.status, 200);
  assert.equal((await call(handle, { url: '/api/me', cookie })).status, 401); // sessions ended
  assert.equal((await signIn('newbie', TEMP_PW)).status, 401);
  const again = await signIn('newbie', 'my-own-long-password');
  assert.equal(again.body.must_change_password, false);
  assert.equal((await call(handle, { url: '/api/taxpayers/anyone', cookie: cookieOf(again) })).status, 404);
});

test('closing an account ends its sessions and blocks sign-in; reopening restores it', async () => {
  await login('admin');
  await login('revenue');
  assert.equal((await call(handle, as('admin', { method: 'POST', url: '/api/users/admin/disable', body: {} }))).body.error, 'cannot_disable_self');
  assert.equal((await call(handle, as('admin', { method: 'POST', url: '/api/users/revenue/disable', body: {} }))).status, 200);
  assert.equal((await call(handle, as('revenue', { url: '/api/me' }))).status, 401);
  const wrong = await signIn('revenue', 'wrong-password-here');
  const closed = await signIn('revenue', PW);
  assert.equal(closed.status, 401);
  assert.deepEqual(closed.body, wrong.body); // a closed account looks like a wrong password
  assert.equal((await call(handle, as('admin', { method: 'POST', url: '/api/users/revenue/enable', body: {} }))).status, 200);
  assert.equal((await signIn('revenue', PW)).status, 200);
  assert.deepEqual(store._audit.filter((a) => a.action.startsWith('user_')).map((a) => a.action), ['user_disable', 'user_enable']);
  assert.equal((await call(handle, as('admin', { method: 'POST', url: '/api/users/nobody/disable', body: {} }))).status, 404);
});

test('an admin can set a temporary password, which ends sessions and forces a change', async () => {
  await login('admin');
  await login('finance');
  const reset = (who, name, password) => call(handle, as(who, { method: 'POST', url: `/api/users/${name}/password`, body: { password } }));
  assert.equal((await reset('admin', 'finance', 'short')).status, 400);
  assert.equal((await reset('admin', 'admin', TEMP_PW)).body.error, 'use_password_page');
  assert.equal((await reset('finance', 'revenue', TEMP_PW)).status, 403);
  assert.equal((await reset('admin', 'finance', TEMP_PW)).status, 200);
  assert.equal((await call(handle, as('finance', { url: '/api/me' }))).status, 401);
  assert.equal((await signIn('finance', PW)).status, 401);
  assert.equal((await signIn('finance', TEMP_PW)).body.must_change_password, true);
  assert.equal(JSON.stringify(store._audit).includes(TEMP_PW), false);
});

test('the staff list is admin-only and never exposes secrets', async () => {
  await login('admin');
  await login('revenue');
  assert.equal((await call(handle, as('revenue', { url: '/api/users' }))).status, 403);
  const list = await call(handle, as('admin', { url: '/api/users' }));
  assert.equal(list.status, 200);
  assert.deepEqual(list.body.users.map((u) => u.username), ['admin', 'finance', 'health', 'revenue']);
  assert.equal(/password_hash|totp_secret|scrypt/.test(list.raw), false);
});
