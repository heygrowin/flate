-- ==========================================================
-- OUR HOME (CASA NOSTRA) - SUPABASE DATABASE SCHEMA
-- For Shared Student Flat in Messina, Italy
-- ==========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Roommates Table
CREATE TABLE IF NOT EXISTS roommates (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  name TEXT NOT NULL,
  room TEXT,
  joined_at DATE NOT NULL DEFAULT CURRENT_DATE,
  active BOOLEAN NOT NULL DEFAULT true,
  avatar_color TEXT DEFAULT '#3D664B',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Cleaning Turns (Current & Scheduled weekly turns)
CREATE TABLE IF NOT EXISTS cleaning_turns (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  roommate_id TEXT REFERENCES roommates(id) ON DELETE SET NULL,
  roommate_name TEXT NOT NULL,
  week_start DATE NOT NULL,
  week_end DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending' | 'completed' | 'overdue'
  completed_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Cleaning History (Completed turns with timestamp)
CREATE TABLE IF NOT EXISTS cleaning_history (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  roommate_id TEXT REFERENCES roommates(id) ON DELETE SET NULL,
  roommate_name TEXT NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  turn_week_start DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for efficient date filtering on history
CREATE INDEX IF NOT EXISTS idx_cleaning_history_completed_at ON cleaning_history(completed_at);

-- 4. House Information
CREATE TABLE IF NOT EXISTS house_information (
  id TEXT PRIMARY KEY DEFAULT 'main_house',
  wifi_network TEXT DEFAULT 'CasaNostra_Messina_5G',
  wifi_password TEXT DEFAULT 'home-sweet-home-98122',
  address TEXT DEFAULT 'Via Giuseppe Garibaldi 142, 98122 Messina ME, Italy',
  building_floor TEXT DEFAULT 'Piano 3, Interno 6',
  intercom_name TEXT DEFAULT 'Appartamento Studenti',
  google_maps_url TEXT DEFAULT 'https://maps.google.com/?q=Via+Giuseppe+Garibaldi+142+Messina',
  quiet_hours TEXT DEFAULT '23:00 – 08:00 & 14:00 – 16:00',
  appliances_json JSONB,
  keys_info_en TEXT,
  keys_info_it TEXT,
  retention_days INT DEFAULT 90,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. House Rules
CREATE TABLE IF NOT EXISTS house_rules (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  category TEXT NOT NULL,
  icon TEXT NOT NULL,
  title_en TEXT NOT NULL,
  title_it TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_it TEXT NOT NULL,
  sort_order INT DEFAULT 0
);

-- 6. Contacts
CREATE TABLE IF NOT EXISTS contacts (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  name TEXT NOT NULL,
  role_en TEXT NOT NULL,
  role_it TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT,
  emergency BOOLEAN DEFAULT false,
  icon TEXT DEFAULT 'Phone',
  notes_en TEXT,
  notes_it TEXT
);

-- ==========================================================
-- AUTOMATIC DATA RETENTION CLEANUP FUNCTION
-- Purges cleaning_history records older than retention_days (default 90)
-- ==========================================================
CREATE OR REPLACE FUNCTION purge_old_cleaning_history(retention_days INT DEFAULT 90)
RETURNS INT AS $$
DECLARE
  deleted_count INT;
BEGIN
  DELETE FROM cleaning_history
  WHERE completed_at < (NOW() - (retention_days || ' days')::INTERVAL);
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security (RLS) with open read/write for flatmates
ALTER TABLE roommates ENABLE ROW LEVEL SECURITY;
ALTER TABLE cleaning_turns ENABLE ROW LEVEL SECURITY;
ALTER TABLE cleaning_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE house_information ENABLE ROW LEVEL SECURITY;
ALTER TABLE house_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-write for flatmates" ON roommates FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write for cleaning turns" ON cleaning_turns FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write for cleaning history" ON cleaning_history FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write for house info" ON house_information FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write for house rules" ON house_rules FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write for contacts" ON contacts FOR ALL USING (true) WITH CHECK (true);
