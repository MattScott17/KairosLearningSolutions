import { ArrowDown, Check, ChevronDown, Phone, ShieldCheck, X } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { CallbackForm } from "@/components/lp/CallbackForm";
import { TestimonialCards } from "@/components/lp/TestimonialCards";
import { testimonials } from "@/lib/content";
import { site } from "@/lib/site";
import type { ProgramOffer, VariantHero } from "@/lib/landing-variants";

// Building blocks for the offer-first landing variants. Mobile is the design
// target: single column, large type, full-width thumb-sized buttons that go
// sm:w-auto on larger screens.

const bigBtn = "h-14 w-full whitespace-nowrap text-base sm:w-auto sm:px-8";

export function Headline({ hero, className = "" }: { hero: VariantHero; className?: string }) {
  const { headline, highlight } = hero;
  const at = highlight ? headline.indexOf(highlight) : -1;
  return (
    <h1 className={`text-[2.15rem] font-semibold leading-[1.15] sm:text-5xl ${className}`}>
      {at < 0 ? (
        headline
      ) : (
        <>
          {headline.slice(0, at)}
          {/* Gold band drawn shorter than the line box so it never touches the
              lines above/below, even when the highlight wraps. */}
          <mark className="box-decoration-clone bg-transparent bg-[linear-gradient(theme(colors.gold.500),theme(colors.gold.500))] bg-[length:100%_0.9em] bg-[position:0_58%] bg-no-repeat px-1.5 text-ink">
            {highlight}
          </mark>
          {headline.slice(at + highlight!.length)}
        </>
      )}
    </h1>
  );
}

export function CtaPair({
  offer,
  dark = false,
  className = "",
}: {
  offer: ProgramOffer;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a href="#callback" className={`${dark ? "btn-accent" : "btn-primary"} ${bigBtn}`}>
          {offer.form.ctaLabel}
          <ArrowDown className="h-4 w-4" />
        </a>
        <a
          href={site.phoneHref}
          className={`btn-outline ${bigBtn} ${
            dark ? "border-cream/70 text-cream hover:bg-cream hover:text-forest-900" : ""
          }`}
        >
          <Phone className="h-4 w-4" />
          Call {site.phone}
        </a>
      </div>
      <p className={`mt-3 text-xs ${dark ? "text-cream/70" : "text-ink/60"}`}>
        Free · No commitment · Just your name and number
      </p>
    </div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  dark?: boolean;
}) {
  return (
    <div>
      {eyebrow && (
        <p
          className={`text-xs font-bold uppercase tracking-[0.18em] ${
            dark ? "text-gold-400" : "text-forest-600"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-2 text-[1.75rem] font-semibold leading-tight sm:text-4xl ${
          dark ? "text-cream" : ""
        }`}
      >
        {title}
      </h2>
    </div>
  );
}

export function OfferStack({ offer }: { offer: ProgramOffer }) {
  return (
    <div>
      <SectionTitle eyebrow="The offer" title={offer.stackTitle} />
      <ol className="mt-8 space-y-3">
        {offer.stack.map((item, i) => (
          <Reveal key={item.title} delay={Math.min(i, 3) * 0.05}>
            <li className="flex gap-4 rounded-2xl border border-forest-100 bg-cream p-5 shadow-card">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-800 text-sm font-bold text-cream">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold text-forest-900">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink/75">{item.body}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
      <PriceLine offer={offer} className="mt-4" />
    </div>
  );
}

export function PriceLine({ offer, className = "" }: { offer: ProgramOffer; className?: string }) {
  return (
    <div
      className={`rounded-2xl border-2 border-dashed border-forest-800 bg-forest-50 p-5 text-center ${className}`}
    >
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-forest-700">
        {offer.priceLine.label}
      </p>
      <p className="mt-1 font-display text-4xl font-semibold text-forest-900">
        {offer.priceLine.value}
      </p>
      <p className="mt-2 text-sm text-ink/70">{offer.priceLine.note}</p>
    </div>
  );
}

export function RiskReversal({ offer }: { offer: ProgramOffer }) {
  return (
    <div className="flex gap-4 rounded-3xl bg-forest-900 p-6 text-cream">
      <ShieldCheck className="h-9 w-9 shrink-0 text-gold-400" />
      <div>
        <p className="font-display text-xl font-semibold text-cream">{offer.riskReversal.title}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-cream/85">{offer.riskReversal.body}</p>
      </div>
    </div>
  );
}

export function ForNotFor({ offer }: { offer: ProgramOffer }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-3xl border-2 border-forest-500 bg-cream p-6">
        <p className="font-display text-xl font-semibold text-forest-900">This is for you if…</p>
        <ul className="mt-4 space-y-3">
          {offer.forYou.map((line) => (
            <li key={line} className="flex gap-3 text-[0.95rem] text-ink/85">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-forest-600" strokeWidth={3} />
              {line}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-3xl border border-ink/10 bg-sand/60 p-6">
        <p className="font-display text-xl font-semibold text-ink/80">This is not for you if…</p>
        <ul className="mt-4 space-y-3">
          {offer.notForYou.map((line) => (
            <li key={line} className="flex gap-3 text-[0.95rem] text-ink/70">
              <X className="mt-0.5 h-5 w-5 shrink-0 text-ink/40" strokeWidth={3} />
              {line}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ObstacleFix({ offer }: { offer: ProgramOffer }) {
  return (
    <ul className="space-y-4">
      {offer.obstacles.map((o, i) => (
        <Reveal key={o.fear} delay={Math.min(i, 3) * 0.05}>
          <li className="overflow-hidden rounded-3xl bg-cream shadow-card">
            <p className="bg-ink px-5 py-4 font-display text-lg font-semibold leading-snug text-cream">
              {o.fear}
            </p>
            <p className="flex gap-3 px-5 py-4 text-[0.95rem] leading-relaxed text-ink/85">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-forest-600" strokeWidth={3} />
              {o.fix}
            </p>
          </li>
        </Reveal>
      ))}
    </ul>
  );
}

export function FaqList({ offer }: { offer: ProgramOffer }) {
  return (
    <div className="divide-y divide-forest-100 rounded-3xl border border-forest-100 bg-cream">
      {offer.faqs.map((f) => (
        <details key={f.q} className="group px-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold text-forest-900 [&::-webkit-details-marker]:hidden">
            {f.q}
            <ChevronDown className="h-5 w-5 shrink-0 text-forest-600 transition-transform group-open:rotate-180" />
          </summary>
          <p className="pb-5 text-[0.95rem] leading-relaxed text-ink/80">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Proof({ offer }: { offer: ProgramOffer }) {
  const items = offer.testimonialIndexes.map((i) => testimonials[i]).filter(Boolean);
  return (
    <div>
      <SectionTitle eyebrow="Kairos families" title="Don't take our word for it" />
      <div className="mt-8">
        <TestimonialCards items={items} />
      </div>
    </div>
  );
}

export function FormBlock({
  offer,
  title = "Get your free call",
}: {
  offer: ProgramOffer;
  title?: string;
}) {
  return (
    <div>
      <div className="mx-auto max-w-md text-center">
        <h2 className="text-[1.75rem] font-semibold leading-tight sm:text-4xl">{title}</h2>
        <p className="mt-2 text-sm text-ink/70">
          Leave your name and number. We'll call you back — or call us now at{" "}
          <a href={site.phoneHref} className="link-underline">
            {site.phone}
          </a>
          .
        </p>
      </div>
      <div className="mt-6">
        <CallbackForm copy={offer.form} />
      </div>
    </div>
  );
}
