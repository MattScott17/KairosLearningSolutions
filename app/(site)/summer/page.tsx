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
    "Summer 2027 at Kairos in Salinas, CA: a Back-to-School Boot Camp runs July 19 to 23 and July 26 to 30. Call or send a message for details.",
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
        intro="Our Back-to-School Boot Camp is planned in two July sessions. Times and prices will be posted here as soon as they are set."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={site.phoneHref} className="btn-primary">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {site.phone}
          </a>
          <Link href="/contact" className="btn-outline">
            Send a message
          </Link>
        </div>
      </PageHero>

      <Section container="narrow" className="!pt-14">
        <h2 className="text-3xl font-semibold sm:text-4xl">Back-to-School Boot Camp</h2>
        <p className="prose-kairos mt-4 text-lg">
          Two weeks to choose from: July 19 to 23, and July 26 to 30. Last summer the Boot Camp covered
          reading, math and language arts. Times and prices are still being set, so call us or send a
          message with your student&apos;s age and we will let you know as soon as they are ready.
        </p>
      </Section>

      <CTASection
        photo={photos.cooking}
        title="Questions about summer?"
        intro="Give us a call with your student's age and we'll tell you as soon as the details are set."
      />
    </>
  );
}
