import { Quote } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { stats, testimonials } from "@/lib/content";
import type { LandingCopy } from "@/lib/landing-content";

export function ProofStrip({ copy }: { copy: LandingCopy }) {
  const shownTestimonials = testimonials.slice(0, 3);

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
              <div className="h-full rounded-3xl bg-cream p-6 text-sm text-ink/80 shadow-card">
                {point}
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {shownTestimonials.map((t, i) => (
            <Reveal key={t.author} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-3xl bg-cream p-7 shadow-card">
                <Quote className="h-7 w-7 text-forest-300" />
                <blockquote className="mt-3 flex-1 text-base leading-relaxed text-ink/85">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-5 border-t border-forest-100 pt-4 text-sm">
                  <span className="font-semibold text-forest-800">{t.author}</span>
                  <span className="block text-ink/60">{t.role}</span>
                  {t.result && <span className="mt-1 block text-forest-700">{t.result}</span>}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
