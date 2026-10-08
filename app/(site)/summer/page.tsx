import type { Metadata } from "next";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import Link from "next/link";
import { Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { CTASection } from "@/components/CTASection";
import { pagePhotos, photos } from "@/lib/photos";
import { site } from "@/lib/site";

// Summer 2026 is over. The 2026 programs, dates and prices are still in `summerPrograms` in
// lib/content.ts: when summer 2027 is planned, update that list and bring back the program columns
// (see this file's history) in place of the "coming soon" section below.

export const metadata: Metadata = pageMetadata({
  title: "Summer Programs",
  description:
    "Summer 2027 at Kairos in Salinas, CA: details are coming soon. Call or send a message and we'll let you know when dates, times and prices are set.",
  path: "/summer",
  image: pagePhotos.summer,
});

export default function SummerPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Summer Programs", path: "/summer" }])} />
      <PageHero
        title="Summer 2027 at Kairos"
        mark="Kairos"
        photo={pagePhotos.summer}
        variant="wide"
        intro="We are still planning next summer. Dates, times and prices will be posted here as soon as they are set."
      />

      <Section container="narrow">
        <h2 className="text-3xl font-semibold sm:text-4xl">Details coming soon</h2>
        <p className="prose-kairos mt-4 text-lg">
          Last summer we ran a Back-to-School Boot Camp for reading, math and language arts, and hosted a
          music camp. If you would like to hear when summer 2027 is ready, call us or send a message with
          your student&apos;s age and we will let you know.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={site.phoneHref} className="btn-primary">
            <Phone className="h-4 w-4" />
            {site.phone}
          </a>
          <Link href="/contact" className="btn-outline">
            Send a message
          </Link>
        </div>
      </Section>

      <CTASection
        photo={photos.cooking}
        title="Questions about summer?"
        intro="Give us a call with your student's age and we'll tell you as soon as summer 2027 is planned."
      />
    </>
  );
}
