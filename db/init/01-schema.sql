-- MariaDB 10.5+ schema for DK One Tax Bill. Run as the database owner, never as the app user.
-- Plaintext national IDs never reach this database: lib/national-id-vault.js encrypts them first.

CREATE TABLE IF NOT EXISTS taxpayers (
  taxpayer_id     VARCHAR(64) NOT NULL PRIMARY KEY,
  nid_key_version INT NOT NULL,
  nid_blind_index CHAR(64) NOT NULL UNIQUE,
  nid_wrapped_dek LONGTEXT NOT NULL CHECK (JSON_VALID(nid_wrapped_dek)),
  nid_data        LONGTEXT NOT NULL CHECK (JSON_VALID(nid_data)),
  created_at      DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  CONSTRAINT taxpayer_id_format CHECK (taxpayer_id REGEXP '^[A-Za-z0-9_-]{1,64}$'),
  CONSTRAINT nid_blind_index_format CHECK (nid_blind_index REGEXP '^[0-9a-f]{64}$'),
  CONSTRAINT nid_key_version_positive CHECK (nid_key_version > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS users (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username      VARCHAR(32) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role          ENUM('admin', 'revenue', 'finance', 'health', 'exec') NOT NULL,
  failed_logins INT NOT NULL DEFAULT 0,
  locked_until  DATETIME(3) NULL,
  totp_secret   TEXT NULL,
  totp_enabled  TINYINT(1) NOT NULL DEFAULT 0,
  totp_last_step BIGINT UNSIGNED NOT NULL DEFAULT 0,
  disabled      TINYINT(1) NOT NULL DEFAULT 0,
  must_change_password TINYINT(1) NOT NULL DEFAULT 0,
  created_at    DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  CONSTRAINT username_format CHECK (username REGEXP '^[a-z0-9_.-]{3,32}$')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS sessions (
  token_hash CHAR(64) NOT NULL PRIMARY KEY,
  user_id    BIGINT UNSIGNED NOT NULL,
  expires_at DATETIME(3) NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  INDEX sessions_expires_idx (expires_at),
  CONSTRAINT sessions_user_fk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  CONSTRAINT token_hash_format CHECK (token_hash REGEXP '^[0-9a-f]{64}$')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Append-only audit trail. The app user can INSERT and SELECT only. The triggers also block
-- UPDATE and DELETE for any account that is granted them by mistake.
CREATE TABLE IF NOT EXISTS audit_log (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  at          DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  actor       VARCHAR(64) NOT NULL,
  action      VARCHAR(32) NOT NULL,
  taxpayer_id VARCHAR(64) NULL,
  detail      VARCHAR(255) NULL,
  INDEX audit_actor_action_idx (actor, action, at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DELIMITER //
CREATE TRIGGER audit_log_no_update BEFORE UPDATE ON audit_log FOR EACH ROW
BEGIN
  SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'audit_log is append-only';
END//
CREATE TRIGGER audit_log_no_delete BEFORE DELETE ON audit_log FOR EACH ROW
BEGIN
  SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'audit_log is append-only';
END//
DELIMITER ;
