'use strict';
// Reads secrets from files (Docker secrets) and builds the vault and pool. Nothing secret is taken from env values.
const fs = require('node:fs');
const { createNationalIdVault } = require('./national-id-vault');

function readSecretFile(file) {
  if (!file) throw new Error('secret file path not set');
  return fs.readFileSync(file, 'utf8').trim();
}

function readKey(file) {
  const hex = readSecretFile(file);
  if (!/^[0-9a-fA-F]{64}$/.test(hex)) throw new Error(`key in ${file} must be 64 hex characters`);
  return Buffer.from(hex, 'hex');
}

function loadVault(env = process.env) {
  return createNationalIdVault({
    keks: { 1: readKey(env.NID_KEK_V1_FILE) },
    currentVersion: 1,
    indexKey: readKey(env.NID_INDEX_KEY_FILE),
  });
}

function loadPoolConfig(env = process.env) {
  return {
    host: env.DB_HOST,
    port: Number(env.DB_PORT || 5432),
    database: env.DB_NAME,
    user: env.DB_USER,
    password: readSecretFile(env.DB_PASSWORD_FILE),
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
    ssl: false, // internal Docker network only; enable TLS before any cross-host use
  };
}

module.exports = { loadVault, loadPoolConfig, readKey };
