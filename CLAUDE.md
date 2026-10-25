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
- **England** — NHS England monthly SitRep CSV. Their edge blocks datacenter IPs, so CI can't fetch it; run `npm run refresh-stats` from an ordinary connection when a new month lands and commit `data/england-monthly.json`. CI tries live first, then falls back to that snapshot.
- **Wales** — no usable open hospital-level feed (live feed decommissioned; StatsWales has no stable export endpoint). Welsh pages intentionally show no estimate.
