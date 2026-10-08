import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CTASection } from "@/components/CTASection";
import { leadership, team, testimonials } from "@/lib/content";
import { site } from "@/lib/site";
import { pagePhotos, photos } from "@/lib/photos";
import { TutorCard } from "@/components/TutorCard";
import { ExpandableText } from "@/components/ExpandableText";

export const metadata: Metadata = pageMetadata({
  title: "About Our Teachers",
  description:
    "Meet the teachers behind Kairos Learning Solutions in Salinas, CA, and read Google reviews from Kairos families quoted in full.",
  path: "/about",
  image: pagePhotos.about,
});

type Review = (typeof testimonials)[number];

function ReviewCard({ t }: { t: Review }) {
  return (
    <figure className="rounded-lg border border-forest-100 bg-cream p-5 sm:p-7">
      <blockquote className="font-display text-xl italic leading-relaxed text-forest-800">“{t.pull}”</blockquote>
      <figcaption className="mt-3 text-sm">
        <span className="font-semibold text-forest-800">{t.author}</span>
        <span className="text-ink/75">
          {" "}
          · {t.role}
          {t.source && <> · {t.source} review</>}
        </span>
      </figcaption>
      <details className="group mt-1">
        <summary className="link-underline inline-flex min-h-11 cursor-pointer list-none items-center text-sm [&::-webkit-details-marker]:hidden">
          <span className="group-open:hidden">Read the full review</span>
          <span className="hidden group-open:inline">Hide the full review</span>
        </summary>
        <blockquote className="mt-2 text-base leading-relaxed text-ink/80">“{t.quote}”</blockquote>
      </details>
    </figure>
  );
}

const alissa = leadership.find((p) => p.name === "Alissa Scott")!;

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "About", path: "/about" }])} />
      <PageHero
        title="Educators who see the whole child"
        mark="whole child"
        photo={pagePhotos.about}
        variant="flip"
        intro="Most of our teachers are Salinas parents and grandparents. Between them they've taught kindergarten through 12th grade, several for more than 25 years, and one still teaches full time at New Republic Elementary."
      />

      {/* Jackie, in her own words */}
      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={photos.readingTogether.src}
              alt={photos.readingTogether.alt}
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
            <p className="mt-6 text-sm text-ink/75">
              Jackie Scott, owner and lead teacher. MA in Educational Leadership and Curriculum &amp; Instruction.
            </p>

            {/* Alissa, who runs day to day, is part of the same story, not a separate section */}
            <div className="mt-8 flex gap-5 border-t border-forest-100 pt-8">
              <div className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden rounded-lg bg-forest-50 sm:w-32">
                {alissa.image && (
                  <Image
                    src={alissa.image}
                    alt={alissa.name}
                    fill
                    sizes="(max-width: 640px) 6rem, 8rem"
                    className="object-cover"
                  />
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{alissa.name}</h3>
                <p className="text-sm text-forest-700">{alissa.role}</p>
                {alissa.bio && <ExpandableText text={alissa.bio} lines={3} className="mt-3 text-base" />}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Google reviews: three up front, the rest on request */}
      <Section id="reviews" className="scroll-mt-20">
        <SectionHeading
          title="What families say"
          intro={`${testimonials.length} Google reviews from Kairos parents and grandparents. Open one to read it word for word.`}
        />
        <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
          {testimonials.slice(0, 3).map((t) => (
            <ReviewCard key={t.id} t={t} />
          ))}
        </div>
        <details className="group mt-2">
          <summary className="btn-outline cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">Read all {testimonials.length} reviews</span>
            <span className="hidden group-open:inline">Show fewer reviews</span>
          </summary>
          <div className="mt-8 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
            {testimonials.slice(3).map((t) => (
              <ReviewCard key={t.id} t={t} />
            ))}
          </div>
        </details>
      </Section>

      {/* Team */}
      <section className="bg-sand py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading
            title="Our teachers and tutors"
            intro="Credentialed classroom teachers, subject specialists, and college tutors in math and science."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={(i % 3) * 0.06} className="h-full">
                <TutorCard member={member} compact expandable />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Come visit"
        intro="Give us a call and we'll find a time for you and your student to see the space and meet the teachers."
      />
    </>
  );
}
