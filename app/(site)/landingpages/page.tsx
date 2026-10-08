import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { landingPageGroups } from "@/lib/landing-pages";
import { BannerEditor } from "@/components/concepts/BannerEditor";
import { CopyLinkButton } from "@/components/concepts/CopyLinkButton";
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
        intro={
          <>
            Open any page to look at it, tap Copy link to share it, or{" "}
            <a href="#banner" className="link-underline">
              edit the banner at the top of the site
            </a>
            . Try them on your phone, since that is where most ad traffic lands.
          </>
        }
      />
      {landingPageGroups.map((group, gi) => (
        <Section key={group.program} className={gi % 2 ? "bg-sand/50" : ""}>
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold">{group.program}</h2>
            <p className="prose-kairos mt-2">{group.intro}</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {group.pages.map((page, i) => (
              <div key={page.href} className="flex h-full flex-col rounded-lg border border-forest-100 bg-cream p-6">
                <span className="font-semibold text-forest-900">{page.label}</span>
                <span className="mt-1 break-all font-mono text-sm text-forest-700">{page.href}</span>
                <span className="prose-kairos mt-3 flex-1 text-sm">{page.description}</span>
                <span className="mt-4 text-sm text-ink/75">{page.tags.join(" · ")}</span>
                <div className="mt-3 flex flex-wrap items-center gap-x-6">
                  <Link
                    href={page.href}
                    className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-forest-800"
                  >
                    Open page
                    <span className="sr-only"> {page.label}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <CopyLinkButton href={page.href} name={page.label} />
                </div>
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
