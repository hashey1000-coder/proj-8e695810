import Link from "next/link";
import type { Metadata } from "next";
import { InfoPageShell } from "@/components/InfoPageShell";
import { SITE, CONTACT_MAILTO } from "@/lib/site";

export const metadata: Metadata = {
  title: "Editorial Policy — Accuracy, Independence and Corrections",
  description:
    "The standards AEWaitTimes holds itself to: accuracy and sourcing, independence from the NHS and advertisers, how we review content, our corrections process, and how AI is and isn't used.",
  alternates: { canonical: "/editorial-policy/" },
};

export default function EditorialPolicyPage() {
  return (
    <InfoPageShell
      breadcrumb="Editorial policy"
      title="Editorial policy"
      intro="The rules we hold ourselves to — on where figures come from, how guidance is written, how we stay independent, and how we put mistakes right."
    >
      <h2>Accuracy and sourcing</h2>
      <p>
        Every waiting figure traces back to a public NHS or official-statistics
        source, attributed and timestamped. We don&apos;t invent or adjust numbers.
        Live readings and statistical estimates are always clearly distinguished, and
        readings that fail our validation checks are withheld rather than published.
        The detail is in our <Link href="/methodology">methodology</Link> and{" "}
        <Link href="/data-sources">data sources</Link>.
      </p>

      <h2>Guides and health context</h2>
      <p>
        Our written guides are intended to help people navigate urgent and emergency
        care — what the queue figures mean, when departments tend to be quieter, and
        how to choose between A&amp;E and urgent care. They are general information,
        written against publicly available NHS guidance, and are{" "}
        <strong>not medical advice</strong>. We are not clinicians; where a decision
        is clinical, we point readers to 999, NHS 111 and official NHS sources rather
        than offering an opinion. See our{" "}
        <Link href="/medical-disclaimer">medical disclaimer</Link>.
      </p>

      <h2>Independence</h2>
      <ul>
        <li>
          <strong>From the NHS.</strong> We have no affiliation with or endorsement
          from the NHS or any trust. We report their published figures; we don&apos;t
          speak for them.
        </li>
        <li>
          <strong>From advertisers.</strong> Advertising keeps the site running but
          never influences the data, the rankings, or what we write. No one can pay
          to change a figure or their position.
        </li>
      </ul>

      <h2>How content is reviewed</h2>
      <p>
        Pages carry a &quot;last reviewed&quot; date. Data-driven pages are rebuilt
        automatically as new figures arrive; written guidance and these standing
        pages are reviewed by {SITE.editorialTeam} and updated when sources, services
        or facts change. If something is out of date, the review date is our promise
        that it&apos;s on us to fix it.
      </p>

      <h2>Use of AI</h2>
      <p>
        We use software automation — and, in places, AI tools — to help collect data
        and draft and maintain the site. Automation never decides what counts as a
        valid reading on its own: the sourcing rules and validation checks above
        apply regardless, and a human sets and reviews them. AI is a tool here, not
        the authority.
      </p>

      <h2>Corrections</h2>
      <p>
        We&apos;d rather hear about a mistake than not. If a figure looks wrong, a
        hospital is missing, or a page contains an error, email{" "}
        <a href={CONTACT_MAILTO}>{SITE.contactEmail}</a> or use our{" "}
        <Link href="/contact">contact page</Link>. We&apos;ll check it against the
        source and correct anything that&apos;s genuinely wrong, as promptly as we
        can.
      </p>
    </InfoPageShell>
  );
}
