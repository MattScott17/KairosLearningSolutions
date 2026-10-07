import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CTASection } from "@/components/CTASection";
import { ParallaxPhoto } from "@/components/home/ParallaxPhoto";
import { StickyCallBar } from "@/components/lp/StickyCallBar";
import { PhotosFromKairos, HowWeTeach, GetStarted } from "@/components/home/HomeSections";
import { TutorRow } from "@/components/TutorCard";
import { FallClassesBanner } from "@/components/home/FallClassesBanner";
import { PathFinder, type Path } from "@/components/concepts/PathFinder";
import { HandArrow, HandUnderline } from "@/components/concepts/HandDrawn";
import { NameRing } from "@/components/concepts/NameRing";
import {
  services,
  apex,
  earlyLearners,
  homeschoolPricing,
  leadership,
  featuredTutors,
  getTeamMembers,
} from "@/lib/content";
import { site } from "@/lib/site";
import { conceptC } from "@/lib/storybrand";
import { photos, heroPhotos, type Photo } from "@/lib/photos";

const servicePhoto: Record<string, Photo> = {
  "private-tutoring": photos.readingTogether,
  "homeschool-support": photos.studentsLearning,
};

const [tutoring, homeschool] = ["private-tutoring", "homeschool-support"].map(
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
    id: "homeschool",
    need: "a homeschool partner",
    needShort: "homeschool help",
    program: homeschool.title,
    summary: homeschool.summary,
    facts: [
      homeschool.highlights[0],
      { label: "Pricing", value: `From $${homeschoolPricing.levels.A[0]} a month` },
      homeschool.highlights[2],
    ],
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
      { label: "First step", value: "Free call and tour" },
      { label: "Tuition", value: apex.tuition.monthly.replace(" / ", " a ") },
    ],
    href: "/apex",
    cta: "Explore APEX",
    photo: photos.threeDPrinting,
  },
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
const quickFacts: { full: string; short?: string; wide?: boolean }[] = [
  { full: "TK to 9th grade", short: "TK to 9th grade" },
  { full: `${site.address.street}, ${site.address.city}`, short: site.address.city },
  { full: `Mon to Thu, ${weekdayHours}`, short: `Mon to Thu, ${weekdayHours}`, wide: true },
  { full: `Open since ${site.foundedYear}`, short: `Since ${site.foundedYear}` },
];

export function ConceptCHome() {
  return (
    <>
      {/* Hero: the decision framing, split with an arched photo */}
      <section className="relative overflow-hidden pt-24 sm:pt-28">
        <FallClassesBanner variant="slim" className="mb-6 lg:mb-10" />
        <div className="container-page grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="text-center lg:text-left">
            <h1 className="mx-auto max-w-2xl text-4xl font-semibold leading-[1.1] sm:text-5xl lg:mx-0 lg:text-[3.25rem]">
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

            <div className="mt-6 lg:hidden">
              <a href={site.phoneHref} className="btn-primary">
                <Phone className="h-4 w-4" />
                Call {site.phone}
              </a>
            </div>

            <div className="mt-8 hidden items-center gap-6 lg:flex">
              <a href={site.phoneHref} className="btn-primary">
                <Phone className="h-4 w-4" />
                Call {site.phone}
              </a>
              <a href="#programs" className="link-underline inline-flex items-center gap-1.5">
                Find your program
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <figure className="mt-8 hidden max-w-xl lg:block">
              <blockquote className="font-display text-lg italic text-forest-800">
                &ldquo;Tell me about your student and I&rsquo;ll tell you where I&rsquo;d start.&rdquo;
              </blockquote>
              <figcaption className="mt-2 text-sm text-ink/70">
                {jackie.name}, {jackie.role.toLowerCase()}
              </figcaption>
            </figure>
          </div>

          <div className="relative mx-auto w-full max-w-[13rem] sm:max-w-sm lg:max-w-none">
            <NameRing>
              <div className="arch relative aspect-[4/5] overflow-hidden">
                <Image
                  src={heroPhotos.main.src}
                  alt={heroPhotos.main.alt}
                  fill
                  priority
                  sizes="(max-width: 640px) 13rem, (max-width: 1024px) 24rem, 40vw"
                  className="object-cover"
                />
              </div>
            </NameRing>
          </div>

        </div>

        {/* Quick facts, then a hand-drawn nudge down to the chooser */}
        <div className="container-page mt-8 sm:mt-12">
          <ul className="grid grid-cols-2 justify-items-center gap-x-4 gap-y-2 border-y border-forest-100 py-4 text-center text-sm text-ink/75 lg:flex lg:flex-wrap lg:items-center lg:justify-center lg:gap-0">
            {quickFacts.map((fact, i) => (
              <li key={fact.full} className={`items-center justify-center ${fact.wide ? "col-span-2 lg:col-span-1" : ""} ${fact.short ? "flex" : "hidden lg:flex"}`}>
                {i > 0 && (
                  <span aria-hidden="true" className="mx-5 hidden h-1 w-1 rounded-full bg-gold-500 lg:inline-block" />
                )}
                <span className="lg:hidden">{fact.short}</span>
                <span className="hidden lg:inline">{fact.full}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-center gap-4 text-forest-700 sm:mt-8">
            <span className="font-display text-2xl font-semibold sm:text-3xl">Start here</span>
            <HandArrow className="h-14 w-11 sm:h-16 sm:w-12" />
          </div>
        </div>
      </section>

      {/* The path-finder: the core mechanic of this concept */}
      <Section id="programs" className="!pt-4 sm:!pt-6">
        <PathFinder paths={paths} />
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-lg border border-forest-200 bg-sand/50 px-6 py-6 text-center sm:flex-row sm:text-left">
          <p className="font-display text-xl font-semibold text-forest-900 sm:text-2xl">
            Looking for weekly classes in writing, speaking, art and reading?
          </p>
          <Link href="/fall-classes" className="btn-primary shrink-0">
            See our fall classes
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <GetStarted />

      <PhotosFromKairos />

      <HowWeTeach />

      {/* Who teaches */}
      <Section className="bg-sand/50">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            title="Who will be teaching your child"
            intro="Retired classroom teachers, a Monterey County Teacher of the Year nominee, and math and science tutors from Cal Poly, UC San Diego and CSU Monterey Bay."
          />
          <Link href="/about" className="link-underline inline-flex min-h-11 shrink-0 items-center">
            Meet the whole team
          </Link>
        </div>
        <div className="mt-10">
          <TutorRow members={getTeamMembers(featuredTutors.home)} />
        </div>
      </Section>

      <div className="container-page py-10 text-center sm:py-12">
        <p className="text-ink/80">
          Run a school or district?{" "}
          <Link href="/district-partnerships" className="link-underline">
            See how we partner with schools
          </Link>
        </p>
      </div>

      {/* APEX: how it works, for parents weighing a full-time option */}
      <section className="bg-forest-900 text-cream">
        <div className="container-page grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2">
          <ParallaxPhoto
            photo={photos.smallGroup}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="aspect-[4/3] rounded-lg"
          />
          <div>
            <h2 className="text-3xl font-semibold text-cream sm:text-4xl">How APEX works</h2>
            <p className="mt-4 text-lg text-cream/85">{apex.model}</p>
            <dl className="mt-6 divide-y divide-cream/15 border-y border-cream/15">
              {apex.comparison.map((row) => (
                <div key={row.traditional} className="grid gap-1 py-3 sm:grid-cols-2 sm:gap-6">
                  <dt className="text-cream/75 line-through decoration-cream/50">{row.traditional}</dt>
                  <dd className="font-semibold text-cream">{row.apex}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-cream/85">{apex.outcomesNote}</p>
            <Link href="/apex" className="btn-accent mt-8 inline-flex">
              See how a day goes
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Not sure which program fits?"
        intro="Tell us about your student and we'll tell you where we'd start."
      />

      <StickyCallBar />
    </>
  );
}
