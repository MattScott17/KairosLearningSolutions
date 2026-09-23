import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/CTASection";
import { homeschoolPricing, registrationFees, services } from "@/lib/content";
import { site } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== slug);

  return (
    <>
      <PageHero eyebrow="Services" title={service.title} intro={service.summary}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/contact" className="btn-accent">
            {service.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={site.phoneHref}
            className="btn-outline border-cream text-cream hover:bg-cream hover:text-forest-800"
          >
            <Phone className="h-4 w-4" />
            {site.phone}
          </a>
        </div>
      </PageHero>

      {/* Highlights */}
      <section className="border-b border-forest-100 bg-cream">
        <div className="container-page grid grid-cols-1 divide-y divide-forest-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {service.highlights.map((h) => (
            <div key={h.label} className="py-8 text-center sm:px-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-forest-600">
                {h.label}
              </p>
              <p className="mt-2 font-display text-xl font-semibold text-forest-800">{h.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Details */}
      <Section container="narrow">
        <span className="eyebrow">
          <span className="h-px w-6 bg-gold-500" aria-hidden />
          How it works
        </span>
        <h2 className="mt-3 text-3xl font-semibold">What to expect</h2>
        <ul className="mt-8 space-y-4">
          {service.details.map((detail, i) => (
            <Reveal as="li" key={detail} delay={i * 0.06}>
              <div className="flex items-start gap-4 rounded-2xl border border-forest-100 bg-cream p-5 shadow-card">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-forest-500" />
                <p className="text-ink/85">{detail}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        {slug === "homeschool-support" && (
          <div className="mt-10 overflow-x-auto rounded-3xl border border-forest-100 bg-cream shadow-card">
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr className="border-b border-forest-100 text-left">
                  <th className="p-4 font-semibold text-forest-800">Hours / month</th>
                  {(Object.keys(homeschoolPricing.levels) as (keyof typeof homeschoolPricing.levels)[]).map(
                    (level) => (
                      <th key={level} className="p-4 font-semibold text-forest-800">
                        Level {level}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {homeschoolPricing.hoursPerMonth.map((hours, i) => (
                  <tr key={hours} className={i % 2 === 1 ? "bg-sand/30" : ""}>
                    <td className="p-4 text-ink/70">{hours} hrs</td>
                    {(
                      Object.keys(homeschoolPricing.levels) as (keyof typeof homeschoolPricing.levels)[]
                    ).map((level) => (
                      <td key={level} className="p-4 font-medium text-forest-800">
                        ${homeschoolPricing.levels[level][i].toLocaleString()}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {(slug === "homeschool-support" || slug === "private-tutoring") && (
          <div className="mt-6 rounded-2xl border border-forest-100 bg-sand/30 p-5">
            <h3 className="text-sm font-semibold text-forest-800">Registration fees</h3>
            <dl className="mt-3 space-y-2">
              {registrationFees.map((fee) => (
                <div key={fee.label} className="flex justify-between gap-4 text-sm">
                  <dt className="text-ink/60">{fee.label}</dt>
                  <dd className="text-right font-medium text-forest-800">{fee.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        <Link
          href="/services"
          className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-forest-700"
        >
          <ArrowLeft className="h-4 w-4" />
          All services
        </Link>
      </Section>

      {/* Other services */}
      <section className="bg-sand/60 py-16">
        <div className="container-page">
          <h2 className="text-2xl font-semibold">Explore other services</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/services/${other.slug}`}
                className="group flex items-center gap-4 rounded-3xl bg-cream p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-soft"
              >
                <div>
                  <p className="font-semibold text-forest-800">{other.title}</p>
                  <p className="text-sm text-ink/60">{other.short}</p>
                </div>
                <ArrowRight className="ml-auto h-5 w-5 text-forest-400 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
