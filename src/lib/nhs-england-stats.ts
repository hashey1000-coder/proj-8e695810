// NHS England org code → our trust name mapping
// Source: NHS England Monthly A&E SitRep (August 2026)
// Only England trusts — Scotland, Wales, NI have separate systems

const TRUST_ORG_CODES: Record<string, string> = {
  R1H: "Barts Health NHS Trust",
  RA7: "University Hospitals Bristol and Weston NHS Foundation Trust",
  RGT: "Cambridge University Hospitals NHS Foundation Trust",
  RQM: "Chelsea and Westminster Hospital NHS Foundation Trust",
  RJ6: "Croydon Health Services NHS Trust",
  RVV: "East Kent Hospitals University NHS Foundation Trust",
  RXR: "East Lancashire Hospitals NHS Trust",
  RVR: "Epsom and St Helier University Hospitals NHS Trust",
  RTE: "Gloucestershire Hospitals NHS Foundation Trust",
  RJ1: "Guy's and St Thomas' NHS Foundation Trust",
  RYJ: "Imperial College Healthcare NHS Trust",
  RJZ: "King's College Hospital NHS Foundation Trust",
  RXN: "Lancashire Teaching Hospitals NHS Foundation Trust",
  RR8: "Leeds Teaching Hospitals NHS Trust",
  RJ2: "Lewisham and Greenwich NHS Trust",
  REM: "Liverpool University Hospitals NHS Foundation Trust",
  RWF: "Maidstone and Tunbridge Wells NHS Trust",
  R0A: "Manchester University NHS Foundation Trust",
  RBT: "Mid Cheshire Hospitals NHS Foundation Trust",
  RD8: "Milton Keynes University Hospital NHS Foundation Trust",
  RTD: "The Newcastle upon Tyne Hospitals NHS Foundation Trust",
  RM1: "Norfolk and Norwich University Hospitals NHS Foundation Trust",
  RWW: "North Cheshire and Mersey NHS Foundation Trust",
  RNN: "North Cumbria Integrated Care NHS Foundation Trust",
  RNS: "Northampton General Hospital NHS Trust",
  RX1: "Nottingham University Hospitals NHS Trust",
  RTH: "Oxford University Hospitals NHS Foundation Trust",
  RHW: "Royal Berkshire NHS Foundation Trust",
  REF: "Royal Cornwall Hospitals NHS Trust",
  RXK: "Sandwell and West Birmingham NHS Trust",
  RHQ: "Sheffield Teaching Hospitals NHS Foundation Trust",
  RXW: "The Shrewsbury and Telford Hospital NHS Trust",
  RJ7: "St George's University Hospitals NHS Foundation Trust",
  RA9: "Torbay and South Devon NHS Foundation Trust",
  RRV: "University College London Hospitals NHS Foundation Trust",
  RHM: "University Hospital Southampton NHS Foundation Trust",
  RRK: "University Hospitals Birmingham NHS Foundation Trust",
  RKB: "University Hospitals Coventry and Warwickshire NHS Trust",
  RTG: "University Hospitals of Derby and Burton NHS Foundation Trust",
  RUE: "University Hospitals of Leicester NHS Trust",
  RTX: "University Hospitals of Morecambe Bay NHS Foundation Trust",
  RJE: "University Hospitals of North Midlands NHS Trust",
  RDU: "University Hospitals Plymouth NHS Trust",
  RYR: "University Hospitals Sussex NHS Foundation Trust",
  RWD: "United Lincolnshire Teaching Hospitals NHS Trust",
  RKE: "Whittington Health NHS Trust",
  RWP: "Worcestershire Acute Hospitals NHS Trust",
  RLQ: "Wye Valley NHS Trust",
};

// Estimated average wait minutes per trust, computed from NHS England August 2026 SitRep
// Formula: ((seen_within_4h * 90) + (over_4h * 360)) / total_type1_attendances
// This gives a rough average based on: <4h patients avg ~90min, >4h patients avg ~360min
export const NHS_ENGLAND_TYPICAL_WAITS: Record<string, { avgWaitMinutes: number; pctWithin4h: number; period: string }> = {};

// Raw data from August 2026 CSV: [orgCode, type1Attendances, over4hType1]
const RAW_DATA: [string, number, number][] = [
  ["R1H", 25241, 9913],
  ["RA7", 11766, 3536],
  ["RGT", 8088, 3590],
  ["RQM", 19588, 4899],
  ["RJ6", 12853, 4740],
  ["RVV", 9780, 5355],
  ["RXR", 10139, 3539],
  ["RVR", 10656, 3845],
  ["RTE", 12010, 4221],
  ["RJ1", 10514, 4222],
  ["RYJ", 12210, 5201],
  ["RJZ", 15037, 6722],
  ["RXN", 8684, 2856],
  ["RR8", 17403, 6005],
  ["RJ2", 15343, 8254],
  ["REM", 15553, 7604],
  ["RWF", 6790, 1815],
  ["R0A", 21903, 8426],
  ["RBT", 4804, 2260],
  ["RD8", 6001, 3148],
  ["RTD", 15204, 6413],
  ["RM1", 7974, 2294],
  ["RWW", 8502, 3975],
  ["RNN", 6549, 3243],
  ["RNS", 8427, 3209],
  ["RX1", 18017, 10349],
  ["RTH", 10606, 2738],
  ["RHW", 7095, 2629],
  ["REF", 5437, 2921],
  ["RXK", 9756, 4256],
  ["RHQ", 14457, 4831],
  ["RXW", 8080, 4585],
  ["RJ7", 9069, 2310],
  ["RA9", 5424, 2793],
  ["RRV", 13094, 3403],
  ["RHM", 11694, 4384],
  ["RRK", 16101, 6699],
  ["RKB", 11213, 4527],
  ["RTG", 10779, 5282],
  ["RUE", 16741, 8041],
  ["RTX", 5907, 2484],
  ["RJE", 11587, 6030],
  ["RDU", 10207, 4102],
  ["RYR", 16001, 7164],
  ["RWD", 8618, 2833],
  ["RKE", 9000, 2556],
  ["RWP", 8789, 4291],
  ["RLQ", 2783, 1195],
];

for (const [code, total, over4h] of RAW_DATA) {
  const trustName = TRUST_ORG_CODES[code];
  if (!trustName) continue;
  const avgWait = Math.round(((total - over4h) * 90 + over4h * 360) / total);
  const pct = Math.round(((total - over4h) / total) * 1000) / 10;
  NHS_ENGLAND_TYPICAL_WAITS[trustName] = {
    avgWaitMinutes: avgWait,
    pctWithin4h: pct,
    period: "August 2026",
  };
}

export function getTypicalWaitForTrust(trustName: string): { avgWaitMinutes: number; pctWithin4h: number; period: string } | null {
  return NHS_ENGLAND_TYPICAL_WAITS[trustName] ?? null;
}
