import Link from "next/link";
import type { Metadata } from "next";
import { InfoPageShell } from "@/components/InfoPageShell";
import { SITE, CONTACT_MAILTO } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy — AEWaitTimes",
  description:
    "How AEWaitTimes handles data: the analytics and advertising cookies used, how your location is processed on the near-me page (and never stored), your choices, and your rights under UK GDPR.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <InfoPageShell
      breadcrumb="Privacy policy"
      title="Privacy policy"
      intro="What data this site does and doesn't collect, the cookies involved, and the choices you have. Written to be read, not to hide behind."
    >
      <p className="text-sm text-stone-400">Last updated {SITE.legalUpdated}.</p>

      <h2>Who we are</h2>
      <p>
        AEWaitTimes (&quot;we&quot;, &quot;us&quot;) is an independent website at{" "}
        <strong>{SITE.domain}</strong> that aggregates publicly published NHS A&amp;E
        waiting figures. We are the data controller for the limited processing
        described here. You can reach us at{" "}
        <a href={CONTACT_MAILTO}>{SITE.contactEmail}</a>.
      </p>

      <h2>The short version</h2>
      <ul>
        <li>We don&apos;t ask you to create an account, and we don&apos;t collect your name or email unless you choose to email us.</li>
        <li>We use analytics to understand traffic, and we show advertising to fund the site — both can set cookies.</li>
        <li>If you use the &quot;near me&quot; feature, your location is used in your browser to rank nearby departments and is <strong>never sent to us or stored</strong>.</li>
        <li>In the UK and EEA, non-essential cookies load only after you agree via our cookie banner.</li>
      </ul>

      <h2>Information we process</h2>
      <ul>
        <li>
          <strong>Usage and device data</strong> — via analytics: pages viewed,
          approximate region, browser and device type, and how you arrived. This
          helps us see what&apos;s useful and what&apos;s broken.
        </li>
        <li>
          <strong>Location, on the near-me page only</strong> — if you grant it or
          type a postcode, it&apos;s used in your browser to sort departments by
          distance. We deliberately strip latitude, longitude and postcode from the
          address reported to our analytics, and we never store your location.
        </li>
        <li>
          <strong>Anything you send us</strong> — if you email us, we keep that
          message to reply and follow up on a correction.
        </li>
      </ul>

      <h2>Cookies and similar technologies</h2>
      <p>
        We use three kinds of cookie. There&apos;s more detail, and how to change
        your mind, in our <Link href="/cookies">cookie policy</Link>.
      </p>
      <ul>
        <li><strong>Essential</strong> — needed for the site to work and to remember your cookie choice.</li>
        <li><strong>Analytics</strong> — Google Analytics 4 ({SITE.analyticsId}), to measure traffic.</li>
        <li><strong>Advertising</strong> — Google and third-party advertising partners may set cookies to show and measure ads, including personalised ads where you&apos;ve allowed them.</li>
      </ul>

      <h2>Advertising and third parties</h2>
      <p>
        This site is funded by advertising. Third-party vendors, including Google,
        use cookies to serve ads based on your prior visits to this and other
        websites. Google&apos;s use of advertising cookies lets it and its partners
        serve ads to you based on your visits here and elsewhere. You can:
      </p>
      <ul>
        <li>
          opt out of personalised Google ads at{" "}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>;
        </li>
        <li>
          opt out of many vendors at{" "}
          <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">aboutads.info/choices</a>{" "}
          and{" "}
          <a href="https://www.youronlinechoices.eu" target="_blank" rel="noopener noreferrer">youronlinechoices.eu</a>;
        </li>
        <li>
          read how Google uses data at{" "}
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">policies.google.com/technologies/partner-sites</a>.
        </li>
      </ul>

      <h2>Your consent and choices</h2>
      <p>
        If you&apos;re in the UK or EEA, our cookie banner loads non-essential
        (analytics and advertising) cookies only after you agree, and you can change
        or withdraw that choice at any time from the{" "}
        <Link href="/cookies">cookie policy</Link>. You can also block or delete
        cookies in your browser settings, though some features may work less well.
      </p>

      <h2>Legal basis (UK GDPR)</h2>
      <p>
        Where we rely on <strong>consent</strong> (analytics and advertising
        cookies), you give it through the banner and can withdraw it. Where we rely
        on <strong>legitimate interests</strong> (replying to your email, keeping the
        site secure and working), we&apos;ve balanced that against your rights.
      </p>

      <h2>Retention and sharing</h2>
      <p>
        We keep analytics data only in aggregate, for as long as it&apos;s useful, and
        emails for as long as needed to deal with your query. We don&apos;t sell your
        personal data. Our analytics and advertising providers process data under
        their own policies, linked above.
      </p>

      <h2>Your rights</h2>
      <p>
        Under UK GDPR you can ask us to access, correct or delete the limited data we
        hold about you, and you can object to processing. Email{" "}
        <a href={CONTACT_MAILTO}>{SITE.contactEmail}</a>. You also have the right to
        complain to the{" "}
        <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">Information Commissioner&apos;s Office (ICO)</a>.
      </p>

      <h2>Children</h2>
      <p>
        This site is general information for a wide audience and isn&apos;t directed
        at children. We don&apos;t knowingly collect data from children.
      </p>

      <h2>Changes</h2>
      <p>
        We&apos;ll update this page when our practices change and move the
        &quot;last updated&quot; date above. Questions? See our{" "}
        <Link href="/contact">contact page</Link>.
      </p>
    </InfoPageShell>
  );
}
