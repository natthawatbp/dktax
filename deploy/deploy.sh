#!/usr/bin/env bash
# Sync the runtime bundle to a VPS and rebuild the container there.
#
# Required: VPS_HOST, VPS_USER, VPS_PATH (absolute, dedicated directory)
# Optional: SSH_KEY (path to private key), HOST_PORT (default 8080)
#
# Example:
#   VPS_HOST=203.0.113.10 VPS_USER=deploy VPS_PATH=/opt/dk-one-tax-bill \
#     SSH_KEY=~/.ssh/dk_deploy ./deploy/deploy.sh
set -euo pipefail

: "${VPS_HOST:?set VPS_HOST}"
: "${VPS_USER:?set VPS_USER}"
: "${VPS_PATH:?set VPS_PATH}"
HOST_PORT="${HOST_PORT:-8080}"

# Guard: --delete below must never run against the filesystem root or a relative path.
case "$VPS_PATH" in
  /|"") echo "VPS_PATH must be a dedicated directory, not '/'" >&2; exit 1 ;;
  /*) ;;
  *) echo "VPS_PATH must be absolute" >&2; exit 1 ;;
esac
[[ "$HOST_PORT" =~ ^[0-9]{2,5}$ ]] || { echo "HOST_PORT must be numeric" >&2; exit 1; }

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SSH_OPTS=(-o StrictHostKeyChecking=yes -o IdentitiesOnly=yes)
[[ -n "${SSH_KEY:-}" ]] && SSH_OPTS+=(-i "$SSH_KEY")
SSH_CMD="ssh ${SSH_OPTS[*]}"
TARGET="$VPS_USER@$VPS_HOST"

# Ship only what the image needs; never sync secrets, git metadata or design uploads.
rsync -az --delete -e "$SSH_CMD" \
  --include='Dockerfile' --include='docker-compose.yml' --include='.dockerignore' \
  --include='package.json' --include='package-lock.json' --include='server.js' --include='lib/***' \
  --include='public/' --include='public/***' \
  --include='db/***' --include='scripts/***' \
  --exclude='*' \
  "$ROOT"/ "$TARGET:$VPS_PATH/"

$SSH_CMD "$TARGET" bash -s -- "$VPS_PATH" "$HOST_PORT" <<'REMOTE'
set -euo pipefail
cd "$1"
export HOST_PORT="$2"
docker compose build --pull
docker compose up -d --force-recreate
docker compose ps
# Verify the running service answers and sends the security headers.
for _ in 1 2 3 4 5; do
  if curl -fsSI "http://127.0.0.1:${HOST_PORT}/" >/tmp/dk-headers.txt 2>/dev/null; then break; fi
  sleep 2
done
grep -qi '^content-security-policy:' /tmp/dk-headers.txt && grep -qi '^x-frame-options: DENY' /tmp/dk-headers.txt \
  && echo "OK: service responds with security headers" \
  || { echo "FAILED: security headers missing" >&2; exit 1; }
REMOTE
