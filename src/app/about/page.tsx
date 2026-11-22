import Link from "next/link";
import type { Metadata } from "next";
import { InfoPageShell } from "@/components/InfoPageShell";
import { SITE, CONTACT_MAILTO } from "@/lib/site";

export const metadata: Metadata = {
  title: "About AEWaitTimes — Who We Are and Why We Built This",
  description:
    "AEWaitTimes is an independent, non-commercial tracker that pulls publicly published NHS A&E waiting figures into one place. Who runs it, how it stays independent, and how it's funded.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <InfoPageShell
      breadcrumb="About"
      title="About AEWaitTimes"
      intro="We bring the A&E waiting figures that the NHS already publishes into one place, so you can weigh your options before you set off — not after an hour in a waiting room."
    >
      <h2>What this site is</h2>
      <p>
        AEWaitTimes is an independent project that collects the emergency-department
        waiting figures NHS trusts and health bodies publish, and presents them in
        one consistent place. We don&apos;t generate the numbers and we don&apos;t
        run any part of the NHS — we gather what&apos;s already public, label where
        each figure came from, and show when it was last collected.
      </p>
      <p>
        The aim is narrow and practical: help someone deciding where to go for
        non-life-threatening care see, in a few seconds, which nearby department is
        moving fastest right now, and understand how reliable that figure is.
      </p>

      <h2>Who runs it</h2>
      <p>
        The site is built and maintained by {SITE.editorialTeam} — a small,
        independent group with no connection to NHS England, any NHS trust, or any
        government body. We are not clinicians, and nothing here is written as
        clinical guidance. Where health context matters, we point to official NHS
        sources rather than offering our own medical opinion.
      </p>

      <h2>How we stay independent</h2>
      <ul>
        <li>
          <strong>No NHS affiliation.</strong> We have no formal relationship with,
          and no endorsement from, the NHS or any trust. The data belongs to the
          bodies that publish it.
        </li>
        <li>
          <strong>No pay-for-placement.</strong> No hospital can pay to appear,
          rank higher, or have an unflattering figure hidden. The order on every
          page is driven by the data alone.
        </li>
        <li>
          <strong>Nothing dressed up.</strong> A live reading is shown as live; an
          estimate from monthly statistics is clearly labelled as an estimate. We
          would rather show less than imply more than we know.
        </li>
      </ul>

      <h2>How it&apos;s funded</h2>
      <p>
        Running costs are covered by unobtrusive advertising. Advertisers have no
        say over the data, the rankings, or anything we write. If that ever
        changes, we&apos;ll say so here.
      </p>

      <h2>Reading the numbers well</h2>
      <p>
        Published waits are a snapshot, not a promise. A queue can change in
        minutes, and triage — not arrival time — decides who is seen first, so a
        genuinely urgent case is never left waiting for the whole line. Treat every
        figure as a guide. For how we collect and check them, see our{" "}
        <Link href="/methodology">methodology</Link> and{" "}
        <Link href="/data-sources">data sources</Link>; for the standards we hold
        ourselves to, our <Link href="/editorial-policy">editorial policy</Link>.
      </p>

      <h2>Get in touch</h2>
      <p>
        Found a figure that looks wrong, a hospital we&apos;re missing, or a mistake
        on a page? We genuinely want to hear it — email{" "}
        <a href={CONTACT_MAILTO}>{SITE.contactEmail}</a> or use our{" "}
        <Link href="/contact">contact page</Link>.
      </p>
    </InfoPageShell>
  );
}
