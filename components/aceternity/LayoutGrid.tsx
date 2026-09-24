"use client";

// Adapted from Aceternity UI "Layout Grid" (https://ui.aceternity.com/components/layout-grid),
// free tier. Changes: next/image, buttons instead of clickable divs, the opened photo is
// fixed to the viewport (the original centres it inside the grid, which lands off-screen
// on phones), Esc / backdrop / close button all dismiss, focus returns to the photo, and
// the page stops scrolling while a photo is open.

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import type { Photo } from "@/lib/photos";
import { cn } from "@/lib/utils";

export type GridPhoto = Photo & { caption?: string };

// Repeating rhythm of wide and narrow tiles on desktop (3 columns).
const span = (i: number) => (i % 4 === 0 || i % 4 === 3 ? "md:col-span-2" : "md:col-span-1");

export function LayoutGrid({ photos }: { photos: GridPhoto[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const transition = reduce ? { duration: 0 } : { type: "spring" as const, bounce: 0.15, duration: 0.5 };

  const close = useCallback(() => {
    // Return focus to the photo that was opened once it's back in the grid.
    if (selected !== null) window.setTimeout(() => triggers.current[selected]?.focus(), 0);
    setSelected(null);
  }, [selected]);

  useEffect(() => {
    if (selected === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [selected, close]);

  const open = selected !== null ? photos[selected] : null;

  return (
    <>
      <div className="grid auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[14rem] sm:gap-4 md:grid-cols-3">
        {photos.map((photo, i) => (
          <div key={photo.src + i} className={cn("relative", span(i))}>
            {selected !== i && (
              <motion.button
                ref={(el) => {
                  triggers.current[i] = el;
                }}
                type="button"
                layoutId={`grid-photo-${i}`}
                transition={transition}
                onClick={() => setSelected(i)}
                aria-label={`Open photo: ${photo.alt}`}
                className="group absolute inset-0 overflow-hidden rounded-3xl shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2"
              >
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.button>
            )}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {open && selected !== null && (
          <div
            key="lightbox"
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-10"
            role="dialog"
            aria-modal="true"
            aria-label={open.alt}
          >
            <motion.div
              className="absolute inset-0 bg-forest-950/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.25 }}
              onClick={close}
            />
            <motion.figure
              layoutId={`grid-photo-${selected}`}
              transition={transition}
              className="relative aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-3xl shadow-soft"
            >
              <Image src={open.src} alt={open.alt} fill sizes="(max-width: 1024px) 95vw, 900px" className="object-cover" />
              {open.caption && (
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-950/85 to-transparent p-5 pt-12 text-sm text-cream sm:p-7 sm:text-base">
                  {open.caption}
                </figcaption>
              )}
            </motion.figure>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close photo"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-cream text-forest-900 shadow-soft sm:right-8 sm:top-8"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
