import Script from "next/script";
import { SITE } from "@/lib/site";

const GA_MEASUREMENT_ID = SITE.analyticsId;

/**
 * Google Analytics 4 with Consent Mode v2.
 *
 * Consent starts DENIED for analytics and advertising storage. The cookie
 * banner (see CookieConsent) flips it to granted only if the visitor agrees,
 * and a stored "granted" choice is re-applied here on load. The default is set
 * via a raw inline script so it runs before gtag.js processes the dataLayer.
 *
 * The near-me page carries the visitor's postcode and coordinates in its query
 * string, and GA reports the full URL by default — so we strip those from the
 * reported page_location/page_referrer. The site promises never to store a
 * visitor's location; handing it to Google would not honour that.
 */
export function Analytics() {
  return (
    <>
      {/* Consent Mode defaults — must run before gtag.js. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            var __c = 'denied';
            try { if (localStorage.getItem('aewt-consent-v1') === 'granted') __c = 'granted'; } catch (e) {}
            gtag('consent', 'default', {
              ad_storage: __c,
              analytics_storage: __c,
              ad_user_data: __c,
              ad_personalization: __c,
              wait_for_update: 500
            });
          `,
        }}
      />

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          gtag('js', new Date());
          (function () {
            var sanitize = function (href) {
              try {
                var u = new URL(href);
                ['lat', 'lng', 'postcode'].forEach(function (k) {
                  u.searchParams.delete(k);
                });
                return u.href;
              } catch (e) {
                return href;
              }
            };
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_location: sanitize(window.location.href),
              page_referrer: sanitize(document.referrer || '')
            });
          })();
        `}
      </Script>
    </>
  );
}
