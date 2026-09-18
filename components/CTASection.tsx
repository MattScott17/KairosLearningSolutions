import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "./ui/Reveal";

type CTASectionProps = {
  title?: string;
  intro?: string;
  primaryLabel?: string;
  primaryHref?: string;
};

export function CTASection({
  title = "Let's find the right fit for your student",
  intro = "Every family is different. Tell us a little about your student and we'll help you find the best path — a tutor, a program, or a plan of your own.",
  primaryLabel = "Get in touch",
  primaryHref = "/contact",
}: CTASectionProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-4xl bg-forest-800 px-6 py-14 text-center text-cream shadow-soft sm:px-12 sm:py-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 0%, rgba(174,213,129,0.6), transparent 45%), radial-gradient(circle at 90% 100%, rgba(224,162,60,0.5), transparent 45%)",
            }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-semibold text-cream sm:text-4xl">{title}</h2>
            <p className="mt-4 text-lg text-cream/80">{intro}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href={primaryHref} className="btn-accent w-full sm:w-auto">
                {primaryLabel}
              </Link>
              <a href={site.phoneHref} className="btn-outline w-full border-cream text-cream hover:bg-cream hover:text-forest-800 sm:w-auto">
                <Phone className="h-4 w-4" />
                {site.phone}
              </a>
            </div>
            <a
              href={site.emailHref}
              className="mt-5 inline-flex items-center gap-2 text-sm text-cream/70 transition-colors hover:text-cream"
            >
              <Mail className="h-4 w-4" />
              {site.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
