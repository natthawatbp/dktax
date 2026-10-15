'use strict';
// Field-level encryption for Thai national IDs (เลขประจำตัวประชาชน, 13 digits).
// Envelope scheme: each record gets a random DEK; the DEK is wrapped by a KEK (versioned).
// Every ciphertext is bound to its taxpayer id and key version through AAD, so a row or
// version cannot be swapped without authentication failing. Lookups use a keyed HMAC
// (blind index) with a key separate from every encryption key. Node.js built-ins only.

const crypto = require('node:crypto');

const ALG = 'aes-256-gcm';
const IV_LEN = 12;
const KEY_LEN = 32;
const TAXPAYER_ID_RE = /^[A-Za-z0-9_-]{1,64}$/;

// Standard Thai ID check digit: weights 13..2 over the first 12 digits, mod 11.
function checkDigit(first12) {
  let sum = 0;
  for (let i = 0; i < 12; i++) sum += Number(first12[i]) * (13 - i);
  return (11 - (sum % 11)) % 10;
}

function normalize(input) {
  return String(input).replace(/[\s-]/g, '');
}

function isValidNationalId(id) {
  return typeof id === 'string' && /^\d{13}$/.test(id) && checkDigit(id.slice(0, 12)) === Number(id[12]);
}

function assertKey(key, name) {
  if (!Buffer.isBuffer(key) || key.length !== KEY_LEN) throw new Error(`${name} must be a 32-byte Buffer`);
}

function assertTaxpayerId(id) {
  if (typeof id !== 'string' || !TAXPAYER_ID_RE.test(id)) throw new Error('invalid taxpayer id');
}

function assertNationalId(input) {
  const id = normalize(input);
  // Never include the input in the error: it would leak into logs.
  if (!isValidNationalId(id)) throw new Error('invalid national id');
  return id;
}

function seal(key, plain, ad) {
  const iv = crypto.randomBytes(IV_LEN);
  const cipher = crypto.createCipheriv(ALG, key, iv);
  cipher.setAAD(ad);
  const ct = Buffer.concat([cipher.update(plain), cipher.final()]);
  return { iv, ct, tag: cipher.getAuthTag() };
}

function open(key, box, ad) {
  const decipher = crypto.createDecipheriv(ALG, key, box.iv);
  decipher.setAAD(ad);
  decipher.setAuthTag(box.tag);
  return Buffer.concat([decipher.update(box.ct), decipher.final()]);
}

function createNationalIdVault({ keks, currentVersion, indexKey }) {
  if (!keks || typeof keks !== 'object') throw new Error('keks required');
  for (const [version, key] of Object.entries(keks)) assertKey(key, `kek v${version}`);
  if (!keks[currentVersion]) throw new Error('current kek version missing');
  assertKey(indexKey, 'indexKey');
  // Separation of keys: the index key must not equal any encryption key.
  for (const key of Object.values(keks)) {
    if (crypto.timingSafeEqual(key, indexKey)) throw new Error('indexKey must differ from every kek');
  }

  const aad = (kind, version, taxpayerId) =>
    Buffer.from(`dk-one-tax:${kind}:v${version}:${taxpayerId}`, 'utf8');

  const blindIndex = (input) =>
    crypto.createHmac('sha256', indexKey).update(assertNationalId(input), 'utf8').digest('hex');

  function encrypt(input, taxpayerId) {
    assertTaxpayerId(taxpayerId);
    const id = assertNationalId(input);
    const v = currentVersion;
    const dek = crypto.randomBytes(KEY_LEN);
    try {
      return {
        v,
        wrappedDek: seal(keks[v], dek, aad('dek', v, taxpayerId)),
        data: seal(dek, Buffer.from(id, 'utf8'), aad('nid', v, taxpayerId)),
        blindIndex: blindIndex(id),
      };
    } finally {
      dek.fill(0);
    }
  }

  function decrypt(record, taxpayerId) {
    assertTaxpayerId(taxpayerId);
    const kek = record && keks[record.v];
    if (!kek) throw new Error('decryption failed');
    let dek;
    try {
      dek = open(kek, record.wrappedDek, aad('dek', record.v, taxpayerId));
      return open(dek, record.data, aad('nid', record.v, taxpayerId)).toString('utf8');
    } catch {
      // One generic error for every failure, so callers cannot learn which check failed.
      throw new Error('decryption failed');
    } finally {
      if (dek) dek.fill(0);
    }
  }

  // Re-encrypt under the current KEK version. Same plaintext, so the blind index stays valid.
  function rotate(record, taxpayerId) {
    return encrypt(decrypt(record, taxpayerId), taxpayerId);
  }

  const mask = (input) => {
    const id = assertNationalId(input);
    return `x-xxxx-xxxxx-xx-${id.slice(-4)}`;
  };

  return { encrypt, decrypt, rotate, blindIndex, mask, currentVersion };
}

// Storage helpers: turn a record into plain strings for DB columns and back.
const b64 = (buf) => buf.toString('base64');
const unb64 = (s) => Buffer.from(s, 'base64');

function toStorable(record) {
  const box = (b) => ({ iv: b64(b.iv), ct: b64(b.ct), tag: b64(b.tag) });
  return {
    v: record.v,
    wrappedDek: box(record.wrappedDek),
    data: box(record.data),
    blindIndex: record.blindIndex,
  };
}

function fromStorable(row) {
  const box = (b) => ({ iv: unb64(b.iv), ct: unb64(b.ct), tag: unb64(b.tag) });
  return { v: row.v, wrappedDek: box(row.wrappedDek), data: box(row.data), blindIndex: row.blindIndex };
}

module.exports = {
  createNationalIdVault,
  checkDigit,
  isValidNationalId,
  normalize,
  toStorable,
  fromStorable,
};
