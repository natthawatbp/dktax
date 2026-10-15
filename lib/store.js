'use strict';
// Data access. Two implementations share one interface: mysqlStore (MariaDB via mysql2) and
// memoryStore (tests). Duplicate-key errors are normalized to code 'DUPLICATE' for both.

const DUPLICATE = 'DUPLICATE';

function duplicateError() {
  return Object.assign(new Error('duplicate key'), { code: DUPLICATE });
}

// Some driver versions return JSON columns as text and others as parsed objects; accept both.
const asObject = (v) => (typeof v === 'string' ? JSON.parse(v) : v);

function parseTaxpayer(row) {
  if (!row) return null;
  return {
    taxpayer_id: row.taxpayer_id,
    nid_key_version: row.nid_key_version,
    nid_blind_index: row.nid_blind_index,
    nid_wrapped_dek: asObject(row.nid_wrapped_dek),
    nid_data: asObject(row.nid_data),
  };
}

function mysqlStore(pool) {
  const q = async (sql, params = []) => (await pool.query(sql, params))[0];
  const TAXPAYER_COLS = 'taxpayer_id, nid_key_version, nid_blind_index, nid_wrapped_dek, nid_data';

  return {
    async findUserByUsername(username) {
      const rows = await q(`SELECT id, username, password_hash, role, failed_logins, locked_until, totp_secret, totp_enabled, totp_last_step FROM users WHERE username = ?`, [username]);
      return rows[0] || null;
    },
    async findUserById(id) {
      const rows = await q(`SELECT id, username, password_hash, role, failed_logins, locked_until, totp_secret, totp_enabled, totp_last_step FROM users WHERE id = ?`, [id]);
      return rows[0] || null;
    },
    async recordFailedLogin(userId, failedLogins, lockedUntil) {
      await q('UPDATE users SET failed_logins = ?, locked_until = ? WHERE id = ?', [failedLogins, lockedUntil, userId]);
    },
    async resetFailedLogins(userId) {
      await q('UPDATE users SET failed_logins = 0, locked_until = NULL WHERE id = ?', [userId]);
    },
    async createSession({ tokenHash, userId, expiresAt }) {
      await q('INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)', [tokenHash, userId, expiresAt]);
      await q('DELETE FROM sessions WHERE expires_at < ?', [new Date()]);
    },
    async findSession(tokenHash, now) {
      const rows = await q(
        `SELECT u.id, u.username, u.role, u.totp_enabled FROM sessions s JOIN users u ON u.id = s.user_id
          WHERE s.token_hash = ? AND s.expires_at > ?`,
        [tokenHash, now],
      );
      return rows[0] || null;
    },
    async deleteSession(tokenHash) {
      await q('DELETE FROM sessions WHERE token_hash = ?', [tokenHash]);
    },
    async deleteUserSessions(userId) {
      await q('DELETE FROM sessions WHERE user_id = ?', [userId]);
    },
    async setPendingTotp(userId, secretJson) {
      await q('UPDATE users SET totp_secret = ?, totp_enabled = 0, totp_last_step = 0 WHERE id = ?', [secretJson, userId]);
    },
    async enableTotp(userId, step) {
      await q('UPDATE users SET totp_enabled = 1, totp_last_step = ? WHERE id = ?', [step, userId]);
    },
    async updateTotpStep(userId, step) {
      await q('UPDATE users SET totp_last_step = ? WHERE id = ?', [step, userId]);
    },
    async disableTotp(userId) {
      await q('UPDATE users SET totp_secret = NULL, totp_enabled = 0, totp_last_step = 0 WHERE id = ?', [userId]);
    },
    async updatePassword(userId, passwordHash) {
      await q('UPDATE users SET password_hash = ?, failed_logins = 0, locked_until = NULL WHERE id = ?', [passwordHash, userId]);
    },
    async findTaxpayer(taxpayerId) {
      const rows = await q(`SELECT ${TAXPAYER_COLS} FROM taxpayers WHERE taxpayer_id = ?`, [taxpayerId]);
      return parseTaxpayer(rows[0]);
    },
    async findByBlindIndex(blindIndex) {
      const rows = await q(`SELECT ${TAXPAYER_COLS} FROM taxpayers WHERE nid_blind_index = ?`, [blindIndex]);
      return parseTaxpayer(rows[0]);
    },
    async insertTaxpayer(row) {
      try {
        await q(
          `INSERT INTO taxpayers (taxpayer_id, nid_key_version, nid_blind_index, nid_wrapped_dek, nid_data)
           VALUES (?, ?, ?, ?, ?)`,
          [row.taxpayer_id, row.nid_key_version, row.nid_blind_index,
            JSON.stringify(row.nid_wrapped_dek), JSON.stringify(row.nid_data)],
        );
      } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') throw duplicateError();
        throw err;
      }
    },
    async insertAudit({ actor, action, taxpayerId = null, detail = null }) {
      await q('INSERT INTO audit_log (actor, action, taxpayer_id, detail) VALUES (?, ?, ?, ?)',
        [actor, action, taxpayerId, detail]);
    },
    async countRecentAudit({ actor, action, since }) {
      const rows = await q(
        'SELECT COUNT(*) AS n FROM audit_log WHERE actor = ? AND action = ? AND at > ?',
        [actor, action, since],
      );
      return Number(rows[0].n);
    },
    async countUsers() {
      const rows = await q('SELECT COUNT(*) AS n FROM users');
      return Number(rows[0].n);
    },
    async createUser({ username, passwordHash, role }) {
      try {
        await q('INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)', [username, passwordHash, role]);
      } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') throw duplicateError();
        throw err;
      }
    },
    async listAudit(limit) {
      // LIMIT cannot take a bound parameter here, so the value is checked as an integer first.
      const n = Math.floor(Number(limit));
      if (!(n >= 1 && n <= 200)) throw new Error('limit out of range');
      return q(`SELECT id, at, actor, action, taxpayer_id, detail FROM audit_log ORDER BY id DESC LIMIT ${n}`);
    },
  };
}

function memoryStore(now = () => new Date()) {
  const users = new Map();
  const sessions = new Map();
  const taxpayers = new Map();
  const audit = [];
  let nextUserId = 1;
  let nextAuditId = 1;

  return {
    _users: users,
    _audit: audit,
    addUser({ username, passwordHash, role }) {
      if (users.has(username)) throw duplicateError();
      const user = { id: nextUserId++, username, password_hash: passwordHash, role, failed_logins: 0, locked_until: null,
        totp_secret: null, totp_enabled: 0, totp_last_step: 0 };
      users.set(username, user);
      return user;
    },
    async findUserByUsername(username) {
      return users.get(username) || null;
    },
    async findUserById(id) {
      return [...users.values()].find((x) => x.id === id) || null;
    },
    async deleteUserSessions(userId) {
      for (const [hash, sess] of sessions) if (sess.userId === userId) sessions.delete(hash);
    },
    async setPendingTotp(userId, secretJson) {
      Object.assign([...users.values()].find((x) => x.id === userId), { totp_secret: secretJson, totp_enabled: 0, totp_last_step: 0 });
    },
    async enableTotp(userId, step) {
      Object.assign([...users.values()].find((x) => x.id === userId), { totp_enabled: 1, totp_last_step: step });
    },
    async updateTotpStep(userId, step) {
      Object.assign([...users.values()].find((x) => x.id === userId), { totp_last_step: step });
    },
    async disableTotp(userId) {
      Object.assign([...users.values()].find((x) => x.id === userId), { totp_secret: null, totp_enabled: 0, totp_last_step: 0 });
    },
    async updatePassword(userId, passwordHash) {
      Object.assign([...users.values()].find((x) => x.id === userId), { password_hash: passwordHash, failed_logins: 0, locked_until: null });
    },
    async recordFailedLogin(userId, failedLogins, lockedUntil) {
      const u = [...users.values()].find((x) => x.id === userId);
      Object.assign(u, { failed_logins: failedLogins, locked_until: lockedUntil });
    },
    async resetFailedLogins(userId) {
      const u = [...users.values()].find((x) => x.id === userId);
      Object.assign(u, { failed_logins: 0, locked_until: null });
    },
    async createSession({ tokenHash, userId, expiresAt }) {
      sessions.set(tokenHash, { userId, expiresAt });
    },
    async findSession(tokenHash, now) {
      const s = sessions.get(tokenHash);
      if (!s || !(s.expiresAt > now)) return null;
      const u = [...users.values()].find((x) => x.id === s.userId);
      return u ? { id: u.id, username: u.username, role: u.role, totp_enabled: u.totp_enabled } : null;
    },
    async deleteSession(tokenHash) {
      sessions.delete(tokenHash);
    },
    async findTaxpayer(taxpayerId) {
      return taxpayers.get(taxpayerId) || null;
    },
    async findByBlindIndex(blindIndex) {
      return [...taxpayers.values()].find((t) => t.nid_blind_index === blindIndex) || null;
    },
    async insertTaxpayer(row) {
      if (taxpayers.has(row.taxpayer_id)) throw duplicateError();
      if ([...taxpayers.values()].some((t) => t.nid_blind_index === row.nid_blind_index)) throw duplicateError();
      taxpayers.set(row.taxpayer_id, JSON.parse(JSON.stringify(row)));
    },
    async insertAudit({ actor, action, taxpayerId = null, detail = null }) {
      audit.push({ id: nextAuditId++, at: now(), actor, action, taxpayer_id: taxpayerId, detail });
    },
    async countRecentAudit({ actor, action, since }) {
      return audit.filter((a) => a.actor === actor && a.action === action && a.at > since).length;
    },
    async countUsers() {
      return users.size;
    },
    async createUser({ username, passwordHash, role }) {
      if (users.has(username)) throw duplicateError();
      users.set(username, { id: nextUserId++, username, password_hash: passwordHash, role, failed_logins: 0, locked_until: null,
        totp_secret: null, totp_enabled: 0, totp_last_step: 0 });
    },
    async listAudit(limit) {
      return audit.slice(-limit).reverse();
    },
  };
}

module.exports = { mysqlStore, memoryStore, DUPLICATE };
