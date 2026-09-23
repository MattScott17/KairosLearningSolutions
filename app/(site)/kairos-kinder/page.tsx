import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/CTASection";
import { kairosKinder, registrationFees } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kairos Kinder",
  description:
    "Kairos Kinder is a half-day program for TK through 2nd grade in Salinas, CA — small skill-based groups, hands-on learning, Tuesday through Thursday mornings.",
};

export default function KairosKinderPage() {
  return (
    <>
      <PageHero eyebrow={kairosKinder.ageRange} title={kairosKinder.name} intro={kairosKinder.intro}>
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
            <p className="text-xs font-semibold uppercase tracking-wider text-forest-600">Ages</p>
            <p className="mt-2 font-display text-2xl font-semibold text-forest-800">
              {kairosKinder.ageRange}
            </p>
          </div>
          <div className="py-8 text-center sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-forest-600">Core price</p>
            <p className="mt-2 font-display text-2xl font-semibold text-forest-800">
              {kairosKinder.pricing[0].value}
            </p>
          </div>
          <div className="py-8 text-center sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-forest-600">Format</p>
            <p className="mt-2 font-display text-2xl font-semibold text-forest-800">Half-day</p>
            <p className="mt-1 text-xs text-ink/60">Skill-based small groups</p>
          </div>
        </div>
      </section>

      {/* Skill-based, not grade-based */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-4xl shadow-soft">
              <Image
                src="/images/photo-3.jpg"
                alt="Young Kairos Kinder students working together"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading
              eyebrow="How groups work"
              title="Grouped by skill, not by age"
              intro="Every child starts right where they are — not where their birthday says they should be. Students move between three small groups as they grow."
            />
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {kairosKinder.groups.map((group, i) => (
            <Reveal key={group.name} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-forest-100 bg-cream p-7 text-center shadow-card">
                <h3 className="text-lg font-semibold">{group.name}</h3>
                <p className="prose-kairos mt-2 text-sm">{group.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Schedule & pricing */}
      <section className="bg-sand/60 py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading center eyebrow="Schedule & pricing" title="What it costs, when it runs" />
          <div className="mx-auto mt-12 grid max-w-2xl gap-6 sm:grid-cols-2">
            <div className="rounded-3xl bg-cream p-7 shadow-card">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-forest-600">
                Schedule
              </h3>
              <dl className="mt-4 space-y-3">
                {kairosKinder.schedule.map((s) => (
                  <div key={s.label}>
                    <dt className="text-xs text-ink/60">{s.label}</dt>
                    <dd className="text-sm font-medium text-forest-800">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-3xl bg-cream p-7 shadow-card">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-forest-600">
                Pricing
              </h3>
              <dl className="mt-4 space-y-3">
                {kairosKinder.pricing.map((p) => (
                  <div key={p.label}>
                    <dt className="text-xs text-ink/60">{p.label}</dt>
                    <dd className="text-sm font-medium text-forest-800">{p.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-forest-100 bg-cream/60 p-5">
            <h3 className="text-sm font-semibold text-forest-800">Registration fees</h3>
            <dl className="mt-3 space-y-2">
              {registrationFees.map((fee) => (
                <div key={fee.label} className="flex justify-between gap-4 text-sm">
                  <dt className="text-ink/60">{fee.label}</dt>
                  <dd className="text-right font-medium text-forest-800">{fee.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <CTASection
        title="Curious if Kairos Kinder is right for your student?"
        intro="Book a tour, meet the team, and see the space — then decide together whether it's the right fit."
        primaryLabel="Book a tour"
        primaryHref="/contact"
      />
    </>
  );
}
