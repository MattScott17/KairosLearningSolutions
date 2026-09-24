"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import type { Photo } from "@/lib/photos";
import { cn } from "@/lib/utils";

export type DayStep = { when: string; title: string; body: string; photo: Photo };

function Step({
  step,
  index,
  onActive,
}: {
  step: DayStep;
  index: number;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  // Active while the step crosses the middle band of the viewport.
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li ref={ref} className="lg:flex lg:min-h-[70vh] lg:items-center">
      <div>
        <p className="text-sm font-semibold text-forest-700">{step.when}</p>
        <h3 className="mt-1 text-2xl font-semibold sm:text-3xl">{step.title}</h3>
        <p className="prose-kairos mt-3 max-w-md text-lg">{step.body}</p>
        {/* Phones: each moment carries its own photo */}
        <div className="arch relative mt-6 aspect-[4/3] overflow-hidden lg:hidden">
          <Image src={step.photo.src} alt={step.photo.alt} fill sizes="90vw" className="object-cover" />
        </div>
      </div>
    </li>
  );
}

/**
 * "A day at Kairos": moments scroll by on the left while a sticky photo on the
 * right cross-fades to match (desktop). On phones each moment shows its own photo.
 */
export function DayScroller({ steps }: { steps: DayStep[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const photo = steps[active].photo;

  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
      <ol className="space-y-14 lg:space-y-0">
        {steps.map((step, i) => (
          <Step key={step.title} step={step} index={i} onActive={setActive} />
        ))}
      </ol>

      <div className="hidden lg:block">
        <div className="sticky top-28 h-[70vh]">
          <div className="arch relative h-full overflow-hidden">
            <AnimatePresence initial={false}>
              <motion.div
                key={photo.src}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: reduce ? 1 : 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image src={photo.src} alt={photo.alt} fill sizes="45vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Progress dots */}
          <div className="absolute -left-8 top-1/2 flex -translate-y-1/2 flex-col gap-2" aria-hidden>
            {steps.map((s, i) => (
              <span
                key={s.title}
                className={cn(
                  "h-2 w-2 rounded-full transition-all duration-300",
                  i === active ? "h-6 bg-gold-500" : "bg-forest-200"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
