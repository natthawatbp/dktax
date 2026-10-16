'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { bootstrapAdmin } = require('../lib/bootstrap');
const { memoryStore } = require('../lib/store');
const { createApi } = require('../lib/api');
const { createNationalIdVault } = require('../lib/national-id-vault');

const INITIAL = 'first-admin-temp-pass';
const quiet = () => {
  const lines = [];
  return { lines, log: (m) => lines.push(['log', m]), warn: (m) => lines.push(['warn', m]), error: (m) => lines.push(['error', m]) };
};

test('does nothing unless ADMIN_INITIAL_PASSWORD is set', async () => {
  const store = memoryStore();
  assert.equal(await bootstrapAdmin({ store, env: {}, log: quiet() }), 'disabled');
  assert.equal(await store.countUsers(), 0);
});

test('creates the first admin, who must change the password', async () => {
  const store = memoryStore();
  const log = quiet();
  assert.equal(await bootstrapAdmin({ store, env: { ADMIN_INITIAL_PASSWORD: INITIAL }, log }), 'created');
  const user = await store.findUserByUsername('admin');
  assert.equal(user.role, 'admin');
  assert.equal(user.must_change_password, 1);
  assert.equal(user.password_hash.startsWith('scrypt$'), true);
  assert.equal(user.password_hash.includes(INITIAL), false);
});

test('the chosen username is used and normalized', async () => {
  const store = memoryStore();
  await bootstrapAdmin({ store, env: { ADMIN_INITIAL_PASSWORD: INITIAL, ADMIN_USERNAME: ' Boss.One ' }, log: quiet() });
  assert.ok(await store.findUserByUsername('boss.one'));
});

test('runs only on an empty system, so a leftover variable is harmless', async () => {
  const store = memoryStore();
  const env = { ADMIN_INITIAL_PASSWORD: INITIAL };
  await bootstrapAdmin({ store, env, log: quiet() });
  const log = quiet();
  assert.equal(await bootstrapAdmin({ store, env: { ADMIN_INITIAL_PASSWORD: 'another-temp-password' }, log }), 'users_exist');
  assert.equal(await store.countUsers(), 1);
  assert.equal(log.lines[0][0], 'warn');
  assert.equal((await store.findUserByUsername('admin')).password_hash.includes('another'), false);
});

test('a password that is too short or a bad username creates nothing and is not printed', async () => {
  for (const env of [{ ADMIN_INITIAL_PASSWORD: 'short' }, { ADMIN_INITIAL_PASSWORD: INITIAL, ADMIN_USERNAME: 'x' }]) {
    const store = memoryStore();
    const log = quiet();
    const result = await bootstrapAdmin({ store, env, log });
    assert.ok(['weak_password', 'invalid_username'].includes(result));
    assert.equal(await store.countUsers(), 0);
    assert.equal(JSON.stringify(log.lines).includes(env.ADMIN_INITIAL_PASSWORD), false);
  }
});

test('the password never appears in logs or the audit trail', async () => {
  const store = memoryStore();
  const log = quiet();
  await bootstrapAdmin({ store, env: { ADMIN_INITIAL_PASSWORD: INITIAL }, log });
  assert.equal(JSON.stringify(log.lines).includes(INITIAL), false);
  assert.equal(JSON.stringify(store._audit).includes(INITIAL), false);
  assert.equal(store._audit[0].action, 'bootstrap_admin');
});

test('the new admin can sign in with the initial password, and is then forced to change it', async () => {
  const store = memoryStore();
  await bootstrapAdmin({ store, env: { ADMIN_INITIAL_PASSWORD: INITIAL }, log: quiet() });
  const vault = createNationalIdVault({ keks: { 1: crypto.randomBytes(32) }, currentVersion: 1, indexKey: crypto.randomBytes(32) });
  const api = createApi({ store, vault });
  const { Readable } = require('node:stream');
  const call = (method, url, body, cookie) => new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : '';
    const req = Readable.from(payload ? [Buffer.from(payload)] : []);
    req.method = method; req.url = url;
    req.headers = { 'content-type': 'application/json', ...(cookie ? { cookie } : {}) };
    const res = { writeHead(s, h) { this.s = s; this.h = h; }, end(t) { resolve({ status: this.s, headers: this.h, body: JSON.parse(t) }); } };
    Promise.resolve(api(req, res, url)).catch(reject);
  });
  const login = await call('POST', '/api/login', { username: 'admin', password: INITIAL });
  assert.equal(login.status, 200);
  assert.equal(login.body.must_change_password, true);
  const cookie = `__Host-dk_sid=${/__Host-dk_sid=([^;]+)/.exec(login.headers['Set-Cookie'])[1]}`;
  assert.equal((await call('GET', '/api/users', null, cookie)).body.error, 'password_change_required');
  const changed = await call('POST', '/api/password', { current_password: INITIAL, new_password: 'my-own-long-password' }, cookie);
  assert.equal(changed.status, 200);
  assert.equal((await call('POST', '/api/login', { username: 'admin', password: INITIAL })).status, 401);
  const again = await call('POST', '/api/login', { username: 'admin', password: 'my-own-long-password' });
  assert.equal(again.body.must_change_password, false);
});
