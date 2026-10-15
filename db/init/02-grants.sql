-- Least-privilege app account. Run as the owner after 01-schema.sql.
-- Host is '%' for Docker (00-app-user.sh creates the account). On Plesk, where the app connects
-- over localhost, create the account by hand and replace '%' with 'localhost' (docs/PLESK.md).
-- Replace dktax with the actual database name if it differs.

GRANT SELECT, INSERT, UPDATE ON dktax.taxpayers TO 'dktax_app'@'%';
GRANT SELECT ON dktax.users TO 'dktax_app'@'%';
GRANT UPDATE (failed_logins, locked_until) ON dktax.users TO 'dktax_app'@'%';
GRANT SELECT, INSERT, DELETE ON dktax.sessions TO 'dktax_app'@'%';
GRANT SELECT, INSERT ON dktax.audit_log TO 'dktax_app'@'%';
