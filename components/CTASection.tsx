import Link from "next/link";
import { site } from "@/lib/site";

type CTASectionProps = {
  title?: string;
  intro?: string;
  primaryLabel?: string;
  primaryHref?: string;
};

/** Closing contact band: the phone number big, plus where we are and when we're open. */
export function CTASection({
  title = "Call Jackie",
  intro = "Tell me what's going on with your student. I'll suggest a tutor or a program and tell you what it costs, right on the call.",
  primaryLabel = "Or send a message",
  primaryHref = "/contact",
}: CTASectionProps) {
  return (
    <section className="border-t border-forest-100 bg-sand py-16 sm:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <h2 className="text-3xl font-semibold sm:text-4xl">{title}</h2>
          <p className="prose-kairos mt-4 max-w-xl text-lg">{intro}</p>
          <a
            href={site.phoneHref}
            className="mt-6 inline-block font-display text-4xl font-semibold text-forest-700 underline decoration-forest-300 decoration-2 underline-offset-8 hover:decoration-forest-700 sm:text-5xl"
          >
            {site.phone}
          </a>
          <div className="mt-6">
            <Link href={primaryHref} className="link-underline">
              {primaryLabel}
            </Link>
          </div>
        </div>
        <dl className="grid gap-4 text-sm text-ink/80 sm:grid-cols-2 lg:grid-cols-1">
          <div>
            <dt className="font-semibold text-forest-900">Find us</dt>
            <dd className="mt-1">
              <a href={site.address.mapUrl} className="hover:underline">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-forest-900">Hours</dt>
            <dd className="mt-1">
              {site.hours.map((h) => (
                <span key={h.day} className="block">
                  {h.day.replace(" – ", " to ")}: {h.time.replace(" – ", " to ")}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
