"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import type { HeroVideo, Photo } from "@/lib/photos";

/**
 * Full-bleed, muted, looping classroom video behind the hero copy.
 * The optimized poster photo sits underneath and is the LCP image. Playback only
 * starts from JS when motion is allowed, so reduced-motion and no-JS visitors keep
 * the still photo. Without a video file it's simply a photo hero.
 */
export function VideoHero({
  video,
  poster,
  children,
}: {
  video?: HeroVideo;
  poster: Photo;
  children: ReactNode;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) el.pause();
    else el.play().catch(() => {});
  }, [reduce]);

  return (
    <section className="relative flex min-h-[70svh] items-end overflow-hidden bg-forest-950 pt-24 sm:min-h-[90vh]">
      <Image src={poster.src} alt={poster.alt} fill priority sizes="100vw" className="object-cover" />
      {video && (
        <video
          ref={ref}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        >
          {video.webm && <source src={video.webm} type="video/webm" />}
          <source src={video.mp4} type="video/mp4" />
        </video>
      )}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-forest-950/95 via-forest-950/75 to-forest-950/35 sm:from-forest-950/90 sm:via-forest-950/45 sm:to-forest-950/10"
      />
      <div className="container-page relative pb-14 text-cream sm:pb-24">{children}</div>
    </section>
  );
}
