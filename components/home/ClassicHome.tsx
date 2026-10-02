import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { FallClassesBanner } from "@/components/home/FallClassesBanner";
import { StatsBar } from "@/components/StatsBar";
import { ReviewMarquee } from "@/components/ReviewMarquee";
import { TutorRow } from "@/components/TutorCard";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ProgramList } from "@/components/ProgramList";
import { Pathways } from "@/components/Pathways";
import { PhotosFromKairos, HowWeTeach, GetStarted } from "@/components/home/HomeSections";
import { CTASection } from "@/components/CTASection";
import { featuredTutors, getTeamMembers, testimonials } from "@/lib/content";

export function ClassicHome() {
  return (
    <>
      <Hero banner={<FallClassesBanner />} />

      <StatsBar />

      <Pathways />

      {/* Every program at a glance, with prices */}
      <Section id="services" className="border-t border-forest-100 bg-sand/50">
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
