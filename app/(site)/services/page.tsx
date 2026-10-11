import type { Metadata } from "next";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { ProgramList } from "@/components/ProgramList";
import { CTASection } from "@/components/CTASection";
import { site } from "@/lib/site";
import Link from "next/link";
import { Phone } from "lucide-react";

export const metadata: Metadata = pageMetadata({
  title: "Tutoring and Homeschool Support",
  description:
    "Private tutoring from $70 an hour, homeschool support, Early Learners for TK to 2nd grade, APEX for grades 3 to 9, and enrichment classes in Salinas, CA.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Services", path: "/services" }])} />
      <PageHero
        title="Programs and prices"
        mark="prices"
        variant="centered"
        intro="Who each program is for and what it costs. Not sure which fits? Call us or fill out the interest form."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={site.phoneHref} className="btn-primary">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {site.phone}
          </a>
          <Link href="/contact" className="btn-outline">
            Interest form
          </Link>
        </div>
      </PageHero>

      <Section>
        <ProgramList />
      </Section>

      <CTASection />
    </>
  );
}
