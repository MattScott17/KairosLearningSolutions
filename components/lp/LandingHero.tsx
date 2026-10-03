import Image from "next/image";
import { Phone, Check } from "lucide-react";
import { NameRing } from "@/components/concepts/NameRing";
import { photos } from "@/lib/photos";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import type { LandingCopy } from "@/lib/landing-content";

const heroPhoto = {
  APEX: photos.threeDPrinting,
  "Private Tutoring": photos.readingTogether,
};

export function LandingHero({ copy }: { copy: LandingCopy }) {
  const photo = heroPhoto[copy.program];
  return (
    <section className="relative overflow-hidden bg-forest-50/60 pb-14 pt-10 sm:pb-20 sm:pt-14">
      <div className="container-page grid items-center gap-10 text-center lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:text-left">
        <Reveal>
          <h1 className="mx-auto max-w-3xl text-4xl lg:mx-0 font-semibold leading-[1.1] sm:text-5xl">
            {copy.headline}
          </h1>
          <p className="prose-kairos mx-auto mt-6 max-w-2xl text-lg lg:mx-0">
            {copy.program === "APEX" ? `${copy.eyebrow}. ` : ""}
            {copy.subhead}
          </p>

          <ul className="mx-auto mt-8 flex max-w-xl flex-col gap-2.5 text-left lg:mx-0">
            {copy.painPoints.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-ink/80">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest-500" />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <a href="#callback" className="btn-primary w-full sm:w-auto">
              {copy.ctaLabel}
            </a>
            <a href={site.phoneHref} className="btn-outline w-full sm:w-auto">
              <Phone className="h-4 w-4" />
              {site.phone}
            </a>
          </div>
        </Reveal>

        <div className="relative mx-auto hidden w-full max-w-sm lg:block lg:max-w-none">
          <NameRing>
            <div className="arch relative aspect-[4/5] overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                loading="lazy"
                sizes="40vw"
                className="object-cover"
              />
            </div>
          </NameRing>
        </div>
      </div>
    </section>
  );
}
