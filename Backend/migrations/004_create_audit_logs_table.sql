CREATE TABLE audit_logs (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_enrollment_no VARCHAR(20) REFERENCES users(enrollment_no),
  action              TEXT NOT NULL,
  entity_type         TEXT NOT NULL,
  entity_id           UUID,
  payload             JSONB,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);