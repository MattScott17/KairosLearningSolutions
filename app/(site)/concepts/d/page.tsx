import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/CTASection";
import { VideoHero } from "@/components/VideoHero";
import { LayoutGrid, type GridPhoto } from "@/components/aceternity/LayoutGrid";
import { ReviewMarquee } from "@/components/ReviewMarquee";
import { TutorCard } from "@/components/TutorCard";
import { leadership, team } from "@/lib/content";
import { site } from "@/lib/site";
import { conceptD } from "@/lib/storybrand";
import { galleryPhotos, heroVideo, photos } from "@/lib/photos";

export const metadata: Metadata = { robots: { index: false, follow: false } };

const gallery: GridPhoto[] = galleryPhotos.map((p) => ({ ...p, caption: p.alt }));

const tutors = [
  leadership[1],
  ...team.filter((m) => ["Michelle Ball", "Lisa Bleicher", "Daryl Lyon"].includes(m.name)),
];

export default function ConceptDPage() {
  return (
    <>
      {/* Hero — a silent, looping look inside a real Kairos classroom */}
      <VideoHero video={heroVideo} poster={photos.smallGroup}>
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-forest-950/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cream">
            Salinas, CA · Since {site.foundedYear}
          </span>
          <h1 className="mt-5 max-w-3xl text-[2.6rem] font-semibold leading-[1.05] text-cream sm:text-6xl lg:text-7xl">
            {conceptD.heroHeadline}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-cream/85">{conceptD.heroSub}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn-accent">
              Book a free call
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={site.phoneHref}
              className="btn border-2 border-cream/70 text-cream hover:bg-cream hover:text-forest-900"
            >
              <Phone className="h-4 w-4" />
              {site.phone}
            </a>
          </div>
        </Reveal>
      </VideoHero>

      {/* Gallery — tap any photo to see it large */}
      <Section>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Inside Kairos"
            title="A look around"
            intro={conceptD.problem.philosophical}
          />
          <p className="text-sm text-ink/60">Tap a photo to see it larger.</p>
        </div>
        <div className="mt-10">
          <LayoutGrid photos={gallery} />
        </div>
      </Section>

      {/* Reviews */}
      <section className="overflow-hidden bg-sand/60 py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading center eyebrow="Don't take our word for it" title="What Kairos families say" />
        </div>
        <ReviewMarquee className="mt-12" />
      </section>

      {/* Tutors */}
      <Section>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="The people" title="Who your student will learn with" />
          <Link href="/about" className="btn-ghost shrink-0">
            Meet the whole team
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="-mx-5 mt-10 flex snap-x snap-mandatory scroll-pl-5 gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:scroll-pl-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
          {tutors.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.08} className="w-[72%] shrink-0 snap-start sm:w-[45%] lg:w-auto">
              <TutorCard member={member} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Plan — three steps */}
      <Section className="bg-forest-900 text-cream">
        <SectionHeading
          center
          eyebrow="Getting started"
          title={<span className="text-cream">Three steps to your first session</span>}
          className="[&_.eyebrow]:text-forest-300"
        />
        <ol className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
          {conceptD.plan.map((step, i) => (
            <Reveal as="li" key={step} delay={i * 0.08}>
              <div className="flex h-full flex-col items-center rounded-3xl bg-forest-800/70 p-7 text-center">
                <span className="arch flex h-14 w-12 items-end justify-center bg-gold-500 pb-2 font-display text-lg font-semibold text-ink">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-cream">{conceptD.planTitles?.[i]}</h3>
                <p className="mt-2 text-sm text-cream/80">{step}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <CTASection
        title={conceptD.successVision}
        intro="Book a free call and come see Kairos in person."
        primaryLabel="Book a free call"
        primaryHref="/contact"
      />
    </>
  );
}
