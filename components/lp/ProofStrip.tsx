import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { stats, getTestimonials } from "@/lib/content";
import type { LandingCopy } from "@/lib/landing-content";
import { TestimonialCards } from "@/components/lp/TestimonialCards";

export function ProofStrip({ copy }: { copy: LandingCopy }) {
  return (
    <section className="bg-sand/60 py-16">
      <div className="container-page">
        <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-y-0 sm:divide-x sm:divide-forest-200">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center px-3 text-center">
              <p className="font-display text-3xl font-semibold text-forest-800 sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-ink/70">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {copy.proofPoints.map((point, i) => (
            <Reveal key={point} delay={i * 0.08}>
              <div className="flex h-full items-start gap-3 rounded-lg bg-cream p-6 text-sm text-ink/80">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest-500" />
                {point}
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12">
          <TestimonialCards items={getTestimonials(copy.testimonialIds)} />
        </div>
      </div>
    </section>
  );
}
