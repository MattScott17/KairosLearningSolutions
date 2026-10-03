// Per-page metadata and schema.org JSON-LD, built from lib/site.ts and lib/content.ts.

import type { Metadata } from "next";
import { site } from "@/lib/site";

const defaultImage = "/images/photo-2.jpg";

type PageMetadataInput = {
  title: string;
  description: string;
  /** Path of this page, e.g. "/apex". Becomes the canonical URL. */
  path: string;
  /** Photo for link previews. Defaults to the sitewide one. */
  image?: { src: string; alt: string };
};

/** Title, description, self-referencing canonical and matching Open Graph / Twitter tags. */
export function pageMetadata({ title, description, path, image }: PageMetadataInput): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  const img = image ?? { src: defaultImage, alt: site.name };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: site.name,
      url: path,
      title: fullTitle,
      description,
      images: [{ url: img.src, alt: img.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [img.src],
    },
  };
}

const orgId = `${site.url}/#organization`;

/** The business itself: one entity, referenced by id from the page-level schemas. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["EducationalOrganization", "LocalBusiness"],
        "@id": orgId,
        name: site.name,
        url: site.url,
        description: site.description,
        telephone: site.phone,
        email: site.email,
        logo: `${site.url}/images/logo.png`,
        image: `${site.url}${defaultImage}`,
        foundingDate: String(site.foundedYear),
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.city,
          addressRegion: site.address.state,
          postalCode: site.address.zip,
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: site.geo.latitude,
          longitude: site.geo.longitude,
        },
        hasMap: site.address.mapUrl,
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: site.hoursSpec.days,
            opens: site.hoursSpec.opens,
            closes: site.hoursSpec.closes,
          },
        ],
        areaServed: site.areasServed.map((name) => ({ "@type": "City", name })),
        sameAs: [site.social.instagram, site.social.facebook],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { "@id": orgId },
      },
    ],
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function serviceJsonLd(input: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: `${site.url}${input.path}`,
    provider: {
      "@type": "EducationalOrganization",
      "@id": orgId,
      name: site.name,
      url: site.url,
    },
    areaServed: { "@type": "City", name: site.address.city },
  };
}

export type FaqItem = { question: string; answer: string };

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
