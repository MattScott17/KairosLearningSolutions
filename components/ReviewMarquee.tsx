"use client";

import { useState } from "react";
import { Pause, Play, Quote } from "lucide-react";
import { testimonials, type Testimonial } from "@/lib/content";
import { cn } from "@/lib/utils";

// Soft tints rotate across cards so the rows read as individual voices, not a grid.
const tints = [
  "bg-cream border-forest-100",
  "bg-forest-50 border-forest-100",
  "bg-sand/70 border-sand",
  "bg-gold-400/10 border-gold-400/30",
];

function ReviewCard({ t, tint }: { t: Testimonial; tint: string }) {
  return (
    <figure
      className={cn(
        "flex w-[280px] shrink-0 flex-col rounded-3xl border p-6 shadow-card sm:w-[380px] sm:p-7",
        tint
      )}
    >
      <Quote className="h-6 w-6 text-forest-300" aria-hidden />
      <blockquote className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink/85">
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
  offset,
  className,
}: {
  items: Testimonial[];
  reverse?: boolean;
  duration: number;
  paused: boolean;
  offset: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "flex w-max shrink-0 gap-6 py-2 animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]",
          paused && "[animation-play-state:paused]"
        )}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {items.map((t, i) => (
          <ReviewCard key={t.id} t={t} tint={tints[(i + offset) % tints.length]} />
        ))}
        {/* Second copy makes the loop seamless; hidden from assistive tech. */}
        <div aria-hidden className="flex gap-6">
          {items.map((t, i) => (
            <ReviewCard key={`${t.id}-copy`} t={t} tint={tints[(i + offset) % tints.length]} />
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
export function ReviewMarquee({ className }: { className?: string }) {
  const [paused, setPaused] = useState(false);
  const half = Math.ceil(testimonials.length / 2);
  const first = testimonials.slice(0, half);
  const second = testimonials.slice(half);

  return (
    <div className={cn("relative", className)}>
      <div className="space-y-6">
        {/* On phones one row carries every review. */}
        <Row items={testimonials} duration={90} paused={paused} offset={0} className="sm:hidden" />
        <Row items={first} duration={55} paused={paused} offset={0} className="hidden sm:flex" />
        <Row items={second} duration={70} paused={paused} offset={2} reverse className="hidden sm:flex" />
      </div>
      <div className="container-page mt-6 flex justify-end">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="inline-flex h-11 items-center gap-2 rounded-full border border-forest-200 bg-cream px-4 text-sm font-semibold text-forest-800 transition-colors hover:bg-forest-50"
        >
          {paused ? <Play className="h-4 w-4" aria-hidden /> : <Pause className="h-4 w-4" aria-hidden />}
          {paused ? "Play reviews" : "Pause reviews"}
        </button>
      </div>
    </div>
  );
}
