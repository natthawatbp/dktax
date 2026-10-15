# DK One Tax Bill

ระบบรวมใบแจ้งภาระภาษีและค่าธรรมเนียม — เทศบาลเมืองดอนแก้ว

Static front-end (React UMD + Babel standalone, design system) served by a hardened Node.js server.
Entry point: `public/Index.html` (self-contained bundle).

## Layout

- `server.js`, `package.json` — Node.js server (built-ins only, no npm dependencies)
- `public/` — runtime bundle served to browsers (`Index.html`, `_ds_bundle.js`, `styles.css`, `tokens/`, `fonts/`, `assets/`)
- `Dockerfile`, `docker-compose.yml`, `.dockerignore` — container build (allowlist: only `package.json`, `server.js`, `public/` go into the image)
- `deploy/deploy.sh` — sync to VPS and rebuild the container over SSH
- `components/`, `guidelines/`, `ui_kits/`, `readme.md`, `SKILL.md` — design-source material, not served

## Data storage

There is **no server-side database** in this bundle. The sample data (demo accounts, taxpayers, licences, history, notifications, transactions, registrants) has been **cleared** from `ui_kits/web-app/data.js` and from the deployed `public/Index.html`.

**Consequence:** the account list is empty, so nobody can log in yet. Accounts must be added in code or by a real back-end before the app is usable.
The only persisted state is in each browser's `localStorage`:

| Key           | Purpose                    |
|---------------|----------------------------|
| `dk_user`     | logged-in session          |
| `dk_settings` | payment / LINE OA settings |
| `dk_page`     | last visited page          |

Clearing these keys (or the site data for the domain) resets the app for that browser. This does not clear anything on the server.

## Run locally

```bash
npm start                          # http://127.0.0.1:8080  (Node.js >= 22)
# or
docker compose up -d --build       # http://127.0.0.1:8080
```

## Deploy to VPS

Requires Docker + Compose and rsync on the VPS, and an SSH key for `VPS_USER`. The host key must already be in `~/.ssh/known_hosts` (the script uses `StrictHostKeyChecking=yes`).

```bash
VPS_HOST=203.0.113.10 VPS_USER=deploy VPS_PATH=/opt/dk-one-tax-bill \
  SSH_KEY=~/.ssh/dk_deploy ./deploy/deploy.sh
```

The container listens only on `127.0.0.1:8080` on the VPS. Put a TLS reverse proxy in front of it (for example Caddy or nginx) and send only HTTPS traffic to the public internet. Add `Strict-Transport-Security` at the proxy, since this container serves plain HTTP. The proxy must overwrite `X-Forwarded-For`; the compose file sets `TRUST_PROXY=1` for that.

## Security model

Hardening in this build:

- Node.js server with **no npm dependencies** (only `node:http`, `node:fs`, `node:path`). Runs as the unprivileged `node` user in a pinned `node:22-alpine` image, with read-only root filesystem, all Linux capabilities dropped, `no-new-privileges`, memory and PID limits, and `init` for signal handling.
- Only files under `public/` with whitelisted extensions (`.html .css .js .png .jpg .svg .woff2`) are served. Path traversal, encoded traversal, null bytes, dotfiles, and `components|guidelines|ui_kits|uploads|deploy` are rejected with 404.
- Only `GET` and `HEAD` are accepted; others return 405. Requests are rate-limited per client (50/s, 429 beyond that) with bounded memory. Request and header timeouts are set.
- Content-Security-Policy restricts scripts, styles, fonts and images to known origins, blocks framing (`frame-ancestors 'none'`), restricts forms to same origin, and disables plugins.
- `X-Frame-Options: DENY`, `nosniff`, `no-referrer`, a restrictive `Permissions-Policy`, same-origin COOP/CORP, and `X-Robots-Tag: noindex`. No `X-Powered-By` header.
- `index.html` is revalidated on every request; fonts, images, CSS and JS are cached for one day.
- Verified: route and header checks against the running server, and the app loads in headless Chromium under the shipped CSP with zero violations.

Known limits (not fixable in a static bundle):

- **Authentication is client-side only.** The account list is empty, and the login check runs in the browser, so any account added to the bundle is readable by anyone who loads the page. Do not put real taxpayer data behind this build until a server-side auth backend exists.
- `script-src` and `style-src` allow `'unsafe-inline'` because the bundled app and React style props need it. This weakens XSS protection; removing it requires a rebuilt bundle with hashed or external scripts.
- `ui_kits/web-app/promptpay.js` builds the payment QR by sending the PromptPay payload (tax ID, amount, reference) to `api.qrserver.com`. That is a third-party disclosure of payment data. The CSP blocks that image in the browser, so QR display will not work until QR generation is moved to a local library. The deployed `public/Index.html` does not appear to call that host.
- The rate limiter is per process and in memory. Under a real load balancer, rate limiting belongs at the reverse proxy as well.
- CDN scripts are pinned with Subresource Integrity, but Bootstrap and Font Awesome CSS are not.
- Docker build and the container itself are not verified in the environment where this was written (no Docker daemon there). The server was verified directly with Node.

## National ID handling (`lib/national-id-vault.js`)

Field-level encryption module for เลขประจำตัวประชาชน. It is a building block only: nothing in the server or the UI calls it yet, and no database exists in this repo.

- AES-256-GCM per record, with a random DEK wrapped by a versioned KEK. Ciphertext is bound to the taxpayer id and key version through AAD, so moving or altering a row fails authentication.
- Lookups use `HMAC-SHA256` with a separate index key (blind index), never a plain hash.
- `mask()` shows only the last four digits. `toStorable()` / `fromStorable()` give plain strings for DB columns.
- Keys are passed in by the caller. The module does not read environment variables or files. Keys must come from a KMS, Vault or Docker secrets.
- Tests: `npm test` (18 tests covering tampering, row swaps, wrong keys, rotation, and plaintext absence).

**Before production:** the check-digit algorithm (mod 11) is the standard published one, but verify it against real records held by the municipality. Do not rely on a sample ID from memory.

## Database (PostgreSQL 16 in compose)

`docker-compose.yml` runs `db` on an internal-only network (no route out, no published port). The `web` service joins that network too.

First-time setup on the host (run as root so the nid keys can be owned by the web user):

```bash
./scripts/gen-secrets.sh          # creates ./secrets/* (never overwrites)
# Copy nid_kek_v1 and nid_index_key OFFLINE. Losing nid_kek_v1 makes stored national IDs unrecoverable.
docker compose up -d --build
```

- `db/init/` runs only on the first start of an empty volume. Changing the schema later needs a migration, not an edit to these files.
- The app role `dktax_app` can read and write `taxpayers`, and can only insert into `audit_log`. A trigger blocks updates and deletes on `audit_log`.
- Secrets are file-based (`/run/secrets/*`), not environment variables, so they do not show in `docker inspect`.

**Not done yet:**
- DB traffic is plaintext inside the internal Docker network. Enabling Postgres TLS is a follow-up.
- `read_only` on the database container and the capability list were written from the official image's documentation but not run. Confirm with `docker compose up` on the VPS before relying on them.
- `secrets/` lives on the VPS disk. Use a secret manager or KMS when one is available.

## API

Enabled when `DB_HOST` is set. Without it, `/api/*` returns 404 and the static site still works.

| Method & path | Roles | What it does |
|---|---|---|
| `POST /api/login` | anyone | Starts a session. Sets `__Host-dk_sid` (HttpOnly, Secure, SameSite=Strict). Locks the account for 15 minutes after 5 failures. |
| `POST /api/logout` | any session | Deletes the session. |
| `GET /api/me` | any session | Current user and role. |
| `POST /api/taxpayers` | admin, revenue | Registers a taxpayer. Body: `{taxpayer_id, national_id}`. Returns only the masked ID. |
| `POST /api/taxpayers/lookup` | admin, revenue, finance | Finds a taxpayer by national ID through the blind index. Returns the masked ID. |
| `GET /api/taxpayers/:id` | admin, revenue, finance, health, exec | Returns the masked ID. Decrypts internally and audits the view. |
| `POST /api/taxpayers/:id/reveal` | admin | Returns the full ID. Requires `{reason}` of 10 to 200 characters. Limited to 10 per hour. Audited. |
| `GET /api/audit?limit=` | admin | Recent audit rows. |

Rules that apply to every route:
- Roles are checked on the server. The UI is not trusted.
- Writes require `Content-Type: application/json`. Together with `SameSite=Strict`, this blocks cross-site form posts.
- Errors return a short code (`invalid_credentials`, `forbidden`, ...) with no internal detail.
- National IDs never appear in logs, audit rows or error messages.

### Creating users

Users are created by an admin with the owner credentials, and the password is read from stdin:

```bash
docker compose build
printf '%s' "$PASSWORD" | docker compose run --rm -T admin-cli scripts/create-admin.js revenue1 revenue
```

The web service has no access to the owner credentials.

## Tests

```bash
npm test                                   # unit tests, no database needed
TEST_ADMIN_URL=postgres://dktax_admin:...@host/dktax_test \
TEST_APP_URL=postgres://dktax_app:...@host/dktax_test npm test   # adds real-PostgreSQL tests
```

The integration tests need a database with `db/init/01-schema.sql` and `02-app.sql` applied. They truncate tables, so use a test database only. They were run locally against PostgreSQL 16.15.

## Dependencies

The only runtime dependency is `pg` (PostgreSQL driver), pinned to 8.13.1 with a lock file. Everything else uses Node.js built-ins.
