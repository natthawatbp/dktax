# Deploy on Plesk (Node.js extension)

Plesk runs `server.js` as a Node.js application behind its own nginx, which terminates TLS. No Docker is needed.

## 1. Prerequisites in Plesk
- Node.js extension installed, version **22** selected for the domain.
- PostgreSQL 16 available (Plesk database server, or `apt install postgresql-16` on the server).
- Let's Encrypt enabled for the domain (Plesk: SSL/TLS Certificates).

## 2. Upload the app
Upload the release archive to the domain's app folder, for example `/var/www/vhosts/<domain>/dk-one-tax-bill`, and extract it there. Keep the folder outside `httpdocs` if possible. The server only serves `public/`, but nothing else should be reachable either.

## 3. Node.js settings (Plesk → Node.js)
| Setting | Value |
|---|---|
| Application mode | production |
| Application root | the folder above |
| Application startup file | `server.js` |
| Node.js version | 22 |

Click **NPM install**. It installs the exact versions from `package-lock.json`.

## 4. Environment variables (Plesk → Node.js → Custom environment variables)
| Name | Value |
|---|---|
| `NODE_ENV` | `production` |
| `TRUST_PROXY` | `1` (Plesk's nginx sets `X-Forwarded-For`) |
| `DB_HOST` | `localhost` |
| `DB_PORT` | `5432` |
| `DB_NAME` | `dktax` |
| `DB_USER` | `dktax_app` |
| `DB_PASSWORD` | the `dktax_app` password |
| `DB_SSL` | `require` only if the database is remote and has TLS |
| `NID_KEK_V1` | 64 hex chars, see step 5 |
| `NID_INDEX_KEY` | 64 hex chars, see step 5 |

Plesk does not provide Docker secret files, so these are plain environment variables. Anyone with Plesk admin access can read them. Limit Plesk access accordingly.

Plesk sets `PORT` itself. Do not set it manually.

## 5. Keys (generate once, store offline)
```bash
openssl rand -hex 32   # NID_KEK_V1
openssl rand -hex 32   # NID_INDEX_KEY
```
Copy both values to offline storage before setting them in Plesk. Losing `NID_KEK_V1` makes every stored national ID unrecoverable. Losing `NID_INDEX_KEY` breaks lookups. Never change either value on a database that already holds data.

## 6. Database (run once, as the database owner)
Create the database `dktax` in Plesk, then in a `psql` session connected to it:
```sql
CREATE ROLE dktax_app LOGIN PASSWORD '<same as DB_PASSWORD>' NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT;
```
Then apply the schema from the app folder, in order:
```bash
psql "postgres://<owner>@localhost/dktax" -v ON_ERROR_STOP=1 -f db/init/01-schema.sql
psql "postgres://<owner>@localhost/dktax" -v ON_ERROR_STOP=1 -f db/init/02-app.sql
```
Do not run `db/init/00-roles.sh` on Plesk. It reads Docker secrets. The `CREATE ROLE` above replaces it.

## 7. First admin
Enter the owner password without it appearing in shell history:
```bash
cd /var/www/vhosts/<domain>/dk-one-tax-bill
read -rs OWNER_PW && printf '%s' "$OWNER_PW" | DB_HOST=localhost DB_NAME=dktax DB_USER=<owner> DB_PASSWORD="$OWNER_PW" node scripts/create-admin.js admin admin
unset OWNER_PW
```
Use a password of at least 12 characters.

## 8. Start and check
Plesk → Node.js → **Restart App**. Then:
- `https://<domain>/` loads the front-end.
- `https://<domain>/api/me` returns 401 (no session yet). That means the API is running.
- Log in through the API with the admin account. The response should set a `__Host-dk_sid` cookie.

## 9. Security checklist
- Plesk: enable HSTS for the domain (SSL/TLS settings).
- Keep PostgreSQL bound to localhost. Do not open port 5432 in the firewall.
- Store the two keys offline before the first real data is entered.
- Keep the Plesk admin account separate from day-to-day staff accounts.

## Not yet done
- The front-end still uses the old mock login and does not call `/api`. Until it does, the public login screen cannot be used.
- Database connections are plaintext on localhost. That is acceptable only while Postgres is on the same host.
