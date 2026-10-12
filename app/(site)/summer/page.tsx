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
    "Summer 2027 at Kairos in Salinas, CA: a Back-to-School Boot Camp runs July 19 to 23 and July 26 to 30. Call or fill out the interest form for details.",
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
        intro="Back-to-School Boot Camp: July 19 to 23 and July 26 to 30."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={site.phoneHref} className="btn-primary">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {site.phone}
          </a>
          <Link href="/contact" className="btn-outline">
            Interest form
          </Link>
        </div>
      </PageHero>

      <Section container="narrow" className="!pt-14">
        <h2 className="text-3xl font-semibold sm:text-4xl">Back-to-School Boot Camp</h2>
        <ul className="mt-6 space-y-3 text-xl">
          <li className="border-t border-forest-200 pt-3"><span className="font-semibold text-forest-900">Session 1:</span> July 19 to 23</li>
          <li className="border-t border-forest-200 pt-3"><span className="font-semibold text-forest-900">Session 2:</span> July 26 to 30</li>
        </ul>
        <p className="mt-6 text-lg leading-relaxed text-ink">
          Last summer the Boot Camp covered reading, math and language arts. Times and prices are not
          set yet. Call us or fill out the interest form with your student&apos;s age and we will tell
          you as soon as they are.
        </p>
      </Section>

      <CTASection
        photo={photos.cooking}
        title="Want to hear when details are set?"
        intro="Call us or fill out the interest form with your student's age."
      />
    </>
  );
}
