import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { HandUnderline } from "@/components/concepts/HandDrawn";
import { NameRing } from "@/components/concepts/NameRing";
import type { Photo } from "@/lib/photos";

/**
 * Header layouts, so interior pages don't all open the same way.
 *  arch     text left, arched photo with the KAIROS ring on the right
 *  flip     the same, photo on the left
 *  card     text left, plain rounded photo on the right
 *  wide     text, then a wide landscape photo underneath
 *  dark     dark green band, text left, rounded photo right
 *  centered text only, centered
 *  plain    text only, left aligned (also used when `aside` replaces the photo)
 */
export type HeroVariant = "arch" | "flip" | "card" | "wide" | "dark" | "centered" | "plain";
export type HeroTone = "green" | "sand" | "cream";

type PageHeroProps = {
  /** Plain text so `mark` can find its phrase. */
  title: string;
  /** Phrase inside `title` that gets the hand-drawn gold underline. */
  mark?: string;
  intro?: ReactNode;
  photo?: Photo;
  variant?: HeroVariant;
  tone?: HeroTone;
  /** Sits where the photo would, e.g. a sign-up card. */
  aside?: ReactNode;
  children?: ReactNode;
};

const tones: Record<HeroTone, string> = {
  green: "bg-forest-50/60",
  sand: "bg-sand",
  cream: "bg-cream border-b border-forest-100",
};

function Title({ title, mark }: { title: string; mark?: string }) {
  const at = mark ? title.indexOf(mark) : -1;
  if (!mark || at < 0) return <>{title}</>;
  return (
    <>
      {title.slice(0, at)}
      <span className="relative inline-block">
        {mark}
        <HandUnderline className="hero-draw absolute -bottom-2 left-0 h-3 w-full text-gold-500 sm:-bottom-3 sm:h-4" />
      </span>
      {title.slice(at + mark.length)}
    </>
  );
}

function ArchPhoto({ photo }: { photo: Photo }) {
  return (
    <div className="hero-pop relative mx-auto w-full max-w-[19rem] sm:max-w-sm lg:max-w-none">
      <NameRing>
        <div className="arch relative aspect-[4/5] overflow-hidden">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            priority
            sizes="(max-width: 1024px) 20rem, 40vw"
            className="object-cover"
            style={{ objectPosition: photo.position }}
          />
        </div>
      </NameRing>
    </div>
  );
}

function RoundedPhoto({ photo, className }: { photo: Photo; className: string }) {
  return (
    <div className={`hero-pop relative overflow-hidden rounded-lg ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 45vw"
        className="object-cover"
        style={{ objectPosition: photo.position }}
      />
    </div>
  );
}

const darkButtons =
  "[&_.btn-outline]:border-cream [&_.btn-outline]:text-cream [&_.btn-outline:hover]:bg-cream [&_.btn-outline:hover]:text-forest-800";

/** Header for every interior page. Shares Concept C's pieces (light green, arches, a hand-drawn
 *  gold underline) but varies the layout from page to page. */
export function PageHero({
  title,
  mark,
  intro,
  photo,
  variant,
  tone = "green",
  aside,
  children,
}: PageHeroProps) {
  const v: HeroVariant = variant ?? (photo ? "arch" : "plain");
  const dark = v === "dark";
  const centered = v === "centered";
  const split = (v === "arch" || v === "flip" || v === "card" || v === "dark") && photo;
  const hasAside = Boolean(aside);

  const text = (
    <div className={centered ? "mx-auto max-w-3xl text-center" : hasAside || split ? "" : "max-w-3xl"}>
      <h1
        className={`hero-rise text-balance text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-[3.25rem] ${
          dark ? "text-cream" : ""
        }`}
      >
        <Title title={title} mark={mark} />
      </h1>
      {intro && (
        <p
          style={{ "--hero-delay": "0.12s" } as CSSProperties}
          className={`hero-rise mt-7 text-lg ${centered ? "mx-auto max-w-2xl" : "max-w-xl"} ${
            dark ? "leading-relaxed text-cream/85" : "prose-kairos"
          }`}
        >
          {intro}
        </p>
      )}
      {children && (
        <div
          style={{ "--hero-delay": "0.24s" } as CSSProperties}
          className={`hero-rise mt-8 ${centered ? "flex justify-center" : ""} ${dark ? darkButtons : ""}`}
        >
          {children}
        </div>
      )}
    </div>
  );

  let body: ReactNode;
  if (split || hasAside) {
    const photoEl =
      v === "card" || v === "dark" ? (
        <RoundedPhoto photo={photo!} className="aspect-[4/3] w-full" />
      ) : photo ? (
        <ArchPhoto photo={photo} />
      ) : null;
    const side = aside ?? photoEl;
    const flip = v === "flip";
    body = (
      <div
        className={`container-page grid items-center gap-10 lg:gap-16 ${
          flip ? "lg:grid-cols-[0.85fr_1.15fr]" : "lg:grid-cols-[1.15fr_0.85fr]"
        }`}
      >
        {flip ? (
          <>
            <div className="order-last lg:order-first">{side}</div>
            {text}
          </>
        ) : (
          <>
            {text}
            {side}
          </>
        )}
      </div>
    );
  } else if (v === "wide" && photo) {
    body = (
      <div className="container-page">
        {text}
        <RoundedPhoto photo={photo} className="mt-10 aspect-[4/3] sm:mt-12 sm:aspect-[21/9]" />
      </div>
    );
  } else {
    body = <div className="container-page">{text}</div>;
  }

  return (
    <section
      className={`overflow-hidden ${
        dark ? "bg-forest-900" : tones[tone]
      } pb-14 pt-28 sm:pb-20 sm:pt-36`}
    >
      {body}
    </section>
  );
}
