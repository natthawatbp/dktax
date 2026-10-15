#!/usr/bin/env bash
# Sync this repo to the VPS and (re)build the container there.
# Usage: VPS_HOST=1.2.3.4 VPS_USER=deploy VPS_PATH=/opt/dk-one-tax-bill ./deploy/deploy.sh
set -euo pipefail

: "${VPS_HOST:?set VPS_HOST}"
: "${VPS_USER:?set VPS_USER}"
: "${VPS_PATH:?set VPS_PATH}"
HOST_PORT="${HOST_PORT:-8080}"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

rsync -az --delete \
  --exclude '.git' --exclude 'deploy/.env' --exclude '.env' \
  "$ROOT"/ "$VPS_USER@$VPS_HOST:$VPS_PATH/"

ssh "$VPS_USER@$VPS_HOST" "cd '$VPS_PATH' && HOST_PORT='$HOST_PORT' docker compose up -d --build && docker compose ps"
