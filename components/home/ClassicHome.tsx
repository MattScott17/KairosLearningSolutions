import Link from "next/link";
import { Check } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { FallClassesBanner } from "@/components/home/FallClassesBanner";
import { ParallaxPhoto } from "@/components/home/ParallaxPhoto";
import { StatsBar } from "@/components/StatsBar";
import { ReviewMarquee } from "@/components/ReviewMarquee";
import { TutorRow } from "@/components/TutorCard";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ProgramList } from "@/components/ProgramList";
import { PhotosFromKairos, HowWeTeach, GetStarted } from "@/components/home/HomeSections";
import { CTASection } from "@/components/CTASection";
import { apex, featuredTutors, getTeamMembers, testimonials } from "@/lib/content";
import { photos } from "@/lib/photos";

export function ClassicHome() {
  return (
    <>
      <Hero banner={<FallClassesBanner />} />

      <StatsBar />

      {/* Every program at a glance, with prices */}
      <Section id="services">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            title="What we offer, and what it costs"
            intro="Pick one subject once a week, or the whole school day. Each program has its own page with the details."
          />
          <Link href="/services" className="link-underline shrink-0">
            Compare programs
          </Link>
        </div>
        <div className="mt-10">
          <ProgramList />
        </div>
      </Section>

      {/* APEX */}
      <section className="bg-forest-900 text-cream">
        <div className="container-page grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2">
          <ParallaxPhoto
            photo={photos.smallGroup}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="aspect-[4/3] rounded-lg"
          />
          <div>
            <h2 className="text-3xl font-semibold text-cream sm:text-4xl">
              APEX, our full‑time school day for grades 3 to 9
            </h2>
            <p className="mt-4 text-lg text-cream/85">
              Students finish their core academics in about two focused hours each morning, each at
              their own level. The rest of the day goes to projects, presentations and life skills.
            </p>
            <ul className="mt-6 space-y-2 text-cream/85">
              {apex.included.slice(0, 4).map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-forest-300" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/apex" className="btn-accent">
                How APEX works
              </Link>
              <p className="text-cream/75">
                Call us to set up a free tour
              </p>
            </div>
          </div>
        </div>
      </section>

      <PhotosFromKairos />

      <HowWeTeach />

      {/* Real Google reviews */}
      <section className="overflow-hidden border-t border-forest-100 bg-sand py-16 sm:py-20">
        <div className="container-page flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading title="What parents say on Google" />
          <Link href="/about#reviews" className="link-underline shrink-0">
            Read all {testimonials.length} reviews in full
          </Link>
        </div>
        <ReviewMarquee className="mt-10" />
      </section>

      {/* Tutors */}
      <Section>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            title="Who will be teaching your child"
            intro="Retired classroom teachers, a Monterey County Teacher of the Year nominee, and math and science tutors from Cal Poly, UC San Diego and CSU Monterey Bay."
          />
          <Link href="/about" className="link-underline shrink-0">
            Meet the whole team
          </Link>
        </div>
        <div className="mt-10">
          <TutorRow members={getTeamMembers(featuredTutors.home)} />
        </div>
      </Section>

      <GetStarted />

      <CTASection />
    </>
  );
}
