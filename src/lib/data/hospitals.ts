import { getDb } from "../db";

export interface Hospital {
  id: string;
  name: string;
  slug: string;
  type: string;
  address: string | null;
  city: string | null;
  postcode: string | null;
  phone: string | null;
  website: string | null;
  lat: number | null;
  lng: number | null;
  region: string | null;
  country: string;
  opening_hours: string | null;
  image_url: string | null;
  aliases: string | null;
  about_text: string | null;
  departments: string | null;
  trust_id: string;
  trust_name?: string;
  trust_source_url?: string;
}

export interface HospitalWithWait extends Hospital {
  wait_minutes: number | null;
  patients_waiting: number | null;
  total_patients: number | null;
  source_timestamp: string | null;
  freshness: string;
  avg_wait: number | null;
}

export interface WaitReading {
  id: string;
  hospital_id: string;
  wait_minutes: number | null;
  patients_waiting: number | null;
  total_patients: number | null;
  source_timestamp: string | null;
  scraped_at: string;
  freshness: string;
}

export function getAllHospitalsWithWaits(): HospitalWithWait[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT h.*, t.name as trust_name, t.source_url as trust_source_url,
              r.wait_minutes, r.patients_waiting, r.total_patients, r.source_timestamp, r.freshness,
              a.avg_wait
       FROM hospitals h
       JOIN trusts t ON h.trust_id = t.id
       LEFT JOIN (
         SELECT wr.*
         FROM wait_readings wr
         INNER JOIN (
           SELECT hospital_id, MAX(scraped_at) as max_time
           FROM wait_readings
           WHERE scraped_at > datetime('now', '-2 hours')
           GROUP BY hospital_id
         ) latest ON wr.hospital_id = latest.hospital_id AND wr.scraped_at = latest.max_time
       ) r ON h.id = r.hospital_id
       LEFT JOIN (
         SELECT hospital_id, ROUND(AVG(wait_minutes)) as avg_wait
         FROM wait_readings
         WHERE wait_minutes IS NOT NULL AND wait_minutes > 0
         GROUP BY hospital_id
       ) a ON h.id = a.hospital_id
       ORDER BY h.name`
    )
    .all() as HospitalWithWait[];
}

export function getHospitalBySlug(slug: string): HospitalWithWait | null {
  const db = getDb();
  const row = db
    .prepare(
      `SELECT h.*, t.name as trust_name, t.source_url as trust_source_url,
              r.wait_minutes, r.patients_waiting, r.total_patients, r.source_timestamp, r.freshness,
              a.avg_wait
       FROM hospitals h
       JOIN trusts t ON h.trust_id = t.id
       LEFT JOIN (
         SELECT wr.*
         FROM wait_readings wr
         INNER JOIN (
           SELECT hospital_id, MAX(scraped_at) as max_time
           FROM wait_readings
           WHERE scraped_at > datetime('now', '-2 hours')
           GROUP BY hospital_id
         ) latest ON wr.hospital_id = latest.hospital_id AND wr.scraped_at = latest.max_time
       ) r ON h.id = r.hospital_id
       LEFT JOIN (
         SELECT hospital_id, ROUND(AVG(wait_minutes)) as avg_wait
         FROM wait_readings
         WHERE wait_minutes IS NOT NULL AND wait_minutes > 0
         GROUP BY hospital_id
       ) a ON h.id = a.hospital_id
       WHERE h.slug = ?`
    )
    .get(slug) as HospitalWithWait | undefined;
  return row ?? null;
}

export function getHospitalReadings(
  hospitalId: string,
  hours: number = 24
): WaitReading[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT * FROM wait_readings
       WHERE hospital_id = ?
         AND scraped_at >= datetime('now', ?)
       ORDER BY scraped_at DESC`
    )
    .all(hospitalId, `-${hours} hours`) as WaitReading[];
}

export function getHospitalsByRegion(region: string): HospitalWithWait[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT h.*, t.name as trust_name, t.source_url as trust_source_url,
              r.wait_minutes, r.patients_waiting, r.total_patients, r.source_timestamp, r.freshness,
              a.avg_wait
       FROM hospitals h
       JOIN trusts t ON h.trust_id = t.id
       LEFT JOIN (
         SELECT wr.*
         FROM wait_readings wr
         INNER JOIN (
           SELECT hospital_id, MAX(scraped_at) as max_time
           FROM wait_readings
           WHERE scraped_at > datetime('now', '-2 hours')
           GROUP BY hospital_id
         ) latest ON wr.hospital_id = latest.hospital_id AND wr.scraped_at = latest.max_time
       ) r ON h.id = r.hospital_id
       LEFT JOIN (
         SELECT hospital_id, ROUND(AVG(wait_minutes)) as avg_wait
         FROM wait_readings
         WHERE wait_minutes IS NOT NULL AND wait_minutes > 0
         GROUP BY hospital_id
       ) a ON h.id = a.hospital_id
       WHERE h.region = ?
       ORDER BY r.wait_minutes ASC`
    )
    .all(region) as HospitalWithWait[];
}

export function getLongestWaits(limit: number = 3): HospitalWithWait[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT h.*, t.name as trust_name, t.source_url as trust_source_url,
              r.wait_minutes, r.patients_waiting, r.total_patients, r.source_timestamp, r.freshness
       FROM hospitals h
       JOIN trusts t ON h.trust_id = t.id
       INNER JOIN (
         SELECT wr.*
         FROM wait_readings wr
         INNER JOIN (
           SELECT hospital_id, MAX(scraped_at) as max_time
           FROM wait_readings
           WHERE scraped_at > datetime('now', '-2 hours')
           GROUP BY hospital_id
         ) latest ON wr.hospital_id = latest.hospital_id AND wr.scraped_at = latest.max_time
       ) r ON h.id = r.hospital_id
       WHERE r.wait_minutes IS NOT NULL
       ORDER BY r.wait_minutes DESC
       LIMIT ?`
    )
    .all(limit) as HospitalWithWait[];
}

export function getShortestWaits(limit: number = 3): HospitalWithWait[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT h.*, t.name as trust_name, t.source_url as trust_source_url,
              r.wait_minutes, r.patients_waiting, r.total_patients, r.source_timestamp, r.freshness
       FROM hospitals h
       JOIN trusts t ON h.trust_id = t.id
       INNER JOIN (
         SELECT wr.*
         FROM wait_readings wr
         INNER JOIN (
           SELECT hospital_id, MAX(scraped_at) as max_time
           FROM wait_readings
           WHERE scraped_at > datetime('now', '-2 hours')
           GROUP BY hospital_id
         ) latest ON wr.hospital_id = latest.hospital_id AND wr.scraped_at = latest.max_time
       ) r ON h.id = r.hospital_id
       WHERE r.wait_minutes IS NOT NULL AND r.wait_minutes > 0
       ORDER BY r.wait_minutes ASC
       LIMIT ?`
    )
    .all(limit) as HospitalWithWait[];
}

export interface NationalStats {
  totalTracked: number;
  reporting: number;
  avgWait: number;
  medianWait: number;
  shortestWait: { minutes: number; name: string; slug: string };
  longestWait: { minutes: number; name: string; slug: string };
  under30: number;
  between30and60: number;
  over60: number;
  totalPatientsWaiting: number;
  hospitalsReportingPatients: number;
}

export function getNationalStats(): NationalStats {
  const db = getDb();
  const hospitals = db.prepare(
    `SELECT h.name, h.slug, r.wait_minutes, r.patients_waiting
     FROM hospitals h
     INNER JOIN (
       SELECT wr.*
       FROM wait_readings wr
       INNER JOIN (
         SELECT hospital_id, MAX(scraped_at) as max_time
         FROM wait_readings
         WHERE scraped_at > datetime('now', '-2 hours')
         GROUP BY hospital_id
       ) latest ON wr.hospital_id = latest.hospital_id AND wr.scraped_at = latest.max_time
     ) r ON h.id = r.hospital_id
     WHERE r.wait_minutes IS NOT NULL AND r.wait_minutes > 0
     ORDER BY r.wait_minutes ASC`
  ).all() as { name: string; slug: string; wait_minutes: number; patients_waiting: number | null }[];

  const totalTracked = db.prepare("SELECT COUNT(*) as c FROM hospitals").get() as { c: number };
  const waits = hospitals.map(h => h.wait_minutes);
  const avg = waits.length > 0 ? Math.round(waits.reduce((a, b) => a + b, 0) / waits.length) : 0;
  const median = waits.length > 0 ? waits[Math.floor(waits.length / 2)] : 0;
  const patientsWaiting = hospitals.reduce((sum, h) => sum + (h.patients_waiting || 0), 0);
  const hospitalsWithPatients = hospitals.filter(h => h.patients_waiting !== null && h.patients_waiting > 0).length;

  return {
    totalTracked: totalTracked.c,
    reporting: hospitals.length,
    avgWait: avg,
    medianWait: median,
    shortestWait: hospitals.length > 0
      ? { minutes: hospitals[0].wait_minutes, name: hospitals[0].name, slug: hospitals[0].slug }
      : { minutes: 0, name: "—", slug: "" },
    longestWait: hospitals.length > 0
      ? { minutes: hospitals[hospitals.length - 1].wait_minutes, name: hospitals[hospitals.length - 1].name, slug: hospitals[hospitals.length - 1].slug }
      : { minutes: 0, name: "—", slug: "" },
    under30: waits.filter(w => w < 30).length,
    between30and60: waits.filter(w => w >= 30 && w <= 60).length,
    over60: waits.filter(w => w > 60).length,
    totalPatientsWaiting: patientsWaiting,
    hospitalsReportingPatients: hospitalsWithPatients,
  };
}

export function getRegions(): { region: string; country: string; count: number }[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT region, country, COUNT(*) as count
       FROM hospitals
       WHERE region IS NOT NULL
       GROUP BY region
       ORDER BY region`
    )
    .all() as { region: string; country: string; count: number }[];
}
