import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/CTASection";
import { services } from "@/lib/content";
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
          <span className="h-px w-6 bg-forest-400" aria-hidden />
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
            {others.map((other) => {
              const Icon = other.icon;
              return (
                <Link
                  key={other.slug}
                  href={`/services/${other.slug}`}
                  className="group flex items-center gap-4 rounded-3xl bg-cream p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-soft"
                >
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-forest-50 text-forest-700 transition-colors group-hover:bg-forest-800 group-hover:text-cream">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="font-semibold text-forest-800">{other.title}</p>
                    <p className="text-sm text-ink/60">{other.short}</p>
                  </div>
                  <ArrowRight className="ml-auto h-5 w-5 text-forest-400 transition-transform group-hover:translate-x-1" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
