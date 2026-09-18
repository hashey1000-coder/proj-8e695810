export interface SourceConfig {
  name: string;
  sourceUrl: string;
  sourceType: "json" | "plain-text" | "html-table" | "html-embedded" | "generic";
  country: string;
  region: string;
  hospitals: HospitalMapping[];
}

export interface HospitalMapping {
  siteKey: string;
  name: string;
  slug: string;
  type?: "AE" | "MIU" | "UTC";
}

export interface ParsedWaitTime {
  hospitalSlug: string;
  hospitalName: string;
  waitMinutes: number | null;
  patientsWaiting?: number | null;
  totalPatients?: number | null;
  type?: "AE" | "MIU" | "UTC";
  /** Opening hours text published alongside the wait (e.g. Cornwall's "Open: Every day, 8am to 8pm.") */
  openingHours?: string | null;
}

export const SOURCES: SourceConfig[] = [
  // --- JSON API ---
  {
    name: "University Hospitals Birmingham NHS Foundation Trust",
    sourceUrl: "https://trustmigration.uhbdev.co.uk/AE_API/api.php",
    sourceType: "json",
    country: "England",
    region: "Birmingham & Solihull",
    hospitals: [
      { siteKey: "Good Hope", name: "Good Hope Hospital", slug: "good-hope-hospital" },
      { siteKey: "Heartlands", name: "Heartlands Hospital", slug: "heartlands-hospital" },
      { siteKey: "Queen Elizabeth", name: "Queen Elizabeth Hospital Birmingham", slug: "queen-elizabeth-hospital-birmingham" },
      { siteKey: "Solihull", name: "Solihull Hospital", slug: "solihull-hospital" },
    ],
  },

  // --- Plain text pages ---
  {
    name: "NHS Forth Valley (ED)",
    sourceUrl: "https://nhsforthvalley.com/waiting-times/edtime.php",
    sourceType: "plain-text",
    country: "Scotland",
    region: "Scotland",
    hospitals: [
      { siteKey: "default", name: "Forth Valley Royal Hospital", slug: "forth-valley-royal-hospital" },
    ],
  },
  {
    name: "NHS Forth Valley (MIU)",
    sourceUrl: "https://nhsforthvalley.com/waiting-times/miutime.php",
    sourceType: "plain-text",
    country: "Scotland",
    region: "Scotland",
    hospitals: [
      { siteKey: "default", name: "Forth Valley Royal Hospital MIU", slug: "forth-valley-royal-hospital-miu", type: "MIU" },
    ],
  },

  // --- HTML table sources ---
  {
    name: "North Cumbria Integrated Care NHS Foundation Trust",
    sourceUrl: "https://www.ncic.nhs.uk/waiting/ncic-live-emergencytimes.html",
    sourceType: "html-table",
    country: "England",
    region: "North West",
    hospitals: [
      { siteKey: "Cumberland Infirmary", name: "Cumberland Infirmary Carlisle", slug: "cumberland-infirmary-carlisle" },
      { siteKey: "West Cumberland Hospital", name: "West Cumberland Hospital", slug: "west-cumberland-hospital" },
      { siteKey: "Penrith Community Hospital", name: "Penrith Community Hospital", slug: "penrith-community-hospital", type: "UTC" },
      { siteKey: "Keswick Community Hospital", name: "Keswick Community Hospital", slug: "keswick-community-hospital", type: "UTC" },
    ],
  },
  {
    name: "Kent & Medway UTCs",
    sourceUrl: "https://www.kmhealthandcare.uk/utc-waiting-times",
    sourceType: "html-table",
    country: "England",
    region: "Kent",
    hospitals: [
      { siteKey: "Buckland Hospital", name: "Buckland Hospital Dover", slug: "buckland-hospital-dover", type: "UTC" },
      { siteKey: "Maidstone Hospital", name: "Maidstone Hospital", slug: "maidstone-hospital", type: "UTC" },
      { siteKey: "Queen Elizabeth the Queen Mother", name: "QEQM Hospital Margate", slug: "qeqm-hospital-margate", type: "UTC" },
      { siteKey: "Tunbridge Wells Hospital", name: "Tunbridge Wells Hospital", slug: "tunbridge-wells-hospital", type: "UTC" },
      { siteKey: "William Harvey Hospital", name: "William Harvey Hospital", slug: "william-harvey-hospital", type: "UTC" },
      { siteKey: "Estuary View", name: "Estuary View Whitstable", slug: "estuary-view-whitstable", type: "UTC" },
      { siteKey: "Faversham", name: "Faversham UTC", slug: "faversham-utc", type: "UTC" },
      { siteKey: "Herne Bay", name: "Herne Bay UTC", slug: "herne-bay-utc", type: "UTC" },
      { siteKey: "Royal Victoria Hospital, Folkestone", name: "Royal Victoria Hospital Folkestone", slug: "royal-victoria-hospital-folkestone", type: "UTC" },
      { siteKey: "Victoria Hospital, Deal", name: "Victoria Hospital Deal", slug: "victoria-hospital-deal", type: "UTC" },
      { siteKey: "Kent and Canterbury", name: "Kent and Canterbury Hospital", slug: "kent-and-canterbury-hospital", type: "UTC" },
    ],
  },

  // --- HTML embedded sources ---
  {
    name: "Shrewsbury and Telford Hospital NHS Trust",
    sourceUrl: "https://sath.chilli-is.co.uk/times",
    sourceType: "generic",
    country: "England",
    region: "West Midlands",
    hospitals: [
      { siteKey: "Princess Royal Hospital", name: "Princess Royal Hospital", slug: "princess-royal-hospital" },
      { siteKey: "Royal Shrewsbury Hospital", name: "Royal Shrewsbury Hospital", slug: "royal-shrewsbury-hospital" },
    ],
  },
  {
    name: "Milton Keynes University Hospital NHS Foundation Trust",
    sourceUrl: "https://edwaitingtimes.mkuh.nhs.uk/Home/IndexCorp/",
    sourceType: "html-embedded",
    country: "England",
    region: "South East",
    hospitals: [
      { siteKey: "default", name: "Milton Keynes University Hospital", slug: "milton-keynes-university-hospital" },
    ],
  },
  {
    name: "Wye Valley NHS Trust",
    sourceUrl: "https://www.wyevalley.nhs.uk/waiting-times.aspx",
    sourceType: "html-embedded",
    country: "England",
    region: "West Midlands",
    hospitals: [
      { siteKey: "default", name: "Hereford County Hospital", slug: "hereford-county-hospital" },
    ],
  },
  // Lewisham/Greenwich WaitSmart returns 403

  // Princess Alexandra Hospital (Harlow) — 3 departments
  {
    name: "The Princess Alexandra Hospital NHS Trust",
    sourceUrl: "https://www.pah.nhs.uk/patients-visitors/waiting-times/urgent-and-emergency-care-waiting-times/",
    sourceType: "generic",
    country: "England",
    region: "East of England",
    hospitals: [
      { siteKey: "Emergency Department (Adults)", name: "Princess Alexandra Hospital", slug: "princess-alexandra-hospital" },
      { siteKey: "Children's Emergency Department", name: "Princess Alexandra Hospital Children's A&E", slug: "princess-alexandra-hospital-childrens-ae" },
      // SDEC removed: the trust publishes no live SDEC wait — the "Same Day Emergency Care"
      // heading is only a disclaimer paragraph, so matching it scraped a bogus wait from the
      // adjacent adult-ED figures.
    ],
  },

  // --- Generic (cheerio pattern matching) ---
  // Barts Health removed their wait times page (404 as of Sep 2026)
  {
    name: "Mid Cheshire Hospitals NHS Foundation Trust",
    sourceUrl: "https://www.mcht.nhs.uk/patients-and-visitors/waiting-times-feed",
    sourceType: "generic",
    country: "England",
    region: "North West",
    hospitals: [
      { siteKey: "Majors", name: "Leighton Hospital", slug: "leighton-hospital" },
    ],
  },
  {
    name: "Sandwell and West Birmingham NHS Trust",
    sourceUrl: "https://www.swbh.nhs.uk/patients-visitors/live-ae-wait-times/",
    sourceType: "generic",
    country: "England",
    region: "West Midlands",
    hospitals: [
      { siteKey: "Midland Metropolitan", name: "Midland Metropolitan University Hospital", slug: "midland-metropolitan-university-hospital" },
      // Sandwell General A&E closed in 2024 when Midland Metropolitan University Hospital
      // opened and consolidated the City and Sandwell emergency departments. The trust's
      // live page no longer lists it.
    ],
  },
  {
    name: "University Hospitals Coventry and Warwickshire NHS Trust",
    sourceUrl: "https://www.uhcw.nhs.uk/patients-and-visitors/live-waiting-times/",
    sourceType: "generic",
    country: "England",
    region: "Midlands",
    hospitals: [
      { siteKey: "University Hospital Coventry Emergency Department", name: "University Hospital Coventry", slug: "university-hospital-coventry" },
      { siteKey: "Children's Emergency Department", name: "University Hospital Coventry Children's A&E", slug: "university-hospital-coventry-childrens-ae" },
      { siteKey: "Emergency Gynaecology", name: "University Hospital Coventry Emergency Gynaecology", slug: "university-hospital-coventry-emergency-gynaecology" },
      { siteKey: "Minor Injuries Unit", name: "University Hospital Coventry MIU", slug: "university-hospital-coventry-miu", type: "MIU" },
      { siteKey: "Rugby Urgent Treatment Centre", name: "Rugby Urgent Treatment Centre", slug: "rugby-urgent-treatment-centre", type: "UTC" },
    ],
  },
  {
    name: "University Hospitals Plymouth NHS Trust",
    sourceUrl: "https://www.plymouthhospitals.nhs.uk/urgent-waiting-times/",
    sourceType: "generic",
    country: "England",
    region: "South West",
    hospitals: [
      { siteKey: "Derriford Hospital", name: "Derriford Hospital", slug: "derriford-hospital" },
      { siteKey: "Dartmoor Building", name: "Dartmoor Building UTC", slug: "dartmoor-building-utc", type: "UTC" },
      { siteKey: "Cumberland Centre", name: "Cumberland Centre UTC", slug: "cumberland-centre-utc", type: "UTC" },
      { siteKey: "Tavistock", name: "Tavistock MIU", slug: "tavistock-miu", type: "MIU" },
      { siteKey: "Kingsbridge", name: "Kingsbridge MIU", slug: "kingsbridge-miu", type: "MIU" },
    ],
  },
  {
    name: "Torbay and South Devon NHS Foundation Trust",
    sourceUrl: "https://www.torbayandsouthdevon.nhs.uk/services/urgent-and-emergency-care/ed-miu-waiting-times/",
    sourceType: "generic",
    country: "England",
    region: "South West",
    hospitals: [
      { siteKey: "Torbay Hospital", name: "Torbay Hospital", slug: "torbay-hospital" },
      { siteKey: "Newton Abbot", name: "Newton Abbot Community Hospital", slug: "newton-abbot-community-hospital", type: "UTC" },
    ],
  },
  {
    name: "North Cheshire and Mersey NHS Foundation Trust",
    sourceUrl: "https://northcheshireandmersey.nhs.uk/urgent-and-emergency-care-wait-times/",
    sourceType: "html-embedded",
    country: "England",
    region: "North West",
    hospitals: [
      { siteKey: "Warrington", name: "Warrington Hospital", slug: "warrington-hospital" },
      { siteKey: "Runcorn", name: "Runcorn Urgent Treatment Centre", slug: "runcorn-urgent-treatment-centre", type: "UTC" },
    ],
  },
  // Morecambe Bay: "Our live A&E waiting times are currently unavailable"
  {
    name: "Cornwall NHS Trusts",
    sourceUrl: "https://doclibrary-rcht.cornwall.nhs.uk/RoyalCornwallHospitalsTrust/Internet/DocumentsLibrary/MinorInjuryUnit/MIUWaits.aspx",
    sourceType: "generic",
    country: "England",
    region: "South West",
    hospitals: [
      { siteKey: "Royal Cornwall", name: "Royal Cornwall Hospital", slug: "royal-cornwall-hospital" },
      { siteKey: "West Cornwall", name: "West Cornwall Hospital Penzance", slug: "west-cornwall-hospital-penzance", type: "UTC" },
      { siteKey: "Bodmin", name: "Bodmin MIU", slug: "bodmin-miu", type: "MIU" },
      { siteKey: "Camborne", name: "Camborne Redruth MIU", slug: "camborne-redruth-miu", type: "MIU" },
      { siteKey: "Falmouth", name: "Falmouth MIU", slug: "falmouth-miu", type: "MIU" },
      { siteKey: "Helston", name: "Helston MIU", slug: "helston-miu", type: "MIU" },
      { siteKey: "Launceston", name: "Launceston MIU", slug: "launceston-miu", type: "MIU" },
      { siteKey: "Liskeard", name: "Liskeard MIU", slug: "liskeard-miu", type: "MIU" },
      { siteKey: "St Austell", name: "St Austell MIU", slug: "st-austell-miu", type: "MIU" },
      { siteKey: "Stratton", name: "Stratton MIU", slug: "stratton-miu", type: "MIU" },
      { siteKey: "Newquay", name: "Newquay MIU", slug: "newquay-miu", type: "MIU" },
      { siteKey: "Isles of Scilly", name: "Isles of Scilly Hospital MIU", slug: "isles-of-scilly-hospital-miu", type: "MIU" },
    ],
  },
];
