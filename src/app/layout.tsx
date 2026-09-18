import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "A&E Wait Times UK — Live NHS Emergency Queue Tracker",
    template: "%s | AEWaitTimes",
  },
  description:
    "Check the latest A&E waiting times at NHS hospitals across England, Scotland, Wales and Northern Ireland before you set off. Live queue figures where trusts publish them, distance search and 24-hour trends, all in one place.",
  metadataBase: new URL("https://aewaittimes.co.uk"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "AEWaitTimes",
    title: "A&E Wait Times UK — Live NHS Emergency Queue Tracker",
    description:
      "The latest A&E queue figures for NHS hospitals across the UK — live where trusts publish them. Check the wait near you before you travel.",
  },
  twitter: {
    card: "summary_large_image",
    title: "A&E Wait Times UK — Live NHS Emergency Queue Tracker",
    description:
      "The latest A&E queue figures for NHS hospitals across the UK — live where trusts publish them. Check the wait near you before you travel.",
  },
  robots: {
    index: true,
    follow: true,
  },
  // NOTE: no `alternates.canonical` here — a canonical set in the root layout
  // is inherited by every page, pointing them all at "/" and telling search
  // engines the whole site is a duplicate of the homepage. Each page sets its
  // own canonical instead.
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" data-scroll-behavior="smooth" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-stone-50 text-stone-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
