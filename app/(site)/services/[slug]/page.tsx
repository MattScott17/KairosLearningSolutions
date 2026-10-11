import type { Metadata } from "next";
import { pageMetadata, breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Faq } from "@/components/Faq";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { CTASection } from "@/components/CTASection";
import { faqs, getProgramList, homeschoolPricing, registrationFees, services } from "@/lib/content";
import { site } from "@/lib/site";
import { photos, type Photo } from "@/lib/photos";

type Params = { slug: string };

const servicePhotos: Record<string, Photo> = {
  "private-tutoring": photos.readingTogether,
  "homeschool-support": photos.studentsLearning,
};

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
  return pageMetadata({
    title: `${service.title} in Salinas`,
    description: service.summary,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== slug);
  // Homeschool lists Level A to D first; show those as cards and number the rest.
  const levelRe = /^Level ([A-D]): /;
  const levels = service.details
    .filter((d) => levelRe.test(d))
    .map((d) => {
      const body = d.replace(levelRe, "");
      return { name: d.match(levelRe)![1], body: body.charAt(0).toUpperCase() + body.slice(1) };
    });
  const steps = service.details.filter((d) => !levelRe.test(d));
  const otherPrograms = getProgramList().filter((p) => p.href !== `/services/${slug}`);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
          serviceJsonLd({
            name: `${service.title} in Salinas`,
            description: service.summary,
            path: `/services/${service.slug}`,
          }),
        ]}
      />
      <PageHero
        title={service.title}
        mark={service.title.split(" ").pop()}
        intro={service.summary}
        photo={servicePhotos[slug] ?? photos.studentsLearning}
        variant="card"
        tone="cream"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={site.phoneHref} className="btn-accent">
            <Phone className="h-4 w-4" />
            Call {site.phone}
          </a>
          <Link href="/contact" className="btn-outline">
            Interest form
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </PageHero>

      {/* Highlights (tutoring only: homeschool says the same in its hero and levels) */}
      {slug === "private-tutoring" && (
        <section className="border-b border-forest-100 bg-cream">
          <dl className="container-page grid grid-cols-1 divide-y divide-forest-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {service.highlights.map((h) => (
              <div key={h.label} className="flex items-baseline justify-between gap-4 py-4 sm:block sm:px-6 sm:py-7 sm:first:pl-0">
                <dt className="text-sm text-ink/80">{h.label}</dt>
                <dd className="font-display text-xl font-semibold text-forest-800 sm:mt-1">{h.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* Details */}
      <Section>
        {levels.length > 0 && (
          <div className="mb-14">
            <h2 className="text-3xl font-semibold sm:text-4xl">Four levels</h2>
            <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {levels.map((l, i) => (
                <li key={l.name} className="rounded-lg border border-forest-100 bg-cream p-6">
                  <p className="font-display text-xl font-semibold text-forest-900">Level {l.name}</p>
                  <p className="mt-2 text-base leading-relaxed text-ink">{l.body}</p>
                </li>
              ))}
            </ol>
          </div>
        )}

        {steps.length >= 3 ? (
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold sm:text-4xl">How it works</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink">{steps[0]}</p>
          <ol className="mt-6 space-y-5">
            {[
              `Call ${site.phone} or fill out the interest form.`,
              ...steps.slice(1),
            ].map((detail, i) => (
              <li key={detail} className="grid grid-cols-[2.25rem_1fr] items-baseline gap-4">
                <span aria-hidden className="font-display text-4xl font-semibold leading-none text-forest-700">
                  {i + 1}
                </span>
                <span className="text-lg leading-relaxed text-ink">{detail}</span>
              </li>
            ))}
          </ol>
        </div>
        ) : (
          steps.map((note) => (
            <p key={note} className="prose-kairos max-w-2xl text-lg">
              {note}
            </p>
          ))
        )}

        {slug === "homeschool-support" && (
          <div className="mt-12 space-y-4 sm:hidden">
            <h3 className="font-display text-2xl font-semibold text-forest-900">Monthly price by level</h3>
            {(Object.keys(homeschoolPricing.levels) as (keyof typeof homeschoolPricing.levels)[]).map((level) => (
              <details key={level} open={level === "A"} className="group rounded-lg border border-forest-200 bg-cream p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-forest-900 [&::-webkit-details-marker]:hidden">
                  Level {level}
                  <span aria-hidden="true" className="text-xl">
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">&minus;</span>
                  </span>
                </summary>
                <dl className="mt-3 divide-y divide-forest-100 text-base">
                  {homeschoolPricing.hoursPerMonth.map((hours, i) => (
                    <div key={hours} className="flex justify-between gap-4 py-2">
                      <dt className="text-ink/75">{hours} hours a month</dt>
                      <dd className="font-semibold text-forest-800">
                        ${homeschoolPricing.levels[level][i].toLocaleString()}
                      </dd>
                    </div>
                  ))}
                </dl>
              </details>
            ))}
          </div>
        )}

        {slug === "homeschool-support" && (
          <div className="mt-12 hidden overflow-x-auto rounded-lg border border-forest-100 bg-cream sm:block">
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
          <div className="mt-6 max-w-xl rounded-lg border border-forest-100 bg-sand/30 p-5">
            <h3 className="text-sm font-semibold text-forest-800">Registration fees</h3>
            <dl className="mt-3 space-y-2">
              {registrationFees
                .filter((fee) => slug === "homeschool-support" || fee.label.startsWith("Tutor"))
                .map((fee) => (
                <div key={fee.label} className="flex justify-between gap-4 text-sm">
                  <dt className="text-ink/75">{fee.label}</dt>
                  <dd className="whitespace-nowrap text-right font-medium text-forest-800">{fee.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        <Link
          href="/services"
          className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-forest-700"
        >
          <ArrowLeft className="h-4 w-4" />
          All programs and prices
        </Link>
      </Section>

      {/* Other programs */}
      <section className="bg-sand/50 py-12 sm:py-16">
        <div className="container-page">
          <h2 className="text-2xl font-semibold sm:text-3xl">Other programs</h2>
          <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
            {otherPrograms.map((o) => (
              <li key={o.href} className="border-t border-forest-200">
                <Link href={o.href} className="group flex items-baseline justify-between gap-4 py-4">
                  <span className="font-display text-xl font-semibold text-forest-900 group-hover:text-forest-700">
                    {o.name}
                  </span>
                  <span className="text-base text-ink/85">{o.price}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Faq items={service.slug === "private-tutoring" ? faqs.tutoring : faqs.homeschool} />
      <CTASection />
    </>
  );
}
