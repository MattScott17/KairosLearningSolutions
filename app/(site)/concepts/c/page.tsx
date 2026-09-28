import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CTASection } from "@/components/CTASection";
import { FallClassesBanner } from "@/components/home/FallClassesBanner";
import { PathFinder, type Path } from "@/components/concepts/PathFinder";
import { FocusCards, type FocusCard } from "@/components/aceternity/FocusCards";
import { HandArrow, HandUnderline } from "@/components/concepts/HandDrawn";
import { NameRing } from "@/components/concepts/NameRing";
import { services, apex, earlyLearners, enrichment, leadership } from "@/lib/content";
import { site } from "@/lib/site";
import { conceptC } from "@/lib/storybrand";
import { photos, heroPhotos, type Photo } from "@/lib/photos";

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
  { title: enrichment.title, detail: "Writing, speaking, art & reading", href: "/fall-classes", photo: photos.cooking },
];

// Split the headline so "your student" can carry the hand-drawn underline.
const headlineMarkText = "your student";
const markAt = conceptC.heroHeadline.indexOf(headlineMarkText);
const headlineLead = markAt >= 0 ? conceptC.heroHeadline.slice(0, markAt) : conceptC.heroHeadline;
const headlineMark = markAt >= 0 ? headlineMarkText : "";
const headlineTail = markAt >= 0 ? conceptC.heroHeadline.slice(markAt + headlineMarkText.length) : "";

const jackie = leadership[0];
const weekdayHours = site.hours[0].time.replace(" – ", " to ").replace(/:00 AM/, " AM");

// `short` is the phone version; facts without one are desktop only.
const quickFacts: { full: string; short?: string }[] = [
  { full: "TK to 9th grade", short: "TK to 9th grade" },
  { full: `${site.address.street}, ${site.address.city}`, short: site.address.city },
  { full: `Mon to Thu, ${weekdayHours}` },
  { full: `Open since ${site.foundedYear}`, short: `Since ${site.foundedYear}` },
];

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function ConceptCPage() {
  return (
    <>
      {/* Hero: the decision framing, split with an arched photo */}
      <section className="relative overflow-hidden pt-24 sm:pt-28">
        <FallClassesBanner className="mb-10 lg:mb-14" />
        <div className="container-page grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="text-center lg:text-left">
            <h1 className="mx-auto max-w-2xl text-4xl font-semibold leading-[1.1] sm:text-5xl lg:mx-0 lg:text-[3.5rem]">
              {headlineLead}
              <span className="relative inline-block whitespace-nowrap">
                {headlineMark}
                <HandUnderline className="absolute -bottom-2 left-0 h-3 w-full text-gold-500 sm:-bottom-3 sm:h-4" />
              </span>
              {headlineTail}
            </h1>
            <p className="prose-kairos mx-auto mt-6 max-w-sm text-lg lg:hidden">
              {conceptC.heroSubShort ?? conceptC.heroSub}
            </p>
            <p className="prose-kairos mt-8 hidden max-w-xl text-lg lg:block">{conceptC.heroSub}</p>

            <div className="mt-8 hidden max-w-xl gap-4 border-l-2 border-gold-500/60 pl-5 lg:flex">
              <div>
                <p className="font-display text-lg italic text-forest-800">
                  &ldquo;Tell me about your student and I&rsquo;ll tell you where I&rsquo;d start.&rdquo;
                </p>
                <p className="mt-2 text-sm text-ink/70">
                  {jackie.name}, {jackie.role.toLowerCase()} ·{" "}
                  <a href={site.phoneHref} className="link-underline whitespace-nowrap">
                    {site.phone}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[20rem] sm:max-w-sm lg:max-w-none">
            <NameRing>
              <div className="arch relative aspect-[4/5] overflow-hidden">
                <Image
                  src={heroPhotos.main.src}
                  alt={heroPhotos.main.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 20rem, 40vw"
                  className="object-cover"
                />
              </div>
            </NameRing>
          </div>

          {/* Phones: one clear call button in place of the quote */}
          <div className="text-center lg:hidden">
            <a href={site.phoneHref} className="btn-primary">
              <Phone className="h-4 w-4" />
              Call {site.phone}
            </a>
          </div>
        </div>

        {/* Quick facts, then a hand-drawn nudge down to the chooser */}
        <div className="container-page mt-12">
          <ul className="flex flex-wrap items-center justify-center border-y border-forest-100 py-4 text-sm text-ink/75">
            {quickFacts.map((fact, i) => (
              <li key={fact.full} className={`items-center ${fact.short ? "flex" : "hidden lg:flex"}`}>
                {i > 0 && (
                  <span aria-hidden="true" className="mx-3 inline-block h-1 w-1 rounded-full bg-gold-500 lg:mx-5" />
                )}
                <span className="lg:hidden">{fact.short}</span>
                <span className="hidden lg:inline">{fact.full}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center justify-center gap-4 text-forest-700">
            <span className="font-display text-3xl italic sm:text-4xl">Start here</span>
            <HandArrow className="h-14 w-11 sm:h-16 sm:w-12" />
          </div>
        </div>
      </section>

      {/* The path-finder: the core mechanic of this concept */}
      <Section className="!pt-4 sm:!pt-6">
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
            <div className="grid gap-3 border-t border-cream/15 pt-6 lg:border-l lg:border-t-0 lg:pl-8 sm:grid-cols-3 sm:gap-4 lg:pt-0">
              <div className="flex flex-row-reverse items-baseline justify-between gap-4 sm:block">
                <p className="font-display text-xl font-semibold text-cream">
                  {apex.gradeRange.replace(/^Grades /, "")}
                </p>
                <p className="text-sm text-cream/60 sm:mt-1">Grades</p>
              </div>
              <div className="flex flex-row-reverse items-baseline justify-between gap-4 sm:block">
                <p className="font-display text-xl font-semibold text-cream">{apex.tuition.monthly}</p>
                <p className="text-sm text-cream/60 sm:mt-1">Tuition</p>
              </div>
              <div className="flex flex-row-reverse items-baseline justify-between gap-4 sm:block">
                <p className="font-display text-xl font-semibold text-cream">Full-time</p>
                <p className="text-sm text-cream/60 sm:mt-1">Format</p>
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
        intro="Tell us about your student and we'll tell you where we'd start."
      />
    </>
  );
}
