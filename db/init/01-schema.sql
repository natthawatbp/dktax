-- Schema for national-ID storage. Plaintext national IDs never reach this database:
-- they are encrypted by lib/national-id-vault.js before insert.

REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT USAGE ON SCHEMA public TO dktax_app;

CREATE TABLE taxpayers (
  taxpayer_id     text PRIMARY KEY CHECK (taxpayer_id ~ '^[A-Za-z0-9_-]{1,64}$'),
  nid_key_version integer NOT NULL CHECK (nid_key_version > 0),
  nid_blind_index text NOT NULL UNIQUE CHECK (nid_blind_index ~ '^[0-9a-f]{64}$'),
  nid_wrapped_dek jsonb NOT NULL,
  nid_data        jsonb NOT NULL,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- Append-only audit trail. The app role can add and read, never change or delete.
CREATE TABLE audit_log (
  id          bigserial PRIMARY KEY,
  at          timestamptz NOT NULL DEFAULT now(),
  actor       text NOT NULL,
  action      text NOT NULL,
  taxpayer_id text,
  detail      text
);

CREATE FUNCTION audit_log_immutable() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  RAISE EXCEPTION 'audit_log is append-only';
END;
$$;

CREATE TRIGGER audit_log_no_change
  BEFORE UPDATE OR DELETE ON audit_log
  FOR EACH ROW EXECUTE FUNCTION audit_log_immutable();

GRANT SELECT, INSERT, UPDATE ON taxpayers TO dktax_app;
GRANT SELECT, INSERT ON audit_log TO dktax_app;
GRANT USAGE, SELECT ON SEQUENCE audit_log_id_seq TO dktax_app;
-- No DELETE on taxpayers: removal goes through a reviewed admin procedure.
