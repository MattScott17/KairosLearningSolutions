"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import type { Photo } from "@/lib/photos";
import { useIsDesktop } from "@/lib/useIsDesktop";
import { cn } from "@/lib/utils";

function Column({
  photos,
  y,
  className,
}: {
  photos: Photo[];
  y?: MotionValue<number>;
  className?: string;
}) {
  return (
    <motion.div className={cn("grid content-start gap-4 sm:gap-6", className)} style={y ? { y } : undefined}>
      {photos.map((photo, i) => (
        <div
          key={photo.src + i}
          className="relative aspect-[4/5] overflow-hidden rounded-lg odd:aspect-[4/3]"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 hover:scale-[1.03]"
          />
        </div>
      ))}
    </motion.div>
  );
}

/**
 * A photo wall whose columns drift at different speeds as the *page* scrolls
 * (no nested scroll box). Phones get two still columns.
 */
export function ParallaxGallery({ photos }: { photos: Photo[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const desktop = useIsDesktop();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const up = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const down = useTransform(scrollYProgress, [0, 1], [-40, 80]);
  const active = desktop && !reduce;

  // Always three columns of data, so server and client markup match. On phones the
  // third column wraps underneath as a two-up row.
  const columns = [0, 1, 2].map((c) => photos.filter((_, i) => i % 3 === c));

  return (
    <div ref={ref} className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
      {columns.map((col, c) => (
        <Column
          key={c}
          photos={col}
          y={active ? (c === 1 ? down : up) : undefined}
          className={c === 2 ? "col-span-2 grid-cols-2 lg:col-span-1 lg:grid-cols-1" : undefined}
        />
      ))}
    </div>
  );
}
