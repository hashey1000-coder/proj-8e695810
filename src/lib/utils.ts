export function generateId(): string {
  return crypto.randomUUID();
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function formatWaitTime(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) return `${hrs} hr`;
  return `${hrs} hr ${mins} min`;
}

export function waitSeverity(
  minutes: number | null
): "short" | "moderate" | "long" | "unknown" {
  if (minutes === null) return "unknown";
  if (minutes < 120) return "short";
  // 240 itself counts as Steady so the labels match the published
  // legend: Quiet <2h, Steady 2-4h, Busy over 4h.
  if (minutes <= 240) return "moderate";
  return "long";
}

/** Human label shown in status pills across the site. */
export function severityLabel(severity: string): string {
  switch (severity) {
    case "short":
      return "Quiet";
    case "moderate":
      return "Steady";
    case "long":
      return "Busy";
    default:
      return "No data";
  }
}

/** Full pill styling: label chip with tinted background. */
export function severityPill(severity: string): string {
  switch (severity) {
    case "short":
      return "text-emerald-800 bg-emerald-100";
    case "moderate":
      return "text-amber-800 bg-amber-100";
    case "long":
      return "text-rose-800 bg-rose-100";
    default:
      return "text-stone-500 bg-stone-100";
  }
}

export function severityColor(severity: string): string {
  switch (severity) {
    case "short":
      return "text-emerald-700 bg-emerald-50 border-emerald-200";
    case "moderate":
      return "text-amber-700 bg-amber-50 border-amber-200";
    case "long":
      return "text-rose-700 bg-rose-50 border-rose-200";
    default:
      return "text-stone-500 bg-stone-50 border-stone-200";
  }
}

export function severityDotColor(severity: string): string {
  switch (severity) {
    case "short":
      return "bg-emerald-500";
    case "moderate":
      return "bg-amber-500";
    case "long":
      return "bg-rose-500";
    default:
      return "bg-stone-400";
  }
}
