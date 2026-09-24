import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { stats, getTestimonials } from "@/lib/content";
import type { LandingCopy } from "@/lib/landing-content";
import { TestimonialCards } from "@/components/lp/TestimonialCards";

export function ProofStrip({ copy }: { copy: LandingCopy }) {
  return (
    <section className="bg-sand/60 py-16">
      <div className="container-page">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <Icon className="h-6 w-6 text-forest-500" />
                <p className="mt-2 font-display text-2xl font-semibold text-forest-800">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-xs text-ink/60">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {copy.proofPoints.map((point, i) => (
            <Reveal key={point} delay={i * 0.08}>
              <div className="flex h-full items-start gap-3 rounded-3xl bg-cream p-6 text-sm text-ink/80 shadow-card">
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
