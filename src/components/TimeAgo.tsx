"use client";

import { useSyncExternalStore } from "react";

/**
 * SQLite's datetime('now') stores UTC as "YYYY-MM-DD HH:MM:SS" with no
 * timezone marker, which JavaScript would misparse as LOCAL time (an hour
 * off during BST). Append a Z unless the string already carries a zone.
 */
export function parseDbTimestamp(value: string): Date {
  const hasZone = /[zZ]$|[+-]\d{2}:?\d{2}$/.test(value);
  return new Date(hasZone ? value : value.replace(" ", "T") + "Z");
}

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 60_000);
  return () => clearInterval(id);
}

function clientMinute(): number {
  return Math.floor(Date.now() / 60_000);
}

// Server/prerender snapshot: -1 signals "clock not available", so the
// static HTML shows a neutral word instead of a build-time-frozen "x min
// ago". React re-renders with the real client snapshot right after
// hydration, replacing it with the live value.
function serverMinute(): number {
  return -1;
}

function describe(diffMs: number): string {
  const mins = Math.floor(diffMs / 60_000);
  if (mins < 1) return "moments ago";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  const days = Math.floor(hrs / 24);
  return days === 1 ? "1 day ago" : `${days} days ago`;
}

/**
 * Live "x min ago" label for a DB timestamp. Renders "recently" in the
 * prerendered HTML, then swaps to the true relative time on the client and
 * keeps itself fresh every minute.
 */
export function TimeAgo({ timestamp }: { timestamp: string }) {
  const minute = useSyncExternalStore(subscribe, clientMinute, serverMinute);

  if (minute < 0) return <span>recently</span>;

  const diff = minute * 60_000 - parseDbTimestamp(timestamp).getTime();
  return <span>{describe(Math.max(0, diff))}</span>;
}
