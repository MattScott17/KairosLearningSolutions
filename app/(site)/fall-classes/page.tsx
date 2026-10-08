import type { Metadata } from "next";
import { ExpandableText } from "@/components/ExpandableText";
import { Reveal } from "@/components/ui/Reveal";
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

function ClassCard({ c }: { c: FallClass }) {
  return (
    <article id={c.slug} className="flex h-full scroll-mt-28 flex-col rounded-lg border border-forest-100 bg-cream p-6 sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-2xl font-semibold">{c.title}</h3>
        <p className="text-sm font-semibold text-forest-700">{c.grades}</p>
      </div>
      {c.partner && <p className="mt-1 text-sm text-ink/75">Taught by {c.partner}</p>}

      <dl className="mt-4 grid gap-x-6 gap-y-1 border-y border-forest-100 py-3 text-sm sm:grid-cols-[auto_1fr]">
        <dt className="font-medium text-ink/75">When</dt>
        <dd className="text-ink">
          {c.day}s, {c.time}
        </dd>
        {c.dates && (
          <>
            <dt className="font-medium text-ink/75">Dates</dt>
            <dd className="text-ink">{c.dates}</dd>
          </>
        )}
        <dt className="font-medium text-ink/75">Price</dt>
        <dd className="font-semibold text-forest-800">{c.price}</dd>
      </dl>

      <ExpandableText text={c.description} lines={3} className="mt-4 text-base" />

      {c.blocks && (
        <ul className="mt-4 space-y-1.5 text-sm">
          {c.blocks.map((b) => (
            <li key={b.label} className="flex justify-between gap-4 rounded-md bg-sand px-3 py-2">
              <span className="font-medium text-ink">{b.label}</span>
              <span className="text-ink/70">{b.time}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-6">
        <Link href={registerHref(c)} className="btn-primary">
          Register
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
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
        intro={`Small weekly classes in writing, speaking, art and reading, running through ${endDate}. Call and we'll sign your student up on the phone.`}
        aside={<FallClassCallback classTitles={fallClasses.map((c) => c.title)} />}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={site.phoneHref} className="btn-accent px-6 py-4 text-base">
            <Phone className="h-5 w-5" />
            Call {site.phone}
          </a>
          <a href="#classes" className="btn-outline px-6 py-4 text-base">
            See the classes
          </a>
        </div>
        <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-forest-200 pt-6 text-sm">
          <div>
            <dt className="text-ink/75">Days</dt>
            <dd className="mt-1 font-semibold text-forest-900">Mondays and Wednesdays</dd>
          </div>
          <div>
            <dt className="text-ink/75">Price</dt>
            <dd className="mt-1 font-semibold text-forest-900">From $160 a month</dd>
          </div>
          <div>
            <dt className="text-ink/75">Spots</dt>
            <dd className="mt-1 font-semibold text-forest-900">First come, first served</dd>
          </div>
        </dl>
      </PageHero>

      <Section id="classes" className="scroll-mt-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold sm:text-4xl">This fall&apos;s classes</h2>
          <p className="prose-kairos mt-4 text-lg">
            Each class meets once a week in a small group, plus a {classFee} registration fee.
          </p>
        </div>

        {groups.map((g) => (
          <div key={g.title} className="mt-14">
            <h3 className="border-b-2 border-forest-800 pb-3 font-display text-xl font-semibold text-forest-900">
              {g.title}
            </h3>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {g.classes.map((c, i) => (
                <Reveal key={c.slug} delay={(i % 2) * 0.08} className="h-full">
                  <ClassCard c={c} />
                </Reveal>
              ))}
            </div>
          </div>
        ))}

        <p className="mt-12 text-ink/70">
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
                  and we&apos;ll do it over the phone, or fill out the{" "}
                  <Link href="/fall-classes/register" className="link-underline">
                    registration form
                  </Link>
                  . The class price is listed with each class, plus a {classFee} registration fee that covers
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
                <dt className="font-semibold text-forest-900">Will the class definitely run?</dt>
                <dd className="prose-kairos mt-1">
                  Each class needs a minimum number of students, and spots go first come, first
                  served.
                </dd>
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
        intro="Tell us your student's age and what they're into, and we'll tell you which classes have room."
        primaryLabel="Or register online"
        primaryHref="/fall-classes/register"
      />

    </>
  );
}
