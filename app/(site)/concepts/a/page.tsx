import type { Metadata } from "next";
import Image from "next/image";
import { Phone } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CTASection } from "@/components/CTASection";
import { Pathways } from "@/components/Pathways";
import { FallClassesBanner } from "@/components/home/FallClassesBanner";
import { ProgramList } from "@/components/ProgramList";
import { StatsBar } from "@/components/StatsBar";
import { StickyCallBar } from "@/components/lp/StickyCallBar";
import { Timeline, type TimelineItem } from "@/components/aceternity/Timeline";
import { site } from "@/lib/site";
import { services } from "@/lib/content";
import { conceptA } from "@/lib/storybrand";
import { photos, type Photo, pagePhotos } from "@/lib/photos";

export const metadata: Metadata = { robots: { index: false, follow: false } };

function StepPhoto({ photo }: { photo: Photo }) {
  return (
    <div className="relative mt-6 aspect-[16/10] w-full max-w-xl overflow-hidden rounded-lg">
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
            Book a call
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
        <p className="mt-3 text-sm text-ink/75">
          {[...services.map((s) => s.title), "Early Learners", "APEX", "District Partnerships"].join(", ")}
        </p>
        <StepPhoto photo={photos.readingTogether} />
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
      {/* Hero: the problem, named plainly, one CTA */}
      <section className="relative overflow-hidden pt-24 sm:pt-28">
        <FallClassesBanner className="mb-10 lg:mb-14" />
        <div className="container-page text-center">
          <div>
            <h1 className="mx-auto max-w-3xl text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
              {conceptA.heroHeadline}
            </h1>
            <p className="prose-kairos mx-auto mt-6 max-w-2xl text-lg">{conceptA.heroSub}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#plan" className="btn-primary w-full sm:w-auto">
                Book a call
              </a>
              <a href={site.phoneHref} className="btn-outline w-full sm:w-auto">
                <Phone className="h-4 w-4" />
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar: credibility, high up, before anything else is asked */}
      <StatsBar />

      {/* Problem, as plain paragraphs beside a heading */}
      <Section className="bg-sand/50">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr]">
          <h2 className="text-3xl font-semibold sm:text-4xl">If this sounds like your family</h2>
          <div className="prose-kairos space-y-4 text-lg">
            <p>{conceptA.problem.external}</p>
            <p>{conceptA.problem.internal}</p>
            <p className="font-semibold text-forest-900">{conceptA.problem.philosophical}</p>
          </div>
        </div>
      </Section>

      {/* Guide: Kairos as the guide, brief credibility, real photo */}
      <section className="bg-forest-800 py-16 text-cream sm:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={pagePhotos.conceptAGuide.src}
              alt={pagePhotos.conceptAGuide.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-cream sm:text-4xl">
              Teaching Salinas students since {site.foundedYear}
            </h2>
            <p className="mt-4 text-lg text-cream/85">
              Many of our teachers spent 15 to 38 years in classrooms before joining Kairos. Every
              student starts at their own level, one-on-one or in a small group, and moves on when
              they&apos;re ready.
            </p>
            <a href="#plan" className="btn-accent mt-7 inline-flex">
              See how it works
            </a>
          </div>
        </div>
      </section>

      {/* Plan: a scroll-linked timeline, one CTA per step */}
      <Section id="plan">
        <SectionHeading title="How to get started" />
        <div className="mt-14">
          <Timeline items={planSteps} />
        </div>
      </Section>

      {/* Programs, kept brief: not the focus of this concept */}
      <Section className="bg-sand/50">
        <SectionHeading title="Programs and prices" />
        <div className="mt-10">
          <ProgramList />
        </div>
        <p className="mt-10 max-w-2xl text-lg font-medium text-forest-800">
          {conceptA.successVision}
        </p>
      </Section>

      <Pathways className="border-t border-forest-100" />

      <CTASection
        title="Give us a call"
        intro={`${conceptA.failureStakes} Tell us what's going on with your student.`}
      />
      <StickyCallBar />
    </div>
  );
}
