import { Phone, Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import type { LandingCopy } from "@/lib/landing-content";

export function LandingHero({ copy }: { copy: LandingCopy }) {
  return (
    <section className="relative overflow-hidden pt-16 sm:pt-20">
      <div className="container-page text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-forest-200 bg-forest-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-forest-700">
            {copy.eyebrow}
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold leading-[1.1] sm:text-5xl">
            {copy.headline}
          </h1>
          <p className="prose-kairos mx-auto mt-6 max-w-2xl text-lg">{copy.subhead}</p>

          <ul className="mx-auto mt-8 flex max-w-xl flex-col gap-2.5 text-left sm:mx-auto">
            {copy.painPoints.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-ink/80">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest-500" />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#callback" className="btn-primary w-full sm:w-auto">
              {copy.ctaLabel}
            </a>
            <a href={site.phoneHref} className="btn-outline w-full sm:w-auto">
              <Phone className="h-4 w-4" />
              {site.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
