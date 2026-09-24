"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import type { Photo } from "@/lib/photos";

export type HeroVideo = { mp4: string; webm?: string };

/**
 * Full-bleed, muted, looping classroom video behind the hero copy.
 * The poster shows instantly (and is the LCP image); reduced-motion visitors
 * get the video paused on its poster. Without a video file it's a still photo hero.
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
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster.src}
          aria-hidden
        >
          {video.webm && <source src={video.webm} type="video/webm" />}
          <source src={video.mp4} type="video/mp4" />
        </video>
      )}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/45 to-forest-950/10"
      />
      <div className="container-page relative pb-14 text-cream sm:pb-24">{children}</div>
    </section>
  );
}
