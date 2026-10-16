-- Least-privilege app account. Run as the owner after 01-schema.sql.
-- Host is '%' for Docker (00-app-user.sh creates the account). On Plesk, where the app connects
-- over localhost, create the account by hand and replace '%' with 'localhost' (docs/PLESK.md).
-- Replace dktax with the actual database name if it differs.

GRANT SELECT, INSERT, UPDATE ON dktax.taxpayers TO 'dktax_app'@'%';
-- Staff management needs INSERT on users (admins add staff through the web page).
GRANT SELECT, INSERT ON dktax.users TO 'dktax_app'@'%';
GRANT UPDATE (failed_logins, locked_until, password_hash, must_change_password, disabled,
              totp_secret, totp_enabled, totp_last_step) ON dktax.users TO 'dktax_app'@'%';
GRANT SELECT, INSERT, DELETE ON dktax.sessions TO 'dktax_app'@'%';
GRANT SELECT, INSERT ON dktax.audit_log TO 'dktax_app'@'%';
GRANT SELECT, INSERT ON dktax.password_reset_requests TO 'dktax_app'@'%';
GRANT UPDATE (closed) ON dktax.password_reset_requests TO 'dktax_app'@'%';
