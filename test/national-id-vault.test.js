'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const {
  createNationalIdVault, checkDigit, isValidNationalId, toStorable, fromStorable,
} = require('../lib/national-id-vault');

const key = () => crypto.randomBytes(32);
const validId = (twelve) => twelve + checkDigit(twelve);

// Fixed-input vault for deterministic lookups; random keys elsewhere.
function makeVault(extra = {}) {
  const kek1 = key();
  const kek2 = key();
  const indexKey = key();
  const vault = createNationalIdVault({
    keks: { 1: kek1, 2: kek2 }, currentVersion: 2, indexKey, ...extra,
  });
  return { vault, kek1, kek2, indexKey };
}

const ID = validId('110170020345');
const OTHER = validId('220170020345');

test('check digit: generated ids pass, altered check digit fails', () => {
  assert.equal(isValidNationalId(ID), true);
  const wrong = ID.slice(0, 12) + ((Number(ID[12]) + 1) % 10);
  assert.equal(isValidNationalId(wrong), false);
  assert.equal(isValidNationalId('12345'), false);
  assert.equal(isValidNationalId('abcdefghijklm'), false);
  assert.equal(isValidNationalId(undefined), false);
});

test('round trip returns the original id', () => {
  const { vault } = makeVault();
  const rec = vault.encrypt(ID, 'tp-1');
  assert.equal(vault.decrypt(rec, 'tp-1'), ID);
});

test('input with dashes or spaces is normalized', () => {
  const { vault } = makeVault();
  const formatted = `${ID[0]}-${ID.slice(1, 5)}-${ID.slice(5, 10)}-${ID.slice(10, 12)}-${ID[12]}`;
  const rec = vault.encrypt(formatted, 'tp-1');
  assert.equal(vault.decrypt(rec, 'tp-1'), ID);
  assert.equal(vault.blindIndex(formatted), vault.blindIndex(ID));
});

test('invalid national ids are rejected without echoing the input', () => {
  const { vault } = makeVault();
  const bad = validId('110170020345').slice(0, 12) + '9';
  assert.throws(() => vault.encrypt(bad, 'tp-1'), (e) => e.message === 'invalid national id' && !e.message.includes(bad));
});

test('same id encrypts differently each time (random DEK and IV)', () => {
  const { vault } = makeVault();
  const a = vault.encrypt(ID, 'tp-1');
  const b = vault.encrypt(ID, 'tp-1');
  assert.notDeepEqual(a.data.ct, b.data.ct);
  assert.notDeepEqual(a.data.iv, b.data.iv);
  assert.equal(a.blindIndex, b.blindIndex); // lookup still works
});

test('tampering with ciphertext, tag or IV is detected', () => {
  const { vault } = makeVault();
  const rec = vault.encrypt(ID, 'tp-1');

  const flippedCt = { ...rec, data: { ...rec.data, ct: Buffer.from(rec.data.ct) } };
  flippedCt.data.ct[0] ^= 0x01;
  assert.throws(() => vault.decrypt(flippedCt, 'tp-1'), /decryption failed/);

  const badTag = { ...rec, data: { ...rec.data, tag: Buffer.alloc(16) } };
  assert.throws(() => vault.decrypt(badTag, 'tp-1'), /decryption failed/);

  const badIv = { ...rec, data: { ...rec.data, iv: crypto.randomBytes(12) } };
  assert.throws(() => vault.decrypt(badIv, 'tp-1'), /decryption failed/);
});

test('a ciphertext cannot be moved to another taxpayer row', () => {
  const { vault } = makeVault();
  const rec = vault.encrypt(ID, 'tp-1');
  assert.throws(() => vault.decrypt(rec, 'tp-2'), /decryption failed/);
});

test('a wrapped DEK cannot be moved to another row', () => {
  const { vault } = makeVault();
  const a = vault.encrypt(ID, 'tp-1');
  const b = vault.encrypt(OTHER, 'tp-2');
  const swapped = { ...a, wrappedDek: b.wrappedDek };
  assert.throws(() => vault.decrypt(swapped, 'tp-1'), /decryption failed/);
});

test('changing the stored key version fails authentication', () => {
  const { vault } = makeVault();
  const rec = vault.encrypt(ID, 'tp-1');
  assert.throws(() => vault.decrypt({ ...rec, v: 1 }, 'tp-1'), /decryption failed/);
  assert.throws(() => vault.decrypt({ ...rec, v: 99 }, 'tp-1'), /decryption failed/);
});

test('a different KEK cannot decrypt the record', () => {
  const a = makeVault();
  const b = makeVault();
  const rec = a.vault.encrypt(ID, 'tp-1');
  assert.throws(() => b.vault.decrypt(rec, 'tp-1'), /decryption failed/);
});

test('blind index is deterministic per id and depends on the index key', () => {
  const { vault } = makeVault();
  assert.equal(vault.blindIndex(ID), vault.blindIndex(ID));
  assert.notEqual(vault.blindIndex(ID), vault.blindIndex(OTHER));
  const other = makeVault();
  assert.notEqual(vault.blindIndex(ID), other.vault.blindIndex(ID));
});

test('blind index does not equal a plain SHA-256 of the id', () => {
  const { vault } = makeVault();
  const plainHash = crypto.createHash('sha256').update(ID).digest('hex');
  assert.notEqual(vault.blindIndex(ID), plainHash);
});

test('mask shows only the last four digits', () => {
  const { vault } = makeVault();
  const masked = vault.mask(ID);
  assert.equal(masked, `x-xxxx-xxxxx-xx-${ID.slice(-4)}`);
  assert.equal(masked.includes(ID.slice(0, 9)), false);
});

test('stored form contains no plaintext digits', () => {
  const { vault } = makeVault();
  const rec = vault.encrypt(ID, 'tp-1');
  const json = JSON.stringify(toStorable(rec));
  assert.equal(json.includes(ID), false);
  assert.equal(json.includes(ID.slice(0, 9)), false);
});

test('storable round trip decrypts correctly', () => {
  const { vault } = makeVault();
  const rec = vault.encrypt(ID, 'tp-1');
  const restored = fromStorable(JSON.parse(JSON.stringify(toStorable(rec))));
  assert.equal(vault.decrypt(restored, 'tp-1'), ID);
});

test('rotate moves a record to the current version and keeps the plaintext', () => {
  const { vault, kek1, indexKey } = makeVault();
  const old = vault.encrypt(ID, 'tp-1');
  const v1Vault = createNationalIdVault({ keks: { 1: kek1, 2: key() }, currentVersion: 1, indexKey });
  const legacy = v1Vault.encrypt(ID, 'tp-1');
  assert.equal(legacy.v, 1);
  const rotated = vault.rotate(legacy, 'tp-1');
  assert.equal(rotated.v, 2);
  assert.equal(vault.decrypt(rotated, 'tp-1'), ID);
  assert.equal(rotated.blindIndex, old.blindIndex);
});

test('vault construction rejects bad keys', () => {
  const k = key();
  assert.throws(() => createNationalIdVault({ keks: { 1: Buffer.alloc(16) }, currentVersion: 1, indexKey: key() }), /32-byte/);
  assert.throws(() => createNationalIdVault({ keks: { 1: k }, currentVersion: 2, indexKey: key() }), /current kek version missing/);
  assert.throws(() => createNationalIdVault({ keks: { 1: k }, currentVersion: 1, indexKey: k }), /must differ/);
  assert.throws(() => createNationalIdVault({ keks: { 1: k }, currentVersion: 1, indexKey: 'short' }), /32-byte/);
});

test('taxpayer ids with unexpected characters are rejected', () => {
  const { vault } = makeVault();
  assert.throws(() => vault.encrypt(ID, 'tp-1; drop'), /invalid taxpayer id/);
  assert.throws(() => vault.encrypt(ID, ''), /invalid taxpayer id/);
});
