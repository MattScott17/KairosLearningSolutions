import type { Metadata } from "next";
import { Quote } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/CTASection";
import { testimonials } from "@/lib/content";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Hear from Kairos Learning Solutions families and students in Salinas about the difference personalized tutoring and mentorship has made.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="In their words"
        title="Stories from our families"
        intro="The heart of Kairos is the students and families we get to walk alongside. Here's what a few of them have shared."
      />

      <Section>
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
          {testimonials.map((t, i) => (
            <Reveal key={t.author} delay={(i % 3) * 0.08}>
              <figure className="rounded-3xl border border-forest-100 bg-cream p-7 shadow-card">
                <Quote className="h-8 w-8 text-forest-300" />
                <blockquote className="mt-4 text-lg leading-relaxed text-ink/85">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-forest-100 pt-4 text-sm">
                  <span className="font-semibold text-forest-800">{t.author}</span>
                  <span className="block text-ink/60">{t.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        title="Ready to write your own story?"
        intro="We'd love to be part of your family's journey. Reach out and let's talk about your student."
      />
    </>
  );
}
