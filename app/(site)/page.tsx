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
import { PhotoStrip } from "@/components/PhotoStrip";
import { CTASection } from "@/components/CTASection";
import { apex, featuredTutors, getTeamMembers, testimonials } from "@/lib/content";
import { galleryPhotos, photos } from "@/lib/photos";

export default function HomePage() {
  return (
    <>
      <Hero banner={<FallClassesBanner />} />

      <PhotoStrip photos={galleryPhotos} className="mb-2" />

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
              APEX, our full-time school day for grades 3 to 9
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
                {apex.tuition.monthly.replace(" / ", " a ")}, {apex.tuition.term.toLowerCase()}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why families stay */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <h2 className="text-3xl font-semibold sm:text-4xl">Small groups, experienced teachers</h2>
          <div className="prose-kairos space-y-4 text-lg">
            <p>
              Groups here are small, so every teacher knows each student by name and knows what they
              are working on. Many of our teachers spent 15 to 38 years in classrooms before joining
              Kairos.
            </p>
            <p>
              Every student starts with a plan built on what they already know, and moves on when
              they&apos;re ready.
            </p>
          </div>
        </div>
      </Section>

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

      <CTASection />
    </>
  );
}
