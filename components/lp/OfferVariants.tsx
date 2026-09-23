import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { CallbackForm } from "@/components/lp/CallbackForm";
import {
  CtaPair,
  FaqList,
  ForNotFor,
  FormBlock,
  Headline,
  ObstacleFix,
  OfferStack,
  PriceLine,
  Proof,
  RiskReversal,
  SectionTitle,
} from "@/components/lp/OfferBlocks";
import { site } from "@/lib/site";
import {
  programOffers,
  variantSlugs,
  type ProgramOffer,
  type ProgramSlug,
  type VariantSlug,
} from "@/lib/landing-variants";

// The three offer-first landing layouts. Same offer data, different order of
// persuasion: A sells the whole offer, B handles objections first, C gets the
// form in front of the thumb immediately.

const band = "py-14 sm:py-20";
// Single column on phones; text + media side by side on desktop.
const heroGrid = "container-narrow lg:grid lg:max-w-6xl lg:grid-cols-2 lg:items-center lg:gap-14";

function HeroPhoto({
  offer,
  priority = false,
  className = "",
}: {
  offer: ProgramOffer;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative aspect-[4/3] overflow-hidden rounded-3xl shadow-soft ${className}`}>
      <Image
        src={offer.photo.src}
        alt={offer.photo.alt}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 560px"
        className="object-cover"
      />
    </div>
  );
}

function CheckList({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li
          key={item}
          className={`flex gap-3 text-[0.95rem] font-medium ${dark ? "text-cream" : "text-ink/85"}`}
        >
          <Check
            className={`mt-0.5 h-5 w-5 shrink-0 ${dark ? "text-gold-400" : "text-forest-600"}`}
            strokeWidth={3}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** A — Grand Slam Offer: dream outcome, full stack, qualify, reverse risk. */
export function OfferVariant({ offer }: { offer: ProgramOffer }) {
  const hero = offer.heroes.a;
  return (
    <>
      <section className="bg-forest-950 pb-14 pt-10 text-cream sm:pb-20 sm:pt-16">
        <div className={heroGrid}>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-400">
              {hero.eyebrow}
            </p>
            <Headline hero={hero} className="mt-4 text-cream" />
            <p className="mt-5 text-lg leading-relaxed text-cream/85">{hero.subhead}</p>
            <CtaPair offer={offer} dark className="mt-7" />
            <div className="mt-9">
              <CheckList items={offer.quickBullets} dark />
            </div>
          </div>
          <HeroPhoto offer={offer} priority className="mt-9 lg:mt-0" />
        </div>
      </section>

      <section className={band}>
        <div className="container-narrow">
          <OfferStack offer={offer} />
          <CtaPair offer={offer} className="mt-8" />
        </div>
      </section>

      <section className={`bg-sand/60 ${band}`}>
        <div className="container-narrow">
          <SectionTitle eyebrow="Be honest" title="Is this right for your family?" />
          <div className="mt-8">
            <ForNotFor offer={offer} />
          </div>
          <div className="mt-6">
            <RiskReversal offer={offer} />
          </div>
        </div>
      </section>

      <section className={band}>
        <div className="container-page">
          <Proof offer={offer} />
        </div>
      </section>

      <section className={`bg-sand/60 ${band}`}>
        <div className="container-narrow">
          <FormBlock offer={offer} />
        </div>
      </section>

      <section className={band}>
        <div className="container-narrow">
          <SectionTitle eyebrow="Questions" title="Quick answers" />
          <div className="mt-8">
            <FaqList offer={offer} />
          </div>
        </div>
      </section>
    </>
  );
}

/** B — Problem → Fix: agitate the pain, remove every obstacle, then ask. */
export function ProblemFixVariant({ offer }: { offer: ProgramOffer }) {
  const hero = offer.heroes.b;
  return (
    <>
      <section className="pb-14 pt-8 sm:pb-20 sm:pt-14">
        <div className={heroGrid}>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-forest-600">
              {hero.eyebrow}
            </p>
            <Headline hero={hero} className="mt-4" />
            <p className="mt-5 text-lg leading-relaxed text-ink/80">{hero.subhead}</p>
            <CtaPair offer={offer} className="mt-8" />
          </div>
          <HeroPhoto offer={offer} priority className="hidden lg:block" />
        </div>
      </section>

      <section className={`bg-ink text-cream ${band}`}>
        <div className="container-narrow">
          <SectionTitle eyebrow="Sound familiar?" title="If any of this is your week…" dark />
          <ul className="mt-8 space-y-3">
            {offer.form.painPoints.map((p) => (
              <li
                key={p}
                className="rounded-2xl border border-cream/15 bg-cream/5 p-5 text-[1.05rem] leading-relaxed text-cream/90"
              >
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-8 font-display text-2xl font-semibold leading-snug text-gold-400">
            …it's not a lack of effort. It's the wrong setup. Here's how we fix it.
          </p>
        </div>
      </section>

      <section className={`bg-sand/60 ${band}`}>
        <div className="container-narrow">
          <SectionTitle eyebrow="Every reason it hasn't worked" title="And exactly how we fix it" />
          <div className="mt-8">
            <ObstacleFix offer={offer} />
          </div>
          <CtaPair offer={offer} className="mt-8" />
        </div>
      </section>

      <section className={`bg-forest-900 text-cream ${band}`}>
        <div className={heroGrid}>
          <HeroPhoto offer={offer} className="mb-8 lg:mb-0" />
          <div>
            <SectionTitle
              eyebrow="Why Kairos"
              title={`Helping Salinas families since ${site.foundedYear}`}
              dark
            />
            <div className="mt-6">
              <CheckList items={offer.form.proofPoints} dark />
            </div>
          </div>
        </div>
      </section>

      <section className={band}>
        <div className="container-page">
          <Proof offer={offer} />
          <div className="mt-8">
            <RiskReversal offer={offer} />
          </div>
        </div>
      </section>

      <section className={`bg-sand/60 ${band}`}>
        <div className="container-narrow">
          <FormBlock offer={offer} title="Ready to fix it?" />
        </div>
      </section>

      <section className={band}>
        <div className="container-narrow">
          <SectionTitle eyebrow="Questions" title="Quick answers" />
          <div className="mt-8">
            <FaqList offer={offer} />
          </div>
        </div>
      </section>
    </>
  );
}

/** C — Short & Fast: promise + form above the fold, proof and FAQ below. */
export function ShortVariant({ offer }: { offer: ProgramOffer }) {
  const hero = offer.heroes.c;
  return (
    <>
      <section className="bg-forest-950 pb-12 pt-8 text-cream sm:pb-16 sm:pt-12">
        <div className={heroGrid}>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-400">
              {hero.eyebrow}
            </p>
            <Headline hero={hero} className="mt-3 text-cream" />
            <div className="mt-5">
              <CheckList items={offer.quickBullets} dark />
            </div>
            <p className="mt-6 text-sm text-cream/75">{hero.subhead}</p>
          </div>
          <div className="mt-4 lg:mt-0">
            <CallbackForm copy={offer.form} />
          </div>
        </div>
      </section>

      <section className={band}>
        <div className="container-page">
          <Proof offer={offer} />
        </div>
      </section>

      <section className={`bg-sand/60 ${band}`}>
        <div className="container-narrow">
          <SectionTitle eyebrow="The offer" title="What you get" />
          <div className="mt-6">
            <CheckList items={offer.stack.map((s) => s.title)} />
          </div>
          <PriceLine offer={offer} className="mt-6" />
        </div>
      </section>

      <section className={band}>
        <div className="container-narrow">
          <SectionTitle eyebrow="Questions" title="Quick answers" />
          <div className="mt-8">
            <FaqList offer={offer} />
          </div>
          <Reveal>
            <CtaPair offer={offer} className="mt-10" />
          </Reveal>
        </div>
      </section>
    </>
  );
}

export const variantComponents: Record<VariantSlug, (p: { offer: ProgramOffer }) => React.JSX.Element> = {
  a: OfferVariant,
  b: ProblemFixVariant,
  c: ShortVariant,
};

// Shared by the /lp/{program}/[variant] route files.
export function variantStaticParams() {
  return variantSlugs.map((variant) => ({ variant }));
}

function isVariant(v: string): v is VariantSlug {
  return (variantSlugs as string[]).includes(v);
}

export function variantMetadata(program: ProgramSlug, variant: string): Metadata {
  const name = program === "apex" ? "APEX" : "Private Tutoring";
  return {
    title: isVariant(variant) ? `${name} — Free Consultation` : name,
    robots: { index: false, follow: false },
  };
}

export function VariantPage({ program, variant }: { program: ProgramSlug; variant: string }) {
  if (!isVariant(variant)) notFound();
  const Variant = variantComponents[variant];
  return <Variant offer={programOffers[program]} />;
}
