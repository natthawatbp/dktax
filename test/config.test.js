'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { loadVault, loadPoolConfig } = require('../lib/config');

const hex = () => require('node:crypto').randomBytes(32).toString('hex');

test('keys can come from environment values', () => {
  const vault = loadVault({ NID_KEK_V1: hex(), NID_INDEX_KEY: hex() });
  assert.equal(typeof vault.encrypt, 'function');
});

test('keys can come from files (Docker secrets)', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cfg-'));
  const kek = path.join(dir, 'kek');
  const idx = path.join(dir, 'idx');
  fs.writeFileSync(kek, hex() + '\n');
  fs.writeFileSync(idx, hex() + '\n');
  const vault = loadVault({ NID_KEK_V1_FILE: kek, NID_INDEX_KEY_FILE: idx });
  assert.equal(typeof vault.blindIndex, 'function');
});

test('missing or malformed keys fail at startup', () => {
  assert.throws(() => loadVault({ NID_INDEX_KEY: hex() }), /NID_KEK_V1 or NID_KEK_V1_FILE must be set/);
  assert.throws(() => loadVault({ NID_KEK_V1: 'abc', NID_INDEX_KEY: hex() }), /64 hex characters/);
});

test('database password from environment; TLS only when requested', () => {
  const base = { DB_HOST: 'localhost', DB_NAME: 'dktax', DB_USER: 'dktax_app', DB_PASSWORD: 'x' };
  assert.equal(loadPoolConfig(base).ssl, false);
  assert.deepEqual(loadPoolConfig({ ...base, DB_SSL: 'require' }).ssl, { rejectUnauthorized: true });
  assert.throws(() => loadPoolConfig({ DB_HOST: 'h' }), /DB_PASSWORD or DB_PASSWORD_FILE/);
});
