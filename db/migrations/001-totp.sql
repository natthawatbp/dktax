-- Adds one-time-password (OTP) columns to an existing users table.
-- Safe to run more than once. Run as the database owner (in phpMyAdmin: SQL tab).
-- New installs already get these columns from db/init/01-schema.sql.
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS totp_secret TEXT NULL,
  ADD COLUMN IF NOT EXISTS totp_enabled TINYINT(1) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS totp_last_step BIGINT UNSIGNED NOT NULL DEFAULT 0;
