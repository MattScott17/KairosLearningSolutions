import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { CTASection } from "@/components/CTASection";
import { services, enrichment } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Private tutoring, homework club, homeschool support, and enrichment classes in Salinas, CA. Flexible options for students of every age and ability.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we offer"
        title="Find the support that fits"
        intro="Whether your student needs a weekly boost, daily homework help, a homeschool partner, or a full-time program, we have a flexible option for you."
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.08}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>

        {/* Enrichment + APEX callouts */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-3xl border border-forest-100 bg-sand/50 p-8 shadow-card">
              <h3 className="text-xl font-semibold">{enrichment.title}</h3>
              <p className="prose-kairos mt-3 flex-1 text-sm">{enrichment.body}</p>
              <Link href="/fall-classes" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-800">
                See current classes
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-3xl bg-forest-800 p-8 text-cream shadow-card">
              <h3 className="text-xl font-semibold text-cream">APEX Full-Time Program</h3>
              <p className="mt-3 flex-1 text-sm text-cream/80">
                Looking for more than support? APEX is our full-time alternative to traditional
                school for grades 3–8 — personalized, mastery-based, and built to grow confident,
                independent learners.
              </p>
              <Link href="/apex" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400">
                Explore APEX
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
