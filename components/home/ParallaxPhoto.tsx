"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Photo } from "@/lib/photos";
import { useIsDesktop } from "@/lib/useIsDesktop";
import { cn } from "@/lib/utils";

/**
 * A photo that drifts gently against the page scroll (desktop only).
 * Phones and reduced-motion visitors get a still photo.
 */
export function ParallaxPhoto({
  photo,
  sizes,
  className,
  distance = 40,
}: {
  photo: Photo;
  sizes: string;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const desktop = useIsDesktop();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  const active = desktop && !reduce;

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className={cn("absolute inset-0", active && "will-change-transform")}
        style={active ? { y, scale: 1.12 } : undefined}
      >
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="object-cover" />
      </motion.div>
    </div>
  );
}
