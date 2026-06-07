CREATE TABLE assets (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name               TEXT NOT NULL,
  category           TEXT NOT NULL,
  description        TEXT,
  total_quantity     INT NOT NULL DEFAULT 1 CHECK (total_quantity > 0),
  available_quantity INT NOT NULL DEFAULT 1 CHECK (available_quantity >= 0),
  status             TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'inactive', 'maintenance')),
  condition          TEXT DEFAULT 'good'
    CHECK (condition IN ('good', 'fair', 'damaged')),
  created_at         TIMESTAMPTZ DEFAULT NOW(),
  updated_at         TIMESTAMPTZ DEFAULT NOW()
);