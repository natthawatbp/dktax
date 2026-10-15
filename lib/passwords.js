'use strict';
// Password hashing with scrypt (Node built-in). Stored format: scrypt$N$r$p$salt$hash (base64).
const crypto = require('node:crypto');
const { promisify } = require('node:util');

const scrypt = promisify(crypto.scrypt);
const N = 16384;
const R = 8;
const P = 1;
const KEY_LEN = 32;
const MIN_LEN = 12;
const MAX_LEN = 128;

async function hashPassword(password) {
  if (typeof password !== 'string' || password.length < MIN_LEN || password.length > MAX_LEN) {
    throw new Error(`password must be ${MIN_LEN}-${MAX_LEN} characters`);
  }
  const salt = crypto.randomBytes(16);
  const hash = await scrypt(password, salt, KEY_LEN, { N, r: R, p: P, maxmem: 64 * 1024 * 1024 });
  return `scrypt$${N}$${R}$${P}$${salt.toString('base64')}$${hash.toString('base64')}`;
}

async function verifyPassword(password, stored) {
  const parts = String(stored || '').split('$');
  if (parts.length !== 6 || parts[0] !== 'scrypt') return false;
  const [, n, r, p, saltB64, hashB64] = parts;
  const expected = Buffer.from(hashB64, 'base64');
  const actual = await scrypt(String(password), Buffer.from(saltB64, 'base64'), expected.length, {
    N: Number(n), r: Number(r), p: Number(p), maxmem: 64 * 1024 * 1024,
  });
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}

// Used when the username does not exist, so the response time does not reveal which usernames exist.
const DUMMY_HASH = hashPassword('timing-equalizer-password').catch(() => null);

module.exports = { hashPassword, verifyPassword, DUMMY_HASH };
