import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { concepts } from "@/lib/storybrand";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function ConceptsIndexPage() {
  return (
    <>
      <PageHero
        title="Four homepage drafts"
        intro="Each draft tells the Kairos story a different way and tries a different kind of motion. Look through all four, then tell us which one you like, or which parts of each."
      />
      <Section>
        <ul className="border-t border-forest-200">
          {concepts.map((concept) => (
            <li key={concept.slug} className="border-b border-forest-100">
              <Link
                href={`/concepts/${concept.slug}`}
                className="group grid gap-2 py-6 transition-colors hover:bg-forest-50/60 md:grid-cols-[1fr_1.6fr] md:gap-10 md:px-2"
              >
                <h2 className="flex items-center gap-2 text-xl font-semibold text-forest-900">
                  {concept.label}
                  <ArrowRight className="h-4 w-4 text-forest-700 transition-transform group-hover:translate-x-1" />
                </h2>
                <div>
                  <p className="prose-kairos">{concept.pitch}</p>
                  {concept.explores && (
                    <p className="mt-2 text-sm text-ink/60">Tries out: {concept.explores.join(", ")}.</p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
