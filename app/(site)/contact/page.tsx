import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Kairos Learning Solutions at 836 South Main Street, Salinas, CA. Call (831) 500-2520, email jackie@kairoslearningsolutions.com, or send a message.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Call, email or visit"
        intro={`The quickest way to reach me is by phone at ${site.phone}. You can also email, use the form below, or stop by ${site.address.street} during open hours.`}
      />

      <section className="py-16 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-5">
          {/* Contact details */}
          <div className="min-w-0 lg:col-span-2">
            <h2 className="text-2xl font-semibold">Phone, email and address</h2>

            <div className="mt-6 space-y-4">
              <a
                href={site.phoneHref}
                className="flex items-center gap-4 rounded-lg border border-forest-100 bg-cream p-5 transition-colors hover:border-forest-300"
              >
                <span>
                  <span className="block text-sm text-ink/60">Phone</span>
                  <span className="text-lg font-semibold text-forest-800">{site.phone}</span>
                </span>
              </a>

              <a
                href={site.emailHref}
                className="flex items-center gap-4 rounded-lg border border-forest-100 bg-cream p-5 transition-colors hover:border-forest-300"
              >
                <span className="min-w-0">
                  <span className="block text-sm text-ink/60">Email</span>
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
                  <span className="block text-sm text-ink/60">Address</span>
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

      {/* Map */}
      <section aria-label="Map to Kairos Learning Solutions" className="pb-16">
        <div className="container-page">
          <div className="overflow-hidden rounded-lg border border-forest-100">
            <iframe
              title="Map to Kairos Learning Solutions"
              src={site.address.embedUrl}
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}
