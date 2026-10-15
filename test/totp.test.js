'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const T = require('../lib/totp');

// RFC 6238 appendix B test vectors (SHA-1). The ASCII secret is "12345678901234567890".
const RFC_SECRET = T.base32Encode(Buffer.from('12345678901234567890'));

test('base32 round trips and matches the RFC secret encoding', () => {
  assert.equal(RFC_SECRET, 'GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ');
  const raw = crypto.randomBytes(20);
  assert.deepEqual(T.base32Decode(T.base32Encode(raw)), raw);
  assert.throws(() => T.base32Decode('not*valid'), /invalid base32/);
});

test('RFC 6238 vectors (6-digit tails of the 8-digit values)', () => {
  const vectors = [[59, '287082'], [1111111109, '081804'], [1111111111, '050471'], [1234567890, '005924'], [2000000000, '279037']];
  for (const [seconds, expected] of vectors) {
    assert.equal(T.codeAt(RFC_SECRET, new Date(seconds * 1000)), expected, `t=${seconds}`);
  }
});

test('verifyCode accepts the current code and one step of drift, nothing further', () => {
  const secret = T.generateSecret();
  const now = new Date('2026-10-15T03:00:10Z');
  const code = T.codeAt(secret, now);
  assert.equal(T.verifyCode(secret, code, now), T.stepOf(now));
  assert.notEqual(T.verifyCode(secret, T.codeAt(secret, new Date(now.getTime() - 30000)), now), null);
  assert.equal(T.verifyCode(secret, T.codeAt(secret, new Date(now.getTime() - 120000)), now), null);
});

test('a code cannot be used twice', () => {
  const secret = T.generateSecret();
  const now = new Date('2026-10-15T03:00:10Z');
  const code = T.codeAt(secret, now);
  const step = T.verifyCode(secret, code, now, 0);
  assert.equal(T.verifyCode(secret, code, now, step), null);
});

test('malformed codes are refused', () => {
  const secret = T.generateSecret();
  const now = new Date();
  for (const bad of ['', '12345', '1234567', 'abcdef', null, undefined, 123456]) {
    assert.equal(T.verifyCode(secret, bad, now), null);
  }
});

test('stored secrets are encrypted, bound to the user, and tamper-evident', () => {
  const key = T.deriveKey(crypto.randomBytes(32), 'totp-secret');
  const secret = T.generateSecret();
  const stored = T.encryptSecret(secret, key, 'user:7');
  assert.equal(stored.includes(secret), false);
  assert.equal(T.decryptSecret(stored, key, 'user:7'), secret);
  assert.throws(() => T.decryptSecret(stored, key, 'user:8'));
  const box = JSON.parse(stored);
  box.ct = Buffer.from(box.ct, 'base64').map((b, i) => (i === 0 ? b ^ 1 : b)).toString('base64');
  assert.throws(() => T.decryptSecret(JSON.stringify(box), key, 'user:7'));
});

test('derived keys differ per purpose and per master key', () => {
  const m = crypto.randomBytes(32);
  assert.notDeepEqual(T.deriveKey(m, 'a'), T.deriveKey(m, 'b'));
  assert.notDeepEqual(T.deriveKey(m, 'a'), T.deriveKey(crypto.randomBytes(32), 'a'));
  assert.equal(T.deriveKey(m, 'a').length, 32);
});

test('otpauth link carries issuer, account and secret', () => {
  const uri = T.otpauthUri({ secret: 'ABC234', account: 'admin', issuer: 'DK One Tax Bill' });
  assert.match(uri, /^otpauth:\/\/totp\/DK%20One%20Tax%20Bill:admin\?secret=ABC234&issuer=DK%20One%20Tax%20Bill/);
});
