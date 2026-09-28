import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { concepts } from "@/lib/storybrand";
import { BannerEditor } from "@/components/concepts/BannerEditor";
import { getBanner } from "@/lib/banner";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function ConceptsIndexPage() {
  const banner = await getBanner();
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

      <Section id="banner" className="border-t border-forest-100 bg-sand">
        <h2 className="text-2xl font-semibold sm:text-3xl">Announcement banner</h2>
        <p className="prose-kairos mt-3 max-w-2xl">
          The banner at the top of the homepage and these drafts. Change the words or link, or
          switch it off, then enter the PIN and save. It updates on the site right away.
        </p>
        <div className="mt-8">
          <BannerEditor initial={banner} />
        </div>
      </Section>
    </>
  );
}
