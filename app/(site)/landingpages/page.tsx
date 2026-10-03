import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { landingPageGroups } from "@/lib/landing-pages";
import { BannerEditor } from "@/components/concepts/BannerEditor";
import { getBanner } from "@/lib/banner";

export const metadata: Metadata = {
  title: "Landing Pages",
  robots: { index: false, follow: false },
};

export default async function LandingPagesIndex() {
  const banner = await getBanner();
  return (
    <>
      <PageHero
        title="Landing pages"
        intro="Everything in one place: every ad landing page, every homepage option, and the announcement banner editor. Open them on your phone, since that's where most ad traffic lands."
      />
      {landingPageGroups.map((group, gi) => (
        <Section key={group.program} className={gi % 2 ? "bg-sand/50" : ""}>
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold">{group.program}</h2>
            <p className="prose-kairos mt-2">{group.intro}</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {group.pages.map((page, i) => (
              <div key={page.href}>
                <Link
                  href={page.href}
                  className="group flex h-full flex-col rounded-lg border border-forest-100 bg-cream p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-forest-300"
                >
                  <span className="font-semibold text-forest-900">{page.label}</span>
                  <span className="mt-1 font-mono text-xs text-forest-600">{page.href}</span>
                  <span className="prose-kairos mt-3 flex-1 text-sm">{page.description}</span>
                  <span className="mt-4 text-xs text-ink/60">{page.tags.join(" · ")}</span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-800">
                    Open page
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </Section>
      ))}

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
