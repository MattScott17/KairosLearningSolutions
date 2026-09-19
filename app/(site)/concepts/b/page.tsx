import type { Metadata } from "next";
import Image from "next/image";
import { Quote } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/CTASection";
import { testimonials, values } from "@/lib/content";
import { site } from "@/lib/site";
import { conceptB } from "@/lib/storybrand";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function ConceptBPage() {
  return (
    <>
      {/* Hero — full-bleed photo, short emotional headline */}
      <section className="relative flex min-h-[80vh] items-end overflow-hidden pt-24">
        <Image
          src="/images/photo-1.jpg"
          alt="Students learning at Kairos Learning Solutions"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/50 to-forest-950/10"
          aria-hidden
        />
        <div className="container-page relative pb-16 text-cream sm:pb-24">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-cream/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cream backdrop-blur-sm">
              Serving Salinas since {site.foundedYear}
            </span>
            <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.1] text-cream sm:text-5xl">
              {conceptB.heroHeadline}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-cream/85">{conceptB.heroSub}</p>
            <a href="#story" className="btn-accent mt-8 inline-flex">
              See a day at Kairos
            </a>
          </Reveal>
        </div>
      </section>

      {/* The problem, told gently */}
      <Section id="story" container="narrow">
        <SectionHeading
          eyebrow="Before Kairos"
          title="Every family that walks in has a story like this"
          intro={conceptB.problem.external}
        />
      </Section>

      {/* Narrative photo band */}
      <section className="bg-forest-900 py-16 text-cream sm:py-24">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-4xl shadow-soft">
              <Image
                src="/images/photo-2.jpg"
                alt="A focused learning environment at Kairos"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="inline-flex items-center gap-2 rounded-full bg-forest-700 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-forest-100">
              What changes
            </span>
            <p className="mt-5 text-lg text-cream/85">{conceptB.problem.internal}</p>
            <p className="mt-4 text-lg font-semibold text-cream">{conceptB.problem.philosophical}</p>
          </Reveal>
        </div>
      </section>

      {/* Values, as the "how we guide" beat */}
      <Section>
        <SectionHeading center eyebrow="How we show up" title="The Kairos difference" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-forest-100 bg-cream p-8 text-center shadow-card">
                <h3 className="text-xl font-semibold">{value.title}</h3>
                <p className="prose-kairos mt-3 text-sm">{value.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The plan, told as a gentle timeline, flowing straight into the
          testimonial that pays it off — one continuous sand block instead
          of two sections with a visible seam between them */}
      <section className="bg-sand/50 py-16 sm:py-24">
        <div className="container-narrow">
          <SectionHeading eyebrow="What happens next" title="A simple next step" />
          <div className="mt-10 space-y-8 border-l-2 border-forest-200 pl-8">
            {conceptB.plan.map((step, i) => (
              <Reveal key={step} delay={i * 0.08} className="relative">
                <span className="absolute -left-12 flex h-8 w-8 items-center justify-center rounded-full bg-forest-800 font-display text-sm font-semibold text-cream">
                  {i + 1}
                </span>
                <p className="prose-kairos text-lg">{step}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="container-page mx-auto mt-20 max-w-2xl text-center">
          <Reveal>
            <Quote className="mx-auto h-9 w-9 text-forest-300" />
            <blockquote className="mt-4 text-2xl leading-relaxed text-ink/85">
              "{testimonials[0].quote}"
            </blockquote>
            <p className="mt-5 text-sm font-semibold text-forest-800">
              {testimonials[0].author} · {testimonials[0].role}
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection
        title={conceptB.successVision}
        intro="Book a free call and let's find out what a day at Kairos could look like for your family."
        primaryLabel="Book a free call"
        primaryHref="/contact"
      />
    </>
  );
}
