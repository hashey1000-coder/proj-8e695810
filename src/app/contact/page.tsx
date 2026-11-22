import Link from "next/link";
import type { Metadata } from "next";
import { InfoPageShell } from "@/components/InfoPageShell";
import { SITE, CONTACT_MAILTO } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact AEWaitTimes — Corrections, Data Issues and Enquiries",
  description:
    "Get in touch with the AEWaitTimes team: report a wrong figure, flag a missing hospital, suggest a fix, or make a press or general enquiry.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <InfoPageShell
      breadcrumb="Contact"
      title="Contact us"
      intro="Questions, corrections and missing hospitals all land in the same inbox — and we read them."
    >
      <p>
        The best way to reach {SITE.editorialTeam} is email:
      </p>
      <p>
        <a
          href={CONTACT_MAILTO}
          className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-5 py-3 text-base font-bold !text-white !no-underline hover:bg-teal-700"
        >
          {SITE.contactEmail}
        </a>
      </p>

      <h2>Reporting a wrong figure</h2>
      <p>
        This is the message we most want to receive. If a waiting time looks wrong,
        please include the <strong>hospital name</strong>, what the site showed, and —
        if you can — what the trust&apos;s own page said and when you looked. That lets
        us check it against the source quickly. How we handle corrections is set out
        in our <Link href="/editorial-policy">editorial policy</Link>.
      </p>

      <h2>A missing or wrong hospital</h2>
      <p>
        If we&apos;re not tracking a department you&apos;d expect, or we&apos;ve got a
        detail wrong — opening hours, location, department type — tell us which one
        and what it should say.
      </p>

      <h2>Press and general enquiries</h2>
      <p>
        For anything else — how the site works, our{" "}
        <Link href="/methodology">methodology</Link>, or a press question — use the
        same address and we&apos;ll come back to you.
      </p>

      <h2>What we can&apos;t help with</h2>
      <p>
        We&apos;re an independent information site, not an NHS service, so we
        can&apos;t book appointments, pass messages to a hospital, or give medical
        advice. For health concerns call <strong>NHS 111</strong>, and in an
        emergency call <strong>999</strong> — see our{" "}
        <Link href="/medical-disclaimer">medical disclaimer</Link>.
      </p>
    </InfoPageShell>
  );
}
