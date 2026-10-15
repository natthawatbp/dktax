#!/usr/bin/env node
'use strict';
// Creates a user. The password is read from stdin, never from arguments or environment,
// so it does not appear in shell history or `ps`.
// Usage: node scripts/create-admin.js <username> <role>   (run with DB_USER=dktax_admin)
const { Pool } = require('pg');
const { loadPoolConfig } = require('../lib/config');
const { hashPassword } = require('../lib/passwords');

const ROLES = ['admin', 'revenue', 'finance', 'health', 'exec'];

function readStdin() {
  return new Promise((resolve, reject) => {
    const chunks = [];
    process.stdin.on('data', (c) => chunks.push(c));
    process.stdin.on('end', () => resolve(Buffer.concat(chunks).toString('utf8').replace(/\r?\n$/, '')));
    process.stdin.on('error', reject);
  });
}

async function main() {
  const [username, role] = process.argv.slice(2);
  if (!/^[a-z0-9_.-]{3,32}$/.test(username || '')) throw new Error('username must be 3-32 chars of a-z, 0-9, _ . -');
  if (!ROLES.includes(role)) throw new Error(`role must be one of: ${ROLES.join(', ')}`);

  const password = await readStdin();
  const passwordHash = await hashPassword(password);

  const pool = new Pool(loadPoolConfig());
  try {
    await pool.query('INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3)', [username, passwordHash, role]);
    console.log(`created user ${username} (${role})`);
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  console.error(err.code === '23505' ? 'user already exists' : `failed: ${err.message}`);
  process.exit(1);
});
