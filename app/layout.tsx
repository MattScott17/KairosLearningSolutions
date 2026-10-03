import type { Metadata } from "next";
import { Public_Sans, Source_Serif_4 } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Tutoring & Homeschool, Salinas CA`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "tutoring Salinas",
    "homeschool support Salinas",
    "private tutor Salinas CA",
    "homework help Salinas",
    "APEX learning program",
    "full-time school grades 3-9 Salinas",
    "TK kindergarten program Salinas",
    "Kairos Learning Solutions",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Tutoring & Homeschool, Salinas CA`,
    description: site.description,
    images: [{ url: "/images/photo-2.jpg", width: 1800, height: 1350, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
  icons: {
    icon: "/favicon.svg",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${publicSans.variable} ${sourceSerif.variable}`}>
      <body className="min-h-screen bg-white">
        {/* Without JS, scroll-reveal content would stay at its initial opacity:0. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <JsonLd data={organizationJsonLd()} />
        {children}
      </body>
    </html>
  );
}
