import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, Palette, Phone, Sun, Tent, Users } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/CTASection";
import { summerPrograms } from "@/lib/content";

export const metadata: Metadata = {
  title: "Summer Programs",
  description:
    "Keep learning fun all summer at Kairos in Salinas — enrichment camps, academic tune-ups, and hands-on activities to prevent the summer slide.",
};

const highlights = [
  {
    icon: Sun,
    title: "Beat the summer slide",
    body: "Short, focused academic sessions keep skills sharp so students start the school year strong.",
  },
  {
    icon: Palette,
    title: "Creative & hands-on",
    body: "Writing, art, STEM, and project-based activities that make learning feel like play.",
  },
  {
    icon: Users,
    title: "Small groups",
    body: "The same personal attention Kairos is known for, in a relaxed summer setting.",
  },
  {
    icon: Tent,
    title: "Flexible weeks",
    body: "Sign up for the weeks that work for your family's summer schedule.",
  },
];

export default function SummerPage() {
  return (
    <>
      <PageHero
        eyebrow="Summer at Kairos"
        title="A summer of curiosity"
        intro="Summer is the perfect time to explore, stay sharp, and have fun learning. Our summer programs blend light academics with hands-on enrichment so kids come back to school confident and curious."
      />

      <Reveal>
        <div className="container-page pt-16 sm:pt-20">
          <div className="relative aspect-[21/9] overflow-hidden rounded-4xl shadow-soft">
            <Image
              src="/images/photo-5.jpg"
              alt="Kairos students enjoying an outdoor summer activity"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Reveal>

      <Section>
        <SectionHeading
          center
          eyebrow="Why summer at Kairos"
          title="Learning that doesn't feel like summer school"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.07}>
              <div className="h-full rounded-3xl border border-forest-100 bg-cream p-7 shadow-card">
                <h3 className="text-lg font-semibold">{h.title}</h3>
                <p className="prose-kairos mt-2 text-sm">{h.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <section className="bg-sand/60 py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading center eyebrow="Summer 2026" title="This summer's programs" />
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {summerPrograms.map((program, i) => (
              <Reveal key={program.slug} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-3xl bg-cream p-8 shadow-card">
                  <h3 className="text-2xl font-semibold">{program.title}</h3>
                  <p className="mt-1 text-sm font-medium text-forest-600">{program.dates}</p>
                  <p className="prose-kairos mt-3 text-sm">{program.description}</p>

                  <dl className="mt-5 space-y-1.5 border-t border-forest-100 pt-4">
                    {program.schedule.map((s) => (
                      <div key={s.label} className="flex justify-between gap-4 text-sm">
                        <dt className="text-ink/60">{s.label}</dt>
                        <dd className="text-right font-medium text-forest-800">{s.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <dl className="mt-4 space-y-1.5 border-t border-forest-100 pt-4">
                    {program.pricing.map((p) => (
                      <div key={p.label} className="flex justify-between gap-4 text-sm">
                        <dt className="text-ink/60">{p.label}</dt>
                        <dd className="text-right font-medium text-forest-800">{p.value}</dd>
                      </div>
                    ))}
                  </dl>

                  {program.hostedBy && (
                    <p className="mt-4 text-xs text-ink/50">
                      Hosted by {program.hostedBy}
                      {program.contactEmail && (
                        <>
                          {" · "}
                          <a href={`mailto:${program.contactEmail}`} className="link-underline">
                            <Mail className="inline h-3 w-3" /> {program.contactEmail}
                          </a>
                        </>
                      )}
                      {program.contactPhone && (
                        <>
                          {" · "}
                          <a
                            href={`tel:${program.contactPhone.replace(/[^\d+]/g, "")}`}
                            className="link-underline"
                          >
                            <Phone className="inline h-3 w-3" /> {program.contactPhone}
                          </a>
                        </>
                      )}
                    </p>
                  )}
                  {program.note && <p className="mt-4 text-xs text-ink/50">{program.note}</p>}

                  <Link href="/contact" className="btn-primary mt-6 self-start">
                    Reserve a spot
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Plan your student's summer"
        intro="Tell us your student's age and what you're hoping for this summer — we'll help you build the right mix."
      />
    </>
  );
}
