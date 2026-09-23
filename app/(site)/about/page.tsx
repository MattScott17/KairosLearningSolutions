import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/CTASection";
import { leadership, team, values } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the team behind Kairos Learning Solutions — passionate Salinas educators dedicated to your student's academic and personal growth.",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Kairos"
        title="Educators who see the whole child"
        intro="Since 2020, Kairos Learning Solutions has been a place in Salinas where students are known by name, met where they are, and challenged to grow — academically and personally."
      />

      {/* Mission */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-4xl shadow-soft">
              <Image
                src="/images/photo-3.jpg"
                alt="Learning at Kairos Learning Solutions"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading
              eyebrow="Our mission"
              title="Talented, passionate educators — focused on your student"
              intro="The team at Kairos is composed of talented and passionate educators whose main goal is to serve your student's academic and personal needs. Most of our team are parents and grandparents with deep roots in the Salinas community, and we bring hundreds of combined years of experience to every child who walks through our doors."
            />
            <dl className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <dt className="font-display text-3xl font-semibold text-forest-800">Since {site.foundedYear}</dt>
                <dd className="mt-1 text-sm text-ink/60">Serving Salinas families</dd>
              </div>
              <div>
                <dt className="font-display text-3xl font-semibold text-forest-800">All ages</dt>
                <dd className="mt-1 text-sm text-ink/60">Early reading through AP courses</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </Section>

      {/* Values */}
      <section className="bg-sand/60 py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="What we believe"
            title="Three commitments to every family"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.08}>
                <div className="h-full rounded-3xl bg-cream p-8 shadow-card">
                  <h3 className="text-xl font-semibold">{value.title}</h3>
                  <p className="prose-kairos mt-3 text-sm">{value.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <Section>
        <SectionHeading
          eyebrow="Leadership"
          title="Meet the people leading the way"
        />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {leadership.map((person, i) => (
            <Reveal key={person.name} delay={i * 0.08}>
              <div className="flex h-full flex-col gap-5 rounded-3xl border border-forest-100 bg-cream p-8 shadow-card sm:flex-row">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-forest-800 font-display text-2xl font-semibold text-cream">
                  {initials(person.name)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{person.name}</h3>
                  <p className="text-sm font-medium text-forest-600">{person.role}</p>
                  <p className="prose-kairos mt-3 text-sm">{person.bio}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Team */}
      <section className="bg-forest-900 py-16 text-cream sm:py-24">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="Our team"
            title={<span className="text-cream">Teachers, tutors &amp; specialists</span>}
            intro={
              <span className="text-cream/80">
                A close-knit team of educators, each bringing their own subjects, warmth, and years
                of experience.
              </span>
            }
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={(i % 4) * 0.06}>
                <div className="flex h-full gap-4 rounded-2xl bg-forest-800/70 p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-700 text-sm font-semibold text-cream">
                    {initials(member.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-cream">{member.name}</p>
                    <p className="text-xs text-cream/60">{member.role}</p>
                    {member.bio && <p className="mt-2 text-sm text-cream/80">{member.bio}</p>}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Come see Kairos for yourself"
        intro="The best way to understand what makes Kairos different is to visit. Reach out and we'll set up a time to talk."
      />
    </>
  );
}
