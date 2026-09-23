import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { apex } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "APEX — Full-Time Learning Program",
  description:
    "APEX is a full-time alternative to traditional school for grades 3–8 in Salinas. Personalized, mastery-based academics using the 2 Hour Learning model, plus life skills and mentorship.",
};

export default function ApexPage() {
  return (
    <>
      <PageHero eyebrow="Our flagship program" title="APEX" intro={apex.intro}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/contact" className="btn-accent">
            Book a tour &amp; conversation
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={site.phoneHref}
            className="btn-outline border-cream text-cream hover:bg-cream hover:text-forest-800"
          >
            <Phone className="h-4 w-4" />
            {site.phone}
          </a>
        </div>
      </PageHero>

      {/* Quick facts */}
      <section className="border-b border-forest-100 bg-cream">
        <div className="container-page grid grid-cols-1 divide-y divide-forest-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="py-8 text-center sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-forest-600">Grades</p>
            <p className="mt-2 font-display text-2xl font-semibold text-forest-800">
              {apex.gradeRange}
            </p>
          </div>
          <div className="py-8 text-center sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-forest-600">Tuition</p>
            <p className="mt-2 font-display text-2xl font-semibold text-forest-800">
              {apex.tuition.monthly}
            </p>
            <p className="mt-1 text-xs text-ink/60">
              {apex.tuition.annual} · {apex.tuition.term}
            </p>
          </div>
          <div className="py-8 text-center sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-forest-600">Format</p>
            <p className="mt-2 font-display text-2xl font-semibold text-forest-800">Full-time</p>
            <p className="mt-1 text-xs text-ink/60">Small-group learning</p>
          </div>
        </div>
      </section>

      {/* The model */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-4xl shadow-soft">
              <Image
                src="/images/photo-4.jpg"
                alt="A Kairos student presenting a hands-on project she built"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading
              eyebrow="The learning model"
              title="Two hours of focused academics. A whole day of growth."
              intro={apex.model}
            />
            <p className="prose-kairos mt-4">
              The result: students master more in less time, then invest the rest of the day in
              projects, life skills, and the kind of hands-on learning that builds real confidence.
            </p>
            <p className="prose-kairos mt-4 rounded-2xl bg-forest-50 p-4 text-sm text-forest-800">
              {apex.outcomesNote}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Traditional school vs. APEX */}
      <section className="bg-forest-800 py-16 text-cream sm:py-20">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="The difference"
            title={<span className="text-cream">Traditional school vs. APEX</span>}
          />
          <div className="mx-auto mt-12 max-w-2xl overflow-hidden rounded-3xl border border-cream/15">
            <div className="grid grid-cols-2 bg-forest-900/40 text-xs font-semibold uppercase tracking-wider text-cream/70">
              <div className="px-5 py-3">Traditional school</div>
              <div className="px-5 py-3">APEX</div>
            </div>
            {apex.comparison.map((row, i) => (
              <div
                key={row.traditional}
                className={`grid grid-cols-2 ${i % 2 === 0 ? "bg-cream/5" : ""}`}
              >
                <div className="px-5 py-4 text-sm text-cream/70">{row.traditional}</div>
                <div className="px-5 py-4 text-sm font-medium text-cream">{row.apex}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-sand/60 py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading center eyebrow="Why families choose APEX" title="Built around each student" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {apex.pillars.map((pillar, i) => {
              return (
                <Reveal key={pillar.title} delay={i * 0.08}>
                  <div className="flex h-full gap-5 rounded-3xl bg-cream p-7 shadow-card">
                    <div>
                      <h3 className="text-lg font-semibold">{pillar.title}</h3>
                      <p className="prose-kairos mt-2 text-sm">{pillar.body}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* What's included */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="What's included"
            title="Everything your student needs to thrive"
            intro="APEX is more than academics — it's a full-time environment designed to grow capable, independent young people."
          />
          <Reveal delay={0.1}>
            <ul className="grid gap-3 sm:grid-cols-1">
              {apex.included.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-forest-100 bg-cream p-4 shadow-card"
                >
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-forest-500" />
                  <span className="text-sm text-ink/85">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Enroll CTA */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-4xl bg-forest-800 px-6 py-14 text-center text-cream shadow-soft sm:px-12">
            <h2 className="text-3xl font-semibold text-cream sm:text-4xl">
              Curious if APEX is right for your child?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-cream/80">
              The best next step is a conversation. Book a tour, meet the team, and see the space —
              then decide together whether APEX is the right fit.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/contact" className="btn-accent w-full sm:w-auto">
                Book a tour &amp; conversation
              </Link>
              <a
                href={site.emailHref}
                className="btn-outline w-full border-cream text-cream hover:bg-cream hover:text-forest-800 sm:w-auto"
              >
                Email Jackie
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
