import type { Metadata } from "next";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact and Directions",
  description:
    "Contact Kairos Learning Solutions at 836 South Main Street, Salinas, CA. Call (831) 500-2520, email jackie@kairoslearningsolutions.com, or send a message.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Contact", path: "/contact" }])} />
      <PageHero
        title="Call, email or visit"
        mark="visit"
        aside={
          <a
            href={site.phoneHref}
            className="block rounded-lg bg-forest-800 p-8 text-cream transition-colors hover:bg-forest-700 sm:p-10"
          >
            <span className="block text-sm text-cream/70">Call us</span>
            <span className="mt-2 block font-display text-3xl font-semibold text-cream sm:text-4xl">
              {site.phone}
            </span>
          </a>
        }
        intro={`The quickest way to reach me is by phone at ${site.phone}. You can also email, use the form below, or stop by ${site.address.street} during open hours.`}
      />

      <section className="py-16 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-5">
          {/* Contact details */}
          <div className="min-w-0 self-start [@media(min-height:760px)_and_(min-width:1024px)]:sticky [@media(min-height:760px)_and_(min-width:1024px)]:top-28 lg:col-span-2">
            <h2 className="text-2xl font-semibold">Phone, email and address</h2>

            <div className="mt-6 space-y-4">
              <a
                href={site.phoneHref}
                className="flex items-center gap-4 rounded-lg border border-forest-100 bg-cream p-5 transition-colors hover:border-forest-300"
              >
                <span>
                  <span className="block text-sm text-ink/75">Phone</span>
                  <span className="text-lg font-semibold text-forest-800">{site.phone}</span>
                </span>
              </a>

              <a
                href={site.emailHref}
                className="flex items-center gap-4 rounded-lg border border-forest-100 bg-cream p-5 transition-colors hover:border-forest-300"
              >
                <span className="min-w-0">
                  <span className="block text-sm text-ink/75">Email</span>
                  <span className="block truncate text-lg font-semibold text-forest-800">
                    {site.email}
                  </span>
                </span>
              </a>

              <a
                href={site.address.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-lg border border-forest-100 bg-cream p-5 transition-colors hover:border-forest-300"
              >
                <span>
                  <span className="block text-sm text-ink/75">Address</span>
                  <span className="text-base font-semibold text-forest-800">
                    {site.address.street}, {site.address.city}, {site.address.state}{" "}
                    {site.address.zip}
                  </span>
                </span>
              </a>
            </div>

            {/* Hours */}
            <div className="mt-8 rounded-lg border border-forest-100 bg-sand/50 p-5">
              <h3 className="font-semibold text-forest-800">Hours</h3>
              <dl className="mt-3 space-y-1.5 text-sm">
                {site.hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-4">
                    <dt className="text-ink/70">{h.day.replace(" – ", " to ")}</dt>
                    <dd className="font-medium text-ink">{h.time.replace(" – ", " to ")}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Form */}
          <div className="min-w-0 lg:col-span-3">
            <div className="rounded-lg border border-forest-100 bg-cream p-6 sm:p-8">
              <h2 className="text-2xl font-semibold">Send a message</h2>
              <p className="prose-kairos mt-2 text-sm">
                Tell me a little about your student and I&apos;ll get back to you by email or phone.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map: the embed can be blocked or slow, so the link below always works */}
      <section aria-label="Map to Kairos Learning Solutions" className="pb-16 sm:pb-24">
        <div className="container-page">
          <div className="overflow-hidden rounded-lg border border-forest-100 bg-sand">
            <iframe
              title="Map to Kairos Learning Solutions"
              src={site.address.embedUrl}
              width="100%"
              height="320"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block min-h-[260px] w-full sm:min-h-[420px]"
            />
          </div>
          <p className="mt-4 text-sm text-ink/70">
            <a
              href={site.address.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline w-full sm:w-auto"
            >
              Open in Google Maps
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
