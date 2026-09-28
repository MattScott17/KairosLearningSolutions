import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CTASection } from "@/components/CTASection";
import { PathFinder, type Path } from "@/components/concepts/PathFinder";
import { FocusCards, type FocusCard } from "@/components/aceternity/FocusCards";
import { services, apex, earlyLearners, enrichment } from "@/lib/content";
import { conceptC } from "@/lib/storybrand";
import { photos, type Photo } from "@/lib/photos";

const servicePhoto: Record<string, Photo> = {
  "private-tutoring": photos.readingTogether,
  "homework-club": photos.homework,
  "homeschool-support": photos.studentsLearning,
};

const [tutoring, homework, homeschool] = ["private-tutoring", "homework-club", "homeschool-support"].map(
  (slug) => services.find((s) => s.slug === slug)!
);

const paths: Path[] = [
  {
    id: "boost",
    need: "a little extra help",
    needShort: "extra help",
    program: tutoring.title,
    summary: tutoring.summary,
    facts: tutoring.highlights,
    href: `/services/${tutoring.slug}`,
    cta: tutoring.cta,
    photo: servicePhoto[tutoring.slug],
  },
  {
    id: "homework",
    need: "homework help after school",
    needShort: "homework help",
    program: homework.title,
    summary: homework.summary,
    facts: homework.highlights,
    href: `/services/${homework.slug}`,
    cta: homework.cta,
    photo: servicePhoto[homework.slug],
  },
  {
    id: "homeschool",
    need: "a homeschool partner",
    needShort: "homeschool help",
    program: homeschool.title,
    summary: homeschool.summary,
    facts: homeschool.highlights,
    href: `/services/${homeschool.slug}`,
    cta: homeschool.cta,
    photo: servicePhoto[homeschool.slug],
  },
  {
    id: "early",
    need: "a strong start (TK–2nd)",
    needShort: "early learning (TK–2nd)",
    program: earlyLearners.name,
    summary: earlyLearners.intro,
    facts: [
      { label: "Grades", value: earlyLearners.ageRange },
      { label: "Days", value: "Tue to Thu" },
      { label: "Pricing", value: earlyLearners.pricing[0].value },
    ],
    href: "/early-learners",
    cta: "Explore Early Learners",
    photo: photos.craftProject,
  },
  {
    id: "fulltime",
    need: "a full-time school",
    needShort: "full-time school",
    program: "APEX",
    summary: apex.intro,
    facts: [
      { label: "Grades", value: apex.gradeRange },
      { label: "Tuition", value: apex.tuition.monthly },
      { label: "Format", value: "Full-time" },
    ],
    href: "/apex",
    cta: "Explore APEX",
    photo: photos.threeDPrinting,
  },
];

const programCards: FocusCard[] = [
  ...[tutoring, homework, homeschool].map((s) => ({
    title: s.title,
    detail: s.short,
    href: `/services/${s.slug}`,
    photo: servicePhoto[s.slug],
  })),
  { title: earlyLearners.name, detail: earlyLearners.ageRange, href: "/early-learners", photo: photos.craftProject },
  { title: "APEX", detail: `Full-time · ${apex.gradeRange}`, href: "/apex", photo: photos.threeDPrinting },
  { title: enrichment.title, detail: "Writing, Spanish, STEM & more", href: "/fall-classes", photo: photos.cooking },
];

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function ConceptCPage() {
  return (
    <>
      {/* Hero: the decision framing */}
      <section className="relative overflow-hidden pt-24 sm:pt-28">
        <div className="container-page text-center">
          <div>
            <h1 className="mx-auto max-w-3xl text-4xl font-semibold leading-[1.1] sm:text-5xl">
              {conceptC.heroHeadline}
            </h1>
            <p className="prose-kairos mx-auto mt-6 max-w-2xl text-lg">{conceptC.heroSub}</p>
          </div>
        </div>
      </section>

      {/* The path-finder: the core mechanic of this concept */}
      <Section>
        <div>
          <PathFinder paths={paths} />
        </div>
      </Section>

      {/* Problem: framed as a decision problem */}
      <Section className="bg-sand/50">
        <SectionHeading title="Choosing a program" intro={conceptC.problem.external} />
        <div className="mt-8 max-w-2xl space-y-4 border-l-2 border-gold-500/40 pl-6">
          <p className="prose-kairos">{conceptC.problem.internal}</p>
          <p className="font-display text-lg text-forest-800">{conceptC.problem.philosophical}</p>
        </div>
      </Section>

      {/* Program photo cards */}
      <Section className="bg-sand/50">
        <SectionHeading title="From an hour a week to a full school day" />
        <div className="mt-12">
          <FocusCards cards={programCards} />
        </div>

        {/* APEX called out separately as the "full-time" end of the spectrum */}
        <div>
          <div className="mt-6 grid gap-8 rounded-lg bg-forest-800 p-8 text-cream lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <h3 className="text-2xl font-semibold text-cream">
                APEX, full-time for {apex.gradeRange.toLowerCase()}
              </h3>
              <p className="mt-2 max-w-xl text-cream/80">{apex.intro}</p>
              <Link href="/apex" className="btn-accent mt-6 inline-flex">
                Explore APEX
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 border-t border-cream/15 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div>
                <p className="font-display text-xl font-semibold text-cream">{apex.gradeRange}</p>
                <p className="mt-1 text-sm text-cream/60">Grades</p>
              </div>
              <div>
                <p className="font-display text-xl font-semibold text-cream">{apex.tuition.monthly}</p>
                <p className="mt-1 text-sm text-cream/60">Tuition</p>
              </div>
              <div>
                <p className="font-display text-xl font-semibold text-cream">Full-time</p>
                <p className="mt-1 text-sm text-cream/60">Format</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Plan: confirm the fit before committing */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <h2 className="text-3xl font-semibold sm:text-4xl">How to get started</h2>
          <div>
            <ol className="border-t border-forest-200">
              {conceptC.plan.map((step, i) => (
                <li key={step} className="flex gap-5 border-b border-forest-100 py-5">
                  <span className="font-display text-xl font-semibold text-forest-700">{i + 1}.</span>
                  <p className="prose-kairos text-lg">{step}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-lg font-medium text-forest-800">{conceptC.successVision}</p>
          </div>
        </div>
      </Section>

      <CTASection
        title="Not sure which program fits?"
        intro="Call me and tell me about your student. I'll tell you where I'd start."
      />
    </>
  );
}
