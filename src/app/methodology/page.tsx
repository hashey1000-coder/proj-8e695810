import Link from "next/link";
import type { Metadata } from "next";
import { InfoPageShell } from "@/components/InfoPageShell";

export const metadata: Metadata = {
  title: "Methodology — How AEWaitTimes Collects and Checks Its Data",
  description:
    "Exactly how we gather A&E waiting figures: which feeds we read, how often we refresh, how live readings differ from statistical estimates, the checks every reading passes, and the limits you should know about.",
  alternates: { canonical: "/methodology/" },
};

export default function MethodologyPage() {
  return (
    <InfoPageShell
      breadcrumb="Methodology"
      title="Our methodology"
      intro="How the numbers on this site are gathered, refreshed and checked — and, just as importantly, what they can't tell you."
    >
      <h2>Where the figures come from</h2>
      <p>
        Every number is published by someone else first. We read the waiting-time
        pages, dashboards and open-data releases that NHS trusts and the four
        nations&apos; health bodies make public, and bring them together. We never
        invent a figure, and we never adjust a trust&apos;s own reading up or down.
        The full list is on our <Link href="/data-sources">data sources</Link> page.
      </p>

      <h2>Live readings vs estimates</h2>
      <p>
        There are two kinds of figure on the site, and we keep them clearly apart:
      </p>
      <ul>
        <li>
          <strong>Live readings</strong> come from a trust that publishes a current
          or near-current waiting time. We show the figure as published and stamp it
          with how long ago we collected it.
        </li>
        <li>
          <strong>Estimates</strong> are shown only where no live feed exists. They
          are derived from official monthly or weekly statistics — the typical wait
          for that hospital or trust — and are always labelled as an estimate, never
          presented as a live number.
        </li>
      </ul>

      <h2>How often we refresh</h2>
      <p>
        An automated job collects the live feeds on a repeating cycle through the
        day, rebuilds the site, and publishes the update — so a reading you see is
        usually no more than half an hour old, and each one carries its own
        &quot;collected&quot; timestamp. Statistical estimates change far less often:
        they refresh when the underlying official release does, which is monthly for
        England and Wales and weekly for Scotland.
      </p>

      <h2>The checks every reading passes</h2>
      <p>
        Before any figure is published it has to pass validation. A reading outside
        a plausible range — a wait that can&apos;t be real, or a patient count that
        doesn&apos;t make sense — is rejected rather than shown, so a change to a
        source page that breaks our reader can&apos;t quietly push a nonsense number
        live. When a source is unreachable, we keep the last good reading and mark
        how old it is rather than inventing a fresh one.
      </p>

      <h2>How we turn a percentage into an estimated wait</h2>
      <p>
        Some official releases report the share of patients seen within four hours
        rather than an average wait. Where that&apos;s all that exists, we convert it
        into an approximate average so it can sit alongside the live figures — and we
        flag it as an estimate derived that way. It is a rough indicator of pressure,
        not a measured median.
      </p>

      <h2>What the numbers don&apos;t tell you</h2>
      <ul>
        <li>
          They&apos;re a snapshot. Real queues move minute to minute; a figure can be
          out of date by the time you arrive.
        </li>
        <li>
          Different trusts measure and present waits differently, so comparisons
          between two hospitals are a guide, not a precise ranking.
        </li>
        <li>
          Published waits don&apos;t reflect <strong>triage</strong>: patients are
          seen in order of clinical urgency, not arrival, so a serious case is never
          held behind the whole queue.
        </li>
      </ul>

      <h2>Corrections</h2>
      <p>
        If you believe a figure is wrong, tell us and we&apos;ll investigate against
        the source. How we handle mistakes is set out in our{" "}
        <Link href="/editorial-policy">editorial policy</Link>.
      </p>
    </InfoPageShell>
  );
}
