import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata, breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Faq } from "@/components/Faq";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CTASection } from "@/components/CTASection";
import { apex, faqs, registrationFees } from "@/lib/content";
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
  {
    label: "First step",
    value: "Free call and tour",
    note: apex.tuition.term,
  },
  { label: "Schedule", value: "9 a.m. to 2 p.m.", note: "Monday through Thursday, Fridays off" },
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
              <dt className="text-sm text-ink/60">{f.label}</dt>
              <dd className="mt-1 font-display text-2xl font-semibold text-forest-800">{f.value}</dd>
              {f.note && <dd className="mt-1 text-sm text-ink/60">{f.note}</dd>}
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
              That leaves most of the day for projects, presentations and life skills like budgeting
              and running a small business.
            </p>
            <p className="prose-kairos mt-4">
              During the academic block, AI-powered learning software adjusts to each student's
              level, so the work is never too easy or too hard.
            </p>
            <p className="prose-kairos mt-4 text-sm">{apex.outcomesNote}</p>
          </div>
        </div>
      </Section>

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

      {/* Traditional school vs. APEX */}
      <section className="bg-forest-800 py-16 text-cream sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <h2 className="text-3xl font-semibold text-cream sm:text-4xl">
            Compared with a traditional classroom
          </h2>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-cream/20 text-cream/70">
                <th className="py-3 pr-4 font-semibold">Traditional school</th>
                <th className="py-3 font-semibold">APEX</th>
              </tr>
            </thead>
            <tbody>
              {apex.comparison.map((row) => (
                <tr key={row.traditional} className="border-b border-cream/10">
                  <td className="py-4 pr-4 text-cream/70">{row.traditional}</td>
                  <td className="py-4 font-medium text-cream">
                    <span className="inline-flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden />
                      {row.apex}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pricing */}
      <Section className="bg-sand/50">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading
            title="Ways to enroll"
            intro="You can enroll in the full program, or in the academics or the workshops on their own. Call us and we'll go over tuition when you come in for a tour."
          />
          <div>
            <ul className="border-t border-forest-200">
              {apex.tiers.map((tier) => (
                <li
                  key={tier.name}
                  className="flex flex-col gap-1 border-b border-forest-100 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <div>
                    <p className="font-semibold text-forest-900">{tier.name}</p>
                    <p className="text-sm text-ink/70">{tier.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            <h3 className="mt-10 text-sm font-semibold text-forest-800">Registration fees</h3>
            <dl className="mt-3 space-y-2">
              {registrationFees.map((fee) => (
                <div key={fee.label} className="flex justify-between gap-4 text-sm">
                  <dt className="text-ink/60">{fee.label}</dt>
                  <dd className="whitespace-nowrap text-right font-medium text-forest-800">{fee.value}</dd>
                </div>
              ))}
            </dl>
          </div>
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
