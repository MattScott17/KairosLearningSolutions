import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/CTASection";
import { ServiceCard } from "@/components/ServiceCard";
import { services, apex } from "@/lib/content";
import { conceptC } from "@/lib/storybrand";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function ConceptCPage() {
  return (
    <>
      {/* Hero — the decision framing, not a story beat */}
      <section className="relative overflow-hidden pt-24 sm:pt-28">
        <div className="container-page text-center">
          <Reveal>
            <h1 className="mx-auto max-w-3xl text-4xl font-semibold leading-[1.1] sm:text-5xl">
              {conceptC.heroHeadline}
            </h1>
            <p className="prose-kairos mx-auto mt-6 max-w-2xl text-lg">{conceptC.heroSub}</p>
          </Reveal>
        </div>
      </section>

      {/* Problem — framed as a decision problem */}
      <Section className="bg-sand/50">
        <SectionHeading
          center
          eyebrow="The challenge"
          title="Too many options, not enough clarity"
          intro={conceptC.problem.external}
        />
        <div className="mx-auto mt-10 max-w-2xl space-y-4 border-l-2 border-gold-500/40 pl-6 text-left">
          <p className="prose-kairos">{conceptC.problem.internal}</p>
          <p className="font-display text-lg text-forest-800">{conceptC.problem.philosophical}</p>
        </div>
      </Section>

      {/* Path-finder grid — the core mechanic of this concept */}
      <Section>
        <SectionHeading
          center
          eyebrow="Find your path"
          title="Which level of support fits your student?"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.08}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>

        {/* APEX called out separately as the "full-time" end of the spectrum */}
        <Reveal delay={0.24}>
          <div className="mt-6 grid gap-8 rounded-3xl bg-forest-800 p-8 text-cream shadow-soft lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-forest-700 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-forest-100">
                Full-time alternative
              </span>
              <h3 className="mt-4 text-2xl font-semibold text-cream">APEX — {apex.gradeRange}</h3>
              <p className="mt-2 max-w-xl text-cream/80">{apex.intro}</p>
              <Link href="/apex" className="btn-accent mt-6 inline-flex">
                Explore APEX
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 border-t border-cream/15 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div>
                <p className="font-display text-xl font-semibold text-cream">{apex.gradeRange}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-cream/60">Grades</p>
              </div>
              <div>
                <p className="font-display text-xl font-semibold text-cream">{apex.tuition.monthly}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-cream/60">Tuition</p>
              </div>
              <div>
                <p className="font-display text-xl font-semibold text-cream">Full-time</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-cream/60">Format</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Plan — confirm the fit before committing */}
      <Section className="bg-sand/50">
        <SectionHeading center eyebrow="Once you've found your path" title="Confirm the fit" />
        <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-3">
          {conceptC.plan.map((step, i) => (
            <Reveal key={step} delay={i * 0.08}>
              <div className="flex h-full flex-col items-center rounded-3xl bg-cream p-7 text-center shadow-card">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-forest-800 font-display text-lg font-semibold text-cream">
                  {i + 1}
                </span>
                <p className="prose-kairos mt-4 text-sm">{step}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Success vision — connective tissue leading into the final CTA */}
      <div className="container-page pt-16 sm:pt-20">
        <p className="mx-auto flex max-w-2xl items-start gap-2 text-center text-lg font-medium text-forest-800">
          <Check className="mt-1 h-5 w-5 shrink-0 text-forest-500" />
          {conceptC.successVision}
        </p>
      </div>

      <CTASection
        title="Not sure which path fits?"
        intro="Book a free call and we'll help you figure out exactly where your student belongs."
        primaryLabel="Book a free call"
        primaryHref="/contact"
      />
    </>
  );
}
