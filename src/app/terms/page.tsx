import Link from "next/link";
import type { Metadata } from "next";
import { InfoPageShell } from "@/components/InfoPageShell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use — AEWaitTimes",
  description:
    "The terms for using AEWaitTimes: that figures are information not medical advice, where the data comes from and who owns it, and the limits of our liability.",
  alternates: { canonical: "/terms/" },
};

export default function TermsPage() {
  return (
    <InfoPageShell
      breadcrumb="Terms of use"
      title="Terms of use"
      intro="Plain terms for using this site. By using AEWaitTimes you agree to them."
    >
      <p className="text-sm text-stone-400">Last updated {SITE.legalUpdated}.</p>

      <h2>What this site is — and isn&apos;t</h2>
      <p>
        AEWaitTimes provides waiting-time information aggregated from public NHS
        sources. It is <strong>not medical advice</strong>, not an NHS service, and
        not a substitute for professional care. In an emergency call 999; for urgent
        advice call NHS 111. Please read our{" "}
        <Link href="/medical-disclaimer">medical disclaimer</Link>.
      </p>

      <h2>Accuracy and availability</h2>
      <p>
        We work to keep figures accurate and current, but we can&apos;t guarantee any
        figure is correct or up to date at the moment you read it — some are
        statistical estimates, and sources can change or go offline. We may update,
        suspend or withdraw any part of the site at any time. How we collect and check
        data is set out in our <Link href="/methodology">methodology</Link>.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <li>Use the site for your own personal, lawful purposes.</li>
        <li>Don&apos;t scrape, overload, disrupt or try to break the site or its security.</li>
        <li>Don&apos;t present our pages as your own or imply we endorse you.</li>
      </ul>

      <h2>Data ownership and intellectual property</h2>
      <p>
        The underlying waiting figures belong to the NHS trusts and statistics bodies
        that publish them; we present them with attribution and claim no ownership
        over them. Our own writing, design and layout are our property. You may link
        to us freely.
      </p>

      <h2>Third-party links and ads</h2>
      <p>
        The site contains advertising and links to other sites we don&apos;t control.
        We&apos;re not responsible for their content or practices. Advertising is
        covered by our <Link href="/privacy">privacy</Link> and{" "}
        <Link href="/cookies">cookie</Link> policies.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the extent the law allows, we accept no liability for any loss arising from
        reliance on the information here. Use it as one input alongside your own
        judgement and official NHS advice. Nothing in these terms limits liability
        that can&apos;t be limited by law.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the law of England and Wales, and the courts of
        England and Wales have jurisdiction.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? See our <Link href="/contact">contact page</Link>.
      </p>
    </InfoPageShell>
  );
}
