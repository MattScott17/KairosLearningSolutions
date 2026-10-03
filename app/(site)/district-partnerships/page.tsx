import type { Metadata } from "next";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Mail, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { CTASection } from "@/components/CTASection";
import { site } from "@/lib/site";

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
        intro="Kairos works with school districts to bring our teachers and small-group approach to more students. If you work for a district or school, let's talk about what your students need."
      />
      <Section container="narrow">
        <div className="prose-kairos space-y-5 text-lg">
          <p>
            Every partnership looks different, so we start with a conversation. Tell us who your
            students are and where they need support, and we'll work out what Kairos can offer.
          </p>
          <p>The quickest way to start is to call or email me directly.</p>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={site.phoneHref} className="btn-primary">
            <Phone className="h-4 w-4" />
            {site.phone}
          </a>
          <a href={site.emailHref} className="btn-outline">
            <Mail className="h-4 w-4" />
            {site.email}
          </a>
        </div>
      </Section>
      <CTASection
        title="Let's talk"
        intro="Give us a call or send a message and we'll set up a time to talk through what would work for your district."
      />
    </>
  );
}
