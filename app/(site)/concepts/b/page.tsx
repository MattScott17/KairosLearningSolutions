import type { Metadata } from "next";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CTASection } from "@/components/CTASection";
import { FallClassesBanner } from "@/components/home/FallClassesBanner";
import { DayScroller, type DayStep } from "@/components/concepts/DayScroller";
import { ParallaxGallery } from "@/components/ParallaxGallery";
import { photos, galleryPhotos } from "@/lib/photos";
import { getTestimonials, values } from "@/lib/content";
import { site } from "@/lib/site";
import { conceptB, dayAtKairos } from "@/lib/storybrand";

const daySteps: DayStep[] = dayAtKairos.map((m) => ({ ...m, photo: photos[m.photo] }));

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function ConceptBPage() {
  const [spotlight] = getTestimonials(["melissa-c"]);
  return (
    <>
      {/* Hero: full-bleed photo, short headline */}
      <section className="relative flex min-h-[80vh] items-end overflow-hidden pt-24">
        <Image
          src={photos.collage.src}
          alt={photos.collage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/50 to-forest-950/10"
          aria-hidden
        />
        <FallClassesBanner variant="light" className="absolute inset-x-0 top-24 sm:top-28" />
        <div className="container-page relative pb-16 text-cream sm:pb-24">
          <div>
            <p className="text-sm text-cream/80">Salinas, since {site.foundedYear}</p>
            <h1 className="mt-3 max-w-2xl text-4xl font-semibold leading-[1.1] text-cream sm:text-5xl">
              {conceptB.heroHeadline}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-cream/85">{conceptB.heroSub}</p>
            <a href="#story" className="btn-accent mt-8 inline-flex">
              See a day at Kairos
            </a>
          </div>
        </div>
      </section>

      {/* The problem, told gently */}
      <Section id="story" container="narrow">
        <SectionHeading
          title="When homework and school get hard"
          intro={conceptB.problem.external}
        />
      </Section>

      {/* A day at Kairos: sticky photo swaps as the day scrolls by */}
      <Section className="bg-sand/40">
        <SectionHeading title="A day at Kairos" />
        <div className="mt-12 lg:mt-4">
          <DayScroller steps={daySteps} />
        </div>
      </Section>

      {/* Narrative photo band */}
      <section className="bg-forest-900 py-16 text-cream sm:py-24">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={photos.smallGroup.src}
                alt={photos.smallGroup.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <p className="text-lg text-cream/85">{conceptB.problem.internal}</p>
            <p className="mt-4 text-lg font-semibold text-cream">{conceptB.problem.philosophical}</p>
            <div className="mt-8 flex gap-8 border-t border-cream/15 pt-6">
              <div>
                <p className="font-display text-2xl font-semibold text-cream">
                  Since {site.foundedYear}
                </p>
                <p className="mt-0.5 text-xs text-cream/60">Serving Salinas families</p>
              </div>
              <div>
                <p className="font-display text-2xl font-semibold text-cream">13+</p>
                <p className="mt-0.5 text-xs text-cream/60">Educators &amp; tutors</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Life at Kairos: a drifting photo wall */}
      <Section className="overflow-hidden">
        <SectionHeading title="Photos from Kairos" />
        <div className="mt-12">
          <ParallaxGallery photos={galleryPhotos} />
        </div>
      </Section>

      {/* Values, as the "how we guide" beat: a divided list beside the heading */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <h2 className="text-3xl font-semibold sm:text-4xl">How we teach</h2>
          <dl className="border-t border-forest-200">
            {values.map((value) => (
              <div
                key={value.title}
                className="grid gap-1 border-b border-forest-100 py-5 sm:grid-cols-[14rem_1fr] sm:gap-6"
              >
                <dt className="font-semibold text-forest-900">{value.title}</dt>
                <dd className="prose-kairos">{value.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* The plan, told as a gentle timeline, flowing straight into the
          testimonial that pays it off — one continuous sand block instead
          of two sections with a visible seam between them */}
      <section className="bg-sand/50 py-16 sm:py-24">
        <div className="container-narrow">
          <SectionHeading title="How to get started" />
          <div className="mt-10 space-y-8 border-l-2 border-forest-200 pl-8">
            {conceptB.plan.map((step, i) => (
              <div key={step} className="relative">
                <span className="absolute -left-12 flex h-8 w-8 items-center justify-center rounded-full bg-forest-800 font-display text-sm font-semibold text-cream">
                  {i + 1}
                </span>
                <p className="prose-kairos text-lg">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="container-page mx-auto mt-20 max-w-2xl text-center">
          <div>
            <blockquote className="text-2xl leading-relaxed text-ink/85">
              “{spotlight.pull}”
            </blockquote>
            <p className="mt-5 text-sm font-semibold text-forest-800">
              {spotlight.author} · {spotlight.role}
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title={conceptB.successVision}
        intro="Call me to set up a visit. You and your student can see a day at Kairos for yourselves."
      />
    </>
  );
}
