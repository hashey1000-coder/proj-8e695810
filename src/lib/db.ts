import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "aewaittime.db");

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!_db) {
    _db = new Database(DB_PATH);
    _db.pragma("journal_mode = WAL");
    _db.pragma("foreign_keys = ON");
    initSchema(_db);
  }
  return _db;
}

function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS trusts (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      slug TEXT NOT NULL UNIQUE,
      source_url TEXT NOT NULL,
      country TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS hospitals (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      type TEXT NOT NULL DEFAULT 'AE',
      address TEXT,
      city TEXT,
      postcode TEXT,
      phone TEXT,
      website TEXT,
      lat REAL,
      lng REAL,
      region TEXT,
      country TEXT NOT NULL,
      opening_hours TEXT,
      image_url TEXT,
      aliases TEXT,
      about_text TEXT,
      departments TEXT,
      trust_id TEXT NOT NULL REFERENCES trusts(id),
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS wait_readings (
      id TEXT PRIMARY KEY,
      hospital_id TEXT NOT NULL REFERENCES hospitals(id),
      wait_minutes INTEGER,
      patients_waiting INTEGER,
      total_patients INTEGER,
      source_timestamp TEXT,
      scraped_at TEXT DEFAULT (datetime('now')),
      freshness TEXT NOT NULL DEFAULT 'live'
    );

    CREATE INDEX IF NOT EXISTS idx_hospitals_region ON hospitals(region);
    CREATE INDEX IF NOT EXISTS idx_hospitals_country ON hospitals(country);
    CREATE INDEX IF NOT EXISTS idx_hospitals_trust ON hospitals(trust_id);
    CREATE INDEX IF NOT EXISTS idx_readings_hospital_time ON wait_readings(hospital_id, scraped_at);
    CREATE INDEX IF NOT EXISTS idx_readings_time ON wait_readings(scraped_at);
  `);
}
