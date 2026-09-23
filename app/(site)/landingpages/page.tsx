import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { landingPageGroups } from "@/lib/landing-pages";

export const metadata: Metadata = {
  title: "Landing Pages",
  robots: { index: false, follow: false },
};

export default function LandingPagesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Internal"
        title="Landing pages"
        intro="Every ad landing page we've built, grouped by program. Open them on your phone — that's where most ad traffic lands."
      />
      {landingPageGroups.map((group, gi) => (
        <Section key={group.program} className={gi % 2 ? "bg-sand/50" : ""}>
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold">{group.program}</h2>
            <p className="prose-kairos mt-2">{group.intro}</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {group.pages.map((page, i) => (
              <Reveal key={page.href} delay={Math.min(i, 3) * 0.05}>
                <Link
                  href={page.href}
                  className="group flex h-full flex-col rounded-3xl border border-forest-100 bg-cream p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-forest-300 hover:shadow-soft"
                >
                  <span className="font-semibold text-forest-900">{page.label}</span>
                  <span className="mt-1 font-mono text-xs text-forest-600">{page.href}</span>
                  <span className="prose-kairos mt-3 flex-1 text-sm">{page.description}</span>
                  <span className="mt-4 flex flex-wrap gap-1.5">
                    {page.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-forest-50 px-2.5 py-0.5 text-[11px] font-semibold text-forest-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-800">
                    Open page
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      ))}
    </>
  );
}
