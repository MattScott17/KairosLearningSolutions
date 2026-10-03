import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { CTASection } from "@/components/CTASection";
import { earlyLearners, registrationFees } from "@/lib/content";
import { pagePhotos, photos } from "@/lib/photos";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Early Learners",
  description:
    "A half-day program for TK through 2nd grade in Salinas, CA. Children are grouped by skill instead of grade. Tuesday to Thursday, 9 AM to noon, $600 a month.",
};

export default function EarlyLearnersPage() {
  return (
    <>
      <PageHero
        title={`${earlyLearners.name}, ${earlyLearners.ageRange}`}
        mark={earlyLearners.ageRange}
        intro={earlyLearners.intro}
        photo={pagePhotos.earlyLearners}
        tone="sand"
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

      {/* The three groups */}
      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={photos.craftProject.src}
              alt={photos.craftProject.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[50%_25%]"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">Three groups, by skill</h2>
            <p className="prose-kairos mt-4 text-lg">
              Each child starts in the group that matches what they can already do, and moves up
              when they&apos;re ready, whatever their age.
            </p>
            <dl className="mt-8 border-t border-forest-200">
              {earlyLearners.groups.map((group, i) => (
                <Reveal key={group.name} delay={i * 0.06} className="border-b border-forest-100 py-5">
                  <dt className="text-lg font-semibold text-forest-900">{group.name}</dt>
                  <dd className="prose-kairos mt-1">{group.body}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* Schedule & pricing */}
      <section className="bg-sand/60 py-16 sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">Schedule and prices</h2>
            <div className="relative mt-8 hidden aspect-[4/5] overflow-hidden rounded-lg lg:block">
              <Image
                src={photos.handprints.src}
                alt={photos.handprints.alt}
                fill
                sizes="30vw"
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <dl className="border-t border-forest-200">
              {earlyLearners.schedule.map((s) => (
                <div
                  key={s.label}
                  className="grid gap-1 border-b border-forest-100 py-4 sm:grid-cols-[1fr_auto_auto] sm:gap-6"
                >
                  <dt className="font-semibold text-forest-900">{s.label}</dt>
                  <dd className="text-ink/75">{s.value}</dd>
                  <dd className="font-medium text-forest-800 sm:text-right">
                    {earlyLearners.pricing.find((p) => p.label === s.label)?.value.replace(" / ", " a ")}
                  </dd>
                </div>
              ))}
            </dl>

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
      </section>

      <CTASection
        title="Come for a tour"
        intro="Give us a call to set up a tour. You can see the space, meet the teachers, and ask which group your child would start in."
        primaryLabel="Or send a message"
        primaryHref="/contact"
      />
    </>
  );
}
