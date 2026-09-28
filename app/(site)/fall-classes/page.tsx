import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { CTASection } from "@/components/CTASection";
import { pagePhotos } from "@/lib/photos";
import { site } from "@/lib/site";
import { registrationFees } from "@/lib/content";

export const metadata: Metadata = {
  title: "Classes & Enrichment",
  description:
    "Fall 2026 classes at Kairos in Salinas, CA: writing, Spanish, STEM and seasonal enrichment. See the catalog for ages, schedules and prices, and register online.",
};

const dateRange = site.fallClassesDateRange.replace(" – ", " to ");
const classFee = registrationFees.find((f) => f.label.includes("enrichment"))?.value.replace(" / ", " a ");

export default function FallClassesPage() {
  return (
    <>
      <PageHero
        title="Fall 2026 classes and enrichment"
        intro={`Classes run ${dateRange}, in writing, Spanish, STEM and seasonal topics. Every class, with ages, times and prices, is in the catalog below. Spaces fill quickly.`}
      />

      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">The 2026–2027 catalog</h2>
            <p className="prose-kairos mt-4 text-lg">
              The catalog is a Google Doc with a description, schedule, age range and price for each
              class. I update it as new sessions open. When you&apos;ve picked a class, fill out the
              registration form.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={site.fallCatalogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Open the catalog
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href={site.fallRegistrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Register for a class
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-6 text-sm text-ink/60">
              Rather talk it through? Call{" "}
              <a href={site.phoneHref} className="link-underline">
                {site.phone}
              </a>{" "}
              or email{" "}
              <a href={site.emailHref} className="link-underline">
                {site.email}
              </a>
              . The{" "}
              <a
                href={site.schoolCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
              >
                2026–2027 school calendar
              </a>{" "}
              is a PDF.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Common questions</h2>
            <dl className="mt-4 border-t border-forest-200">
              <div className="border-b border-forest-100 py-5">
                <dt className="font-semibold text-forest-900">How do I register?</dt>
                <dd className="prose-kairos mt-1">
                  Find the class in the catalog and fill out the registration form, or call us and
                  we&apos;ll sign your student up over the phone.
                </dd>
              </div>
              <div className="border-b border-forest-100 py-5">
                <dt className="font-semibold text-forest-900">Who can join?</dt>
                <dd className="prose-kairos mt-1">
                  Classes are grouped by age and level. If you can&apos;t tell where your student
                  fits, ask us and we&apos;ll help you pick.
                </dd>
              </div>
              <div className="border-b border-forest-100 py-5">
                <dt className="font-semibold text-forest-900">When are new classes posted?</dt>
                <dd className="prose-kairos mt-1">
                  We add seasonal classes through the year and post them on{" "}
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                  >
                    Instagram
                  </a>
                  .
                </dd>
              </div>
              <div className="border-b border-forest-100 py-5">
                <dt className="font-semibold text-forest-900">Is there a registration fee?</dt>
                <dd className="prose-kairos mt-1">
                  Yes, {classFee} for tutoring and enrichment students.
                </dd>
              </div>
            </dl>
            <Link href="/summer" className="link-underline mt-6 inline-flex items-center gap-1.5">
              See summer programs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      <div className="container-page pb-16">
        <div className="relative aspect-[21/9] overflow-hidden rounded-lg">
          <Image
            src={pagePhotos.fallClasses.src}
            alt={pagePhotos.fallClasses.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      <CTASection
        title="Not sure which class to pick?"
        intro="Tell us your student's age and interests, and we'll point you to the classes that fit."
      />
    </>
  );
}
