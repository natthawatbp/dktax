'use strict';
// Runs the API against a real PostgreSQL. Skipped unless both URLs are set:
//   TEST_ADMIN_URL  superuser, for fixtures (create a user, reset tables)
//   TEST_APP_URL    the dktax_app role, which is what the server uses
// The schema must already be applied from db/init/01-schema.sql and 02-app.sql.
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { Readable } = require('node:stream');
const { Pool } = require('pg');
const { createApi, SESSION_COOKIE } = require('../lib/api');
const { createNationalIdVault, checkDigit } = require('../lib/national-id-vault');
const { pgStore } = require('../lib/store');
const { hashPassword } = require('../lib/passwords');

const enabled = Boolean(process.env.TEST_ADMIN_URL && process.env.TEST_APP_URL);
const skip = enabled ? false : 'set TEST_ADMIN_URL and TEST_APP_URL to run';
const validId = (twelve) => twelve + checkDigit(twelve);
const NID = validId('110170020345');
const PW = 'integration-password-long';

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
  admin = new Pool({ connectionString: process.env.TEST_ADMIN_URL, max: 2 });
  app = new Pool({ connectionString: process.env.TEST_APP_URL, max: 5 });
  // Test fixtures: the trigger blocks row deletes on audit_log, so reset it with TRUNCATE (test DB only).
  await admin.query('TRUNCATE audit_log, sessions, taxpayers, users RESTART IDENTITY CASCADE');
  const vault = createNationalIdVault({
    keks: { 1: crypto.randomBytes(32) }, currentVersion: 1, indexKey: crypto.randomBytes(32),
  });
  api = createApi({ store: pgStore(app), vault, now: () => clock });
  for (const [username, role] of [['admin', 'admin'], ['revenue', 'revenue'], ['finance', 'finance']]) {
    await admin.query('INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3)',
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

test('app role cannot change or delete audit rows or delete taxpayers', { skip }, async () => {
  await assert.rejects(app.query("UPDATE audit_log SET actor = 'x'"), /permission denied/);
  await assert.rejects(app.query('DELETE FROM audit_log'), /permission denied/);
  await assert.rejects(app.query('DELETE FROM taxpayers'), /permission denied/);
  await assert.rejects(app.query('INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3)',
    ['evil', 'x', 'admin']), /permission denied/);
});

test('end to end: create, lookup, view, reveal, with the database holding no plaintext', { skip }, async () => {
  const revenue = await login('revenue');
  assert.ok(revenue);
  const created = await call('/api/taxpayers', { method: 'POST', cookie: revenue,
    body: { taxpayer_id: 'tp-100', national_id: NID } });
  assert.equal(created.status, 201);

  const looked = await call('/api/taxpayers/lookup', { method: 'POST', cookie: revenue, body: { national_id: NID } });
  assert.equal(looked.body.taxpayer_id, 'tp-100');

  const viewed = await call('/api/taxpayers/tp-100', { cookie: revenue });
  assert.equal(viewed.status, 200);
  assert.equal(viewed.raw.includes(NID.slice(0, 9)), false);

  // The stored row must not contain the plaintext ID anywhere.
  const { rows } = await admin.query('SELECT * FROM taxpayers WHERE taxpayer_id = $1', ['tp-100']);
  const stored = JSON.stringify(rows[0]);
  assert.equal(stored.includes(NID), false);
  assert.equal(stored.includes(NID.slice(0, 9)), false);

  const admin1 = await login('admin');
  const revealed = await call('/api/taxpayers/tp-100/reveal', { method: 'POST', cookie: admin1,
    body: { reason: 'ตรวจสอบเอกสารตามคำร้องที่ 42' } });
  assert.equal(revealed.status, 200);
  assert.equal(revealed.body.national_id, NID);

  // Every action is audited, and the audit table never holds the ID.
  const audit = await admin.query('SELECT action, actor, taxpayer_id FROM audit_log ORDER BY id');
  const actions = audit.rows.map((r) => r.action);
  for (const expected of ['login', 'create', 'lookup', 'view', 'reveal']) assert.ok(actions.includes(expected), expected);
  const dump = JSON.stringify((await admin.query('SELECT * FROM audit_log')).rows);
  assert.equal(dump.includes(NID), false);
});

test('duplicate taxpayer is refused with 409 and the stored row is unchanged', { skip }, async () => {
  const revenue = await login('revenue');
  const before1 = (await admin.query('SELECT nid_data FROM taxpayers WHERE taxpayer_id = $1', ['tp-100'])).rows[0];
  const dup = await call('/api/taxpayers', { method: 'POST', cookie: revenue, body: { taxpayer_id: 'tp-100', national_id: NID } });
  assert.equal(dup.status, 409);
  const after1 = (await admin.query('SELECT nid_data FROM taxpayers WHERE taxpayer_id = $1', ['tp-100'])).rows[0];
  assert.deepEqual(after1, before1);
});

test('lockout is persisted in the database and survives a new session attempt', { skip }, async () => {
  for (let i = 0; i < 5; i++) await call('/api/login', { method: 'POST', body: { username: 'finance', password: 'wrong-password-x' } });
  const row = (await admin.query("SELECT failed_logins, locked_until FROM users WHERE username = 'finance'")).rows[0];
  assert.equal(row.failed_logins, 5);
  assert.ok(row.locked_until > clock);
  assert.equal(await login('finance'), null);
});

test('session is stored hashed, not as the token', { skip }, async () => {
  clock = new Date();
  const token = await login('admin');
  const { rows } = await admin.query('SELECT token_hash FROM sessions');
  assert.equal(rows.some((r) => r.token_hash === token), false);
  const expected = crypto.createHash('sha256').update(token).digest('hex');
  assert.equal(rows.some((r) => r.token_hash === expected), true);
});
