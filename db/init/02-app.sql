-- Users and server-side sessions. Passwords are stored only as scrypt hashes.
CREATE TABLE users (
  id            bigserial PRIMARY KEY,
  username      text NOT NULL UNIQUE CHECK (username ~ '^[a-z0-9_.-]{3,32}$'),
  password_hash text NOT NULL,
  role          text NOT NULL CHECK (role IN ('admin', 'revenue', 'finance', 'health', 'exec')),
  failed_logins integer NOT NULL DEFAULT 0,
  locked_until  timestamptz,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE sessions (
  token_hash text PRIMARY KEY CHECK (token_hash ~ '^[0-9a-f]{64}$'),
  user_id    bigint NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX sessions_expires_idx ON sessions (expires_at);

-- The app role reads users and updates only the lockout counters. It never creates users.
GRANT SELECT ON users TO dktax_app;
GRANT UPDATE (failed_logins, locked_until) ON users TO dktax_app;
GRANT SELECT, INSERT, DELETE ON sessions TO dktax_app;
