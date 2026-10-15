-- Adds the columns used for staff management: disabling an account and forcing a password change.
-- Safe to run more than once. Run as the database owner (in phpMyAdmin: SQL tab).
-- New installs already get these columns from db/init/01-schema.sql.
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS disabled TINYINT(1) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS must_change_password TINYINT(1) NOT NULL DEFAULT 0;
