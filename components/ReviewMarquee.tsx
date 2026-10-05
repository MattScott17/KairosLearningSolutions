"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { testimonials, type Testimonial } from "@/lib/content";
import { cn } from "@/lib/utils";

function ReviewCard({ t }: { t: Testimonial }) {
  return (
    <figure
      className="flex w-[280px] shrink-0 flex-col rounded-lg border border-forest-100 bg-white p-6 sm:w-[380px] sm:p-7"
    >
      <blockquote className="flex-1 text-[0.95rem] leading-relaxed text-ink/85">
        “{t.pull}”
      </blockquote>
      <figcaption className="mt-5 text-sm">
        <span className="font-semibold text-forest-800">{t.author}</span>
        <span className="text-ink/60">
          {" "}
          · {t.role}
          {t.source && <> · {t.source} review</>}
        </span>
      </figcaption>
    </figure>
  );
}

function Row({
  items,
  reverse,
  duration,
  paused,
  fade,
  className,
}: {
  items: Testimonial[];
  reverse?: boolean;
  duration: number;
  paused: boolean;
  fade: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden",
        // Reduced motion: no auto-scroll — the row becomes a normal swipe/scroll row instead.
        "motion-reduce:snap-x motion-reduce:overflow-x-auto",
        className
      )}
    >
      {/* Edge fades are static overlays, not a mask: masking moving content repaints every frame. */}
      <div aria-hidden className={cn("pointer-events-none absolute inset-y-0 left-0 z-10 w-[6%] bg-gradient-to-r to-transparent motion-reduce:hidden", fade)} />
      <div aria-hidden className={cn("pointer-events-none absolute inset-y-0 right-0 z-10 w-[6%] bg-gradient-to-l to-transparent motion-reduce:hidden", fade)} />
      <div
        className={cn(
          "flex w-max shrink-0 gap-6 py-2 animate-marquee will-change-transform group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:px-5",
          reverse && "[animation-direction:reverse]",
          paused && "[animation-play-state:paused]"
        )}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {items.map((t) => (
          <div key={t.id} className="flex snap-start">
            <ReviewCard t={t} />
          </div>
        ))}
        {/* Second copy makes the loop seamless; hidden from assistive tech. */}
        <div aria-hidden className="flex gap-6 motion-reduce:hidden">
          {items.map((t) => (
            <ReviewCard key={`${t.id}-copy`} t={t} />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Two rows of real Google reviews drifting in opposite directions (one row on phones).
 * Pauses on hover/focus, and the visible button lets touch and keyboard users stop it.
 */
export function ReviewMarquee({
  className,
  fade = "from-sand",
}: {
  className?: string;
  /** Tailwind `from-*` class matching the section background behind the row. */
  fade?: string;
}) {
  const [paused, setPaused] = useState(false);
  const half = Math.ceil(testimonials.length / 2);
  const first = testimonials.slice(0, half);
  const second = testimonials.slice(half);

  return (
    <div className={cn("relative", className)}>
      <div className="space-y-6">
        {/* On phones one row carries every review. */}
        <Row items={testimonials} duration={90} paused={paused} fade={fade} className="sm:hidden" />
        <Row items={first} duration={55} paused={paused} fade={fade} className="hidden sm:flex" />
        <Row items={second} duration={70} paused={paused} fade={fade} reverse className="hidden sm:flex" />
      </div>
      <div className="container-page mt-6 flex justify-end motion-reduce:hidden">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="inline-flex h-11 items-center gap-2 rounded-full border border-forest-200 bg-cream px-4 text-sm font-semibold text-forest-800 transition-colors hover:bg-forest-50"
        >
          {paused ? <Play className="h-4 w-4" aria-hidden /> : <Pause className="h-4 w-4" aria-hidden />}
          {paused ? "Play reviews" : "Pause reviews"}
        </button>
      </div>
    </div>
  );
}
