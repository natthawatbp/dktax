#!/usr/bin/env bash
# Creates the secret files used by docker-compose. Never overwrites an existing file.
set -euo pipefail

DIR="$(cd "$(dirname "$0")/.." && pwd)/secrets"
mkdir -p "$DIR"
chmod 700 "$DIR"

for name in db_password db_app_password nid_kek_v1 nid_index_key; do
  f="$DIR/$name"
  if [[ -e "$f" ]]; then
    echo "exists, skipped: $name"
    continue
  fi
  (umask 077; openssl rand -hex 32 > "$f")
  # The web container runs as uid 1000 with all capabilities dropped, so it can only read
  # its own keys when they are owned by that uid. Database secrets are read by root in the
  # entrypoint and stay root-owned.
  case "$name" in
    nid_*)
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
