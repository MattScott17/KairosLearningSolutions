import type { Metadata } from "next";
import { FallClassFinder } from "@/components/FallClassFinder";
import { CollapsibleOnMobile } from "@/components/CollapsibleOnMobile";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { CTASection } from "@/components/CTASection";
import { FallClassCallback } from "@/components/FallClassCallback";
import { pagePhotos } from "@/lib/photos";
import { site } from "@/lib/site";
import { fallClasses, getTestimonials, registrationFees, type FallClass } from "@/lib/content";
import { registrationOptions } from "@/lib/registration";

export const metadata: Metadata = pageMetadata({
  title: "Fall 2026 Classes, Grades K to 7",
  description:
    "Fall 2026 classes for grades K to 7 at Kairos in Salinas, CA: writing labs, a speaking lab, art, nature journaling and a K to 2 learning lab. From $160 a month. Call (831) 500-2520 to save a spot.",
  path: "/fall-classes",
  image: pagePhotos.fallClasses,
});

const classFee = registrationFees.find((f) => f.label.includes("enrichment"))?.value.replace(" / ", " a ");
const endDate = site.fallClassesDateRange.split(" – ")[1];
const [review] = getTestimonials(["angelina-d"]);

const groups = [
  { title: "Kindergarten to 3rd grade", classes: fallClasses.filter((c) => c.group === "younger") },
  { title: "3rd to 7th grade", classes: fallClasses.filter((c) => c.group === "older") },
];

function registerHref(c: FallClass) {
  return registrationOptions.some((o) => o.id === c.slug)
    ? `/fall-classes/register?class=${c.slug}`
    : "/fall-classes/register";
}

function ClassRow({ c }: { c: FallClass }) {
  return (
    <article id={c.slug} className="scroll-mt-28 border-b border-forest-100 py-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
        <div className="min-w-0">
          <h4 className="font-display text-xl font-semibold text-forest-900">
            {c.title} <span className="text-base font-normal text-ink/80">({c.grades})</span>
          </h4>
          <p className="mt-1 text-base text-ink">
            {c.day}s, {c.time}
            {c.dates && <>, {c.dates}</>}
          </p>
          {c.partner && <p className="text-sm text-ink/80">Taught by {c.partner}</p>}
        </div>
        <div className="flex shrink-0 items-center justify-between gap-5 sm:flex-col sm:items-end sm:gap-2">
          <p className="text-lg font-semibold text-forest-800">{c.price}</p>
          <Link href={registerHref(c)} className="btn-primary">
            Register
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <details className="group mt-3">
        <summary className="link-underline inline-flex min-h-11 cursor-pointer list-none items-center text-sm [&::-webkit-details-marker]:hidden">
          <span className="group-open:hidden">What the class covers</span>
          <span className="hidden group-open:inline">Hide details</span>
        </summary>
        <p className="mt-1 max-w-2xl text-base leading-relaxed text-ink">{c.description}</p>
        {c.blocks && (
          <ul className="mt-3 max-w-md space-y-1.5 text-sm">
            {c.blocks.map((b) => (
              <li key={b.label} className="flex justify-between gap-4 rounded-md bg-sand px-3 py-2">
                <span className="font-medium text-ink">{b.label}</span>
                <span className="text-ink/80">{b.time}</span>
              </li>
            ))}
          </ul>
        )}
      </details>
    </article>
  );
}

export default function FallClassesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Fall Classes", path: "/fall-classes" }])} />
      <PageHero
        title="Fall 2026 classes for kids in K to 7th grade"
        mark="K to 7th grade"
        intro={`Small weekly enrichment classes in writing, speaking, art and reading, through ${endDate}.`}
        tone="forest"
        aside={
          <CollapsibleOnMobile label="Not ready to register? Send the interest form">
            <FallClassCallback classTitles={fallClasses.map((c) => c.title)} />
          </CollapsibleOnMobile>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={site.phoneHref} className="btn-accent px-6 py-4 text-base">
            <Phone className="h-5 w-5" />
            Call {site.phone}
          </a>
          <Link href="/fall-classes/register" className="btn-outline px-6 py-4 text-base">
            Register online
          </Link>
        </div>
        <dl className="mt-8 grid grid-cols-1 gap-3 border-t border-cream/25 pt-5 text-base sm:grid-cols-3 sm:gap-4">
          <div>
            <dt className="text-cream/90">Days</dt>
            <dd className="mt-1 font-semibold text-cream">Mondays and Wednesdays</dd>
          </div>
          <div>
            <dt className="text-cream/90">Price</dt>
            <dd className="mt-1 font-semibold text-cream">From $160 a month</dd>
          </div>
          <div>
            <dt className="text-cream/90">Spots</dt>
            <dd className="mt-1 font-semibold text-cream">First come, first served</dd>
          </div>
        </dl>
      </PageHero>

      <Section id="classes" className="scroll-mt-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold sm:text-4xl">This fall&apos;s classes</h2>
          <p className="mt-3 text-lg text-ink">
            One class a week, small groups. {classFee} registration fee.
          </p>
        </div>

        <FallClassFinder
          classes={fallClasses.map((c) => ({
            slug: c.slug,
            title: c.title,
            grades: c.grades,
            gradeRange: c.gradeRange,
            day: c.day,
            time: c.time,
            dates: c.dates,
            href: registerHref(c),
          }))}
        />

        <h3 className="mt-14 text-2xl font-semibold sm:text-3xl">All classes, with details and prices</h3>
        {groups.map((g) => (
          <div key={g.title} className="mt-8">
            <h3 className="border-b-2 border-forest-700 pb-2 font-display text-xl font-semibold text-forest-900">
              {g.title}
            </h3>
            {g.classes.map((c) => (
              <ClassRow key={c.slug} c={c} />
            ))}
          </div>
        ))}

        <p className="mt-12 text-ink">
          Looking for something bigger? See{" "}
          <Link href="/early-learners" className="link-underline">
            Early Learners
          </Link>{" "}
          for TK to 2nd grade mornings, or{" "}
          <Link href="/apex" className="link-underline">
            APEX
          </Link>
          , our full-time program.
        </p>
      </Section>

      <section className="bg-sand py-16 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={pagePhotos.fallClasses.src}
                alt={pagePhotos.fallClasses.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <figure className="mt-8">
              <blockquote className="font-display text-xl leading-snug text-forest-900 sm:text-2xl">
                &ldquo;{review.pull}&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-sm text-ink/75">
                {review.author}, {review.role.toLowerCase()} · Google review
              </figcaption>
            </figure>
          </div>

          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">Signing up</h2>
            <dl className="mt-6 border-t border-forest-200">
              <div className="border-b border-forest-200 py-5">
                <dt className="font-semibold text-forest-900">How do I sign up, and what does it cost?</dt>
                <dd className="prose-kairos mt-1">
                  Call{" "}
                  <a href={site.phoneHref} className="link-underline">
                    {site.phone}
                  </a>{" "}
                  or fill out the{" "}
                  <Link href="/fall-classes/register" className="link-underline">
                    registration form
                  </Link>
                  . Each class lists its price, plus a {classFee} registration fee that covers
                  materials and saves your student&apos;s place.
                </dd>
              </div>
              <div className="border-b border-forest-200 py-5">
                <dt className="font-semibold text-forest-900">We use charter school funds. Is that okay?</dt>
                <dd className="prose-kairos mt-1">
                  Yes. Let your ES know, and nothing is due until the charter approves it.
                </dd>
              </div>
              <div className="border-b border-forest-200 py-5">
                <dt className="font-semibold text-forest-900">How do spots work?</dt>
                <dd className="prose-kairos mt-1">Spots go first come, first served.</dd>
              </div>
              <div className="border-b border-forest-200 py-5">
                <dt className="font-semibold text-forest-900">Which days are you closed?</dt>
                <dd className="prose-kairos mt-1">
                  Holidays and breaks are on the{" "}
                  <a href={site.schoolCalendarUrl} target="_blank" rel="noopener noreferrer" className="link-underline">
                    2026 to 2027 school calendar
                  </a>{" "}
                  (PDF).
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <CTASection
        title="Call to save a spot"
        intro="Tell us your student's grade and we'll tell you which classes have room."
        primaryLabel="Register online"
        primaryHref="/fall-classes/register"
      />

    </>
  );
}
