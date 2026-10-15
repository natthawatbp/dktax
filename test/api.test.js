'use strict';
const { test, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { Readable } = require('node:stream');
const { createApi, SESSION_COOKIE } = require('../lib/api');
const { createNationalIdVault, checkDigit } = require('../lib/national-id-vault');
const { memoryStore } = require('../lib/store');
const { hashPassword } = require('../lib/passwords');

const validId = (twelve) => twelve + checkDigit(twelve);
const NID = validId('110170020345');
const NID2 = validId('220170020345');
const PW = 'test-password-long-enough';

// Minimal request/response doubles that exercise the real handlers.
function call(handle, { method = 'GET', url = '/', body, cookie, contentType = 'application/json', headers = {} } = {}) {
  const payload = body === undefined ? '' : JSON.stringify(body);
  const req = Readable.from(payload ? [Buffer.from(payload)] : []);
  req.method = method;
  req.url = url;
  req.headers = {
    ...(contentType ? { 'content-type': contentType } : {}),
    ...(payload ? { 'content-length': String(Buffer.byteLength(payload)) } : {}),
    ...(cookie ? { cookie: `${SESSION_COOKIE}=${cookie}` } : {}),
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
  store = memoryStore();
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
  assert.deepEqual(r.body, { username: 'admin', role: 'admin' });
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

test('lookup by national id returns only the masked value and the taxpayer id', async () => {
  await login('revenue');
  await call(handle, as('revenue', { method: 'POST', url: '/api/taxpayers', body: { taxpayer_id: 'tp-1', national_id: NID } }));
  await login('finance');
  const r = await call(handle, as('finance', { method: 'POST', url: '/api/taxpayers/lookup', body: { national_id: NID } }));
  assert.equal(r.status, 200);
  assert.deepEqual(r.body, { taxpayer_id: 'tp-1', nid_masked: `x-xxxx-xxxxx-xx-${NID.slice(-4)}` });
  assert.equal(r.raw.includes(NID), false);
});

test('view shows only the masked value; health staff can view but cannot lookup', async () => {
  await login('revenue');
  await call(handle, as('revenue', { method: 'POST', url: '/api/taxpayers', body: { taxpayer_id: 'tp-1', national_id: NID } }));
  await login('health');
  const view = await call(handle, as('health', { url: '/api/taxpayers/tp-1' }));
  assert.equal(view.status, 200);
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
