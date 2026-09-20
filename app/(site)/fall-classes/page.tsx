import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays, ExternalLink, Sparkles } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/CTASection";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Classes & Enrichment",
  description:
    "Explore Kairos enrichment and academic classes for the 2026–2027 school year — writing, Spanish, STEM, and seasonal courses in Salinas, CA.",
};

const subjects = [
  { icon: BookOpen, title: "Writing & Language", body: "Build strong writers and confident readers." },
  { icon: Sparkles, title: "STEM & Discovery", body: "Hands-on science, math, and problem solving." },
  { icon: CalendarDays, title: "Spanish & Culture", body: "Language learning that sticks." },
];

export default function FallClassesPage() {
  return (
    <>
      <PageHero
        eyebrow="2026 – 2027 School Year"
        title="Classes & Enrichment"
        intro="Kairos hosts a variety of academic and enrichment courses throughout the year — a chance for students to hone a skill or feed their curiosity. Spaces fill quickly."
      />

      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Current catalog"
              title="Browse this year's course catalog"
              intro="Our full catalog lists every available class with descriptions, schedules, ages, and pricing for the 2026–2027 school year. It's updated as new sessions open."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={site.fallCatalogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                View the course catalog
                <ExternalLink className="h-4 w-4" />
              </a>
              <Link href="/contact" className="btn-outline">
                Ask about a class
              </Link>
            </div>
            <p className="mt-6 text-sm text-ink/60">
              Prefer to talk it through? Call{" "}
              <a href={site.phoneHref} className="link-underline">
                {site.phone}
              </a>{" "}
              or email{" "}
              <a href={site.emailHref} className="link-underline">
                {site.email}
              </a>
              .
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-4xl border border-forest-100 bg-sand/50 p-8 shadow-card">
              <h3 className="text-lg font-semibold">What families ask</h3>
              <dl className="mt-5 space-y-5">
                <div>
                  <dt className="font-semibold text-forest-800">How do I register?</dt>
                  <dd className="prose-kairos mt-1 text-sm">
                    Book your spot online through the catalog, or call us and we'll get your student
                    enrolled.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-forest-800">Who can join?</dt>
                  <dd className="prose-kairos mt-1 text-sm">
                    Classes are grouped by age and level. If you're unsure where your student fits,
                    just ask — we'll help you choose.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-forest-800">When are new classes posted?</dt>
                  <dd className="prose-kairos mt-1 text-sm">
                    We add seasonal offerings throughout the year. Follow us on{" "}
                    <a
                      href={site.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline"
                    >
                      Instagram
                    </a>{" "}
                    for the latest.
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </Section>

      <div className="container-page pb-16">
        <Reveal>
          <div className="relative aspect-[21/9] overflow-hidden rounded-4xl shadow-soft">
            <Image
              src="/images/photo-3.jpg"
              alt="Kairos students working on an enrichment class project"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>

      <section className="bg-sand/60 py-16">
        <div className="container-page">
          <SectionHeading center eyebrow="Areas of study" title="A little bit of everything" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {subjects.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="h-full rounded-3xl bg-cream p-8 text-center shadow-card">
                  <h3 className="text-xl font-semibold">{s.title}</h3>
                  <p className="prose-kairos mt-3 text-sm">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/summer" className="btn-ghost">
              Looking for summer programs?
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Not sure which class is right?"
        intro="Tell us about your student and we'll point you to the classes and programs that fit best."
      />
    </>
  );
}
