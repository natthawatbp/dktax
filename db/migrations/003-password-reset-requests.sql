-- Forgot-password requests. An admin sees them and sets a temporary password.
-- Safe to run more than once. Run as the database owner (phpMyAdmin: SQL tab).
CREATE TABLE IF NOT EXISTS password_reset_requests (
  id           BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id      BIGINT UNSIGNED NOT NULL,
  requested_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  closed       TINYINT(1) NOT NULL DEFAULT 0,
  INDEX reset_user_idx (user_id, closed),
  CONSTRAINT reset_user_fk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
