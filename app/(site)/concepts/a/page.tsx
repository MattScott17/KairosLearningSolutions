import type { Metadata } from "next";
import { Check, Phone } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/CTASection";
import { ServiceCard } from "@/components/ServiceCard";
import { site } from "@/lib/site";
import { services } from "@/lib/content";
import { conceptA } from "@/lib/storybrand";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function ConceptAPage() {
  return (
    <>
      {/* Hero — the problem, named plainly, one CTA */}
      <section className="relative overflow-hidden pt-24 sm:pt-28">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(1200px 600px at 80% -10%, rgba(124,179,66,0.16), transparent 60%), radial-gradient(900px 500px at -10% 10%, rgba(224,162,60,0.10), transparent 55%)",
          }}
          aria-hidden
        />
        <div className="container-page text-center">
          <Reveal>
            <h1 className="mx-auto max-w-3xl text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
              {conceptA.heroHeadline}
            </h1>
            <p className="prose-kairos mx-auto mt-6 max-w-2xl text-lg">{conceptA.heroSub}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#plan" className="btn-primary w-full sm:w-auto">
                Book a free call
              </a>
              <a href={site.phoneHref} className="btn-outline w-full sm:w-auto">
                <Phone className="h-4 w-4" />
                {site.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Problem — external / internal / philosophical, StoryBrand-style */}
      <Section>
        <SectionHeading
          center
          eyebrow="If this sounds familiar"
          title="You're not imagining it — and you're not alone"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[conceptA.problem.external, conceptA.problem.internal, conceptA.problem.philosophical].map(
            (text, i) => (
              <Reveal key={text} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-forest-100 bg-cream p-7 text-center shadow-card">
                  <p className="prose-kairos text-sm">{text}</p>
                </div>
              </Reveal>
            )
          )}
        </div>
      </Section>

      {/* Guide — Kairos as the guide, brief credibility */}
      <section className="bg-forest-800 py-16 text-cream sm:py-20">
        <div className="container-page text-center">
          <Reveal>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              We've been the guide for Salinas families since {site.foundedYear}
            </h2>
            <p className="prose-kairos mx-auto mt-4 max-w-2xl text-cream/85">
              Kairos exists for exactly this moment — a team of experienced educators whose only
              job is to meet your student where they are and help them go further.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Plan — the 3-step plan, one CTA */}
      <Section id="plan">
        <SectionHeading center eyebrow="Here's how it works" title="A simple plan" />
        <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-3">
          {conceptA.plan.map((step, i) => (
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
        <div className="mt-10 text-center">
          <a href="/contact" className="btn-primary">
            Book a free call
          </a>
        </div>
      </Section>

      {/* Services, kept brief — not the focus of this concept */}
      <Section>
        <SectionHeading
          center
          eyebrow="What we offer"
          title="One plan, matched to your student"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.08}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Success vision */}
      <Section>
        <div className="mx-auto max-w-2xl rounded-3xl border border-forest-100 bg-cream p-8 text-center shadow-card">
          <Check className="mx-auto h-8 w-8 text-forest-500" />
          <p className="prose-kairos mt-4 text-lg">{conceptA.successVision}</p>
        </div>
      </Section>

      <CTASection
        title="Book a free call today"
        intro={conceptA.failureStakes}
        primaryLabel="Book a free call"
        primaryHref="/contact"
      />
    </>
  );
}
