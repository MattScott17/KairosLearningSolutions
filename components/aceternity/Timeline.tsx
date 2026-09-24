"use client";

// Adapted from Aceternity UI "Timeline" (https://ui.aceternity.com/components/timeline),
// free tier. Changes: framer-motion import, brand colors, no built-in page header,
// ResizeObserver so the progress line tracks height as images load, reduced motion
// shows the full line, and step titles are real headings on every screen size.

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export type TimelineItem = {
  title: string;
  content: ReactNode;
};

export function Timeline({ items }: { items: TimelineItem[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const [height, setHeight] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setHeight(el.getBoundingClientRect().height));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 30%", "end 60%"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], [0, height]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);

  return (
    <ol ref={listRef} className="relative">
      {items.map((item, i) => (
        <li key={item.title} className="flex justify-start pt-10 first:pt-0 md:gap-10 md:pt-24 md:first:pt-4">
          {/* Sticky marker + title (desktop) */}
          <div className="sticky top-32 z-10 flex flex-col items-center self-start md:w-full md:max-w-xs md:flex-row lg:max-w-sm">
            <div className="absolute left-1 flex h-10 w-10 items-center justify-center rounded-full bg-cream shadow-card ring-1 ring-forest-100">
              <span className="font-display text-sm font-semibold text-forest-800">{i + 1}</span>
            </div>
            <h3 className="hidden pl-20 font-display text-3xl font-semibold text-forest-800 md:block lg:text-4xl">
              {item.title}
            </h3>
          </div>

          <div className="relative w-full pl-16 md:pl-4">
            <h3 className="mb-4 font-display text-2xl font-semibold text-forest-800 md:hidden">
              {item.title}
            </h3>
            {item.content}
          </div>
        </li>
      ))}

      {/* Track + scroll-linked progress line */}
      <div
        aria-hidden
        style={{ height }}
        className="absolute left-6 top-0 w-[2px] overflow-hidden bg-gradient-to-b from-transparent via-forest-200 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_8%,black_92%,transparent_100%)]"
      >
        <motion.div
          style={reduce ? { height } : { height: lineHeight, opacity: lineOpacity }}
          className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-gold-500 via-forest-500 to-transparent"
        />
      </div>
    </ol>
  );
}
