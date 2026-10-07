import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata, breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Faq } from "@/components/Faq";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CTASection } from "@/components/CTASection";
import { apex, faqs, getTeamMembers, registrationFees } from "@/lib/content";
import { pagePhotos, photos } from "@/lib/photos";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "APEX Full-Time School, Grades 3 to 9",
  description:
    "APEX is a full-time program for grades 3 to 9 in Salinas, CA, using the 2 Hour Learning model: personalized, mastery-based academics, then projects and life skills.",
  path: "/apex",
  image: pagePhotos.apex,
});

const facts = [
  { label: "Grades", value: apex.gradeRange.replace("Grades ", ""), note: "" },
  { label: "Start with", value: "Free call and tour", note: "" },
  { label: "Schedule", value: "9 a.m. to 2 p.m.", note: "Monday through Thursday, Fridays off" },
];

const [jackie, alissa] = getTeamMembers(["Jackie Scott", "Alissa Scott"]);
const people = [
  {
    name: jackie.name,
    role: jackie.role,
    image: jackie.image!,
    line: "Jackie has been an educator for more than 30 years, from 3rd grade to high school.",
  },
  {
    name: alissa.name,
    role: alissa.role,
    image: alissa.image!,
    line: "Alissa holds a Multiple Subject Teaching Credential. She grew up at Kairos as a student, tutor and teacher.",
  },
];

export default function ApexPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "APEX", path: "/apex" }]),
          serviceJsonLd({
            name: "APEX full-time program in Salinas",
            description: metadata.description as string,
            path: "/apex",
          }),
        ]}
      />
      <PageHero
        title="APEX, full‑time school for grades 3 to 9"
        mark="full‑time school"
        intro={apex.intro}
        photo={pagePhotos.apex}
        variant="dark"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/contact" className="btn-accent">
            Book a tour
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={site.phoneHref}
            className="btn-outline"
          >
            <Phone className="h-4 w-4" />
            {site.phone}
          </a>
        </div>
      </PageHero>

      {/* Quick facts */}
      <section className="border-b border-forest-100 bg-cream">
        <dl className="container-page grid grid-cols-1 divide-y divide-forest-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {facts.map((f) => (
            <div key={f.label} className="py-7 sm:px-6 sm:first:pl-0">
              <dt className="text-sm text-ink/75">{f.label}</dt>
              <dd className="mt-1 font-display text-2xl font-semibold text-forest-800">{f.value}</dd>
              {f.note && <dd className="mt-1 text-sm text-ink/75">{f.note}</dd>}
            </div>
          ))}
        </dl>
      </section>

      {/* The model */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={photos.smallGroup.src}
              alt={photos.smallGroup.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[50%_30%]"
            />
          </div>
          <div>
            <SectionHeading title="How the day works" intro={apex.model} />
            <p className="prose-kairos mt-4">
              In plain words: mastery-based means a student moves on to the next topic once they have
              understood the current one, not when the calendar says it is time. 2 Hour Learning is the
              name of the model, with focused academics first and projects and life skills for the rest
              of the day.
            </p>
            <p className="prose-kairos mt-4">
              That leaves most of the day for projects, presentations and life skills like budgeting
              and running a small business. Compared with a classroom that moves at one pace, each student
              works at their own pace, and teachers know each student well.
            </p>
            <p className="prose-kairos mt-4">
              During the academic block, AI-supported adaptive learning adjusts to each student's
              level, so the work is never too easy or too hard.
            </p>
          </div>
        </div>
      </Section>

      {/* Pilot-year results */}
      <section className="border-t border-forest-100 py-16 sm:py-20">
        <div className="container-page">
          <h2 className="text-3xl font-semibold sm:text-4xl">Our first year of results</h2>
          <p className="prose-kairos mt-3 text-sm">{apex.results.basis}</p>
          <dl className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {apex.results.stats.map((s) => (
              <div key={s.value} className="border-t border-forest-200 pt-4">
                <dt className="font-display text-3xl font-semibold text-forest-800">{s.value}</dt>
                <dd className="prose-kairos mt-1 text-sm">{s.label}</dd>
              </div>
            ))}
          </dl>
          <p className="prose-kairos mt-8 max-w-2xl">{apex.results.spectrum}</p>
        </div>
      </section>

      {/* How APEX is set up: a plain list, not a card grid */}
      <section className="border-t border-forest-100 py-16 sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">How APEX is set up</h2>
            <div className="relative mt-8 hidden aspect-[4/5] overflow-hidden rounded-lg lg:block">
              <Image
                src={photos.presenting.src}
                alt={photos.presenting.alt}
                fill
                sizes="30vw"
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <dl className="border-t border-forest-200">
              {apex.pillars.map((pillar, i) => (
                <Reveal
                  key={pillar.title}
                  delay={Math.min(i, 4) * 0.05}
                  className="grid gap-1 border-b border-forest-100 py-5 sm:grid-cols-[14rem_1fr] sm:gap-6"
                >
                  <dt className="font-semibold text-forest-900">{pillar.title}</dt>
                  <dd className="prose-kairos">{pillar.body}</dd>
                </Reveal>
              ))}
            </dl>
            <p className="prose-kairos mt-6">
              Every APEX student also gets hands-on projects, life-skills workshops and mentoring
              from our teachers.
            </p>
          </div>
        </div>
      </section>

      {/* What the workshops are */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading title="What the workshops look like" intro={apex.workshops.intro} />
          <div>
            <dl className="border-t border-forest-200">
              {apex.workshops.list.map((w) => (
                <div
                  key={w.name}
                  className="grid gap-1 border-b border-forest-100 py-4 sm:grid-cols-[15rem_1fr] sm:gap-6"
                >
                  <dt className="font-semibold text-forest-900">{w.name}</dt>
                  <dd className="prose-kairos text-sm">{w.body}</dd>
                </div>
              ))}
            </dl>
            <p className="prose-kairos mt-6">{apex.workshops.events}</p>
          </div>
        </div>
      </Section>
      {/* Pricing */}
      <Section className="bg-sand/50">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading
            title="Ways to enroll"
            intro={`The full program is ${apex.tuition.monthly.replace(" / ", " a ")} for 10 months, or ${apex.tuition.annual.replace(" / ", " a ")}. Come in for a tour and we'll go over it with you.`}
          />
          <div>
            <ul className="border-t border-forest-200">
              {apex.tiers.map((tier, i) => (
                <li
                  key={tier.name}
                  className={`flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 ${
                    i === 0
                      ? "my-3 rounded-lg border border-forest-300 bg-forest-50 px-5 py-6"
                      : "border-b border-forest-100 px-5 py-5"
                  }`}
                >
                  <div>
                    <p className="font-semibold text-forest-900">{tier.name}</p>
                    <p className="text-sm text-ink/70">{tier.description}</p>
                  </div>
                  <p className="font-display text-xl font-semibold text-forest-800 sm:whitespace-nowrap sm:text-2xl">
                    {tier.price.replace(" / ", " a ")}
                  </p>
                </li>
              ))}
            </ul>

            <h3 className="mt-10 text-sm font-semibold text-forest-800">Registration fees</h3>
            <dl className="mt-3 space-y-2">
              {registrationFees.map((fee) => (
                <div key={fee.label} className="flex justify-between gap-4 text-sm">
                  <dt className="text-ink/75">{fee.label}</dt>
                  <dd className="whitespace-nowrap text-right font-medium text-forest-800">{fee.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* The people behind it */}
      <Section>
        <SectionHeading
          title="Meet Jackie and Alissa"
          intro="Jackie opened Kairos in 2020, and her daughter Alissa is now the Executive Director."
        />
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {people.map((person) => (
            <div key={person.name} className="flex gap-5 sm:gap-6">
              <div className="relative aspect-[4/5] w-28 shrink-0 overflow-hidden rounded-lg sm:w-40">
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  sizes="(max-width: 640px) 7rem, 10rem"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{person.name}</h3>
                <p className="text-sm text-forest-700">{person.role}</p>
                <p className="prose-kairos mt-3">{person.line}</p>
                <Link href="/about" className="link-underline mt-1 inline-flex min-h-11 items-center text-sm">
                  More about {person.name.split(" ")[0]}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Faq items={faqs.apex} />
      <CTASection
        title="Come see APEX"
        intro="Give us a call to set up a tour. You and your student can meet the teachers and see the space before you decide."
        photo={photos.teamwork}
        primaryLabel="Or email Jackie"
        primaryHref={site.emailHref}
      />
    </>
  );
}
