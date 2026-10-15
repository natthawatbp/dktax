'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { hashPassword, verifyPassword } = require('../lib/passwords');

test('hash verifies the right password and rejects others', async () => {
  const h = await hashPassword('correct horse battery');
  assert.equal(await verifyPassword('correct horse battery', h), true);
  assert.equal(await verifyPassword('correct horse batterx', h), false);
  assert.equal(h.startsWith('scrypt$16384$8$1$'), true);
});

test('same password gets a different salt each time', async () => {
  const a = await hashPassword('same password here');
  const b = await hashPassword('same password here');
  assert.notEqual(a, b);
});

test('password policy: 12 to 128 characters', async () => {
  await assert.rejects(hashPassword('short'));
  await assert.rejects(hashPassword('x'.repeat(129)));
  await assert.rejects(hashPassword(12345678901234));
});

test('malformed stored hashes never verify', async () => {
  assert.equal(await verifyPassword('anything here', ''), false);
  assert.equal(await verifyPassword('anything here', 'plain-text-password'), false);
  assert.equal(await verifyPassword('anything here', 'bcrypt$1$2$3$4$5'), false);
});
