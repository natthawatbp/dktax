#!/usr/bin/env bash
# Creates the secret files used by docker-compose. Never overwrites an existing file.
set -euo pipefail

DIR="$(cd "$(dirname "$0")/.." && pwd)/secrets"
mkdir -p "$DIR"
chmod 700 "$DIR"

for name in db_password db_root_password db_app_password nid_kek_v1 nid_index_key; do
  f="$DIR/$name"
  if [[ -e "$f" ]]; then
    echo "exists, skipped: $name"
    continue
  fi
  (umask 077; openssl rand -hex 32 > "$f")
  # The web and admin-cli containers run as uid 1000 with all capabilities dropped, so they can
  # only read these files when they are owned by that uid. db_app_password is read only by root
  # in the database init script and stays root-owned.
  case "$name" in
    db_password|nid_*)
      if [[ "$(id -u)" -eq 0 ]]; then
        chown 1000:1000 "$f"
      else
        echo "warning: run as root so $name can be owned by uid 1000 (web container)" >&2
      fi
      ;;
  esac
  chmod 0400 "$f"
  echo "created: $name"
done

echo
echo "Back up nid_kek_v1 and nid_index_key OFFLINE (not on the VPS). Losing nid_kek_v1 makes"
echo "encrypted national IDs unrecoverable. Losing nid_index_key breaks lookups."
