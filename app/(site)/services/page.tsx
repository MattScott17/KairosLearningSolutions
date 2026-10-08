import type { Metadata } from "next";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { ProgramList } from "@/components/ProgramList";
import { CTASection } from "@/components/CTASection";
import { services, enrichment, earlyLearners, apex } from "@/lib/content";
import { site } from "@/lib/site";
import Link from "next/link";
import { Phone } from "lucide-react";

export const metadata: Metadata = pageMetadata({
  title: "Tutoring and Homeschool Support",
  description:
    "Private tutoring from $70 an hour, homeschool support, Early Learners for TK to 2nd grade, APEX for grades 3 to 9, and enrichment classes in Salinas, CA.",
  path: "/services",
});

const rows = [
  ...services.map((s) => ({
    href: `/services/${s.slug}`,
    title: s.title,
    short: s.short,
    summary: s.summary,
  })),
  {
    href: "/early-learners",
    title: earlyLearners.name,
    short: `Half-day program, ${earlyLearners.ageRange}`,
    summary: earlyLearners.intro,
  },
  {
    href: "/apex",
    title: "APEX",
    short: `Full-time program, ${apex.gradeRange.toLowerCase()}`,
    summary: apex.intro,
  },
  {
    href: "/fall-classes",
    title: enrichment.title,
    short: "Seasonal classes for all ages",
    summary: enrichment.body,
  },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Services", path: "/services" }])} />
      <PageHero
        title="Programs and prices"
        mark="prices"
        variant="centered"
        intro="From one tutoring session a week to a full school day, here is who each program is for and what it costs. Not sure which fits? Give us a call."
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

      <Section>
        <ProgramList />
      </Section>

      <section className="border-t border-forest-100 bg-sand/50 py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading title="What each program includes" />
          <ul className="mt-8 border-t border-forest-200">
            {rows.map((row) => (
              <ServiceCard key={row.href} {...row} summary={row.summary.split(/(?<=\.)\s/)[0]} />
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  );
}
