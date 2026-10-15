'use strict';
// Reads secrets for the vault and the database pool. Each secret can come from a file
// (NAME_FILE, for Docker secrets) or directly from the environment (NAME, for hosts such as
// Plesk that have no secret files). Secrets are never logged.
const fs = require('node:fs');
const { createNationalIdVault } = require('./national-id-vault');

function readSecret(env, name) {
  const file = env[`${name}_FILE`];
  if (file) return fs.readFileSync(file, 'utf8').trim();
  if (env[name]) return String(env[name]).trim();
  throw new Error(`${name} or ${name}_FILE must be set`);
}

function readKey(env, name) {
  const hex = readSecret(env, name);
  if (!/^[0-9a-fA-F]{64}$/.test(hex)) throw new Error(`${name} must be 64 hex characters`);
  return Buffer.from(hex, 'hex');
}

function loadVault(env = process.env) {
  return createNationalIdVault({
    keks: { 1: readKey(env, 'NID_KEK_V1') },
    currentVersion: 1,
    indexKey: readKey(env, 'NID_INDEX_KEY'),
  });
}

function loadPoolConfig(env = process.env) {
  return {
    host: env.DB_HOST,
    port: Number(env.DB_PORT || 3306),
    database: env.DB_NAME,
    user: env.DB_USER,
    password: readSecret(env, 'DB_PASSWORD'),
    connectionLimit: 10,
    waitForConnections: true,
    // DATETIME values are stored in UTC and read back as UTC Date objects.
    timezone: 'Z',
    dateStrings: false,
    supportBigNumbers: true,
    bigNumberStrings: false,
    ssl: env.DB_SSL === 'require' ? { rejectUnauthorized: true } : undefined,
  };
}

module.exports = { loadVault, loadPoolConfig, readSecret, readKey };
