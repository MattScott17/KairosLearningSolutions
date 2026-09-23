import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { variantMeta, variantSlugs } from "@/lib/landing-variants";

export const metadata: Metadata = {
  title: "Landing page variants",
  robots: { index: false, follow: false },
};

const programs = [
  { slug: "tutoring", name: "Private Tutoring" },
  { slug: "apex", name: "APEX" },
] as const;

// Internal preview: every offer-first landing variant, one tap away. Best
// viewed on a phone — that's who these pages are built for.
export default function LandingIndexPage() {
  return (
    <div className="container-narrow pb-16 pt-4">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-forest-600">
        Internal preview
      </p>
      <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Landing page variants</h1>
      <p className="prose-kairos mt-3">
        Three offer-first directions for each program, built for phones. Open them on your
        phone, then pick a winner to run ads against.
      </p>

      {programs.map((program) => (
        <section key={program.slug} className="mt-10">
          <h2 className="text-2xl font-semibold">{program.name}</h2>
          <ul className="mt-4 space-y-3">
            {variantSlugs.map((v) => (
              <li key={v}>
                <Link
                  href={`/lp/${program.slug}/${v}`}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-forest-100 bg-cream p-5 shadow-card transition-colors hover:border-forest-300"
                >
                  <span>
                    <span className="block font-semibold text-forest-900">
                      {variantMeta[v].label}
                    </span>
                    <span className="mt-1 block text-sm text-ink/70">{variantMeta[v].pitch}</span>
                  </span>
                  <ArrowRight className="h-5 w-5 shrink-0 text-forest-600 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
