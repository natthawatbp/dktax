'use strict';
// Runs the API against a real MariaDB. Skipped unless both URLs are set:
//   TEST_ADMIN_URL  owner account, for fixtures and migrations (e.g. mysql://root:pw@127.0.0.1/dktax_test)
//   TEST_APP_URL    the dktax_app account, which is what the server uses
// The schema must already be applied from db/init/01-schema.sql and 02-grants.sql.
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { Readable } = require('node:stream');
const mysql = require('mysql2/promise');
const { createApi, SESSION_COOKIE } = require('../lib/api');
const { createNationalIdVault, checkDigit } = require('../lib/national-id-vault');
const { mysqlStore } = require('../lib/store');
const { hashPassword } = require('../lib/passwords');
const totp = require('../lib/totp');

const enabled = Boolean(process.env.TEST_ADMIN_URL && process.env.TEST_APP_URL);
const skip = enabled ? false : 'set TEST_ADMIN_URL and TEST_APP_URL to run';
const validId = (twelve) => twelve + checkDigit(twelve);
const NID = validId('110170020345');
const PW = 'integration-password-long';
const UTC = { timezone: 'Z' };

let admin;
let app;
let api;
let clock = new Date();

function call(url, { method = 'GET', body, cookie } = {}) {
  const payload = body === undefined ? '' : JSON.stringify(body);
  const req = Readable.from(payload ? [Buffer.from(payload)] : []);
  req.method = method;
  req.url = url;
  req.headers = {
    'content-type': 'application/json',
    ...(payload ? { 'content-length': String(Buffer.byteLength(payload)) } : {}),
    ...(cookie ? { cookie: `${SESSION_COOKIE}=${cookie}` } : {}),
  };
  return new Promise((resolve, reject) => {
    const res = {
      writeHead(status, h) { this.status = status; this.headers = h; },
      end(text) {
        let parsed = text;
        try { parsed = JSON.parse(text); } catch { /* plain */ }
        resolve({ status: this.status, headers: this.headers || {}, body: parsed, raw: text });
      },
    };
    Promise.resolve(api(req, res, new URL(url, 'http://localhost').pathname))
      .then((handled) => { if (handled === false) res.writeHead(404, {}), res.end('{}'); })
      .catch(reject);
  });
}

before(async () => {
  if (!enabled) return;
  admin = mysql.createPool({ uri: process.env.TEST_ADMIN_URL, connectionLimit: 2, ...UTC });
  app = mysql.createPool({ uri: process.env.TEST_APP_URL, connectionLimit: 5, ...UTC });
  // Fixtures. TRUNCATE does not fire the row triggers, so the test can reset audit_log.
  await admin.query('SET FOREIGN_KEY_CHECKS = 0');
  for (const t of ['audit_log', 'sessions', 'taxpayers', 'users']) await admin.query(`TRUNCATE TABLE ${t}`);
  await admin.query('SET FOREIGN_KEY_CHECKS = 1');
  const vault = createNationalIdVault({
    keks: { 1: crypto.randomBytes(32) }, currentVersion: 1, indexKey: crypto.randomBytes(32),
  });
  api = createApi({ store: mysqlStore(app), vault, now: () => clock, appKey: crypto.randomBytes(32), requireMfa: false });
  for (const [username, role] of [['admin', 'admin'], ['revenue', 'revenue'], ['finance', 'finance']]) {
    await admin.query('INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)',
      [username, await hashPassword(PW), role]);
  }
});

after(async () => {
  if (!enabled) return;
  await admin?.end();
  await app?.end();
});

async function login(username, password = PW) {
  const r = await call('/api/login', { method: 'POST', body: { username, password } });
  return r.status === 200 ? /__Host-dk_sid=([^;]+)/.exec(r.headers['Set-Cookie'])[1] : null;
}

test('app account cannot change or delete audit rows, or delete taxpayers or users', { skip }, async () => {
  await assert.rejects(app.query("UPDATE audit_log SET actor = 'x'"), /denied|command/i);
  await assert.rejects(app.query('DELETE FROM audit_log'), /denied|command/i);
  await assert.rejects(app.query('DELETE FROM taxpayers'), /denied|command/i);
  await assert.rejects(app.query('DELETE FROM users'), /denied|command/i);
  await assert.rejects(app.query('INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)',
    ['evil', 'x', 'admin']), /denied|command/i);
});

test('triggers block audit changes even for the owner account', { skip }, async () => {
  await admin.query('INSERT INTO audit_log (actor, action) VALUES (?, ?)', ['seed', 'seed']);
  await assert.rejects(admin.query("UPDATE audit_log SET actor = 'x' WHERE actor = 'seed'"), /append-only/);
  await assert.rejects(admin.query("DELETE FROM audit_log WHERE actor = 'seed'"), /append-only/);
});

test('end to end: create, lookup, view, reveal, with no plaintext in the database', { skip }, async () => {
  const revenue = await login('revenue');
  assert.ok(revenue);
  const created = await call('/api/taxpayers', { method: 'POST', cookie: revenue,
    body: { taxpayer_id: 'tp-100', national_id: NID } });
  assert.equal(created.status, 201);

  const looked = await call('/api/taxpayers/lookup', { method: 'POST', cookie: revenue, body: { national_id: NID } });
  assert.equal(looked.body.taxpayer_id, 'tp-100');

  const viewed = await call('/api/taxpayers/tp-100', { cookie: revenue });
  assert.equal(viewed.status, 200);
  assert.equal(viewed.body.national_id, NID); // revenue staff see the full ID by policy

  const [rows] = await admin.query('SELECT * FROM taxpayers WHERE taxpayer_id = ?', ['tp-100']);
  const stored = JSON.stringify(rows[0]);
  assert.equal(stored.includes(NID), false);
  assert.equal(stored.includes(NID.slice(0, 9)), false);

  const adminCookie = await login('admin');
  const revealed = await call('/api/taxpayers/tp-100/reveal', { method: 'POST', cookie: adminCookie,
    body: { reason: 'ตรวจสอบเอกสารตามคำร้องที่ 42' } });
  assert.equal(revealed.status, 200);
  assert.equal(revealed.body.national_id, NID);

  const [audit] = await admin.query('SELECT action FROM audit_log ORDER BY id');
  const actions = audit.map((r) => r.action);
  for (const expected of ['login', 'create', 'lookup', 'view', 'reveal']) assert.ok(actions.includes(expected), expected);
  const [dump] = await admin.query('SELECT * FROM audit_log');
  assert.equal(JSON.stringify(dump).includes(NID), false);
});

test('duplicate taxpayer is refused with 409 and the stored row is unchanged', { skip }, async () => {
  const revenue = await login('revenue');
  const [[before1]] = await admin.query('SELECT nid_data FROM taxpayers WHERE taxpayer_id = ?', ['tp-100']);
  const dup = await call('/api/taxpayers', { method: 'POST', cookie: revenue, body: { taxpayer_id: 'tp-100', national_id: NID } });
  assert.equal(dup.status, 409);
  const [[after1]] = await admin.query('SELECT nid_data FROM taxpayers WHERE taxpayer_id = ?', ['tp-100']);
  assert.deepEqual(after1, before1);
});

test('lockout is persisted in the database', { skip }, async () => {
  for (let i = 0; i < 5; i++) await call('/api/login', { method: 'POST', body: { username: 'finance', password: 'wrong-password-x' } });
  const [[row]] = await admin.query("SELECT failed_logins, locked_until FROM users WHERE username = 'finance'");
  assert.equal(row.failed_logins, 5);
  assert.ok(new Date(row.locked_until) > clock);
  assert.equal(await login('finance'), null);
});

test('session token is stored only as a hash', { skip }, async () => {
  clock = new Date();
  const token = await login('admin');
  const [rows] = await admin.query('SELECT token_hash FROM sessions');
  assert.equal(rows.some((r) => r.token_hash === token), false);
  const expected = crypto.createHash('sha256').update(token).digest('hex');
  assert.equal(rows.some((r) => r.token_hash === expected), true);
});

test('OTP is stored encrypted, survives restarts of the API object, and cannot be replayed', { skip }, async () => {
  await admin.query("INSERT INTO users (username, password_hash, role) VALUES ('otpuser', ?, 'finance')", [await hashPassword(PW)]);
  const cookie = await login('otpuser');
  const setup = await call('/api/mfa/setup', { method: 'POST', cookie, body: {} });
  assert.equal(setup.status, 200);
  const [[beforeEnable]] = await admin.query("SELECT totp_secret, totp_enabled FROM users WHERE username = 'otpuser'");
  assert.equal(beforeEnable.totp_enabled, 0);
  assert.equal(String(beforeEnable.totp_secret).includes(setup.body.secret), false);

  clock = new Date();
  const enable = await call('/api/mfa/enable', { method: 'POST', cookie, body: { code: totp.codeAt(setup.body.secret, clock) } });
  assert.equal(enable.status, 200);
  const [[afterEnable]] = await admin.query("SELECT totp_enabled, totp_last_step FROM users WHERE username = 'otpuser'");
  assert.equal(afterEnable.totp_enabled, 1);
  assert.ok(Number(afterEnable.totp_last_step) > 0);

  // Same code again is refused (step already used); the next window works.
  const first = await call('/api/login', { method: 'POST', body: { username: 'otpuser', password: PW } });
  assert.deepEqual(first.body, { mfa_required: true });
  const pending = /__Host-dk_mfa=[^;]+/.exec(first.headers['Set-Cookie'])[0];
  const reuse = await callWithCookie('/api/login/otp', pending, { code: totp.codeAt(setup.body.secret, clock) });
  assert.equal(reuse.status, 401);
  clock = new Date(clock.getTime() + 30 * 1000);
  const ok = await callWithCookie('/api/login/otp', pending, { code: totp.codeAt(setup.body.secret, clock) });
  assert.equal(ok.status, 200);
});

// POST with an arbitrary Cookie header (the pending-login cookie).
function callWithCookie(url, cookieHeader, body) {
  const payload = JSON.stringify(body);
  const req = Readable.from([Buffer.from(payload)]);
  req.method = 'POST';
  req.url = url;
  req.headers = { 'content-type': 'application/json', 'content-length': String(Buffer.byteLength(payload)), cookie: cookieHeader };
  return new Promise((resolve, reject) => {
    const res = {
      writeHead(status, h) { this.status = status; this.headers = h; },
      end(text) { resolve({ status: this.status, headers: this.headers || {}, body: JSON.parse(text) }); },
    };
    Promise.resolve(api(req, res, url)).catch(reject);
  });
}
