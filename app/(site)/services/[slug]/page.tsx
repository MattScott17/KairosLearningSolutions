import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata, breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Faq } from "@/components/Faq";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { CTASection } from "@/components/CTASection";
import { apex, earlyLearners, faqs, homeschoolPricing, registrationFees, services } from "@/lib/content";
import { site } from "@/lib/site";
import { FocusCards, type FocusCard } from "@/components/aceternity/FocusCards";
import { photos, programPhotos, type Photo } from "@/lib/photos";

type Params = { slug: string };

const bodyPhotos: Record<string, Photo> = {
  "private-tutoring": photos.homework,
};

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
  const bodyPhoto = bodyPhotos[slug] ?? photos.homework;
  const otherCards: FocusCard[] = [
    ...others.map((o) => ({
      title: o.title,
      detail: o.short,
      href: `/services/${o.slug}`,
      photo: servicePhotos[o.slug] ?? photos.studentsLearning,
    })),
    {
      title: earlyLearners.name,
      detail: `Half-day program, ${earlyLearners.ageRange}`,
      href: "/early-learners",
      photo: programPhotos["/early-learners"],
    },
    {
      title: "APEX",
      detail: `Full-time program, ${apex.gradeRange.toLowerCase()}`,
      href: "/apex",
      photo: programPhotos["/apex"],
    },
  ];

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
          <Link href="/contact" className="btn-accent">
            {service.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={site.phoneHref}
            className="btn-outline"
          >
            <Phone className="h-4 w-4" />
            {site.phone}
          </a>
        </div>
      </PageHero>

      {/* Highlights */}
      <section className="border-b border-forest-100 bg-cream">
        <dl className="container-page grid grid-cols-1 divide-y divide-forest-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {service.highlights.map((h) => (
            <div key={h.label} className="py-7 sm:px-6 sm:first:pl-0">
              <dt className="text-sm text-ink/75">{h.label}</dt>
              <dd className="mt-1 font-display text-xl font-semibold text-forest-800">{h.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Details */}
      <Section>
        {levels.length > 0 && (
          <div className="mb-14">
            <h2 className="text-3xl font-semibold sm:text-4xl">Four levels</h2>
            <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {levels.map((l, i) => (
                <Reveal as="li" key={l.name} delay={i * 0.06} className="rounded-lg border border-forest-100 bg-cream p-6">
                  <p className="font-display text-4xl font-semibold text-gold-500">{l.name}</p>
                  <p className="mt-1 text-sm font-semibold text-forest-800">Level {l.name}</p>
                  <p className="prose-kairos mt-3 text-sm">{l.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        )}

        {steps.length >= 3 ? (
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">How it works</h2>
            <div className="relative mt-8 hidden aspect-[4/5] overflow-hidden rounded-lg lg:block">
              <Image
                src={bodyPhoto.src}
                alt={bodyPhoto.alt}
                fill
                sizes="30vw"
                className="object-cover"
                style={{ objectPosition: bodyPhoto.position }}
              />
            </div>
          </div>
          <ul className="border-t border-forest-200">
            {steps.map((detail, i) => (
              <Reveal
                as="li"
                key={detail}
                delay={Math.min(i, 4) * 0.05}
                className="flex gap-5 border-b border-forest-100 py-5"
              >
                <span aria-hidden className="mt-3 h-2 w-2 shrink-0 rounded-full bg-gold-500" />
                <span className="prose-kairos text-lg">{detail}</span>
              </Reveal>
            ))}
          </ul>
        </div>
        ) : (
          steps.map((note) => (
            <p key={note} className="prose-kairos max-w-2xl text-lg">
              {note}
            </p>
          ))
        )}

        {slug === "homeschool-support" && (
          <div className="mt-12 overflow-x-auto rounded-lg border border-forest-100 bg-cream">
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
          className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-forest-700"
        >
          <ArrowLeft className="h-4 w-4" />
          All programs and prices
        </Link>
      </Section>

      {/* Other programs */}
      <section className="bg-sand/50 py-16 sm:py-24">
        <div className="container-page">
          <h2 className="text-3xl font-semibold">Other programs</h2>
          <div className="mt-8">
            <FocusCards cards={otherCards} />
          </div>
        </div>
      </section>

      <Faq items={service.slug === "private-tutoring" ? faqs.tutoring : faqs.homeschool} />
      <CTASection />
    </>
  );
}
