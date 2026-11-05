import Script from "next/script";

const GA_MEASUREMENT_ID = "G-FF6T6W000G";

/**
 * Google Analytics 4.
 *
 * The near-me page carries the visitor's postcode and coordinates in its
 * query string, and GA reports the full URL by default — so we strip those
 * parameters from the reported page_location. The site tells people we
 * never store their location; handing it to Google would not honour that.
 */
export function Analytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
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
