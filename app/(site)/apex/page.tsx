import type { Metadata } from "next";
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
    "APEX is a full-time program for grades 3 to 9 in Salinas, CA, using the Human Programming model: personalized, mastery-based academics, then projects and life skills.",
  path: "/apex",
  image: pagePhotos.apex,
});

const facts = [
  { label: "Grades", value: apex.gradeRange.replace("Grades ", ""), note: "" },
  { label: "Schedule", value: "9 a.m. to 2 p.m.", note: "Monday through Thursday, Fridays off" },
  { label: "First step", value: "Call or interest form", note: "Then a free tour" },
];

const resultCaptions: Record<string, string> = {
  "83%": "of reading and math results met or beat twice the expected growth",
  "43rd to 78th": "the class's average national percentile, fall to spring",
};

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
        intro="Small groups. Personalized, mastery-based academics first, then projects and life skills for the rest of the day."
        photo={pagePhotos.apex}
        variant="dark"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={site.phoneHref} className="btn-accent">
            <Phone className="h-4 w-4" />
            Call {site.phone}
          </a>
          <Link href="/contact" className="btn-outline">
            Interest form
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </PageHero>

      {/* Quick facts */}
      <section className="border-b border-forest-100 bg-cream">
        <dl className="container-page grid grid-cols-1 divide-y divide-forest-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {facts.map((f) => (
            <div key={f.label} className="py-4 sm:px-6 sm:py-7 sm:first:pl-0">
              <dt className="text-sm text-ink/75">{f.label}</dt>
              <dd className="mt-1 font-display text-2xl font-semibold text-forest-800">{f.value}</dd>
              {f.note && <dd className="mt-1 text-sm text-ink/75">{f.note}</dd>}
            </div>
          ))}
        </dl>
      </section>

      {/* Pilot-year results: the strongest proof, right under the facts */}
      <section className="bg-sand py-14 sm:py-20">
        <div className="container-page">
          <h2 className="text-3xl font-semibold sm:text-4xl">Our first year of results</h2>
          <p className="prose-kairos mt-3 max-w-2xl">NWEA MAP Growth, reading and math, 2025-26 pilot year.</p>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
            <div>
              <p className="font-display text-7xl font-semibold leading-none text-forest-800 sm:text-8xl">
                {apex.results.stats[0].value}
              </p>
              <p className="mt-4 max-w-md text-xl leading-snug text-forest-900">Students achieved 3.6 times their projected growth.</p>
            </div>
            <dl className="space-y-6">
              {apex.results.stats.slice(1).map((st) => (
                <div key={st.value} className="border-t border-forest-300 pt-4">
                  <dt className="font-display text-3xl font-semibold text-forest-800">{st.value}</dt>
                  <dd className="mt-1 text-base text-ink">{resultCaptions[st.value] ?? st.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
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
            <p className="mt-4 text-lg leading-relaxed text-ink">
              Mastery-based means a student moves on when they have understood the topic, not when
              the calendar says so. If a student has a gap, say from first grade, the program finds
              it and fills it in before moving on.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink">
              During the academic blocks, AI checks what each student already knows. The lessons are
              already written, and any gaps get retaught. The AI does not teach your child, and
              adults are in the room with the students.
            </p>
          </div>
        </div>
      </Section>

      {/* A typical day: green band, collapsed on phones */}
      <section className="bg-forest-800 py-12 text-cream sm:py-20">
        <div className="container-page">
          <h2 className="hidden text-4xl font-semibold text-cream sm:block">A typical day, 9:00 to 2:00</h2>
          <ol className="mt-8 hidden gap-x-12 sm:grid sm:grid-cols-2">
            {apex.day.map((item) => (
              <li key={item.time} className="flex gap-4 border-b border-cream/20 py-3 text-base">
                <span className="w-14 shrink-0 font-semibold text-cream">{item.time}</span>
                <span className="text-cream/90">{item.what}</span>
              </li>
            ))}
          </ol>
          <details className="group sm:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between text-2xl font-semibold text-cream [&::-webkit-details-marker]:hidden">
              <h2>A typical day, 9:00 to 2:00</h2>
              <span aria-hidden="true" className="text-2xl">
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:inline">&minus;</span>
              </span>
            </summary>
            <ol className="mt-6">
              {apex.day.map((item) => (
                <li key={item.time} className="flex gap-4 border-b border-cream/20 py-3 text-base">
                  <span className="w-12 shrink-0 font-semibold text-cream">{item.time}</span>
                  <span className="text-cream/90">{item.what}</span>
                </li>
              ))}
            </ol>
          </details>
        </div>
      </section>

      {/* What the workshops are: four themes across, then the year's events beside a photo */}
      <Section>
        <SectionHeading title="What the workshops look like" intro={apex.workshops.intro} />
        <div className="mt-8 grid gap-x-8 gap-y-6 sm:mt-10 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          {apex.workshops.groups.map((group) => (
            <div key={group.title}>
              <h3 className="border-b-2 border-forest-700 pb-2 font-display text-xl font-semibold text-forest-900">
                {group.title}
              </h3>
              <ul className="mt-3 space-y-1 sm:mt-4 sm:space-y-4">
                {group.items.map((w) => (
                  <li key={w.name}>
                    <span className="block font-semibold text-forest-900">{w.name}</span>
                    <span className="prose-kairos mt-0.5 hidden text-sm sm:block">{w.body}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 grid items-center gap-8 rounded-lg bg-sand p-5 sm:mt-14 sm:p-8 lg:grid-cols-[16rem_1fr]">
          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-lg lg:block">
            <Image
              src={photos.rollerCoaster.src}
              alt={photos.rollerCoaster.alt}
              fill
              sizes="256px"
              className="object-cover object-[50%_40%]"
              loading="lazy"
            />
          </div>
          <div>
            <h3 className="font-display text-2xl font-semibold text-forest-900">
              {apex.workshops.eventsIntro}
            </h3>
            <p className="mt-2 text-base text-ink/85 sm:hidden">{apex.workshops.events.join(", ")}.</p>
            <ul className="mt-4 hidden flex-wrap gap-x-6 gap-y-2 text-base text-ink/85 sm:flex">
              {apex.workshops.events.map((e) => (
                <li key={e} className="flex items-center gap-2">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
      {/* Pricing */}
      <Section className="bg-sand/50">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading
            title="Ways to enroll"
            intro="Call or fill out the interest form, then come in for a tour and we will go over what fits your student."
          />
          <div>
            <ul className="border-t border-forest-200">
              {apex.tiers.map((tier) => (
                <li
                  key={tier.name}
                  className="flex flex-col gap-1 border-b border-forest-100 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <div>
                    <p className="font-semibold text-forest-900">{tier.name}</p>
                    <p className="text-sm text-ink/70">{tier.description}</p>
                  </div>
                  <p className="text-sm text-ink/75 sm:whitespace-nowrap">
                    {tier.price.replace(" / ", " a ")}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href={site.phoneHref} className="btn-primary">
                <Phone className="h-4 w-4" />
                Call {site.phone}
              </a>
              <Link href="/contact" className="btn-outline">
                Interest form
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-4 text-sm text-ink/75">
              Returning families can{" "}
              <Link href="/fall-classes/register" className="link-underline">
                register here
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>

      {/* The people behind it */}
      <Section>
        <SectionHeading
          title="Meet Jackie and Alissa"
          intro="Jackie opened Kairos in 2020, and Alissa is now the Executive Director."
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
