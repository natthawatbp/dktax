'use strict';
// Time-based one-time passwords (RFC 6238, HMAC-SHA1, 6 digits, 30 s) with Node built-ins only.
// Also encrypts the stored TOTP secret and derives purpose-specific keys from one master key.
const crypto = require('node:crypto');

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
const STEP_SECONDS = 30;
const DIGITS = 6;

function base32Encode(buf) {
  let bits = 0;
  let value = 0;
  let out = '';
  for (const byte of buf) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      out += ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) out += ALPHABET[(value << (5 - bits)) & 31];
  return out;
}

function base32Decode(text) {
  let bits = 0;
  let value = 0;
  const out = [];
  for (const ch of String(text).replace(/=+$/, '').toUpperCase()) {
    const idx = ALPHABET.indexOf(ch);
    if (idx < 0) throw new Error('invalid base32');
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      out.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }
  return Buffer.from(out);
}

function generateSecret() {
  return base32Encode(crypto.randomBytes(20));
}

function hotp(secret, counter, digits = DIGITS) {
  const msg = Buffer.alloc(8);
  msg.writeBigUInt64BE(BigInt(counter));
  const h = crypto.createHmac('sha1', secret).update(msg).digest();
  const offset = h[h.length - 1] & 0xf;
  const bin = ((h[offset] & 0x7f) << 24) | (h[offset + 1] << 16) | (h[offset + 2] << 8) | h[offset + 3];
  return String(bin % 10 ** digits).padStart(digits, '0');
}

const stepOf = (date) => Math.floor(date.getTime() / 1000 / STEP_SECONDS);

// The code a correct authenticator shows at `now`. Used by tests and tooling.
function codeAt(secretBase32, now = new Date()) {
  return hotp(base32Decode(secretBase32), stepOf(now));
}

// Returns the matching time step, or null. A step at or below lastStep is refused,
// so a code cannot be used twice. One step of clock drift either way is tolerated.
function verifyCode(secretBase32, code, now, lastStep = 0, window = 1) {
  if (typeof code !== 'string' || !/^\d{6}$/.test(code)) return null;
  const secret = base32Decode(secretBase32);
  const current = stepOf(now);
  let matched = null;
  for (let step = current - window; step <= current + window; step++) {
    const equal = crypto.timingSafeEqual(Buffer.from(hotp(secret, step)), Buffer.from(code));
    if (equal && step > Number(lastStep) && matched === null) matched = step;
  }
  return matched;
}

function otpauthUri({ secret, account, issuer }) {
  return `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(account)}` +
    `?secret=${secret}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=${DIGITS}&period=${STEP_SECONDS}`;
}

// One master key, many independent keys: each purpose gets its own label.
function deriveKey(master, label) {
  return Buffer.from(crypto.hkdfSync('sha256', master, Buffer.alloc(0), label, 32));
}

function encryptSecret(plain, key, aad) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  cipher.setAAD(Buffer.from(aad));
  const ct = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);
  return JSON.stringify({ iv: iv.toString('base64'), ct: ct.toString('base64'), tag: cipher.getAuthTag().toString('base64') });
}

function decryptSecret(json, key, aad) {
  const box = typeof json === 'string' ? JSON.parse(json) : json;
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(box.iv, 'base64'));
  decipher.setAAD(Buffer.from(aad));
  decipher.setAuthTag(Buffer.from(box.tag, 'base64'));
  return Buffer.concat([decipher.update(Buffer.from(box.ct, 'base64')), decipher.final()]).toString('utf8');
}

module.exports = {
  base32Encode, base32Decode, generateSecret, hotp, codeAt, verifyCode, otpauthUri, stepOf,
  deriveKey, encryptSecret, decryptSecret, STEP_SECONDS,
};
