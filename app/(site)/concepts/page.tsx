import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { concepts } from "@/lib/storybrand";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function ConceptsIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Internal preview"
        title="Four homepage directions"
        intro="Four different ways of telling the Kairos story — each one also tries a different style of motion and interaction. Click through each one, then let us know which direction (or which pieces) feel right."
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {concepts.map((concept, i) => (
            <Reveal key={concept.slug} delay={i * 0.08}>
              <Link
                href={`/concepts/${concept.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-forest-100 bg-cream p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-forest-200 hover:shadow-soft"
              >
                <h2 className="text-xl font-semibold">{concept.label}</h2>
                <p className="prose-kairos mt-3 text-sm">{concept.pitch}</p>
                {concept.explores && (
                  <ul className="mt-4 flex flex-1 flex-wrap content-start gap-2">
                    {concept.explores.map((item) => (
                      <li
                        key={item}
                        className="h-fit rounded-full bg-forest-50 px-3 py-1 text-xs font-medium text-forest-700"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-800">
                  View concept
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
