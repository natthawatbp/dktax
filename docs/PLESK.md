# Deploy on Plesk (Node.js extension)

Plesk runs `server.js` as a Node.js application behind its own nginx, which terminates TLS. No Docker is needed.

## 1. Prerequisites in Plesk
- Node.js extension installed, version **22** selected for the domain.
- MariaDB 10.5 or newer, which is what Plesk provides for the domain's Databases section.
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
| `DB_PORT` | `3306` |
| `DB_NAME` | `donkaew_dktax` |
| `DB_USER` | `dktax_app` |
| `DB_PASSWORD` | the `dktax_app` password |
| `DB_SSL` | `require` only if the database is remote and has TLS. Leave it unset for localhost |
| `NID_KEK_V1` | 64 hex chars, see step 5 |
| `NID_INDEX_KEY` | 64 hex chars, see step 5 |
| `ADMIN_INITIAL_PASSWORD` | only for the first start, see section 8b. Remove it after the first sign-in |

Plesk does not provide Docker secret files, so these are plain environment variables. Anyone with Plesk admin access can read them. Limit Plesk access accordingly.

Plesk sets `PORT` itself. Do not set it manually.

## 5. Keys (generate once, store offline)
```bash
openssl rand -hex 32   # NID_KEK_V1
openssl rand -hex 32   # NID_INDEX_KEY
```
Copy both values to offline storage before setting them in Plesk. Losing `NID_KEK_V1` makes every stored national ID unrecoverable. Losing `NID_INDEX_KEY` breaks lookups. Never change either value on a database that already holds data.

## 6. Database (MariaDB)
1. Plesk → **Databases** → **Add Database**. Name: `donkaew_dktax` (do **not** reuse `donkaew_envhealth`, which belongs to another system). Database server: MariaDB.
2. Plesk creates a database user with the same prefix. Note its name and set its password to the `DB_PASSWORD` value. Put the **same** user name in `DB_USER`.
3. Open **phpMyAdmin** for that database (Plesk → Databases → Open in phpMyAdmin) and run the schema from the app folder. Copy the file contents into the SQL tab, or upload it with Import:
   - `db/init/01-schema.sql` (tables and triggers)
4. Create the least-privilege app account, then run the grants. Use the database owner account from step 2 only for this step, not for the app:
   ```sql
   CREATE USER 'dktax_app'@'localhost' IDENTIFIED BY '<DB_PASSWORD>';
   ```
   Then run `db/init/02-grants.sql` after replacing `'%'` with `'localhost'` and `dktax.` with `donkaew_dktax.` (Plesk's database name). Use the same `DB_USER` value as above for the app account. If Plesk's owner account cannot run `CREATE USER`, ask the hosting provider to create it.

Note: `DB_USER` must be `dktax_app` if you create it with the SQL above. If Plesk created the app user instead, use that name in `DB_USER` and change the grants to match.

## 7. First admin
Enter the owner password without it appearing in shell history:
```bash
cd /var/www/vhosts/<domain>/dk-one-tax-bill
read -rs OWNER_PW && printf '%s' "$OWNER_PW" | DB_HOST=localhost DB_NAME=donkaew_dktax DB_USER=<owner> DB_PASSWORD="$OWNER_PW" node scripts/create-admin.js admin admin
unset OWNER_PW
```
Use a password of at least 12 characters.

## 8. Start and check
Plesk → Node.js → **Restart App**. Then:
- `https://<domain>/` loads the front-end.
- `https://<domain>/api/me` returns 401 (no session yet). That means the API is running.
- Log in through the API with the admin account. The response should set a `__Host-dk_sid` cookie.

## 8b. First admin (no setup page, no commands)

The system creates the first admin by itself the first time it starts with an empty user list. You only choose a temporary password. The admin must replace it right after the first sign-in.

1. Choose a temporary password of at least 12 characters. It is used once. Do not reuse a real password.
2. Plesk → Node.js → **Custom environment variables** → add:
   - `ADMIN_INITIAL_PASSWORD` = the temporary password
   - `ADMIN_USERNAME` = the name for the first admin (optional; the default is `admin`)
3. Press **Restart App**. The first admin is created now. (The database tables must already exist, see section 6.)
4. Open `https://onetaxbill.donkaew.com/` and sign in with that username and the temporary password.
5. The page asks for a new password. Choose your own (at least 12 characters). You are signed out; sign in again with the new password.
6. The page asks you to set up OTP. Follow section 8c.
7. **Remove `ADMIN_INITIAL_PASSWORD` from Plesk** and press **Restart App**. If you forget, nothing breaks: it is ignored once any user exists. But the temporary password should not stay in Plesk.

The Node.js log shows one line, `Created the first admin ...`, and never prints the password. If instead it says the password must be 12-128 characters, fix the variable and restart.

**If you lose all access** (for example the only admin forgets the password and the phone): in phpMyAdmin → SQL tab run `DELETE FROM sessions; DELETE FROM users;` and then repeat steps 1 to 7. This removes every staff account (they must be added again) but does not touch taxpayer data or the audit log.

## 8c. Turn on OTP (one-time codes) for everyone

OTP is on by default. Every account must set up an authenticator app before it can use the system. To switch it off for testing only, set `MFA_REQUIRED` to `0`.

**For a database that already exists (the one you created before OTP was added):**
1. Plesk → Databases → `donkaew_dktax` → phpMyAdmin → **SQL** tab.
2. Paste the contents of `db/migrations/001-totp.sql` and press **Go**. It is safe to run twice.
3. Upload the new files into `dk-one-tax-bill`, press **NPM install**, then **Restart App**.

**What each person does the first time they sign in:**
1. Sign in at the front page `/` with the username and password.
2. The page asks for OTP setup. Press **เริ่มตั้งค่า**.
3. On the phone, open Google Authenticator or Microsoft Authenticator → add an account → enter a setup key. Type the key shown on the page.
4. Type the 6-digit code the app shows, and press confirm.
5. From then on, every sign-in asks for the password and then a 6-digit code.

**If the only admin loses the phone:** in phpMyAdmin (SQL tab) run
`UPDATE users SET totp_secret = NULL, totp_enabled = 0, totp_last_step = 0 WHERE username = 'admin';`
(change `admin` to the right username). The admin signs in with the password and sets up OTP again.

**If another staff member loses the phone:** an admin signs in and uses **รีเซ็ต OTP ของเจ้าหน้าที่** on the login page.

## 8d. Add and manage staff from the web page

**One-time database update (existing databases only):** in phpMyAdmin → SQL tab, run `db/migrations/002-user-management.sql`. It is safe to run twice.

**What an admin can do on the front page `/`, in the section "จัดการเจ้าหน้าที่":**
- **Add a staff member:** username, role, and a temporary password of at least 12 characters. Tell the person the temporary password directly (in person or by phone), never in a public chat.
- **See the list:** shows each person's role, whether OTP is on, and whether they still have a temporary password. It never shows passwords.
- **Close an account:** the person is signed out at once and cannot sign in again. Use this when someone leaves. An admin cannot close their own account.
- **Open an account again.**
- **Set a new temporary password:** for someone who forgot theirs. Every device of that person is signed out.

**What the new staff member does on first sign-in:**
1. Sign in with the username and the temporary password.
2. The page asks for a new password. Choose one of at least 12 characters. They are signed out and sign in again with it.
3. The page asks to set up OTP. Follow the steps in section 8c.

**Database permission:** the app account now needs `INSERT` on `users` permanently (it can no longer be taken back after the first admin), and `UPDATE` on the columns `password_hash`, `must_change_password` and `disabled`. It never needs to change `role`. On Plesk the account already has full rights; the lines in `db/init/02-grants.sql` are what to ask the hosting provider to apply when you restrict it.

## 8e. Forgot password

On the front page, a person who forgot the password presses **ลืมรหัสผ่าน?**, types the username and sends the request. The page always answers the same way, whether the username exists or not, so it cannot be used to find out who has an account.

There is no email or SMS in this system. The request appears in the admin's section **คำขอรีเซ็ตรหัสผ่าน**:
1. The admin presses **แสดงคำขอ** and sees who asked.
2. Press **ตั้งรหัสชั่วคราว** next to the name. The name is filled into the form below.
3. Type a temporary password (at least 12 characters) and press the button. The request closes.
4. The admin tells the person the temporary password directly (in person or by phone). Check that it really is that person before giving it.
5. The person signs in with it and must choose their own password. Their OTP is not reset; if they also lost the phone, use **รีเซ็ต OTP ของเจ้าหน้าที่** as well.

**Database update (existing databases only):** in phpMyAdmin → SQL tab run `db/migrations/003-password-reset-requests.sql`. It is safe to run twice. Run 001 and 002 first if they were never run.

If the only admin forgets the password, nobody can approve their own request. Use the recovery steps at the end of section 8b.

## 9. Security checklist
- Plesk: enable HSTS for the domain (SSL/TLS settings).
- Keep MariaDB bound to localhost. Do not open port 3306 in the firewall.
- Store the two keys offline before the first real data is entered.
- Keep the Plesk admin account separate from day-to-day staff accounts.

## Not yet done
- The front-end still uses the old mock login and does not call `/api`. Until it does, the public login screen cannot be used.
- Database connections are plaintext on localhost. That is acceptable only while MariaDB is on the same host.
