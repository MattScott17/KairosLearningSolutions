import type { Metadata } from "next";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { CTASection } from "@/components/CTASection";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";
import Link from "next/link";
import { Phone } from "lucide-react";

export const metadata: Metadata = pageMetadata({
  title: "District Partnerships",
  description:
    "Kairos Learning Solutions partners with school districts in and around Salinas, CA. Call Jackie to talk about what your students need.",
  path: "/district-partnerships",
});

export default function DistrictPartnershipsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "District Partnerships", path: "/district-partnerships" }])} />
      <PageHero
        title="District partnerships"
        mark="partnerships"
        photo={photos.studentsLearning}
        intro="We bring our teachers and small-group approach to more students. If you work for a district or school, call or send us a message."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={site.phoneHref} className="btn-primary">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {site.phone}
          </a>
          <Link href="/contact" className="btn-outline">
            Send a message
          </Link>
        </div>
      </PageHero>
      <Section container="narrow">
        <h2 className="text-3xl font-semibold sm:text-4xl">What we do with districts</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink">
          We run on-site after-school programs for children who stay after the school day. Every
          partnership looks different, so we start with a conversation about who your students are
          and where they need support.
        </p>
      </Section>
      <CTASection
        title="Let's talk"
        intro="Call us or send a message and we will talk through what would work for your district."
        primaryLabel="Send a message"
      />
    </>
  );
}
