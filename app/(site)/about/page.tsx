import type { Metadata } from "next";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CTASection } from "@/components/CTASection";
import { TeamList } from "@/components/TeamList";
import { leadership, team, testimonials } from "@/lib/content";
import { site } from "@/lib/site";
import Link from "next/link";
import { Phone } from "lucide-react";
import { pagePhotos, photos } from "@/lib/photos";

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
    <figure className="rounded-lg border border-forest-100 bg-cream p-5 sm:p-6">
      <blockquote className="text-lg leading-relaxed text-ink">&ldquo;{t.pull}&rdquo;</blockquote>
      <figcaption className="mt-3 text-sm text-ink/80">
        <span className="font-semibold text-forest-800">{t.author}</span>
        {" "}
        &middot; {t.role}
        {t.source && <> &middot; {t.source} review</>}
      </figcaption>
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
        variant="wide"
        intro="Most of our teachers are Salinas parents and grandparents. One still teaches full time at New Republic Elementary."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={site.phoneHref} className="btn-primary">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {site.phone}
          </a>
          <Link href="/contact" className="btn-outline">
            Interest form
          </Link>
        </div>
      </PageHero>

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
                I taught grades 3 through 12 for more than 30 years. In {site.foundedYear} I opened Kairos so students could work at their own
                pace, one-on-one or in small groups, with teachers who know them by name.
              </p>
              <p>
                My goal is the same one I had in the classroom: help students fall in love with
                learning.
              </p>
            </div>
            <p className="mt-6 font-semibold text-forest-900">Jackie Scott, owner and lead teacher</p>
            <p className="text-base text-ink/80">MA in Educational Leadership and Curriculum &amp; Instruction</p>

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
                <p className="mt-3 text-base text-ink/85">
                  BA in Elementary Education and a Multiple Subject Teaching Credential from Grand
                  Canyon University. She grew up at Kairos as a student, tutor and teacher.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Google reviews: three up front, the rest on request */}
      <Section id="reviews" className="scroll-mt-20">
        <SectionHeading
          title="What families say"
          intro={`${testimonials.length} Google reviews from Kairos parents and grandparents.`}
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
          <div className="mt-10">
            <TeamList members={team} />
          </div>
        </div>
      </section>

      <CTASection
        title="Come meet us"
        intro="Call or fill out the interest form, then come see the space and meet the teachers."
      />
    </>
  );
}
