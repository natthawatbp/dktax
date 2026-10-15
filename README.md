# DK One Tax Bill

ระบบรวมใบแจ้งภาระภาษีและค่าธรรมเนียม — เทศบาลเมืองดอนแก้ว

Static front-end (React UMD + Babel standalone, Bootstrap-style design system) served by nginx.
Entry point: `Index.html` (self-contained bundle). Open `ui_kits/web-app/index.html` for the source-form UI kit.

## Data storage

There is **no server-side database** in this bundle. Mock taxpayer data lives in the page (`ui_kits/web-app/data.js`).
The only persisted state is in each browser's `localStorage`:

| Key          | Purpose                          |
|--------------|----------------------------------|
| `dk_user`    | logged-in session                |
| `dk_settings`| payment / LINE OA settings       |
| `dk_page`    | last visited page                |

Clearing these keys (or the site data for the domain) resets the app for that browser.

## Run locally

```bash
docker compose up -d --build      # http://127.0.0.1:8080
```

## Deploy to VPS

Requires Docker + Compose and rsync on the VPS, and an SSH key for `VPS_USER`. The host key must already be in `~/.ssh/known_hosts` (the script uses `StrictHostKeyChecking=yes`).

```bash
VPS_HOST=203.0.113.10 VPS_USER=deploy VPS_PATH=/opt/dk-one-tax-bill \
  SSH_KEY=~/.ssh/dk_deploy ./deploy/deploy.sh
```

The container listens only on `127.0.0.1:8080` on the VPS. Put a TLS reverse proxy in front of it (for example Caddy or nginx) and send only HTTPS traffic to the public internet. Add `Strict-Transport-Security` at the proxy, since this container serves plain HTTP.

## Security model

Hardening in this build:

- Non-root nginx (`nginx-unprivileged`), pinned base image, read-only root filesystem, all Linux capabilities dropped, `no-new-privileges`, memory and PID limits.
- Only `Index.html` and the runtime assets are in the image. Source, docs, the design `uploads/` folder and `support.js` are excluded.
- Only `GET` and `HEAD` are served; everything else returns 405. Dotfiles and source or doc files return 404. Directory listing is off.
- Content-Security-Policy restricts scripts, styles, fonts and images to known origins, blocks framing (`frame-ancestors 'none'`) and forms to other origins, and disables plugins.
- `X-Frame-Options: DENY`, `nosniff`, `no-referrer`, a restrictive `Permissions-Policy`, same-origin COOP/CORP, and `X-Robots-Tag: noindex`.
- The shipped CSP was checked in headless Chromium: the app renders with zero CSP violations.

Known limits (not fixable in a static bundle):

- **Authentication is client-side mock data.** `admin/admin1234` and the other demo accounts are in the shipped JavaScript. Anyone can read them and access the UI. Do not put real taxpayer data behind this build until a server-side auth backend exists.
- `script-src` and `style-src` allow `'unsafe-inline'` because the bundled app and React style props need it. This weakens XSS protection; removing it requires a rebuilt bundle with hashed or external scripts.
- `ui_kits/web-app/promptpay.js` builds the payment QR by sending the PromptPay payload (tax ID, amount, reference) to `api.qrserver.com`. That is a third-party disclosure of payment data. The CSP blocks that image in the browser, so QR display will not work until QR generation is moved to a local library. The deployed `Index.html` does not appear to call that host.
- CDN scripts are pinned with Subresource Integrity, but Bootstrap and Font Awesome CSS are not.

## Not included

- Demo accounts in `data.js` (e.g. `admin/admin1234`) are for prototyping only. Do not expose this build as a production system without real authentication.
- The production back end referenced in the design notes (Google Apps Script + Google Sheets) is not part of this bundle.
- `uploads/` (design-session screenshots and a tax-roll spreadsheet with personal data) is deliberately excluded.
