#!/bin/sh
# Runs once, on first start of an empty data volume. Creates the least-privilege app role.
set -eu
pw="$(cat /run/secrets/db_app_password)"
# Only hex is accepted: the password is interpolated into SQL below.
case "$pw" in
  ""|*[!0-9a-fA-F]*) echo "db_app_password must be hex" >&2; exit 1 ;;
esac
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<SQL
CREATE ROLE dktax_app LOGIN PASSWORD '$pw' NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT;
SQL
