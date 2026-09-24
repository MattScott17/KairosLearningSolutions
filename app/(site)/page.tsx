import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { ParallaxPhoto } from "@/components/home/ParallaxPhoto";
import { StatsBar } from "@/components/StatsBar";
import { ReviewMarquee } from "@/components/ReviewMarquee";
import { TutorCard } from "@/components/TutorCard";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { CTASection } from "@/components/CTASection";
import { services, values, apex, earlyLearners, leadership, team } from "@/lib/content";
import { photos } from "@/lib/photos";

// A cross-section of the team for the homepage strip; the full team is on /about.
const featuredTutors = [
  leadership[0],
  ...team.filter((m) => ["Trisha Hill", "Brady Berg", "Laura Palmer"].includes(m.name)),
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <StatsBar />

      {/* Services */}
      <Section id="services">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="What we offer"
            title="Support for every kind of learner"
            intro="From a single subject to a full school year, our services flex to fit your family."
          />
          <Link href="/services" className="btn-ghost shrink-0">
            View all services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.08}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>

        {/* Early Learners callout */}
        <Reveal delay={0.24}>
          <div className="mt-6 flex flex-col items-center gap-8 rounded-4xl border border-forest-100 bg-sand/50 p-8 shadow-card sm:flex-row sm:p-10">
            <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-3xl shadow-soft sm:w-64">
              <Image
                src={photos.craftProject.src}
                alt={photos.craftProject.alt}
                fill
                sizes="(max-width: 640px) 100vw, 256px"
                className="object-cover"
              />
            </div>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-forest-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-forest-700">
                {earlyLearners.ageRange}
              </span>
              <h3 className="mt-4 text-2xl font-semibold">{earlyLearners.name}</h3>
              <p className="prose-kairos mt-2 text-sm">{earlyLearners.tagline}.</p>
              <Link
                href="/early-learners"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-800"
              >
                Explore Early Learners
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* APEX feature band */}
      <section className="relative overflow-hidden bg-forest-800 text-cream">
        <div className="container-page relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
          <Reveal>
            <ParallaxPhoto
              photo={photos.smallGroup}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[4/3] arch shadow-soft lg:aspect-[5/5]"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <span className="inline-flex items-center gap-2 rounded-full bg-forest-700 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-forest-100">
              Our flagship program
            </span>
            <h2 className="mt-5 text-3xl font-semibold text-cream sm:text-4xl">
              APEX: a full-time alternative to traditional school
            </h2>
            <p className="mt-4 text-lg text-cream/80">{apex.intro}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {apex.included.slice(0, 4).map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-cream/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/apex" className="btn-accent">
                Explore APEX
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="text-sm text-cream/70">
                {apex.gradeRange} · {apex.tuition.monthly}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why Kairos / values */}
      <Section>
        <SectionHeading
          center
          eyebrow="The Kairos difference"
          title="Personal by design"
          intro="Our entire model is built around the individual needs of your child — not a one-size-fits-all classroom."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-forest-100 bg-cream p-8 text-center shadow-card">
                <h3 className="text-xl font-semibold">{value.title}</h3>
                <p className="prose-kairos mt-3 text-sm">{value.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Real Google reviews, drifting past */}
      <section className="overflow-hidden bg-sand/60 py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="From our families"
            title="A community that shows up for kids"
            intro="Real reviews from Kairos parents and students on Google."
          />
        </div>
        <ReviewMarquee className="mt-12" />
        <div className="mt-8 text-center">
          <Link href="/testimonials" className="btn-outline">
            Read more stories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Meet our tutors */}
      <Section>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Meet our tutors"
            title="Experienced educators who know your child by name"
            intro="Credentialed teachers, subject specialists, and tutors from Cal Poly, UC San Diego, and beyond."
          />
          <Link href="/about" className="btn-ghost shrink-0">
            Meet the whole team
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {/* Swipeable row on phones, 4-up grid on desktop */}
        <div className="-mx-5 mt-10 flex snap-x snap-mandatory scroll-pl-5 gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:scroll-pl-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
          {featuredTutors.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.08} className="w-[72%] shrink-0 snap-start sm:w-[45%] lg:w-auto">
              <TutorCard member={member} />
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
