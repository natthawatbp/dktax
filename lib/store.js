'use strict';
// Data access. Two implementations share one interface: pgStore (PostgreSQL) and memoryStore (tests).

function pgStore(pool) {
  const q = (text, params) => pool.query(text, params);
  return {
    async findUserByUsername(username) {
      const { rows } = await q(
        'SELECT id, username, password_hash, role, failed_logins, locked_until FROM users WHERE username = $1',
        [username],
      );
      return rows[0] || null;
    },
    async recordFailedLogin(userId, failedLogins, lockedUntil) {
      await q('UPDATE users SET failed_logins = $2, locked_until = $3 WHERE id = $1', [userId, failedLogins, lockedUntil]);
    },
    async resetFailedLogins(userId) {
      await q('UPDATE users SET failed_logins = 0, locked_until = NULL WHERE id = $1', [userId]);
    },
    async createSession({ tokenHash, userId, expiresAt }) {
      await q('INSERT INTO sessions (token_hash, user_id, expires_at) VALUES ($1, $2, $3)', [tokenHash, userId, expiresAt]);
      await q('DELETE FROM sessions WHERE expires_at < now()');
    },
    async findSession(tokenHash, now) {
      const { rows } = await q(
        `SELECT u.id, u.username, u.role FROM sessions s JOIN users u ON u.id = s.user_id
          WHERE s.token_hash = $1 AND s.expires_at > $2`,
        [tokenHash, now],
      );
      return rows[0] || null;
    },
    async deleteSession(tokenHash) {
      await q('DELETE FROM sessions WHERE token_hash = $1', [tokenHash]);
    },
    async findTaxpayer(taxpayerId) {
      const { rows } = await q(
        'SELECT taxpayer_id, nid_key_version, nid_blind_index, nid_wrapped_dek, nid_data FROM taxpayers WHERE taxpayer_id = $1',
        [taxpayerId],
      );
      return rows[0] || null;
    },
    async findByBlindIndex(blindIndex) {
      const { rows } = await q(
        'SELECT taxpayer_id, nid_key_version, nid_blind_index, nid_wrapped_dek, nid_data FROM taxpayers WHERE nid_blind_index = $1',
        [blindIndex],
      );
      return rows[0] || null;
    },
    async insertTaxpayer(row) {
      await q(
        `INSERT INTO taxpayers (taxpayer_id, nid_key_version, nid_blind_index, nid_wrapped_dek, nid_data)
         VALUES ($1, $2, $3, $4, $5)`,
        [row.taxpayer_id, row.nid_key_version, row.nid_blind_index, row.nid_wrapped_dek, row.nid_data],
      );
    },
    async insertAudit({ actor, action, taxpayerId = null, detail = null }) {
      await q('INSERT INTO audit_log (actor, action, taxpayer_id, detail) VALUES ($1, $2, $3, $4)', [actor, action, taxpayerId, detail]);
    },
    async countRecentAudit({ actor, action, since }) {
      const { rows } = await q(
        'SELECT count(*)::int AS n FROM audit_log WHERE actor = $1 AND action = $2 AND at > $3',
        [actor, action, since],
      );
      return rows[0].n;
    },
    async listAudit(limit) {
      const { rows } = await q(
        'SELECT id, at, actor, action, taxpayer_id, detail FROM audit_log ORDER BY id DESC LIMIT $1',
        [limit],
      );
      return rows;
    },
  };
}

function memoryStore() {
  const users = new Map();
  const sessions = new Map();
  const taxpayers = new Map();
  const audit = [];
  let nextUserId = 1;
  let nextAuditId = 1;
  const dup = () => Object.assign(new Error('duplicate key'), { code: '23505' });

  return {
    _users: users,
    _audit: audit,
    addUser({ username, passwordHash, role }) {
      if (users.has(username)) throw dup();
      const user = { id: nextUserId++, username, password_hash: passwordHash, role, failed_logins: 0, locked_until: null };
      users.set(username, user);
      return user;
    },
    async findUserByUsername(username) {
      return users.get(username) || null;
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
      return u ? { id: u.id, username: u.username, role: u.role } : null;
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
      if (taxpayers.has(row.taxpayer_id)) throw dup();
      if ([...taxpayers.values()].some((t) => t.nid_blind_index === row.nid_blind_index)) throw dup();
      taxpayers.set(row.taxpayer_id, { ...row });
    },
    async insertAudit({ actor, action, taxpayerId = null, detail = null }) {
      audit.push({ id: nextAuditId++, at: new Date(), actor, action, taxpayer_id: taxpayerId, detail });
    },
    async countRecentAudit({ actor, action, since }) {
      return audit.filter((a) => a.actor === actor && a.action === action && a.at > since).length;
    },
    async listAudit(limit) {
      return audit.slice(-limit).reverse();
    },
  };
}

module.exports = { pgStore, memoryStore };
