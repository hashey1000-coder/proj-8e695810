import Link from "next/link";
import type { Metadata } from "next";
import { InfoPageShell } from "@/components/InfoPageShell";

export const metadata: Metadata = {
  title: "Data Sources — Where Every AEWaitTimes Figure Comes From",
  description:
    "The exact public sources behind our A&E waiting figures: individual NHS trust dashboards, NHS England's monthly A&E statistics, Public Health Scotland, StatsWales and Northern Ireland's published waits.",
  alternates: { canonical: "/data-sources/" },
};

export default function DataSourcesPage() {
  return (
    <InfoPageShell
      breadcrumb="Data sources"
      title="Where our data comes from"
      intro="Every figure on AEWaitTimes is published first by the NHS or an official statistics body. Here's each source we draw on, and whether it gives us a live reading or an estimate."
    >
      <p>
        We aggregate public data — we don&apos;t create it. The data belongs to the
        trusts and agencies named below, and we show it with attribution and a
        collection timestamp. For how we read and check it, see our{" "}
        <Link href="/methodology">methodology</Link>.
      </p>

      <h2>Individual NHS trust dashboards (live)</h2>
      <p>
        Many trusts publish their own live or near-live waiting-time page for
        patients. Where they do, that&apos;s our primary source and gives a{" "}
        <strong>live reading</strong>, shown as published with the time we collected
        it. These are the freshest figures on the site.
      </p>

      <h2>NHS England — monthly A&amp;E statistics (estimate)</h2>
      <p>
        For English departments without a live feed, we use NHS England&apos;s
        published monthly A&amp;E attendances and performance data to derive a{" "}
        <strong>typical</strong> wait for that trust. It&apos;s an estimate based on
        official figures, clearly labelled as such, and updates when a new month is
        released.
      </p>

      <h2>Public Health Scotland — weekly A&amp;E activity (estimate)</h2>
      <p>
        For Scottish sites without a live feed, we use Public Health Scotland&apos;s
        weekly open data at hospital level to show a recent typical wait. It refreshes
        weekly with their release.
      </p>

      <h2>StatsWales — monthly 4-hour performance (estimate)</h2>
      <p>
        NHS Wales withdrew its live A&amp;E feed, so Welsh figures are estimates
        derived from StatsWales&apos; monthly site-level four-hour performance data
        (published by Digital Health and Care Wales). We convert the four-hour figure
        into an approximate average wait and label it as an estimate.
      </p>

      <h2>Northern Ireland — published department waits</h2>
      <p>
        For Northern Ireland we use the emergency-department waiting information
        published for the public, including each department&apos;s stated opening
        hours, which we keep in step with the source.
      </p>

      <h2>A note on accuracy and ownership</h2>
      <ul>
        <li>
          We present each source&apos;s figures as published; any dispute about a
          number is ultimately a question for the body that published it.
        </li>
        <li>
          Sources change their pages and formats from time to time. When that breaks
          our collection, our checks reject bad data rather than publish it, and we
          fix the reader.
        </li>
        <li>
          AEWaitTimes is independent and not endorsed by any of these organisations.
        </li>
      </ul>

      <p>
        Think a source is missing or out of date?{" "}
        <Link href="/contact">Tell us</Link> — we&apos;d like to know.
      </p>
    </InfoPageShell>
  );
}
