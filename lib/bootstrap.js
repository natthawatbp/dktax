'use strict';
// Creates the first administrator when the system starts for the first time, so nobody has to
// run a setup page or a command. The password comes from the environment (ADMIN_INITIAL_PASSWORD),
// never from the code, and the account must replace it at its first sign-in.
//
// It acts only while the users table is empty. Once any user exists it does nothing, so leaving the
// variable set is harmless, though it should be removed after the first sign-in.
const { hashPassword } = require('./passwords');

const USERNAME_RE = /^[a-z0-9_.-]{3,32}$/;

// Returns one of: 'disabled', 'created', 'users_exist', 'invalid_username', 'weak_password'.
async function bootstrapAdmin({ store, env = process.env, log = console }) {
  const password = env.ADMIN_INITIAL_PASSWORD;
  if (!password) return 'disabled';

  const username = String(env.ADMIN_USERNAME || 'admin').trim().toLowerCase();
  if (!USERNAME_RE.test(username)) {
    log.error('ADMIN_USERNAME must be 3-32 characters of a-z, 0-9, _ . - ; no admin was created.');
    return 'invalid_username';
  }

  if ((await store.countUsers()) > 0) {
    log.warn('ADMIN_INITIAL_PASSWORD is set but users already exist. It is ignored; remove it from the environment.');
    return 'users_exist';
  }

  let passwordHash;
  try {
    passwordHash = await hashPassword(password);
  } catch {
    // Never print the value. Say only what is wrong with it.
    log.error('ADMIN_INITIAL_PASSWORD must be 12-128 characters; no admin was created.');
    return 'weak_password';
  }

  await store.createUser({ username, passwordHash, role: 'admin', mustChangePassword: true });
  await store.insertAudit({ actor: username, action: 'bootstrap_admin' });
  log.log(`Created the first admin "${username}". The password must be changed at the first sign-in; remove ADMIN_INITIAL_PASSWORD now.`);
  return 'created';
}

module.exports = { bootstrapAdmin };
