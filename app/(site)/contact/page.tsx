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
        intro={`Calling is the fastest way to reach me. I'm at ${site.address.street}, Monday to Thursday, 9 AM to 6 PM. You can also fill out the interest form below.`}
      />

      <section className="py-16 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-5">
          {/* Contact details */}
          <div className="order-last min-w-0 self-start lg:order-none [@media(min-height:760px)_and_(min-width:1024px)]:sticky [@media(min-height:760px)_and_(min-width:1024px)]:top-28 lg:col-span-2">
            <h2 className="text-2xl font-semibold">Find us</h2>
            <div className="mt-5 space-y-4 text-base">
              <p>
                <a
                  href={site.address.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline font-semibold"
                >
                  {site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}
                </a>
                <span className="block text-sm text-ink/75">Opens directions</span>
              </p>
              <p>
                <a href={site.emailHref} className="link-underline break-all font-semibold">
                  {site.email}
                </a>
              </p>
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
              <h2 className="text-2xl font-semibold">Interest form</h2>
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
    </>
  );
}
