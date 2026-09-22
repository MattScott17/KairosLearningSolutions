import type { Metadata } from "next";
import Image from "next/image";
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
  const [featured, ...rest] = testimonials;

  return (
    <>
      <PageHero
        eyebrow="In their words"
        title="Stories from our families"
        intro="The heart of Kairos is the students and families we get to walk alongside. Here's what a few of them have shared."
      />

      {/* Featured story, with a real photo, before the full wall of quotes */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-4xl shadow-soft">
              <Image
                src="/images/photo-2.jpg"
                alt="Kairos students in a small-group lesson"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Quote className="h-10 w-10 text-forest-300" />
            <blockquote className="mt-4 font-display text-2xl leading-snug text-forest-900 sm:text-3xl">
              “{featured.quote}”
            </blockquote>
            <p className="mt-5 text-sm font-semibold text-forest-800">
              {featured.author} <span className="font-normal text-ink/60">· {featured.role}</span>
            </p>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-sand/50">
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
          {rest.map((t, i) => (
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
