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

// Repeating rhythm of wide and narrow tiles on desktop (3 columns).
const span = (i: number) => (i % 4 === 0 || i % 4 === 3 ? "md:col-span-2" : "md:col-span-1");

export function LayoutGrid({ photos }: { photos: Photo[] }) {
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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      // The close button is the only control in the dialog, so Tab stays on it.
      if (e.key === "Tab") {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
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
            className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-16 sm:p-16"
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
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
              // Sized to the viewport so tall photos aren't cropped and short screens still fit it.
              className="relative h-[min(80svh,52rem)] w-full max-w-5xl overflow-hidden rounded-3xl bg-forest-950 shadow-soft"
            >
              <Image
                src={open.src}
                alt={open.alt}
                fill
                sizes="(max-width: 1024px) 95vw, 1000px"
                className="object-contain"
              />
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
