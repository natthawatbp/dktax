#!/bin/sh
# Docker first-run only (empty volume): creates the app account with the password from its secret.
# Runs before 01-schema.sql and 02-grants.sql. On Plesk, create the account in MariaDB by hand.
set -eu
pw="$(cat /run/secrets/db_app_password)"
# Only hex is accepted: the password is interpolated into SQL below.
case "$pw" in
  ""|*[!0-9a-fA-F]*) echo "db_app_password must be hex" >&2; exit 1 ;;
esac
mariadb -uroot -p"$(cat /run/secrets/db_root_password)" <<SQL
CREATE USER IF NOT EXISTS 'dktax_app'@'%' IDENTIFIED BY '$pw';
SQL
