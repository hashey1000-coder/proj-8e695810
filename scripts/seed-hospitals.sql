-- Seed additional NHS trusts and hospitals
-- Run with: sqlite3 data/aewaittime.db < scripts/seed-hospitals.sql

-- ============================================================
-- NEW TRUSTS
-- ============================================================

INSERT OR IGNORE INTO trusts (id, name, slug, source_url, country) VALUES
  ('t-swbh', 'Sandwell and West Birmingham NHS Trust', 'sandwell-and-west-birmingham-nhs-trust', 'https://www.swbh.nhs.uk/patients-visitors/live-ae-wait-times/', 'England'),
  ('t-sath', 'The Shrewsbury and Telford Hospital NHS Trust', 'the-shrewsbury-and-telford-hospital-nhs-trust', 'https://www.sath.nhs.uk/wards-services/ed-waiting-times/', 'England'),
  ('t-uhmb', 'University Hospitals of Morecambe Bay NHS Foundation Trust', 'university-hospitals-of-morecambe-bay-nhs-foundation-trust', 'https://www.uhmb.nhs.uk/visiting-our-hospitals/emergency-urgent-admissions/live-a-and-e-waiting-times', 'England'),
  ('t-uhnm', 'University Hospitals of North Midlands NHS Trust', 'university-hospitals-of-north-midlands-nhs-trust', 'http://www.waittimes.uhnm.nhs.uk/', 'England'),
  ('t-glos', 'Gloucestershire Hospitals NHS Foundation Trust', 'gloucestershire-hospitals-nhs-foundation-trust', 'https://www.gloshospitals.nhs.uk/your-visit/urgent-advice-and-care/', 'England'),
  ('t-mkuh', 'Milton Keynes University Hospital NHS Foundation Trust', 'milton-keynes-university-hospital-nhs-foundation-trust', 'https://www.mkuh.nhs.uk/', 'England'),
  ('t-rbft', 'Royal Berkshire NHS Foundation Trust', 'royal-berkshire-nhs-foundation-trust', 'https://www.royalberkshire.nhs.uk/services-and-departments/emergency-department', 'England'),
  ('t-rcht', 'Royal Cornwall Hospitals NHS Trust', 'royal-cornwall-hospitals-nhs-trust', 'https://www.royalcornwall.nhs.uk/', 'England'),
  ('t-uhdb', 'University Hospitals of Derby and Burton NHS Foundation Trust', 'university-hospitals-of-derby-and-burton-nhs-foundation-trust', 'https://www.uhdb.nhs.uk/', 'England'),
  ('t-worcs', 'Worcestershire Acute Hospitals NHS Trust', 'worcestershire-acute-hospitals-nhs-trust', 'https://www.worcsacute.nhs.uk/', 'England'),
  ('t-wyev', 'Wye Valley NHS Trust', 'wye-valley-nhs-trust', 'https://www.wyevalley.nhs.uk/', 'England'),
  ('t-mtw', 'Maidstone and Tunbridge Wells NHS Trust', 'maidstone-and-tunbridge-wells-nhs-trust', 'https://www.mtw.nhs.uk/', 'England'),
  ('t-ulh', 'United Lincolnshire Teaching Hospitals NHS Trust', 'united-lincolnshire-teaching-hospitals-nhs-trust', 'https://www.ulh.nhs.uk/', 'England'),
  ('t-imperial', 'Imperial College Healthcare NHS Trust', 'imperial-college-healthcare-nhs-trust', 'https://www.imperial.nhs.uk/our-services/emergency-care', 'England'),
  ('t-nbt', 'Bristol NHS Foundation Trust', 'bristol-nhs-foundation-trust', 'https://www.nbt.nhs.uk/our-services/a-z-services/emergency-department', 'England'),
  ('t-kch', 'King''s College Hospital NHS Foundation Trust', 'kings-college-hospital-nhs-foundation-trust', 'https://www.kch.nhs.uk/', 'England'),
  ('t-gstt', 'Guy''s and St Thomas'' NHS Foundation Trust', 'guys-and-st-thomas-nhs-foundation-trust', 'https://www.guysandstthomas.nhs.uk/', 'England'),
  ('t-uclh', 'University College London Hospitals NHS Foundation Trust', 'university-college-london-hospitals-nhs-foundation-trust', 'https://www.uclh.nhs.uk/', 'England'),
  ('t-stg', 'St George''s University Hospitals NHS Foundation Trust', 'st-georges-university-hospitals-nhs-foundation-trust', 'https://www.stgeorges.nhs.uk/', 'England'),
  ('t-cw', 'Chelsea and Westminster Hospital NHS Foundation Trust', 'chelsea-and-westminster-hospital-nhs-foundation-trust', 'https://www.chelwest.nhs.uk/', 'England'),
  ('t-ltht', 'Leeds Teaching Hospitals NHS Trust', 'leeds-teaching-hospitals-nhs-trust', 'https://www.leedsth.nhs.uk/', 'England'),
  ('t-sth', 'Sheffield Teaching Hospitals NHS Foundation Trust', 'sheffield-teaching-hospitals-nhs-foundation-trust', 'https://www.sth.nhs.uk/', 'England'),
  ('t-mft', 'Manchester University NHS Foundation Trust', 'manchester-university-nhs-foundation-trust', 'https://mft.nhs.uk/', 'England'),
  ('t-ouh', 'Oxford University Hospitals NHS Foundation Trust', 'oxford-university-hospitals-nhs-foundation-trust', 'https://www.ouh.nhs.uk/', 'England'),
  ('t-cuh', 'Cambridge University Hospitals NHS Foundation Trust', 'cambridge-university-hospitals-nhs-foundation-trust', 'https://www.cuh.nhs.uk/', 'England'),
  ('t-nuth', 'The Newcastle upon Tyne Hospitals NHS Foundation Trust', 'the-newcastle-upon-tyne-hospitals-nhs-foundation-trust', 'https://www.newcastle-hospitals.nhs.uk/', 'England'),
  ('t-nnuh', 'Norfolk and Norwich University Hospitals NHS Foundation Trust', 'norfolk-and-norwich-university-hospitals-nhs-foundation-trust', 'https://www.nnuh.nhs.uk/', 'England'),
  ('t-nuh', 'Nottingham University Hospitals NHS Trust', 'nottingham-university-hospitals-nhs-trust', 'https://www.nuh.nhs.uk/', 'England'),
  ('t-luhft', 'Liverpool University Hospitals NHS Foundation Trust', 'liverpool-university-hospitals-nhs-foundation-trust', 'https://www.liverpoolft.nhs.uk/', 'England'),
  ('t-uhsm', 'Manchester University NHS Foundation Trust (Wythenshawe)', 'manchester-university-nhs-foundation-trust-wythenshawe', 'https://mft.nhs.uk/', 'England'),
  ('t-uhsnet', 'University Hospital Southampton NHS Foundation Trust', 'university-hospital-southampton-nhs-foundation-trust', 'https://www.uhs.nhs.uk/', 'England'),
  ('t-bsuh', 'University Hospitals Sussex NHS Foundation Trust', 'university-hospitals-sussex-nhs-foundation-trust', 'https://www.uhsussex.nhs.uk/', 'England'),
  ('t-elht', 'East Lancashire Hospitals NHS Trust', 'east-lancashire-hospitals-nhs-trust', 'https://www.elht.nhs.uk/', 'England'),
  ('t-lthtr', 'Lancashire Teaching Hospitals NHS Foundation Trust', 'lancashire-teaching-hospitals-nhs-foundation-trust', 'https://www.lancsteachinghospitals.nhs.uk/', 'England'),
  ('t-nth', 'Northampton General Hospital NHS Trust', 'northampton-general-hospital-nhs-trust', 'https://www.northamptongeneral.nhs.uk/', 'England'),
  ('t-heft', 'University Hospitals of Leicester NHS Trust', 'university-hospitals-of-leicester-nhs-trust', 'https://www.leicestershospitals.nhs.uk/', 'England'),
  ('t-epsom', 'Epsom and St Helier University Hospitals NHS Trust', 'epsom-and-st-helier-university-hospitals-nhs-trust', 'https://www.epsom-sthelier.nhs.uk/', 'England'),
  ('t-croydon', 'Croydon Health Services NHS Trust', 'croydon-health-services-nhs-trust', 'https://www.croydonhealthservices.nhs.uk/', 'England'),
  ('t-whittington', 'Whittington Health NHS Trust', 'whittington-health-nhs-trust', 'https://www.whittington.nhs.uk/', 'England'),
  ('t-nhs-lothian', 'NHS Lothian', 'nhs-lothian', 'https://www.nhslothian.scot/', 'Scotland'),
  ('t-nhs-gg', 'NHS Greater Glasgow and Clyde', 'nhs-greater-glasgow-and-clyde', 'https://www.nhsggc.scot/', 'Scotland'),
  ('t-nhs-grampian', 'NHS Grampian', 'nhs-grampian', 'https://www.nhsgrampian.org/', 'Scotland'),
  ('t-nhs-tayside', 'NHS Tayside', 'nhs-tayside', 'https://www.nhstayside.scot.nhs.uk/', 'Scotland'),
  ('t-nhs-lanarkshire', 'NHS Lanarkshire', 'nhs-lanarkshire', 'https://www.nhslanarkshire.scot.nhs.uk/', 'Scotland'),
  ('t-nhs-fife', 'NHS Fife', 'nhs-fife', 'https://www.nhsfife.org/', 'Scotland'),
  ('t-nhs-highland', 'NHS Highland', 'nhs-highland', 'https://www.nhshighland.scot.nhs.uk/', 'Scotland'),
  ('t-nhs-ayrshire', 'NHS Ayrshire and Arran', 'nhs-ayrshire-and-arran', 'https://www.nhsaaa.net/', 'Scotland'),
  ('t-nhs-dumfries', 'NHS Dumfries and Galloway', 'nhs-dumfries-and-galloway', 'https://www.nhsdg.co.uk/', 'Scotland'),
  ('t-nhs-borders', 'NHS Borders', 'nhs-borders', 'https://www.nhsborders.scot.nhs.uk/', 'Scotland');

-- ============================================================
-- NEW HOSPITALS (England)
-- ============================================================

-- Sandwell and West Birmingham
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-mmuh', 'Midland Metropolitan University Hospital', 'midland-metropolitan-university-hospital', 'AE', 'England', 'West Midlands', 't-swbh', 52.498, -1.981, 'Smethwick', 'Open: 24 hours, 7 days a week'),
  ('h-sandwell', 'Sandwell General Hospital', 'sandwell-general-hospital', 'AE', 'England', 'West Midlands', 't-swbh', 52.516, -2.009, 'West Bromwich', 'Open: 24 hours, 7 days a week');

-- SaTH
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-rsh', 'Royal Shrewsbury Hospital', 'royal-shrewsbury-hospital', 'AE', 'England', 'West Midlands', 't-sath', 52.715, -2.771, 'Shrewsbury', 'Open: 24 hours, 7 days a week'),
  ('h-prh', 'Princess Royal Hospital', 'princess-royal-hospital-telford', 'AE', 'England', 'West Midlands', 't-sath', 52.690, -2.494, 'Telford', 'Open: 24 hours, 7 days a week');

-- Morecambe Bay
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-rli', 'Royal Lancaster Infirmary', 'royal-lancaster-infirmary', 'AE', 'England', 'North West', 't-uhmb', 54.050, -2.800, 'Lancaster', 'Open: 24 hours, 7 days a week'),
  ('h-fgh', 'Furness General Hospital', 'furness-general-hospital', 'AE', 'England', 'North West', 't-uhmb', 54.124, -3.207, 'Barrow-in-Furness', 'Open: 24 hours, 7 days a week'),
  ('h-wgh', 'Westmorland General Hospital', 'westmorland-general-hospital', 'UTC', 'England', 'North West', 't-uhmb', 54.333, -2.745, 'Kendal', 'Open: 8am - 8pm, 7 days a week');

-- UHNM
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-rsuh', 'Royal Stoke University Hospital', 'royal-stoke-university-hospital', 'AE', 'England', 'West Midlands', 't-uhnm', 52.987, -2.182, 'Stoke-on-Trent', 'Open: 24 hours, 7 days a week'),
  ('h-county-stafford', 'County Hospital Stafford', 'county-hospital-stafford', 'AE', 'England', 'West Midlands', 't-uhnm', 52.810, -2.119, 'Stafford', 'Open: 24 hours, 7 days a week');

-- Gloucestershire
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-grh', 'Gloucestershire Royal Hospital', 'gloucestershire-royal-hospital', 'AE', 'England', 'South West', 't-glos', 51.862, -2.231, 'Gloucester', 'Open: 24 hours, 7 days a week'),
  ('h-cgh', 'Cheltenham General Hospital', 'cheltenham-general-hospital', 'AE', 'England', 'South West', 't-glos', 51.908, -2.058, 'Cheltenham', 'Open: 24 hours, 7 days a week');

-- Milton Keynes
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-mkuh', 'Milton Keynes University Hospital', 'milton-keynes-university-hospital', 'AE', 'England', 'South East', 't-mkuh', 52.025, -0.735, 'Milton Keynes', 'Open: 24 hours, 7 days a week');

-- Royal Berkshire
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-rbh', 'Royal Berkshire Hospital', 'royal-berkshire-hospital', 'AE', 'England', 'South East', 't-rbft', 51.455, -0.963, 'Reading', 'Open: 24 hours, 7 days a week');

-- Royal Cornwall
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-rch', 'Royal Cornwall Hospital', 'royal-cornwall-hospital', 'AE', 'England', 'South West', 't-rcht', 50.275, -5.053, 'Truro', 'Open: 24 hours, 7 days a week');

-- Derby and Burton
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-rdc', 'Royal Derby Hospital', 'royal-derby-hospital', 'AE', 'England', 'Midlands', 't-uhdb', 52.902, -1.511, 'Derby', 'Open: 24 hours, 7 days a week'),
  ('h-qhb', 'Queen''s Hospital Burton', 'queens-hospital-burton', 'AE', 'England', 'Midlands', 't-uhdb', 52.805, -1.636, 'Burton upon Trent', 'Open: 24 hours, 7 days a week');

-- Worcestershire
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-wrh', 'Worcestershire Royal Hospital', 'worcestershire-royal-hospital', 'AE', 'England', 'West Midlands', 't-worcs', 52.183, -2.174, 'Worcester', 'Open: 24 hours, 7 days a week'),
  ('h-ahr', 'Alexandra Hospital Redditch', 'alexandra-hospital-redditch', 'AE', 'England', 'West Midlands', 't-worcs', 52.297, -1.932, 'Redditch', 'Open: 24 hours, 7 days a week');

-- Wye Valley
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-hch', 'Hereford County Hospital', 'hereford-county-hospital', 'AE', 'England', 'West Midlands', 't-wyev', 52.053, -2.703, 'Hereford', 'Open: 24 hours, 7 days a week');

-- Maidstone and Tunbridge Wells
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-twh', 'Tunbridge Wells Hospital', 'tunbridge-wells-hospital', 'AE', 'England', 'South East', 't-mtw', 51.145, 0.277, 'Tunbridge Wells', 'Open: 24 hours, 7 days a week');

-- United Lincolnshire
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-lincoln', 'Lincoln County Hospital', 'lincoln-county-hospital', 'AE', 'England', 'East Midlands', 't-ulh', 53.226, -0.557, 'Lincoln', 'Open: 24 hours, 7 days a week'),
  ('h-pilgrim', 'Pilgrim Hospital', 'pilgrim-hospital', 'AE', 'England', 'East Midlands', 't-ulh', 52.988, -0.029, 'Boston', 'Open: 24 hours, 7 days a week'),
  ('h-grantham', 'Grantham and District Hospital', 'grantham-and-district-hospital', 'UTC', 'England', 'East Midlands', 't-ulh', 52.907, -0.643, 'Grantham', 'Open: 8am - 8pm, 7 days a week');

-- Imperial College Healthcare
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-stmarys', 'St Mary''s Hospital', 'st-marys-hospital-london', 'AE', 'England', 'London', 't-imperial', 51.517, -0.174, 'London', 'Open: 24 hours, 7 days a week'),
  ('h-charingx', 'Charing Cross Hospital', 'charing-cross-hospital', 'AE', 'England', 'London', 't-imperial', 51.487, -0.219, 'London', 'Open: 24 hours, 7 days a week');

-- Bristol (merged trust)
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-southmead', 'Southmead Hospital', 'southmead-hospital', 'AE', 'England', 'South West', 't-nbt', 51.499, -2.594, 'Bristol', 'Open: 24 hours, 7 days a week');

-- King's College
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-kch', 'King''s College Hospital', 'kings-college-hospital', 'AE', 'England', 'London', 't-kch', 51.468, -0.094, 'London', 'Open: 24 hours, 7 days a week'),
  ('h-pruh', 'Princess Royal University Hospital', 'princess-royal-university-hospital', 'AE', 'England', 'London', 't-kch', 51.378, 0.023, 'Orpington', 'Open: 24 hours, 7 days a week');

-- Guy's and St Thomas'
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-stthomas', 'St Thomas'' Hospital', 'st-thomas-hospital', 'AE', 'England', 'London', 't-gstt', 51.499, -0.118, 'London', 'Open: 24 hours, 7 days a week');

-- UCLH
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-uclh', 'University College Hospital', 'university-college-hospital', 'AE', 'England', 'London', 't-uclh', 51.525, -0.137, 'London', 'Open: 24 hours, 7 days a week');

-- St George's
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-stgeorges', 'St George''s Hospital', 'st-georges-hospital', 'AE', 'England', 'London', 't-stg', 51.427, -0.175, 'London', 'Open: 24 hours, 7 days a week');

-- Chelsea and Westminster
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-chelwest', 'Chelsea and Westminster Hospital', 'chelsea-and-westminster-hospital', 'AE', 'England', 'London', 't-cw', 51.484, -0.181, 'London', 'Open: 24 hours, 7 days a week'),
  ('h-wm', 'West Middlesex University Hospital', 'west-middlesex-university-hospital', 'AE', 'England', 'London', 't-cw', 51.473, -0.324, 'Isleworth', 'Open: 24 hours, 7 days a week');

-- Leeds Teaching
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-sjuh', 'St James''s University Hospital', 'st-jamess-university-hospital', 'AE', 'England', 'Yorkshire', 't-ltht', 53.802, -1.522, 'Leeds', 'Open: 24 hours, 7 days a week');

-- Sheffield Teaching
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-ngh', 'Northern General Hospital', 'northern-general-hospital', 'AE', 'England', 'Yorkshire', 't-sth', 53.405, -1.460, 'Sheffield', 'Open: 24 hours, 7 days a week');

-- Manchester University FT
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-wythenshawe', 'Wythenshawe Hospital', 'wythenshawe-hospital', 'AE', 'England', 'North West', 't-mft', 53.388, -2.291, 'Manchester', 'Open: 24 hours, 7 days a week'),
  ('h-nmgh', 'North Manchester General Hospital', 'north-manchester-general-hospital', 'AE', 'England', 'North West', 't-mft', 53.522, -2.218, 'Manchester', 'Open: 24 hours, 7 days a week');

-- Oxford University Hospitals
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-jrh', 'John Radcliffe Hospital', 'john-radcliffe-hospital', 'AE', 'England', 'South East', 't-ouh', 51.764, -1.220, 'Oxford', 'Open: 24 hours, 7 days a week'),
  ('h-horton', 'Horton General Hospital', 'horton-general-hospital', 'AE', 'England', 'South East', 't-ouh', 52.060, -1.339, 'Banbury', 'Open: 24 hours, 7 days a week');

-- Cambridge University Hospitals
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-addenbrookes', 'Addenbrooke''s Hospital', 'addenbrookes-hospital', 'AE', 'England', 'East of England', 't-cuh', 52.175, 0.140, 'Cambridge', 'Open: 24 hours, 7 days a week');

-- Newcastle upon Tyne Hospitals
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-freeman', 'Freeman Hospital', 'freeman-hospital', 'AE', 'England', 'North East', 't-nuth', 54.982, -1.593, 'Newcastle upon Tyne', 'Open: 24 hours, 7 days a week');

-- Norfolk and Norwich
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-nnuh', 'Norfolk and Norwich University Hospital', 'norfolk-and-norwich-university-hospital', 'AE', 'England', 'East of England', 't-nnuh', 52.622, 1.222, 'Norwich', 'Open: 24 hours, 7 days a week');

-- Nottingham University Hospitals
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-kingsmill', 'King''s Mill Hospital', 'kings-mill-hospital', 'AE', 'England', 'Midlands', 't-nuh', 53.116, -1.287, 'Mansfield', 'Open: 24 hours, 7 days a week');

-- Liverpool University Hospitals
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-rluh', 'Royal Liverpool University Hospital', 'royal-liverpool-university-hospital', 'AE', 'England', 'North West', 't-luhft', 53.405, -2.968, 'Liverpool', 'Open: 24 hours, 7 days a week'),
  ('h-aintree', 'Aintree University Hospital', 'aintree-university-hospital', 'AE', 'England', 'North West', 't-luhft', 53.468, -2.939, 'Liverpool', 'Open: 24 hours, 7 days a week');

-- University Hospital Southampton
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-sgh', 'Southampton General Hospital', 'southampton-general-hospital', 'AE', 'England', 'South East', 't-uhsnet', 50.933, -1.434, 'Southampton', 'Open: 24 hours, 7 days a week');

-- University Hospitals Sussex
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-rsch', 'Royal Sussex County Hospital', 'royal-sussex-county-hospital', 'AE', 'England', 'South East', 't-bsuh', 50.820, -0.123, 'Brighton', 'Open: 24 hours, 7 days a week'),
  ('h-strich', 'St Richard''s Hospital', 'st-richards-hospital', 'AE', 'England', 'South East', 't-bsuh', 50.842, -0.776, 'Chichester', 'Open: 24 hours, 7 days a week'),
  ('h-worthing', 'Worthing Hospital', 'worthing-hospital', 'AE', 'England', 'South East', 't-bsuh', 50.818, -0.377, 'Worthing', 'Open: 24 hours, 7 days a week');

-- East Lancashire
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-rblackburn', 'Royal Blackburn Hospital', 'royal-blackburn-hospital', 'AE', 'England', 'North West', 't-elht', 53.739, -2.467, 'Blackburn', 'Open: 24 hours, 7 days a week'),
  ('h-burnley', 'Burnley General Hospital', 'burnley-general-hospital', 'AE', 'England', 'North West', 't-elht', 53.786, -2.244, 'Burnley', 'Open: 24 hours, 7 days a week');

-- Lancashire Teaching
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-rph', 'Royal Preston Hospital', 'royal-preston-hospital', 'AE', 'England', 'North West', 't-lthtr', 53.773, -2.706, 'Preston', 'Open: 24 hours, 7 days a week'),
  ('h-chorley', 'Chorley and South Ribble Hospital', 'chorley-and-south-ribble-hospital', 'AE', 'England', 'North West', 't-lthtr', 53.654, -2.617, 'Chorley', 'Open: 24 hours, 7 days a week');

-- Northampton
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-ngh-northampton', 'Northampton General Hospital', 'northampton-general-hospital', 'AE', 'England', 'Midlands', 't-nth', 52.247, -0.879, 'Northampton', 'Open: 24 hours, 7 days a week');

-- Leicester
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-lri', 'Leicester Royal Infirmary', 'leicester-royal-infirmary', 'AE', 'England', 'Midlands', 't-heft', 52.626, -1.138, 'Leicester', 'Open: 24 hours, 7 days a week');

-- Epsom and St Helier
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-sthelier', 'St Helier Hospital', 'st-helier-hospital', 'AE', 'England', 'London', 't-epsom', 51.375, -0.195, 'Carshalton', 'Open: 24 hours, 7 days a week');

-- Croydon
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-croydon', 'Croydon University Hospital', 'croydon-university-hospital', 'AE', 'England', 'London', 't-croydon', 51.389, -0.108, 'Croydon', 'Open: 24 hours, 7 days a week');

-- Whittington
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-whittington', 'Whittington Hospital', 'whittington-hospital', 'AE', 'England', 'London', 't-whittington', 51.566, -0.138, 'London', 'Open: 24 hours, 7 days a week');

-- North Cumbria (missing hospitals from existing trust)
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-cumberland', 'Cumberland Infirmary', 'cumberland-infirmary', 'AE', 'England', 'North West', (SELECT id FROM trusts WHERE slug = 'north-cumbria-integrated-care-nhs-foundation-trust'), 54.894, -2.944, 'Carlisle', 'Open: 24 hours, 7 days a week'),
  ('h-westcumberland', 'West Cumberland Hospital', 'west-cumberland-hospital', 'AE', 'England', 'North West', (SELECT id FROM trusts WHERE slug = 'north-cumbria-integrated-care-nhs-foundation-trust'), 54.554, -3.568, 'Whitehaven', 'Open: 24 hours, 7 days a week');

-- Mid Cheshire (missing hospital)
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-leighton', 'Leighton Hospital', 'leighton-hospital', 'AE', 'England', 'North West', (SELECT id FROM trusts WHERE slug = 'mid-cheshire-hospitals-nhs-foundation-trust'), 53.099, -2.467, 'Crewe', 'Open: 24 hours, 7 days a week');

-- Warrington (missing hospital)
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-warrington', 'Warrington Hospital', 'warrington-hospital', 'AE', 'England', 'North West', (SELECT id FROM trusts WHERE slug = 'warrington-and-halton-teaching-hospitals-nhs-foundation-trust'), 53.397, -2.575, 'Warrington', 'Open: 24 hours, 7 days a week'),
  ('h-runcorn', 'Halton Hospital', 'halton-hospital', 'UTC', 'England', 'North West', (SELECT id FROM trusts WHERE slug = 'warrington-and-halton-teaching-hospitals-nhs-foundation-trust'), 53.334, -2.728, 'Runcorn', 'Open: 8am - 10pm, 7 days a week');

-- Torbay (missing hospital from existing trust)
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-torbay', 'Torbay Hospital', 'torbay-hospital', 'AE', 'England', 'South West', (SELECT id FROM trusts WHERE slug = 'torbay-and-south-devon-nhs-foundation-trust'), 50.472, -3.543, 'Torquay', 'Open: 24 hours, 7 days a week');

-- UHCW (missing hospital from existing trust)
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-uhcw', 'University Hospital Coventry', 'university-hospital-coventry', 'AE', 'England', 'Midlands', (SELECT id FROM trusts WHERE slug = 'university-hospitals-coventry-and-warwickshire-nhs-trust'), 52.421, -1.447, 'Coventry', 'Open: 24 hours, 7 days a week');

-- UHB Solihull (missing from existing trust)
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-solihull', 'Solihull Hospital', 'solihull-hospital', 'UTC', 'England', 'Birmingham & Solihull', (SELECT id FROM trusts WHERE slug = 'university-hospitals-birmingham-nhs-foundation-trust'), 52.415, -1.771, 'Solihull', 'Open: 8am - 10pm, 7 days a week');

-- ============================================================
-- NEW HOSPITALS (Scotland)
-- ============================================================
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-rie', 'Royal Infirmary of Edinburgh', 'royal-infirmary-of-edinburgh', 'AE', 'Scotland', 'Scotland', 't-nhs-lothian', 55.921, -3.134, 'Edinburgh', 'Open: 24 hours, 7 days a week'),
  ('h-wgh-edinburgh', 'Western General Hospital Edinburgh', 'western-general-hospital-edinburgh', 'AE', 'Scotland', 'Scotland', 't-nhs-lothian', 55.962, -3.236, 'Edinburgh', 'Open: 24 hours, 7 days a week'),
  ('h-stj-livingston', 'St John''s Hospital', 'st-johns-hospital-livingston', 'AE', 'Scotland', 'Scotland', 't-nhs-lothian', 55.898, -3.503, 'Livingston', 'Open: 24 hours, 7 days a week'),
  ('h-qeuh', 'Queen Elizabeth University Hospital', 'queen-elizabeth-university-hospital-glasgow', 'AE', 'Scotland', 'Scotland', 't-nhs-gg', 55.862, -4.341, 'Glasgow', 'Open: 24 hours, 7 days a week'),
  ('h-gri', 'Glasgow Royal Infirmary', 'glasgow-royal-infirmary', 'AE', 'Scotland', 'Scotland', 't-nhs-gg', 55.865, -4.233, 'Glasgow', 'Open: 24 hours, 7 days a week'),
  ('h-rahi', 'Royal Alexandra Hospital', 'royal-alexandra-hospital-paisley', 'AE', 'Scotland', 'Scotland', 't-nhs-gg', 55.837, -4.403, 'Paisley', 'Open: 24 hours, 7 days a week'),
  ('h-ari', 'Aberdeen Royal Infirmary', 'aberdeen-royal-infirmary', 'AE', 'Scotland', 'Scotland', 't-nhs-grampian', 57.152, -2.132, 'Aberdeen', 'Open: 24 hours, 7 days a week'),
  ('h-dri', 'Dr Gray''s Hospital', 'dr-grays-hospital', 'AE', 'Scotland', 'Scotland', 't-nhs-grampian', 57.653, -3.317, 'Elgin', 'Open: 24 hours, 7 days a week'),
  ('h-ninewells', 'Ninewells Hospital', 'ninewells-hospital', 'AE', 'Scotland', 'Scotland', 't-nhs-tayside', 56.457, -2.982, 'Dundee', 'Open: 24 hours, 7 days a week'),
  ('h-pri-perth', 'Perth Royal Infirmary', 'perth-royal-infirmary', 'AE', 'Scotland', 'Scotland', 't-nhs-tayside', 56.401, -3.442, 'Perth', 'Open: 24 hours, 7 days a week'),
  ('h-hairmyres', 'Hairmyres Hospital', 'hairmyres-hospital', 'AE', 'Scotland', 'Scotland', 't-nhs-lanarkshire', 55.763, -4.182, 'East Kilbride', 'Open: 24 hours, 7 days a week'),
  ('h-wishaw', 'University Hospital Wishaw', 'university-hospital-wishaw', 'AE', 'Scotland', 'Scotland', 't-nhs-lanarkshire', 55.774, -3.928, 'Wishaw', 'Open: 24 hours, 7 days a week'),
  ('h-monklands', 'University Hospital Monklands', 'university-hospital-monklands', 'AE', 'Scotland', 'Scotland', 't-nhs-lanarkshire', 55.863, -3.977, 'Airdrie', 'Open: 24 hours, 7 days a week'),
  ('h-victoria-kirkcaldy', 'Victoria Hospital Kirkcaldy', 'victoria-hospital-kirkcaldy', 'AE', 'Scotland', 'Scotland', 't-nhs-fife', 56.107, -3.149, 'Kirkcaldy', 'Open: 24 hours, 7 days a week'),
  ('h-raigmore', 'Raigmore Hospital', 'raigmore-hospital', 'AE', 'Scotland', 'Scotland', 't-nhs-highland', 57.468, -4.215, 'Inverness', 'Open: 24 hours, 7 days a week'),
  ('h-crosshouse', 'University Hospital Crosshouse', 'university-hospital-crosshouse', 'AE', 'Scotland', 'Scotland', 't-nhs-ayrshire', 55.626, -4.554, 'Kilmarnock', 'Open: 24 hours, 7 days a week'),
  ('h-ayr', 'University Hospital Ayr', 'university-hospital-ayr', 'AE', 'Scotland', 'Scotland', 't-nhs-ayrshire', 55.454, -4.631, 'Ayr', 'Open: 24 hours, 7 days a week'),
  ('h-dgri', 'Dumfries and Galloway Royal Infirmary', 'dumfries-and-galloway-royal-infirmary', 'AE', 'Scotland', 'Scotland', 't-nhs-dumfries', 55.068, -3.597, 'Dumfries', 'Open: 24 hours, 7 days a week'),
  ('h-bgh', 'Borders General Hospital', 'borders-general-hospital', 'AE', 'Scotland', 'Scotland', 't-nhs-borders', 55.583, -2.786, 'Melrose', 'Open: 24 hours, 7 days a week');

-- ============================================================
-- ADDITIONAL NI HOSPITALS (from NI scraper coords)
-- ============================================================
INSERT OR IGNORE INTO hospitals (id, name, slug, type, country, region, trust_id, lat, lng, city, opening_hours) VALUES
  ('h-altnagelvin', 'Altnagelvin Area Hospital', 'altnagelvin-area-hospital', 'AE', 'Northern Ireland', 'Northern Ireland', (SELECT id FROM trusts WHERE slug = 'hsc-northern-ireland'), 55.005, -7.299, 'Derry', 'Open: 24 hours, 7 days a week'),
  ('h-antrim', 'Antrim Area Hospital', 'antrim-area-hospital', 'AE', 'Northern Ireland', 'Northern Ireland', (SELECT id FROM trusts WHERE slug = 'hsc-northern-ireland'), 54.728, -6.229, 'Antrim', 'Open: 24 hours, 7 days a week'),
  ('h-mater', 'Mater Hospital Belfast', 'mater-hospital-belfast', 'AE', 'Northern Ireland', 'Northern Ireland', (SELECT id FROM trusts WHERE slug = 'hsc-northern-ireland'), 54.607, -5.940, 'Belfast', 'Open: 24 hours, 7 days a week'),
  ('h-daisyhill', 'Daisy Hill Hospital', 'daisy-hill-hospital-newry', 'AE', 'Northern Ireland', 'Northern Ireland', (SELECT id FROM trusts WHERE slug = 'hsc-northern-ireland'), 54.181, -6.344, 'Newry', 'Open: 24 hours, 7 days a week'),
  ('h-causeway', 'Causeway Hospital', 'causeway-hospital-coleraine', 'AE', 'Northern Ireland', 'Northern Ireland', (SELECT id FROM trusts WHERE slug = 'hsc-northern-ireland'), 55.136, -6.681, 'Coleraine', 'Open: 24 hours, 7 days a week'),
  ('h-swah', 'South West Acute Hospital', 'south-west-acute-hospital-enniskillen', 'AE', 'Northern Ireland', 'Northern Ireland', (SELECT id FROM trusts WHERE slug = 'hsc-northern-ireland'), 54.345, -7.647, 'Enniskillen', 'Open: 24 hours, 7 days a week');
