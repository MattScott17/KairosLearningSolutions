import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Quote } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { CTASection } from "@/components/CTASection";
import { services, values, stats, getTestimonials, apex, earlyLearners } from "@/lib/content";

export default function HomePage() {
  const [featured, ...supporting] = getTestimonials(["crystal-h", "erica-r", "ericka-g"]);
  return (
    <>
      <Hero />

      {/* Trust bar */}
      <section className="border-y border-forest-100 bg-cream/60">
        <div className="container-page grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <Icon className="h-6 w-6 text-forest-500" />
                <p className="mt-2 font-display text-2xl font-semibold text-forest-800">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-xs text-ink/60">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

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
                src="/images/photo-3.jpg"
                alt="Young students working together in a small skill-based group"
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
            <div className="relative aspect-[4/3] overflow-hidden rounded-4xl shadow-soft">
              <Image
                src="/images/photo-2.jpg"
                alt="A focused learning environment at Kairos APEX"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
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

      {/* Testimonials preview */}
      <section className="bg-sand/60 py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="From our families"
            title="A community that shows up for kids"
          />
          <div className="mt-12 grid gap-10 lg:grid-cols-5 lg:items-start">
            <Reveal className="lg:col-span-3">
              <Quote className="h-10 w-10 text-forest-300" />
              <blockquote className="mt-4 font-display text-2xl leading-snug text-forest-900 sm:text-3xl">
                “{featured.pull}”
              </blockquote>
              <p className="mt-5 text-sm font-semibold text-forest-800">
                {featured.author}{" "}
                <span className="font-normal text-ink/60">· {featured.role}</span>
              </p>
            </Reveal>
            <div className="space-y-6 border-t border-forest-200 pt-6 lg:col-span-2 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              {supporting.map((t, i) => (
                <Reveal key={t.id} delay={i * 0.08 + 0.1}>
                  <blockquote className="text-base leading-relaxed text-ink/80">
                    “{t.pull}”
                  </blockquote>
                  <p className="mt-2 text-sm font-semibold text-forest-800">
                    {t.author} <span className="font-normal text-ink/60">· {t.role}</span>
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="mt-10 text-center">
            <Link href="/testimonials" className="btn-outline">
              Read more stories
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
