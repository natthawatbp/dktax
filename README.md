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
docker compose up -d --build      # http://localhost:8080
```

## Deploy to VPS

Requires Docker + Compose and rsync on the VPS and SSH access from your machine.

```bash
VPS_HOST=203.0.113.10 VPS_USER=deploy VPS_PATH=/opt/dk-one-tax-bill HOST_PORT=8080 ./deploy/deploy.sh
```

## Not included

- Demo accounts in `data.js` (e.g. `admin/admin1234`) are for prototyping only. Do not expose this build as a production system without real authentication.
- The production back end referenced in the design notes (Google Apps Script + Google Sheets) is not part of this bundle.
- `uploads/` (design-session screenshots and a tax-roll spreadsheet with personal data) is deliberately excluded.
