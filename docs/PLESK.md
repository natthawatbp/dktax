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

## 8b. First admin through the web page (no SSH needed)

Use this only once, right after the database is set up. Each step is a single action.

1. **Make a setup code.** Plesk → Node.js → tab **Run Node.js commands**. Run:
   `node -e "console.log(require('crypto').randomBytes(24).toString('hex'))"`
   Copy the output. This is the setup code. Do not share it.
2. **Add the setup code to Plesk.** Node.js → Custom environment variables → add `SETUP_TOKEN` with the setup code → **Restart App**.
3. **Allow the app account to add a user, temporarily.** Open phpMyAdmin for `donkaew_dktax`, go to the **SQL** tab, run:
   `GRANT INSERT ON donkaew_dktax.users TO 'donkaew_dktax_app'@'%';`
   If you see an error about permissions, stop here and ask the hosting provider to run this line.
4. **Create the admin.** Open `https://onetaxbill.donkaew.com/setup.html`, enter the setup code, a username, and a password of at least 12 characters. You should see "สร้างผู้ดูแลระบบสำเร็จ".
5. **Take the permission back.** In phpMyAdmin, run:
   `REVOKE INSERT ON donkaew_dktax.users FROM 'donkaew_dktax_app'@'%';`
6. **Remove the setup code.** Delete `SETUP_TOKEN` from Plesk → **Restart App**. The setup page stops working by itself once an admin exists.
7. **Test the login.** Open `https://onetaxbill.donkaew.com/login.html` and sign in with the new admin.

After this, all other staff accounts must be created by an admin with a process still to be built. Until then, the only account that can be added is the admin set up above.

## 8c. Turn on OTP (one-time codes) for everyone

OTP is on by default. Every account must set up an authenticator app before it can use the system. To switch it off for testing only, set `MFA_REQUIRED` to `0`.

**For a database that already exists (the one you created before OTP was added):**
1. Plesk → Databases → `donkaew_dktax` → phpMyAdmin → **SQL** tab.
2. Paste the contents of `db/migrations/001-totp.sql` and press **Go**. It is safe to run twice.
3. Upload the new files into `dk-one-tax-bill`, press **NPM install**, then **Restart App**.

**What each person does the first time they sign in:**
1. Sign in at `/login.html` with the username and password.
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

**What an admin can do on `/login.html`, in the section "จัดการเจ้าหน้าที่":**
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

## 9. Security checklist
- Plesk: enable HSTS for the domain (SSL/TLS settings).
- Keep MariaDB bound to localhost. Do not open port 3306 in the firewall.
- Store the two keys offline before the first real data is entered.
- Keep the Plesk admin account separate from day-to-day staff accounts.

## Not yet done
- The front-end still uses the old mock login and does not call `/api`. Until it does, the public login screen cannot be used.
- Database connections are plaintext on localhost. That is acceptable only while MariaDB is on the same host.
