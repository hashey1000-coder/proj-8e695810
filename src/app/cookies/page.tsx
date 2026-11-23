import Link from "next/link";
import type { Metadata } from "next";
import { InfoPageShell } from "@/components/InfoPageShell";
import { SITE } from "@/lib/site";
import { CookieSettingsButton } from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: "Cookie Policy — AEWaitTimes",
  description:
    "The cookies AEWaitTimes uses — essential, analytics and advertising — what each is for, and how to change or withdraw your consent at any time.",
  alternates: { canonical: "/cookies/" },
};

export default function CookiesPage() {
  return (
    <InfoPageShell
      breadcrumb="Cookie policy"
      title="Cookie policy"
      intro="The cookies this site uses, why, and how to change your mind whenever you like."
    >
      <p className="text-sm text-stone-400">Last updated {SITE.legalUpdated}.</p>

      <h2>What cookies are</h2>
      <p>
        Cookies are small files a website stores in your browser. Some are needed for
        a site to function; others help measure traffic or support advertising. This
        page explains the ones we use; how we handle data more broadly is in our{" "}
        <Link href="/privacy">privacy policy</Link>.
      </p>

      <h2>The categories we use</h2>
      <ul>
        <li>
          <strong>Strictly necessary.</strong> Keep the site working and remember
          your cookie choice so we don&apos;t keep asking. These are always on.
        </li>
        <li>
          <strong>Analytics.</strong> Google Analytics 4 ({SITE.analyticsId}) tells us
          which pages are used and where things break, in aggregate. We strip any
          location detail from the page address it records.
        </li>
        <li>
          <strong>Advertising.</strong> Google and third-party advertising partners
          may set cookies to show ads, cap how often you see them, and measure
          performance — including personalised ads where you&apos;ve allowed them.
          Advertising funds the site.
        </li>
      </ul>

      <h2>Your choice</h2>
      <p>
        In the UK and EEA, analytics and advertising cookies load only after you
        accept them. You can change or withdraw your consent at any time:
      </p>
      <p>
        <CookieSettingsButton />
      </p>
      <p>
        You can also manage cookies in your browser settings, and opt out of
        personalised advertising via{" "}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>,{" "}
        <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">aboutads.info/choices</a>{" "}
        and{" "}
        <a href="https://www.youronlinechoices.eu" target="_blank" rel="noopener noreferrer">youronlinechoices.eu</a>.
      </p>

      <h2>Changes</h2>
      <p>
        If the cookies we use change, we&apos;ll update this page and the date above.
      </p>
    </InfoPageShell>
  );
}
