import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { ProgramList } from "@/components/ProgramList";
import { CTASection } from "@/components/CTASection";
import { services, enrichment, earlyLearners, apex } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Private tutoring from $70 an hour, homeschool support, Early Learners for TK to 2nd grade, APEX for grades 3 to 9, and enrichment classes in Salinas, CA.",
};

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
      <PageHero
        title="Programs and prices"
        mark="prices"
        variant="centered"
        intro="We run everything from one tutoring session a week to a full school day. Here's who each program is for, when it runs and what it costs. If you're not sure which one fits, give us a call."
      />

      <Section>
        <ProgramList />
      </Section>

      <section className="border-t border-forest-100 bg-sand/50 py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading title="What each program includes" />
          <ul className="mt-8 border-t border-forest-200">
            {rows.map((row) => (
              <ServiceCard key={row.href} {...row} />
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  );
}
