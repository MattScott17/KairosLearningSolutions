import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata, breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Faq } from "@/components/Faq";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { CTASection } from "@/components/CTASection";
import { earlyLearners, faqs } from "@/lib/content";
import { pagePhotos, photos } from "@/lib/photos";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "TK to 2nd Grade Half-Day Program",
  description:
    "A half-day program for TK through 2nd grade in Salinas, CA. Children are grouped by skill instead of grade. Tuesday to Thursday, 9 AM to noon, $600 a month.",
  path: "/early-learners",
  image: pagePhotos.earlyLearners,
});

export default function EarlyLearnersPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Early Learners", path: "/early-learners" }]),
          serviceJsonLd({
            name: "Early Learners half-day program in Salinas",
            description: metadata.description as string,
            path: "/early-learners",
          }),
        ]}
      />
      <PageHero
        title={`${earlyLearners.name}, ${earlyLearners.ageRange}`}
        mark={earlyLearners.ageRange}
        intro={earlyLearners.intro}
        photo={pagePhotos.earlyLearners}
        tone="sand"
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
        <p className="mt-4 text-lg font-semibold text-forest-900">
          {earlyLearners.pricing[0].value.replace(" / ", " a ")}, {earlyLearners.schedule[0].value}.
        </p>
      </PageHero>

      {/* The three groups, then schedule and prices in one flow */}
      <Section>
        <h2 className="text-3xl font-semibold sm:text-4xl">Three groups, by skill</h2>
        <dl className="mt-8 grid gap-x-10 gap-y-6 border-t border-forest-200 pt-6 md:grid-cols-3">
          {earlyLearners.groups.map((group) => (
            <div key={group.name}>
              <dt className="font-display text-xl font-semibold text-forest-900">{group.name}</dt>
              <dd className="mt-1 text-base leading-relaxed text-ink">{group.body}</dd>
            </div>
          ))}
        </dl>

        <h2 className="mt-14 text-3xl font-semibold sm:text-4xl">Schedule and prices</h2>
        <dl className="mt-6 border-t border-forest-200">
          {earlyLearners.schedule.map((s) => (
            <div
              key={s.label}
              className="grid gap-1 border-b border-forest-100 py-4 sm:grid-cols-[1fr_auto_auto] sm:gap-8"
            >
              <dt className="font-semibold text-forest-900">{s.label}</dt>
              <dd className="text-ink">{s.value}</dd>
              <dd className="font-semibold text-forest-800 sm:text-right">
                {earlyLearners.pricing.find((p) => p.label === s.label)?.value.replace(" / ", " a ")}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Faq items={faqs.earlyLearners} />
      <CTASection
        title="Come see the space"
        intro="Call or fill out the interest form. You can see the space, meet the teachers, and ask which group your child would start in."
        primaryHref="/contact"
      />
    </>
  );
}
