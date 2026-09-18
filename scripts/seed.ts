import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import crypto from "crypto";

const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "aewaittime.db");

if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
if (fs.existsSync(DB_PATH)) fs.unlinkSync(DB_PATH);

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE trusts (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    source_url TEXT NOT NULL,
    country TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE hospitals (
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

  CREATE TABLE wait_readings (
    id TEXT PRIMARY KEY,
    hospital_id TEXT NOT NULL REFERENCES hospitals(id),
    wait_minutes INTEGER,
    patients_waiting INTEGER,
    total_patients INTEGER,
    source_timestamp TEXT,
    scraped_at TEXT DEFAULT (datetime('now')),
    freshness TEXT NOT NULL DEFAULT 'live'
  );

  CREATE INDEX idx_hospitals_region ON hospitals(region);
  CREATE INDEX idx_hospitals_country ON hospitals(country);
  CREATE INDEX idx_hospitals_trust ON hospitals(trust_id);
  CREATE INDEX idx_readings_hospital_time ON wait_readings(hospital_id, scraped_at);
  CREATE INDEX idx_readings_time ON wait_readings(scraped_at);
`);

const id = () => crypto.randomUUID();

const trusts = [
  { id: id(), name: "NHS Wales (via aeinfo.nhs.wales)", slug: "nhs-wales-via-aeinfo-nhs-wales", sourceUrl: "https://aeinfo.nhs.wales/", country: "Wales" },
  { id: id(), name: "Barts Health NHS Trust", slug: "barts-health-nhs-trust", sourceUrl: "https://www.bartshealth.nhs.uk/waiting-times-adult/", country: "England" },
  { id: id(), name: "University Hospitals Birmingham NHS Foundation Trust", slug: "university-hospitals-birmingham-nhs-foundation-trust", sourceUrl: "https://www.uhb.nhs.uk/patients-and-visitors/waiting-times.htm", country: "England" },
  { id: id(), name: "East Kent Hospitals University NHS Foundation Trust", slug: "east-kent-hospitals-university-nhs-foundation-trust", sourceUrl: "https://www.ekhuft.nhs.uk/patients-and-visitors/a-e/", country: "England" },
  { id: id(), name: "Lewisham and Greenwich NHS Trust", slug: "lewisham-and-greenwich-nhs-trust", sourceUrl: "https://www.lewishamandgreenwich.nhs.uk/", country: "England" },
  { id: id(), name: "Southern Health and Social Care Trust", slug: "southern-health-and-social-care-trust", sourceUrl: "https://www.nidirect.gov.uk/articles/emergency-department-waiting-times", country: "Northern Ireland" },
  { id: id(), name: "University Hospitals Plymouth NHS Trust", slug: "university-hospitals-plymouth-nhs-trust", sourceUrl: "https://www.plymouthhospitals.nhs.uk/", country: "England" },
  { id: id(), name: "NHS Forth Valley", slug: "nhs-forth-valley", sourceUrl: "https://nhsforthvalley.com/", country: "Scotland" },
  { id: id(), name: "Manchester University NHS Foundation Trust", slug: "manchester-university-nhs-foundation-trust", sourceUrl: "https://mft.nhs.uk/", country: "England" },
  { id: id(), name: "Leeds Teaching Hospitals NHS Trust", slug: "leeds-teaching-hospitals-nhs-trust", sourceUrl: "https://www.leedsth.nhs.uk/", country: "England" },
  { id: id(), name: "Newcastle upon Tyne Hospitals NHS Foundation Trust", slug: "newcastle-upon-tyne-hospitals-nhs-foundation-trust", sourceUrl: "https://www.newcastle-hospitals.nhs.uk/", country: "England" },
  { id: id(), name: "University Hospitals Bristol and Weston NHS Foundation Trust", slug: "university-hospitals-bristol-and-weston", sourceUrl: "https://www.uhbw.nhs.uk/", country: "England" },
  { id: id(), name: "Nottingham University Hospitals NHS Trust", slug: "nottingham-university-hospitals-nhs-trust", sourceUrl: "https://www.nuh.nhs.uk/", country: "England" },
];

const insertTrust = db.prepare("INSERT INTO trusts (id, name, slug, source_url, country) VALUES (?, ?, ?, ?, ?)");
for (const t of trusts) {
  insertTrust.run(t.id, t.name, t.slug, t.sourceUrl, t.country);
}

const trustMap = Object.fromEntries(trusts.map((t) => [t.slug, t.id]));

interface HospitalSeed {
  name: string;
  slug: string;
  type: string;
  city: string;
  postcode: string;
  lat: number;
  lng: number;
  region: string;
  country: string;
  trustSlug: string;
  phone?: string;
  openingHours: string;
  currentWait: number;
  patientsWaiting: number | null;
  totalPatients: number | null;
  imageUrl?: string;
  aliases?: string;
  aboutText?: string;
  departments?: string[];
}

const hospitals: HospitalSeed[] = [
  // Wales
  {
    name: "Wrexham Maelor Hospital", slug: "wrexham-maelor-hospital", type: "AE", city: "Wrexham", postcode: "LL13 7TD", lat: 53.046, lng: -2.992, region: "Wales", country: "Wales", trustSlug: "nhs-wales-via-aeinfo-nhs-wales", openingHours: "Open: 24 hours, 7 days a week", currentWait: 450, patientsWaiting: null, totalPatients: 82,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Ysbyty_Maelor_Wrecsam._%28Wrexham_Maelor_Hospital%29_-_geograph.org.uk_-_161697.jpg",
    aliases: "Ysbyty Maelor Wrecsam, Wrexham A&E",
    aboutText: "Wrexham Maelor Hospital is a district general hospital located in Wrexham, North Wales. It is managed by Betsi Cadwaladr University Health Board and serves a population of approximately 240,000 people across Wrexham, Flintshire and surrounding areas. The hospital's Emergency Department (A&E) operates 24 hours a day, 7 days a week, and handles around 70,000 attendances per year. The department has recently undergone refurbishment to improve patient flow and waiting areas. Wrexham Maelor is one of three major hospitals in the Betsi Cadwaladr area, alongside Ysbyty Gwynedd in Bangor and Glan Clwyd Hospital in Bodelwyddan.",
    departments: ["Emergency Department (A&E)", "Acute Medical Unit", "Critical Care", "Cardiology", "Orthopaedics", "General Surgery", "Paediatrics", "Maternity", "Radiology", "Pathology"],
  },
  {
    name: "The Grange University Hospital", slug: "the-grange-university-hospital", type: "AE", city: "Llanfrechfa", postcode: "NP44 8YN", lat: 51.636, lng: -3.026, region: "Wales", country: "Wales", trustSlug: "nhs-wales-via-aeinfo-nhs-wales", openingHours: "Open: 24 hours, 7 days a week", currentWait: 60, patientsWaiting: null, totalPatients: 45,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/The_Grange_University_Hospital%2C_Llanfrechfa_%28geograph_6872256%29.jpg/960px-The_Grange_University_Hospital%2C_Llanfrechfa_%28geograph_6872256%29.jpg",
    aliases: "Grange Hospital, Ysbyty Prifysgol y Faenor",
    aboutText: "The Grange University Hospital is a specialist and critical care centre in Llanfrechfa, Cwmbran, which opened in November 2020. It is the newest major hospital in Wales and is managed by Aneurin Bevan University Health Board. The hospital replaced the Royal Gwent Hospital as the main emergency department for the region, serving over 600,000 people across Gwent. The state-of-the-art facility cost approximately £350 million and features modern emergency care facilities, critical care units, and specialist services. It is designed to handle the most serious emergencies in the region.",
    departments: ["Emergency Department (A&E)", "Critical Care Unit", "Major Trauma", "Acute Medicine", "General Surgery", "Cardiology", "Respiratory Medicine", "Neurology", "Radiology", "Pathology"],
  },
  {
    name: "Glangwili General Hospital", slug: "glangwili-general-hospital", type: "AE", city: "Carmarthen", postcode: "SA31 2AF", lat: 51.864, lng: -4.306, region: "Wales", country: "Wales", trustSlug: "nhs-wales-via-aeinfo-nhs-wales", openingHours: "Open: 24 hours, 7 days a week", currentWait: 120, patientsWaiting: null, totalPatients: 38,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d3/West_Wales_General_Hospital%2C_Glangwili%2C_Carmarthen_-_geograph.org.uk_-_21092.jpg",
    aliases: "Glangwili Hospital, West Wales General Hospital",
    aboutText: "Glangwili General Hospital is a district general hospital in Carmarthen, West Wales, managed by Hywel Dda University Health Board. The hospital serves the communities of Carmarthenshire and parts of Ceredigion and Pembrokeshire, covering a large rural area of West Wales. The A&E department provides 24-hour emergency care and sees approximately 45,000 patients per year. The hospital also offers a range of specialist services including maternity, paediatrics, and surgical care. Due to the rural nature of the area, many patients travel significant distances to reach the hospital.",
    departments: ["Emergency Department (A&E)", "Acute Medicine", "General Surgery", "Orthopaedics", "Paediatrics", "Maternity", "Radiology", "Pathology", "Elderly Care"],
  },
  {
    name: "Prince Charles Hospital", slug: "prince-charles-hospital", type: "AE", city: "Merthyr Tydfil", postcode: "CF47 9DT", lat: 51.747, lng: -3.382, region: "Wales", country: "Wales", trustSlug: "nhs-wales-via-aeinfo-nhs-wales", openingHours: "Open: 24 hours, 7 days a week", currentWait: 480, patientsWaiting: null, totalPatients: 75,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Prince_Charles_Hospital_Rear.jpg/960px-Prince_Charles_Hospital_Rear.jpg",
    aliases: "PCH, Prince Charles A&E Merthyr",
    aboutText: "Prince Charles Hospital is a district general hospital in Merthyr Tydfil, South Wales. Managed by Cwm Taf Morgannwg University Health Board, it serves the population of Merthyr Tydfil, Cynon Valley, and surrounding areas. The Emergency Department handles approximately 55,000 attendances annually and is one of the busier A&E departments in the Welsh valleys. The hospital provides a full range of acute services and has undergone significant investment in recent years to modernise its facilities and improve emergency care pathways.",
    departments: ["Emergency Department (A&E)", "Acute Medical Unit", "General Surgery", "Orthopaedics", "Paediatrics", "Maternity", "Cardiology", "Respiratory Medicine", "Radiology"],
  },
  {
    name: "Morriston Hospital", slug: "morriston-hospital", type: "AE", city: "Swansea", postcode: "SA6 6NL", lat: 51.674, lng: -3.934, region: "Wales", country: "Wales", trustSlug: "nhs-wales-via-aeinfo-nhs-wales", openingHours: "Open: 24 hours, 7 days a week", currentWait: 180, patientsWaiting: null, totalPatients: 90,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/44/Ysbyty_Treforys._Morriston_Hospital._-_geograph.org.uk_-_404965.jpg",
    aliases: "Ysbyty Treforys, Morriston A&E",
    aboutText: "Morriston Hospital is a large teaching hospital in the Morriston area of Swansea, managed by Swansea Bay University Health Board. It is the main hospital for emergency and acute services in the Swansea area, serving a population of around 390,000 people. The Emergency Department sees approximately 90,000 patients per year, making it one of the busiest in Wales. Morriston Hospital is also a regional centre for burns and plastic surgery, cardiac surgery, and renal services. The hospital has over 700 beds and is one of the largest hospitals in Wales.",
    departments: ["Emergency Department (A&E)", "Major Trauma", "Burns & Plastic Surgery", "Cardiac Surgery", "Renal Medicine", "Critical Care", "General Surgery", "Orthopaedics", "Respiratory Medicine", "Radiology"],
  },
  {
    name: "University Hospital of Wales", slug: "university-hospital-of-wales", type: "AE", city: "Cardiff", postcode: "CF14 4XW", lat: 51.506, lng: -3.189, region: "Wales", country: "Wales", trustSlug: "nhs-wales-via-aeinfo-nhs-wales", openingHours: "Open: 24 hours, 7 days a week", currentWait: 240, patientsWaiting: null, totalPatients: 110,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/University_Hospital_of_Wales%2C_Heath_Park_-_Cardiff_-_geograph.org.uk_-_1736088.jpg/960px-University_Hospital_of_Wales%2C_Heath_Park_-_Cardiff_-_geograph.org.uk_-_1736088.jpg",
    aliases: "UHW, Heath Hospital, Cardiff A&E",
    aboutText: "University Hospital of Wales (UHW) is the largest hospital in Wales, located in the Heath area of Cardiff. Managed by Cardiff and Vale University Health Board, it is a major teaching hospital and tertiary referral centre serving the population of Cardiff, the Vale of Glamorgan, and wider South Wales. The Emergency Department is one of the busiest in the UK, handling over 100,000 attendances per year. UHW is a major trauma centre for South and West Wales and provides specialist services in neurosurgery, cardiac surgery, transplant, and paediatric intensive care. The hospital has approximately 1,000 beds.",
    departments: ["Emergency Department (A&E)", "Major Trauma Centre", "Neurosurgery", "Cardiac Surgery", "Transplant", "Paediatric Intensive Care", "Critical Care", "Oncology", "Haematology", "Radiology", "Pathology"],
  },
  {
    name: "Ysbyty Gwynedd", slug: "ysbyty-gwynedd", type: "AE", city: "Bangor", postcode: "LL57 2PW", lat: 53.228, lng: -4.137, region: "Wales", country: "Wales", trustSlug: "nhs-wales-via-aeinfo-nhs-wales", openingHours: "Open: 24 hours, 7 days a week", currentWait: 90, patientsWaiting: null, totalPatients: 35,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/58/Ysbyty_Gwynedd%2C_Bangor.jpg",
    aliases: "Gwynedd Hospital, Bangor Hospital",
    aboutText: "Ysbyty Gwynedd is a district general hospital in Bangor, North Wales, managed by Betsi Cadwaladr University Health Board. The hospital serves the population of Gwynedd and Anglesey, an area covering approximately 130,000 people across a large rural and mountainous region. The A&E department provides 24-hour emergency care and handles around 40,000 attendances per year. Due to its location, the hospital serves as a critical access point for emergency care in northwest Wales, with some patients travelling significant distances from remote communities. The hospital also works closely with mountain rescue and coastguard services.",
    departments: ["Emergency Department (A&E)", "Acute Medicine", "General Surgery", "Orthopaedics", "Paediatrics", "Maternity", "Radiology", "Elderly Care"],
  },
  {
    name: "Glan Clwyd Hospital", slug: "glan-clwyd-hospital", type: "AE", city: "Bodelwyddan", postcode: "LL18 5UJ", lat: 53.272, lng: -3.494, region: "Wales", country: "Wales", trustSlug: "nhs-wales-via-aeinfo-nhs-wales", openingHours: "Open: 24 hours, 7 days a week", currentWait: 150, patientsWaiting: null, totalPatients: 55,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b5/The_new_facade_at_Ysbyty_Glan_Clwyd_2018_%28geograph_5882700%29.jpg",
    aliases: "Ysbyty Glan Clwyd, Bodelwyddan Hospital",
    aboutText: "Glan Clwyd Hospital (Ysbyty Glan Clwyd) is a district general hospital in Bodelwyddan, Denbighshire, North Wales. Managed by Betsi Cadwaladr University Health Board, the hospital serves the communities of Conwy, Denbighshire and surrounding areas. The Emergency Department provides 24-hour care and sees approximately 50,000 attendances per year. The hospital underwent a major redevelopment project completed in 2019, which included significant improvements to the emergency department, critical care facilities, and the main entrance. The hospital is one of three acute sites within the Betsi Cadwaladr Health Board area.",
    departments: ["Emergency Department (A&E)", "Acute Medicine", "Critical Care", "General Surgery", "Orthopaedics", "Paediatrics", "Maternity", "Cardiology", "Radiology"],
  },

  // London
  {
    name: "Royal London Hospital", slug: "royal-london-hospital", type: "AE", city: "London", postcode: "E1 1FR", lat: 51.518, lng: -0.058, region: "London", country: "England", trustSlug: "barts-health-nhs-trust", phone: "020 7377 7000", openingHours: "Open: 24 hours, 7 days a week", currentWait: 172, patientsWaiting: 20, totalPatients: 120,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Royal_London_Hospital_redevelopment.jpg/960px-Royal_London_Hospital_redevelopment.jpg",
    aliases: "The London, RLH, Whitechapel Hospital",
    aboutText: "The Royal London Hospital is a large teaching hospital in Whitechapel, East London, and is the flagship hospital of Barts Health NHS Trust, the largest NHS trust in England. Founded in 1740, it is one of the oldest hospitals in the country. The hospital is a major trauma centre for North East London and a specialist centre for emergency medicine, neurosurgery, and helicopter emergency services (London's Air Ambulance is based on the roof). The Emergency Department handles over 130,000 attendances annually, making it one of the busiest A&E departments in the UK. The hospital moved into a new state-of-the-art building in 2012.",
    departments: ["Emergency Department (A&E)", "Major Trauma Centre", "London Air Ambulance", "Neurosurgery", "Critical Care", "Acute Medicine", "General Surgery", "Orthopaedics", "Paediatrics", "Cardiac Care", "Radiology"],
  },
  {
    name: "Newham Hospital", slug: "newham-hospital", type: "AE", city: "London", postcode: "E13 8SL", lat: 51.517, lng: 0.035, region: "London", country: "England", trustSlug: "barts-health-nhs-trust", openingHours: "Open: 24 hours, 7 days a week", currentWait: 172, patientsWaiting: 15, totalPatients: 85,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Newham_University_Hospital-_main_entrance_%28Geograph_1861636%29.jpg",
    aliases: "Newham University Hospital, Newham General",
    aboutText: "Newham Hospital (also known as Newham University Hospital) is a district general hospital in Plaistow, East London. Part of Barts Health NHS Trust, the hospital serves one of the most diverse and densely populated communities in the UK. The Emergency Department operates 24/7 and handles approximately 85,000 attendances per year. The hospital provides a full range of acute services and has a dedicated Urgent Treatment Centre co-located with the A&E department. Newham Hospital has strong links with Queen Mary University of London and plays an important role in medical education and research.",
    departments: ["Emergency Department (A&E)", "Urgent Treatment Centre", "Acute Medicine", "General Surgery", "Orthopaedics", "Paediatrics", "Maternity", "Radiology", "Pathology"],
  },
  {
    name: "Whipps Cross Hospital", slug: "whipps-cross-hospital", type: "AE", city: "London", postcode: "E11 1NR", lat: 51.570, lng: 0.008, region: "London", country: "England", trustSlug: "barts-health-nhs-trust", openingHours: "Open: 24 hours, 7 days a week", currentWait: 230, patientsWaiting: 25, totalPatients: 95,
    aliases: "Whipps Cross University Hospital, Whipps Cross A&E",
    aboutText: "Whipps Cross Hospital is a district general hospital in Leytonstone, East London, part of Barts Health NHS Trust. The hospital serves the communities of Waltham Forest, Redbridge, and parts of neighbouring boroughs with a catchment population of approximately 350,000 people. The Emergency Department handles around 100,000 attendances annually and is consistently one of the busiest A&E departments in London. The hospital is currently undergoing a major redevelopment programme, with plans for a brand new hospital building. Despite its age, the hospital provides comprehensive acute services including maternity, paediatrics, and elderly care.",
    departments: ["Emergency Department (A&E)", "Acute Medicine", "General Surgery", "Orthopaedics", "Paediatrics", "Maternity", "Elderly Care", "Radiology", "Pathology"],
  },
  {
    name: "Queen Elizabeth Hospital Woolwich", slug: "queen-elizabeth-hospital-woolwich", type: "AE", city: "London", postcode: "SE18 4QH", lat: 51.487, lng: 0.067, region: "London", country: "England", trustSlug: "lewisham-and-greenwich-nhs-trust", openingHours: "Open: 24 hours, 7 days a week", currentWait: 595, patientsWaiting: null, totalPatients: 105,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Queen_Elizabeth_Hospital%2C_Woolwich_-_geograph.org.uk_-_988831.jpg/1280px-Queen_Elizabeth_Hospital%2C_Woolwich_-_geograph.org.uk_-_988831.jpg",
    aliases: "QEH Woolwich, Queen Elizabeth Greenwich",
    aboutText: "Queen Elizabeth Hospital (QEH) is a district general hospital in Woolwich, South East London, part of Lewisham and Greenwich NHS Trust. The hospital serves the Royal Borough of Greenwich and parts of Bexley with a catchment population of approximately 300,000. The Emergency Department provides 24-hour care and handles around 95,000 attendances per year. The hospital opened in 2001, replacing the former Brook Hospital, and is built using a PFI (Private Finance Initiative) model. QEH provides comprehensive acute services and has an on-site Urgent Treatment Centre to help manage non-emergency cases and reduce A&E pressure.",
    departments: ["Emergency Department (A&E)", "Urgent Treatment Centre", "Acute Medicine", "General Surgery", "Orthopaedics", "Paediatrics", "Maternity", "Critical Care", "Radiology"],
  },

  // Birmingham
  {
    name: "Queen Elizabeth Hospital Birmingham", slug: "queen-elizabeth-hospital-birmingham", type: "AE", city: "Birmingham", postcode: "B15 2GW", lat: 52.451, lng: -1.938, region: "Birmingham & Solihull", country: "England", trustSlug: "university-hospitals-birmingham-nhs-foundation-trust", openingHours: "Open: 24 hours, 7 days a week", currentWait: 348, patientsWaiting: 45, totalPatients: 160,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Queen_Elizabeth_Hospital_Birmingham%2C_Edgbaston%2C_Birmingham%2C_England-7March2011.jpg/960px-Queen_Elizabeth_Hospital_Birmingham%2C_Edgbaston%2C_Birmingham%2C_England-7March2011.jpg",
    aliases: "QEHB, QE Birmingham, Queen Elizabeth Edgbaston",
    aboutText: "Queen Elizabeth Hospital Birmingham (QEHB) is one of the largest single-site hospitals in the UK, located in Edgbaston, Birmingham. Part of University Hospitals Birmingham NHS Foundation Trust, the hospital opened in 2010 and is a state-of-the-art facility with over 1,200 beds. QEHB is a major trauma centre for the West Midlands and hosts the Royal Centre for Defence Medicine, providing specialist care for military personnel. The Emergency Department is one of the busiest in England, handling over 150,000 attendances annually. The hospital is internationally renowned for its transplant programme and research capabilities.",
    departments: ["Emergency Department (A&E)", "Major Trauma Centre", "Royal Centre for Defence Medicine", "Transplant Centre", "Cardiac Surgery", "Neurosurgery", "Critical Care", "Oncology", "Haematology", "Burns", "Radiology"],
  },
  {
    name: "Heartlands Hospital", slug: "heartlands-hospital", type: "AE", city: "Birmingham", postcode: "B9 5SS", lat: 52.474, lng: -1.834, region: "Birmingham & Solihull", country: "England", trustSlug: "university-hospitals-birmingham-nhs-foundation-trust", openingHours: "Open: 24 hours, 7 days a week", currentWait: 140, patientsWaiting: 30, totalPatients: 100,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Heartlands_Hospital_and_Heartlands_Treatment_Centre.jpg/960px-Heartlands_Hospital_and_Heartlands_Treatment_Centre.jpg",
    aliases: "Birmingham Heartlands, Heartlands A&E",
    aboutText: "Heartlands Hospital is a large district general hospital in Bordesley Green, East Birmingham. Part of University Hospitals Birmingham NHS Foundation Trust, the hospital serves the diverse communities of East Birmingham and Solihull. The Emergency Department handles approximately 110,000 attendances per year and has an on-site Urgent Treatment Centre. Heartlands is the designated centre for respiratory medicine in the Trust and has specialist units for heart failure, diabetes, and stroke. The hospital has strong academic links and is one of the largest employers in East Birmingham.",
    departments: ["Emergency Department (A&E)", "Urgent Treatment Centre", "Respiratory Medicine", "Acute Medicine", "General Surgery", "Orthopaedics", "Paediatrics", "Maternity", "Cardiology", "Stroke Unit", "Radiology"],
  },
  {
    name: "Good Hope Hospital", slug: "good-hope-hospital", type: "AE", city: "Sutton Coldfield", postcode: "B75 7RR", lat: 52.567, lng: -1.822, region: "Birmingham & Solihull", country: "England", trustSlug: "university-hospitals-birmingham-nhs-foundation-trust", openingHours: "Open: 24 hours, 7 days a week", currentWait: 195, patientsWaiting: 22, totalPatients: 75,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/60/Good_Hope_Hospital_-_geograph.org.uk_-_30692.jpg",
    aliases: "Good Hope A&E, Sutton Coldfield Hospital",
    aboutText: "Good Hope Hospital is a district general hospital in Sutton Coldfield, North Birmingham. Part of University Hospitals Birmingham NHS Foundation Trust, the hospital serves the communities of Sutton Coldfield, Erdington, and parts of North Warwickshire. The Emergency Department handles approximately 75,000 attendances per year and operates 24 hours a day. Good Hope Hospital provides a wide range of acute services and has recently had significant investment in its emergency care facilities. The hospital is known for its strong community focus and dedicated clinical teams.",
    departments: ["Emergency Department (A&E)", "Acute Medicine", "General Surgery", "Orthopaedics", "Paediatrics", "Maternity", "Elderly Care", "Radiology", "Pathology"],
  },

  // Kent
  {
    name: "William Harvey Hospital", slug: "william-harvey-hospital", type: "AE", city: "Ashford", postcode: "TN24 0LZ", lat: 51.157, lng: 0.876, region: "Kent", country: "England", trustSlug: "east-kent-hospitals-university-nhs-foundation-trust", openingHours: "Open: 24 hours, 7 days a week", currentWait: 81, patientsWaiting: 12, totalPatients: 55,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ea/William_Harvey_Hospital%2C_Main_Entrance_-_geograph.org.uk_-_1236142.jpg",
    aliases: "WHH, William Harvey Ashford",
    aboutText: "William Harvey Hospital is a district general hospital in Ashford, Kent, part of East Kent Hospitals University NHS Foundation Trust. The hospital serves the communities of Ashford, Tenterden, and surrounding areas of East Kent. The Emergency Department provides 24-hour care and handles approximately 65,000 attendances per year. The hospital is a specialist centre for vascular surgery in East Kent and provides a full range of acute services. Named after the 17th-century physician William Harvey who discovered blood circulation, the hospital maintains strong links with Kent and Canterbury Christ Church University.",
    departments: ["Emergency Department (A&E)", "Vascular Surgery", "Acute Medicine", "General Surgery", "Orthopaedics", "Paediatrics", "Maternity", "Cardiology", "Radiology"],
  },
  {
    name: "Maidstone Hospital", slug: "maidstone-hospital", type: "AE", city: "Maidstone", postcode: "ME16 9QQ", lat: 51.267, lng: 0.508, region: "Kent", country: "England", trustSlug: "east-kent-hospitals-university-nhs-foundation-trust", openingHours: "Open: 24 hours, 7 days a week", currentWait: 180, patientsWaiting: 18, totalPatients: 65,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Maidstone_Hospital_-_geograph.org.uk_-_58498.jpg/1280px-Maidstone_Hospital_-_geograph.org.uk_-_58498.jpg",
    aliases: "Maidstone A&E, Maidstone General",
    aboutText: "Maidstone Hospital is a district general hospital in Maidstone, the county town of Kent. Part of Maidstone and Tunbridge Wells NHS Trust, the hospital provides acute and specialist services to a population of approximately 500,000 across West Kent and parts of East Sussex. The Emergency Department handles around 80,000 attendances per year and includes a co-located Urgent Treatment Centre. The hospital is the Trust's centre for cancer services, oncology, and specialist diagnostics. The site has undergone significant investment in recent years, including a new emergency care centre.",
    departments: ["Emergency Department (A&E)", "Urgent Treatment Centre", "Cancer Centre", "Oncology", "Acute Medicine", "General Surgery", "Orthopaedics", "Radiology", "Pathology"],
  },
  {
    name: "QEQM Hospital Margate", slug: "queen-elizabeth-queen-mother-hospital-margate", type: "AE", city: "Margate", postcode: "CT9 4AN", lat: 51.378, lng: 1.397, region: "Kent", country: "England", trustSlug: "east-kent-hospitals-university-nhs-foundation-trust", openingHours: "Open: 24 hours, 7 days a week", currentWait: 210, patientsWaiting: 20, totalPatients: 70,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Queen_Elizabeth_the_Queen_Mother_Hospital%2C_Margate%2C_Kent_-_geograph.org.uk_-_1715539.jpg/1280px-Queen_Elizabeth_the_Queen_Mother_Hospital%2C_Margate%2C_Kent_-_geograph.org.uk_-_1715539.jpg",
    aliases: "QEQM, Queen Elizabeth Queen Mother Hospital, Margate Hospital",
    aboutText: "The Queen Elizabeth the Queen Mother Hospital (QEQM) is a district general hospital in Margate, Kent, part of East Kent Hospitals University NHS Foundation Trust. The hospital serves the communities of Thanet and surrounding areas of East Kent. The Emergency Department handles approximately 60,000 attendances per year and operates 24 hours a day. QEQM provides a range of acute services and is the main emergency hospital for the Thanet area. The hospital has close links with Canterbury Christ Church University and plays an important role in training healthcare professionals in East Kent.",
    departments: ["Emergency Department (A&E)", "Acute Medicine", "General Surgery", "Orthopaedics", "Paediatrics", "Maternity", "Elderly Care", "Radiology", "Stroke Unit"],
  },

  // South West
  {
    name: "Derriford Hospital", slug: "derriford-hospital-plymouth", type: "AE", city: "Plymouth", postcode: "PL6 8DH", lat: 50.416, lng: -4.113, region: "South West", country: "England", trustSlug: "university-hospitals-plymouth-nhs-trust", openingHours: "Open: 24 hours, 7 days a week", currentWait: 156, patientsWaiting: 28, totalPatients: 115,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Derriford_Hospital.jpg",
    aliases: "Derriford A&E, Plymouth Hospital",
    aboutText: "Derriford Hospital is the largest hospital in the South West Peninsula, located in the Derriford area of Plymouth, Devon. Part of University Hospitals Plymouth NHS Trust, the hospital is a major trauma centre for Devon, Cornwall, and the Isles of Scilly, serving a population of approximately 450,000 for local services and 2 million for specialist care. The Emergency Department handles over 100,000 attendances per year. Derriford is a teaching hospital with links to Plymouth University and is a major centre for neurosurgery, cardiothoracic surgery, and kidney transplantation. The hospital has approximately 900 beds.",
    departments: ["Emergency Department (A&E)", "Major Trauma Centre", "Neurosurgery", "Cardiothoracic Surgery", "Kidney Transplant", "Critical Care", "Paediatrics", "Maternity", "Oncology", "Radiology"],
  },

  // Northern Ireland
  {
    name: "Royal Victoria Hospital Belfast", slug: "royal-victoria-hospital-belfast", type: "AE", city: "Belfast", postcode: "BT12 6BA", lat: 54.594, lng: -5.956, region: "Northern Ireland", country: "Northern Ireland", trustSlug: "southern-health-and-social-care-trust", openingHours: "Open: 24 hours, 7 days a week", currentWait: 320, patientsWaiting: 35, totalPatients: 140,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Royal_Hospital_Belfast_02.jpg/960px-Royal_Hospital_Belfast_02.jpg",
    aliases: "The Royal, RVH Belfast",
    aboutText: "The Royal Victoria Hospital (RVH) is a major teaching hospital in the Falls Road area of Belfast, Northern Ireland. Part of Belfast Health and Social Care Trust, the hospital is one of the busiest emergency departments in Northern Ireland, handling over 100,000 attendances per year. The RVH is the regional trauma centre for Northern Ireland and provides specialist services including neurosurgery, cardiac surgery, and burns care. The hospital has undergone massive redevelopment with new critical care facilities and a modern emergency department. It has strong academic links with Queen's University Belfast.",
    departments: ["Emergency Department (A&E)", "Major Trauma Centre", "Neurosurgery", "Cardiac Surgery", "Burns Unit", "Critical Care", "Acute Medicine", "General Surgery", "Radiology", "Pathology"],
  },
  {
    name: "Ulster Hospital Dundonald", slug: "ulster-hospital-dundonald", type: "AE", city: "Belfast", postcode: "BT16 1RH", lat: 54.577, lng: -5.836, region: "Northern Ireland", country: "Northern Ireland", trustSlug: "southern-health-and-social-care-trust", openingHours: "Open: 24 hours, 7 days a week", currentWait: 275, patientsWaiting: 30, totalPatients: 110,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Ulster_Hospital.JPG/960px-Ulster_Hospital.JPG",
    aliases: "Ulster Hospital, Dundonald Hospital",
    aboutText: "The Ulster Hospital is a large acute hospital in Dundonald, on the outskirts of Belfast, part of the South Eastern Health and Social Care Trust. The hospital serves a population of approximately 350,000 across the greater Belfast area, North Down, Ards, and Lisburn. The Emergency Department handles over 90,000 attendances per year and is one of the busiest in Northern Ireland. The hospital has undergone a phased redevelopment programme including a new inpatient ward block and refurbished emergency care facilities. The Ulster Hospital provides comprehensive acute services and is a key hospital for the eastern region.",
    departments: ["Emergency Department (A&E)", "Acute Medicine", "General Surgery", "Orthopaedics", "Paediatrics", "Maternity", "Cardiology", "Respiratory Medicine", "Radiology", "Elderly Care"],
  },
  {
    name: "Craigavon Area Hospital", slug: "craigavon-area-hospital", type: "AE", city: "Craigavon", postcode: "BT63 5QQ", lat: 54.444, lng: -6.393, region: "Northern Ireland", country: "Northern Ireland", trustSlug: "southern-health-and-social-care-trust", openingHours: "Open: 24 hours, 7 days a week", currentWait: 190, patientsWaiting: 20, totalPatients: 80,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/08/Craigavon_Area_Hospital_-_Front_Entrance_-_geograph.org.uk_-_1401867.jpg",
    aliases: "Craigavon Hospital, CAH",
    aboutText: "Craigavon Area Hospital is the main acute hospital for the Southern Health and Social Care Trust, located in Craigavon, County Armagh. The hospital serves a population of approximately 350,000 across the Southern Trust area including Armagh, Dungannon, Banbridge, and Newry. The Emergency Department handles approximately 70,000 attendances per year and provides 24-hour emergency care. Craigavon Area Hospital is a modern facility that has been significantly expanded and refurbished in recent years, with new acute services block and improved emergency department facilities.",
    departments: ["Emergency Department (A&E)", "Acute Medicine", "General Surgery", "Orthopaedics", "Paediatrics", "Maternity", "Cardiology", "Respiratory Medicine", "Radiology"],
  },

  // Scotland
  {
    name: "Forth Valley Royal Hospital", slug: "forth-valley-royal-hospital", type: "AE", city: "Larbert", postcode: "FK5 4WR", lat: 56.028, lng: -3.813, region: "Scotland", country: "Scotland", trustSlug: "nhs-forth-valley", openingHours: "Open: 24 hours, 7 days a week", currentWait: 105, patientsWaiting: 15, totalPatients: 60,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/17/Forth_Valley_Royal_close.jpg",
    aliases: "FVRH, Larbert Hospital",
    aboutText: "Forth Valley Royal Hospital is a state-of-the-art acute hospital in Larbert, near Falkirk, Scotland. Part of NHS Forth Valley, the hospital opened in 2011 and replaced the Royal Scottish National Hospital and Falkirk & District Royal Infirmary. It serves a population of approximately 300,000 across the Forth Valley area including Falkirk, Stirling, and Clackmannanshire. The Emergency Department handles approximately 65,000 attendances per year. The hospital is one of the most modern in Scotland and features single-room accommodation for all inpatients, a dedicated assessment unit, and comprehensive diagnostic facilities.",
    departments: ["Emergency Department (A&E)", "Acute Medical Unit", "Critical Care", "General Surgery", "Orthopaedics", "Paediatrics", "Maternity", "Cardiology", "Stroke Unit", "Radiology"],
  },

  // North West (new region)
  {
    name: "Manchester Royal Infirmary", slug: "manchester-royal-infirmary", type: "AE", city: "Manchester", postcode: "M13 9WL", lat: 53.461, lng: -2.226, region: "North West", country: "England", trustSlug: "manchester-university-nhs-foundation-trust", phone: "0161 276 1234", openingHours: "Open: 24 hours, 7 days a week", currentWait: 265, patientsWaiting: 40, totalPatients: 145,
    aliases: "MRI, Manchester Royal, MRI A&E",
    aboutText: "Manchester Royal Infirmary (MRI) is a major teaching hospital in central Manchester, part of Manchester University NHS Foundation Trust, the largest NHS trust in England. The hospital is a major trauma centre for Greater Manchester and provides specialist services in transplantation, renal medicine, and infectious diseases. The Emergency Department handles over 130,000 attendances annually, making it one of the busiest in the country. MRI has strong academic links with the University of Manchester and is at the forefront of medical research and innovation. The hospital is part of the Manchester Royal campus alongside Saint Mary's Hospital and the Royal Manchester Children's Hospital.",
    departments: ["Emergency Department (A&E)", "Major Trauma Centre", "Transplant Centre", "Renal Medicine", "Infectious Diseases", "Critical Care", "Acute Medicine", "General Surgery", "Cardiology", "Radiology"],
  },

  // Yorkshire (new region)
  {
    name: "Leeds General Infirmary", slug: "leeds-general-infirmary", type: "AE", city: "Leeds", postcode: "LS1 3EX", lat: 53.802, lng: -1.553, region: "Yorkshire", country: "England", trustSlug: "leeds-teaching-hospitals-nhs-trust", phone: "0113 243 2799", openingHours: "Open: 24 hours, 7 days a week", currentWait: 215, patientsWaiting: 35, totalPatients: 130,
    aliases: "LGI, Leeds General, LGI A&E",
    aboutText: "Leeds General Infirmary (LGI) is a large teaching hospital in central Leeds, West Yorkshire. Part of Leeds Teaching Hospitals NHS Trust, one of the largest trusts in Europe, the hospital is a major trauma centre for West Yorkshire and provides specialist services in neurosurgery, cardiac surgery, and paediatric intensive care. The Emergency Department handles over 120,000 attendances per year. LGI has strong academic links with the University of Leeds and is a leading centre for clinical research. The hospital serves a population of approximately 780,000 for core services and up to 5.4 million for specialist services.",
    departments: ["Emergency Department (A&E)", "Major Trauma Centre", "Neurosurgery", "Cardiac Surgery", "Paediatric Intensive Care", "Critical Care", "Acute Medicine", "General Surgery", "Radiology"],
  },

  // North East (new region)
  {
    name: "Royal Victoria Infirmary Newcastle", slug: "royal-victoria-infirmary-newcastle", type: "AE", city: "Newcastle upon Tyne", postcode: "NE1 4LP", lat: 54.981, lng: -1.619, region: "North East", country: "England", trustSlug: "newcastle-upon-tyne-hospitals-nhs-foundation-trust", phone: "0191 233 6161", openingHours: "Open: 24 hours, 7 days a week", currentWait: 185, patientsWaiting: 28, totalPatients: 105,
    aliases: "RVI, RVI Newcastle, Newcastle Royal",
    aboutText: "The Royal Victoria Infirmary (RVI) is a major teaching hospital in central Newcastle upon Tyne. Part of Newcastle upon Tyne Hospitals NHS Foundation Trust, consistently rated as one of the best trusts in England, the hospital is a major trauma centre for the North East and provides specialist services in transplantation, cardiothoracic surgery, and paediatrics. The Emergency Department handles approximately 95,000 attendances per year. The RVI has strong links with Newcastle University and is renowned for its medical research. The Great North Children's Hospital, which provides specialist paediatric services for the region, is located on the RVI site.",
    departments: ["Emergency Department (A&E)", "Major Trauma Centre", "Great North Children's Hospital", "Transplant Centre", "Cardiothoracic Surgery", "Critical Care", "Acute Medicine", "Neurology", "Radiology"],
  },

  // Bristol (South West expansion)
  {
    name: "Bristol Royal Infirmary", slug: "bristol-royal-infirmary", type: "AE", city: "Bristol", postcode: "BS2 8HW", lat: 51.459, lng: -2.591, region: "South West", country: "England", trustSlug: "university-hospitals-bristol-and-weston", phone: "0117 923 0000", openingHours: "Open: 24 hours, 7 days a week", currentWait: 198, patientsWaiting: 32, totalPatients: 110,
    aliases: "BRI, Bristol Royal, BRI A&E",
    aboutText: "Bristol Royal Infirmary (BRI) is a large teaching hospital in the centre of Bristol. Part of University Hospitals Bristol and Weston NHS Foundation Trust, the hospital is a major trauma centre for the Severn area and provides specialist services in cardiac surgery, neurosurgery, and vascular surgery. The Emergency Department handles approximately 90,000 attendances per year. The BRI has strong academic links with the University of Bristol and is a leading centre for clinical research and medical education. The hospital campus is adjacent to Bristol Royal Hospital for Children, which provides specialist paediatric services for the region.",
    departments: ["Emergency Department (A&E)", "Major Trauma Centre", "Cardiac Surgery", "Neurosurgery", "Vascular Surgery", "Critical Care", "Acute Medicine", "General Surgery", "Oncology", "Radiology"],
  },

  // Midlands (new region)
  {
    name: "Queen's Medical Centre Nottingham", slug: "queens-medical-centre-nottingham", type: "AE", city: "Nottingham", postcode: "NG7 2UH", lat: 52.943, lng: -1.184, region: "Midlands", country: "England", trustSlug: "nottingham-university-hospitals-nhs-trust", phone: "0115 924 9924", openingHours: "Open: 24 hours, 7 days a week", currentWait: 225, patientsWaiting: 38, totalPatients: 135,
    aliases: "QMC, Queen's Med, QMC Nottingham",
    aboutText: "Queen's Medical Centre (QMC) is one of the largest teaching hospitals in the UK, located in Nottingham. Part of Nottingham University Hospitals NHS Trust, the hospital is a major trauma centre for the East Midlands and provides specialist services in neurosurgery, stroke, and paediatric intensive care. The Emergency Department is one of the busiest in England, handling over 130,000 attendances per year. The hospital is closely linked with the University of Nottingham and is a leading centre for medical research. QMC also houses the East Midlands Major Trauma Centre and the Nottingham Children's Hospital.",
    departments: ["Emergency Department (A&E)", "Major Trauma Centre", "East Midlands Trauma Centre", "Neurosurgery", "Stroke Centre", "Paediatric Intensive Care", "Critical Care", "Acute Medicine", "General Surgery", "Radiology"],
  },

  // UTCs (Urgent Treatment Centres)
  {
    name: "Homerton Urgent Treatment Centre", slug: "homerton-urgent-treatment-centre", type: "UTC", city: "London", postcode: "E9 6SR", lat: 51.548, lng: -0.043, region: "London", country: "England", trustSlug: "barts-health-nhs-trust", openingHours: "Open: 8am - 10pm, 7 days a week", currentWait: 45, patientsWaiting: 8, totalPatients: 25,
    aliases: "Homerton UTC, Homerton Walk-in",
    aboutText: "Homerton Urgent Treatment Centre provides walk-in care for non-life-threatening conditions such as minor injuries, sprains, minor burns, and infections. The centre is staffed by experienced clinicians and can handle a wide range of conditions that do not require a full A&E department. Patients are triaged on arrival and seen in order of clinical priority. The UTC can provide X-rays, blood tests, and minor procedures. If you are unsure whether you need A&E or a UTC, calling NHS 111 can help you decide. UTCs are typically much faster than A&E for minor conditions.",
    departments: ["Urgent Treatment Centre", "Minor Injuries", "X-ray", "Pharmacy"],
  },
  {
    name: "Edgware Urgent Treatment Centre", slug: "edgware-urgent-treatment-centre", type: "UTC", city: "London", postcode: "HA8 0AD", lat: 51.613, lng: -0.275, region: "London", country: "England", trustSlug: "barts-health-nhs-trust", openingHours: "Open: 8am - 8pm, 7 days a week", currentWait: 30, patientsWaiting: 5, totalPatients: 18,
    aliases: "Edgware UTC, Edgware Walk-in Centre",
    aboutText: "Edgware Urgent Treatment Centre provides same-day care for urgent but non-life-threatening conditions. The centre handles conditions such as cuts, minor fractures, sprains, skin infections, and urinary tract infections. It is an alternative to A&E for conditions that need prompt attention but are not emergencies. The UTC is staffed by GPs and emergency nurse practitioners who can prescribe medication, order X-rays, and refer to hospital specialists if needed.",
    departments: ["Urgent Treatment Centre", "Minor Injuries", "X-ray"],
  },
];

const insertHospital = db.prepare(
  `INSERT INTO hospitals (id, name, slug, type, city, postcode, lat, lng, region, country, trust_id, phone, opening_hours, image_url, aliases, about_text, departments)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
);

const insertReading = db.prepare(
  `INSERT INTO wait_readings (id, hospital_id, wait_minutes, patients_waiting, total_patients, source_timestamp, scraped_at, freshness)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
);

const now = new Date();

for (const h of hospitals) {
  const hospitalId = id();
  insertHospital.run(
    hospitalId, h.name, h.slug, h.type, h.city, h.postcode,
    h.lat, h.lng, h.region, h.country, trustMap[h.trustSlug],
    h.phone || null, h.openingHours, h.imageUrl || null,
    h.aliases || null, h.aboutText || null,
    h.departments ? JSON.stringify(h.departments) : null
  );

  for (let hoursAgo = 0; hoursAgo < 24; hoursAgo++) {
    const readingTime = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000);
    const variation = Math.round((Math.random() - 0.5) * 60);
    const wait = Math.max(10, h.currentWait + variation);
    const patients = h.patientsWaiting
      ? Math.max(1, h.patientsWaiting + Math.round((Math.random() - 0.5) * 10))
      : null;
    const total = h.totalPatients
      ? Math.max(5, h.totalPatients + Math.round((Math.random() - 0.5) * 20))
      : null;

    insertReading.run(
      id(),
      hospitalId,
      wait,
      patients,
      total,
      readingTime.toISOString(),
      readingTime.toISOString(),
      "live"
    );
  }
}

db.close();
console.log(`Seeded ${trusts.length} trusts and ${hospitals.length} hospitals with 24h of readings each.`);
