import type { Metadata } from "next";
import Image from "next/image";
import { Check, Phone } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/CTASection";
import { ServiceCard } from "@/components/ServiceCard";
import { StatsBar } from "@/components/StatsBar";
import { StickyCallBar } from "@/components/lp/StickyCallBar";
import { Timeline, type TimelineItem } from "@/components/aceternity/Timeline";
import { site } from "@/lib/site";
import { services } from "@/lib/content";
import { conceptA } from "@/lib/storybrand";
import { photos, type Photo } from "@/lib/photos";

export const metadata: Metadata = { robots: { index: false, follow: false } };

function StepPhoto({ photo }: { photo: Photo }) {
  return (
    <div className="relative mt-6 aspect-[16/10] w-full max-w-xl overflow-hidden rounded-3xl shadow-soft">
      <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 768px) 90vw, 36rem" className="object-cover" />
    </div>
  );
}

const planTitles = conceptA.planTitles ?? [];

const planSteps: TimelineItem[] = [
  {
    title: planTitles[0],
    content: (
      <>
        <p className="prose-kairos max-w-xl text-lg">{conceptA.plan[0]}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href="/contact" className="btn-primary">
            Book a free call
          </a>
          <a href={site.phoneHref} className="btn-outline">
            <Phone className="h-4 w-4" />
            {site.phone}
          </a>
        </div>
      </>
    ),
  },
  {
    title: planTitles[1],
    content: (
      <>
        <p className="prose-kairos max-w-xl text-lg">{conceptA.plan[1]}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {[...services.map((s) => s.title), "APEX"].map((name) => (
            <li
              key={name}
              className="rounded-full border border-forest-200 bg-forest-50 px-3 py-1 text-xs font-semibold text-forest-700"
            >
              {name}
            </li>
          ))}
        </ul>
        <StepPhoto photo={photos.smallGroup} />
      </>
    ),
  },
  {
    title: planTitles[2],
    content: (
      <>
        <p className="prose-kairos max-w-xl text-lg">{conceptA.plan[2]}</p>
        <StepPhoto photo={photos.presenting} />
      </>
    ),
  },
];

export default function ConceptAPage() {
  return (
    // Bottom padding keeps the phone-only sticky call bar off the footer.
    <div className="pb-20 sm:pb-0">
      {/* Hero — the problem, named plainly, one CTA */}
      <section className="relative overflow-hidden pt-24 sm:pt-28">
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

      {/* Trust bar — credibility, high up, before anything else is asked */}
      <StatsBar />

      {/* Problem — external / internal / philosophical, StoryBrand-style */}
      <Section className="bg-sand/50">
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

      {/* Guide — Kairos as the guide, brief credibility, real photo */}
      <section className="bg-forest-800 py-16 text-cream sm:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-4xl shadow-soft">
              <Image
                src="/images/photo-3.jpg"
                alt="Two Kairos students working on a craft project together"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="inline-flex items-center gap-2 rounded-full bg-forest-700 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-forest-100">
              Why Kairos
            </span>
            <h2 className="mt-5 text-3xl font-semibold text-cream sm:text-4xl">
              We've been the guide for Salinas families since {site.foundedYear}
            </h2>
            <p className="mt-4 text-lg text-cream/85">
              Kairos exists for exactly this moment — a team of experienced educators whose only
              job is to meet your student where they are and help them go further. We've walked
              this exact road with hundreds of Salinas families already.
            </p>
            <a href="#plan" className="btn-accent mt-7 inline-flex">
              See how it works
            </a>
          </Reveal>
        </div>
      </section>

      {/* Plan — a scroll-linked timeline, one CTA per step */}
      <Section id="plan">
        <SectionHeading eyebrow="Here's how it works" title="A simple plan" />
        <div className="mt-14">
          <Timeline items={planSteps} />
        </div>
      </Section>

      {/* Services, kept brief — not the focus of this concept */}
      <Section className="bg-sand/50">
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

      {/* Success vision — connective tissue leading into the final CTA, not an orphaned card */}
      <div className="container-page pt-16 text-center sm:pt-20">
        <Check className="mx-auto h-6 w-6 text-forest-500" />
        <p className="mx-auto mt-3 max-w-2xl text-lg font-medium text-forest-800">
          {conceptA.successVision}
        </p>
      </div>

      <CTASection
        title="Book a free call today"
        intro={conceptA.failureStakes}
        primaryLabel="Book a free call"
        primaryHref="/contact"
      />
      <StickyCallBar />
    </div>
  );
}
