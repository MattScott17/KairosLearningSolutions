import type { Metadata } from "next";
import { Clock } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Kairos Learning Solutions in Salinas, CA. Call (831) 500-2520, email us, or send a message and we'll respond within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Let's talk about your student"
        intro="Have a question, want to book a tour, or ready to get started? Reach out however's easiest — we read every message and respond quickly."
      />

      <section className="py-16 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-5">
          {/* Contact details */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold">Reach us directly</h2>
            <p className="prose-kairos mt-3">
              Prefer to call or email? We'd love to hear from you.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={site.phoneHref}
                className="flex items-center gap-4 rounded-2xl border border-forest-100 bg-cream p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-soft"
              >
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-forest-600">
                    Call us
                  </span>
                  <span className="text-lg font-semibold text-forest-800">{site.phone}</span>
                </span>
              </a>

              <a
                href={site.emailHref}
                className="flex items-center gap-4 rounded-2xl border border-forest-100 bg-cream p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-soft"
              >
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-wide text-forest-600">
                    Email us
                  </span>
                  <span className="block truncate text-lg font-semibold text-forest-800">
                    {site.email}
                  </span>
                </span>
              </a>

              <a
                href={site.address.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-forest-100 bg-cream p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-soft"
              >
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-forest-600">
                    Visit us
                  </span>
                  <span className="text-base font-semibold text-forest-800">
                    {site.address.street}, {site.address.city}, {site.address.state}{" "}
                    {site.address.zip}
                  </span>
                </span>
              </a>
            </div>

            {/* Hours */}
            <div className="mt-8 rounded-2xl border border-forest-100 bg-sand/50 p-5">
              <div className="flex items-center gap-2 text-forest-800">
                <Clock className="h-5 w-5" />
                <h3 className="font-semibold">Hours</h3>
              </div>
              <dl className="mt-3 space-y-1.5 text-sm">
                {site.hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-4">
                    <dt className="text-ink/70">{h.day}</dt>
                    <dd className="font-medium text-ink">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-4xl border border-forest-100 bg-cream p-6 shadow-card sm:p-8">
              <h2 className="text-2xl font-semibold">Send us a message</h2>
              <p className="prose-kairos mt-2 text-sm">
                Fill out the form and we'll be in touch within one business day.
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
          <div className="overflow-hidden rounded-4xl border border-forest-100 shadow-card">
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
