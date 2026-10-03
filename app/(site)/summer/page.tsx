import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/CTASection";
import { pagePhotos, photos } from "@/lib/photos";
import { summerPrograms } from "@/lib/content";

export const metadata: Metadata = {
  title: "Summer Programs",
  description:
    "Summer 2026 at Kairos in Salinas, CA: a Back-to-School Boot Camp in reading, math and language arts, and the Love Note Music Camp. Dates, times and prices.",
};

export default function SummerPage() {
  return (
    <>
      <PageHero
        title="Summer 2026 at Kairos"
        mark="Kairos"
        photo={pagePhotos.summer}
        variant="wide"
        intro="Two programs this summer: our Back-to-School Boot Camp in July for reading, math and language arts, and a music camp in late June and early July hosted by Love Note Music Studio. Dates, times and prices are below."
      />

      <section className="py-16 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
          {summerPrograms.map((program) => (
            <div key={program.slug} className="flex flex-col border-t-2 border-forest-800 pt-6">
              <h2 className="text-2xl font-semibold sm:text-3xl">{program.title}</h2>
              <p className="mt-1 text-sm font-medium text-forest-700">{program.dates}</p>
              <p className="prose-kairos mt-3">{program.description}</p>

              <h3 className="mt-6 text-sm font-semibold text-forest-800">Times</h3>
              <dl className="mt-2 space-y-1.5 border-t border-forest-100 pt-3">
                {program.schedule.map((s) => (
                  <div key={s.label} className="flex justify-between gap-4 text-sm">
                    <dt className="text-ink/60">{s.label}</dt>
                    <dd className="whitespace-nowrap text-right font-medium text-forest-800">{s.value}</dd>
                  </div>
                ))}
              </dl>

              <h3 className="mt-6 text-sm font-semibold text-forest-800">Prices</h3>
              <dl className="mt-2 space-y-1.5 border-t border-forest-100 pt-3">
                {program.pricing.map((p) => (
                  <div key={p.label} className="flex justify-between gap-4 text-sm">
                    <dt className="text-ink/60">{p.label}</dt>
                    <dd className="whitespace-nowrap text-right font-medium text-forest-800">{p.value}</dd>
                  </div>
                ))}
              </dl>

              {program.hostedBy && (
                <p className="mt-5 text-sm text-ink/60">
                  Hosted by {program.hostedBy}. For camp questions, contact them
                  {program.contactEmail && (
                    <>
                      {" at "}
                      <a href={`mailto:${program.contactEmail}`} className="link-underline">
                        <Mail className="inline h-3 w-3" /> {program.contactEmail}
                      </a>
                    </>
                  )}
                  {program.contactPhone && (
                    <>
                      {" or "}
                      <a
                        href={`tel:${program.contactPhone.replace(/[^\d+]/g, "")}`}
                        className="link-underline"
                      >
                        <Phone className="inline h-3 w-3" /> {program.contactPhone}
                      </a>
                    </>
                  )}
                  .
                </p>
              )}
              {program.note && <p className="mt-5 text-sm text-ink/60">{program.note}</p>}

              <Link href="/contact" className="btn-primary mt-6 self-start">
                Reserve a spot
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        photo={photos.cooking}
        title="Questions about summer?"
        intro="Give us a call with your student's age and which weeks you're around, and we'll tell you which sessions fit."
      />
    </>
  );
}
