import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CTASection } from "@/components/CTASection";
import { Pathways } from "@/components/Pathways";
import { FallClassesBanner } from "@/components/home/FallClassesBanner";
import { VideoHero } from "@/components/VideoHero";
import { LayoutGrid } from "@/components/aceternity/LayoutGrid";
import { ReviewMarquee } from "@/components/ReviewMarquee";
import { TutorRow } from "@/components/TutorCard";
import { featuredTutors, getTeamMembers } from "@/lib/content";
import { site } from "@/lib/site";
import { conceptD } from "@/lib/storybrand";
import { galleryPhotos, heroVideo, photos } from "@/lib/photos";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function ConceptDPage() {
  return (
    <>
      <FallClassesBanner className="pb-6 pt-24 sm:pt-28" />

      {/* Hero: a silent, looping look inside a real Kairos classroom */}
      <VideoHero video={heroVideo} poster={photos.smallGroup}>
        <p className="text-sm font-medium text-cream">Salinas, CA, since {site.foundedYear}</p>
        <h1 className="mt-3 max-w-3xl text-[2.6rem] font-semibold leading-[1.05] text-cream sm:text-6xl lg:text-7xl">
          {conceptD.heroHeadline}
        </h1>
        <p className="mt-5 max-w-xl text-lg text-cream/90">{conceptD.heroSub}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/contact" className="btn-accent">
            Book a call
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
      </VideoHero>

      {/* Gallery: tap any photo to see it large */}
      <Section>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            title="A look around"
            intro={conceptD.problem.philosophical}
          />
          <p className="text-sm text-ink/60">Tap a photo to see it larger.</p>
        </div>
        <div className="mt-10">
          <LayoutGrid photos={galleryPhotos} />
        </div>
      </Section>

      {/* Reviews */}
      <section className="overflow-hidden bg-sand/60 py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading title="Reviews from Kairos families" />
        </div>
        <ReviewMarquee className="mt-12" />
      </section>

      {/* Tutors */}
      <Section>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading title="Who your student will learn with" />
          <Link href="/about" className="btn-ghost shrink-0">
            Meet the whole team
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10">
          <TutorRow members={getTeamMembers(featuredTutors.conceptD)} />
        </div>
      </Section>

      {/* Plan: three steps */}
      <Section className="bg-forest-900 text-cream">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <h2 className="text-3xl font-semibold text-cream sm:text-4xl">How to get started</h2>
          <ol className="border-t border-cream/20">
            {conceptD.plan.map((step, i) => (
              <li key={step} className="grid gap-1 border-b border-cream/10 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <h3 className="text-xl font-semibold text-cream">
                  {i + 1}. {conceptD.planTitles?.[i]}
                </h3>
                <p className="text-cream/80">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Pathways className="border-t border-forest-100" />

      <CTASection
        title={conceptD.successVision}
        intro="Give us a call to set up a visit and see Kairos in person."
      />
    </>
  );
}
