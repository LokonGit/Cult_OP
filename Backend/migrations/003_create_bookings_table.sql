CREATE TABLE bookings (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_no   VARCHAR(20) NOT NULL REFERENCES users(enrollment_no),
  asset_id        UUID NOT NULL REFERENCES assets(id),
  quantity        INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
  status          TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','approved','rejected','issued','returned','overdue')),
  requested_from  DATE NOT NULL,
  requested_until DATE NOT NULL,
  issued_at       TIMESTAMPTZ,
  returned_at     TIMESTAMPTZ,
  due_date        DATE,
  admin_note      TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);