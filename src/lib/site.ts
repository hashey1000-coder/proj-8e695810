// Single source of truth for the site's identity and trust/E-E-A-T details.
// Update `lastReviewed` whenever the editorial pages are genuinely reviewed,
// and `contactEmail` if the inbox changes.
export const SITE = {
  name: "AEWaitTimes",
  domain: "aewaittimes.co.uk",
  url: "https://aewaittimes.co.uk",
  // Honest, collective byline — an independently run project, no invented
  // individuals or medical credentials.
  editorialTeam: "the AEWaitTimes editorial team",
  // A monitored inbox on the site's own domain. Make sure this mailbox exists
  // and is checked before relying on it.
  contactEmail: "hello@aewaittimes.co.uk",
  // Content-review date shown in the trust block and on editorial pages.
  // This is an editorial review date, not the live-data update time.
  lastReviewed: "22 November 2026",
} as const;

export const CONTACT_MAILTO = `mailto:${SITE.contactEmail}`;
