import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CTASection } from "@/components/CTASection";
import { leadership, team } from "@/lib/content";
import { site } from "@/lib/site";
import { pagePhotos } from "@/lib/photos";
import { TutorAvatar, TutorCard } from "@/components/TutorCard";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the team behind Kairos Learning Solutions — passionate Salinas educators dedicated to your student's academic and personal growth.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Educators who see the whole child"
        intro="Most of our teachers are Salinas parents and grandparents. Between them they've taught kindergarten through 12th grade, several for more than 25 years, and one still teaches full time at New Republic Elementary."
      />

      {/* Jackie, in her own words */}
      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={pagePhotos.about.src}
              alt={pagePhotos.about.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">Why I opened Kairos</h2>
            <div className="prose-kairos mt-5 space-y-4 text-lg">
              <p>
                I taught grades 3 through 12 for more than 30 years, in many subjects and many kinds of
                schools. In {site.foundedYear} I opened Kairos so students could work at their own
                pace, one-on-one or in small groups, with teachers who know them by name.
              </p>
              <p>
                My goal is the same one I had in the classroom: help students fall in love with
                learning.
              </p>
            </div>
            <p className="mt-6 text-sm text-ink/60">Jackie Scott, owner and lead teacher</p>
          </div>
        </div>
      </Section>

      {/* Leadership */}
      <section className="border-t border-forest-100 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading title="Who runs Kairos" />
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {leadership.map((person) => (
              <div key={person.name} className="flex gap-5">
                <TutorAvatar
                  member={person}
                  sizes="80px"
                  className="h-20 w-20 shrink-0 rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-semibold">{person.name}</h3>
                  <p className="text-sm text-forest-700">{person.role}</p>
                  <p className="prose-kairos mt-3 text-sm">{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-sand py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            title="Our teachers and tutors"
            intro="Credentialed classroom teachers, subject specialists, and college tutors in math and science."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <TutorCard key={member.name} member={member} fullBio />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Come visit"
        intro="Call me and we'll find a time for you and your student to see the space and meet the teachers."
      />
    </>
  );
}
