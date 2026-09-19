import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Palette, Sun, Tent, Users } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/CTASection";
import { site } from "@/lib/site";

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

      <Section>
        <SectionHeading
          center
          eyebrow="Why summer at Kairos"
          title="Learning that doesn't feel like summer school"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <Reveal key={h.title} delay={i * 0.07}>
                <div className="h-full rounded-3xl border border-forest-100 bg-cream p-7 shadow-card">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-50 text-forest-700">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{h.title}</h3>
                  <p className="prose-kairos mt-2 text-sm">{h.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <section className="bg-sand/60 py-16">
        <div className="container-page">
          <div className="rounded-4xl bg-cream p-8 shadow-card sm:p-12">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <SectionHeading
                  eyebrow="2026 programs"
                  title="Summer schedules open in spring"
                  intro="Specific camps, dates, and pricing for Summer 2026 are announced each spring and fill quickly. Want to be first to know? Reach out and we'll add you to the list."
                />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link href="/contact" className="btn-primary">
                  Join the summer list
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  Follow for updates
                </a>
              </div>
            </div>
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
