# aewaittimes.co.uk

Live NHS A&E waiting-time tracker ("AEWaitTimes"). Independent sister project of `~/aandewaittime` (aewaittimes.uk) — it shares the same data logic (SQLite schema, scrapers, queries) but has a fully unique brand, design and written content. Never copy copy/design between the two sites.

## Stack
- Next.js (App Router, `output: "export"` static export) + TypeScript + Tailwind v4
- SQLite via better-sqlite3 at `data/aewaittime.db` (read at build/render time)
- Scrapers in `src/lib/scrapers/` pull trust dashboards; run with `npm run scrape`

## Design system (do not drift toward the sister site)
- Font: Manrope. Brand colour: teal (`teal-600/700`, #0F766E). Dark surfaces: slate-900/950 (header, hero bands, footer). Neutrals: stone palette, bg `stone-50`.
- Wait status pills use labels: Quiet (<120 min, emerald), Steady (120–240, amber), Busy (>240, rose) — helpers in `src/lib/utils.ts` (`severityLabel`, `severityPill`).
- Lists use compact `WaitRow` ranked rows, not image cards. Cards use `rounded-xl` with `border-l-4 border-l-teal-600` accents.
- The sister site uses NHS blue #005EB8, Geist, white header, rounded-2xl image cards — if something looks like that, it's wrong here.

## Content rules
- All copy (guides in `src/lib/guides.ts`, FAQ in `src/lib/faq-data.ts`, page copy, metadata) must stay 100% unique vs the sister site. Guide slugs here differ deliberately (e.g. `ae-vs-urgent-care`, `quietest-times-to-visit`).
- Canonical domain: https://aewaittimes.co.uk (metadataBase, sitemap, robots).
- Each page sets its own `alternates.canonical`; never set one in the root layout.

## Commands
- `npm run dev` — dev server (port 3000)
- `npm run build` — static export to `out/`
- `npm run scrape` — refresh wait readings into SQLite

## Official statistics sources
Hospitals without a live feed show an "estimated wait" from official statistics (`typical_waits` table, refreshed during `npm run scrape`):
- **Scotland** — Public Health Scotland weekly open data (CKAN API, hospital-level, latest 4 weeks). Fully automatic in CI. Site codes that don't name-match are mapped in `PHS_CODE_TO_SLUG` in `src/lib/scrapers/official-stats.ts`.
- **England** — NHS England monthly SitRep CSV (trust-level). Their edge blocks datacenter IPs, so CI can't fetch it; run `npm run refresh-stats` from an ordinary connection when a new month lands and commit `data/england-monthly.json`. CI tries live first, then falls back to that snapshot. Only trusts in `TRUST_ORG_CODES` (`src/lib/nhs-england-stats.ts`) are kept — add an `org code: exact trust name` entry to cover a new trust. Trust names are matched to hospitals case-insensitively and ignoring a leading "The" (`normalizeTrustName` in `src/lib/data/typical.ts`).
- **Wales** — StatsWales monthly site-level 4-hour performance (Digital Health and Care Wales). The source is a ~16 MB CSV, too heavy to pull every scrape, so it works like England: run `npm run refresh-wales` when a new month lands (≈3rd week) and commit `data/wales-monthly.json`; the scrape reads that snapshot. The dataset gives "% within 4 hours", not a median, so the average wait is estimated from that percentage. Site names → slugs are mapped in `WALES_SITE_TO_SLUG`. (The old live feed, `aeinfo.nhs.wales`, was decommissioned — there is no live Welsh scraper.)
- **Validation** — every scraped reading passes `validateReading` (`src/lib/scrapers/validate.ts`): a wait outside 0–1440 min (or an implausible patient count) is rejected rather than published, so a page redesign that breaks a parser can't push a garbage number live.

## Analytics
Google Analytics 4 (`G-FF6T6W000G`) loads from `src/components/Analytics.tsx` via `next/script` (`afterInteractive`) in the root layout. The inline config strips `lat`, `lng` and `postcode` from the reported `page_location`/`page_referrer`: `/near-me/` carries the visitor's location in its query string, and the site promises never to store it. Keep that redaction if you touch the tag. Other params (e.g. `?q=`) are kept.
