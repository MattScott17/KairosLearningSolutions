import { stats, getTestimonials } from "@/lib/content";
import type { LandingCopy } from "@/lib/landing-content";
import { TestimonialCards } from "@/components/lp/TestimonialCards";

export function ProofStrip({ copy }: { copy: LandingCopy }) {
  return (
    <section className="bg-sand/60 py-16">
      <div className="container-page">
        <div className="grid grid-cols-2 gap-y-8 sm:grid-flow-col sm:auto-cols-fr sm:gap-y-0 sm:divide-x sm:divide-forest-200">
          {stats
            .filter((s) => copy.program === "Private Tutoring" || s.label !== "Educators & tutors")
            .map((s) =>
              copy.program === "APEX" && s.value === "All ages"
                ? { ...s, value: "Grades 3 to 9", label: "APEX program" }
                : s
            )
            .map((stat) => (
            <div key={stat.label} className="flex flex-col items-center px-3 text-center">
              <p className="font-display text-3xl font-semibold text-forest-800 sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-ink/70">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <TestimonialCards items={getTestimonials(copy.testimonialIds)} />
        </div>
      </div>
    </section>
  );
}
