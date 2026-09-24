"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
};

/**
 * Fades + lifts children into view once on scroll.
 *
 * Resilience is deliberate: it uses a manually-controlled IntersectionObserver
 * plus a timeout fallback, so content is *guaranteed* to become visible even if
 * the observer never fires (e.g. the element is the last on a tall page, or IO
 * is unavailable).
 *
 * Reduced motion: the same motion element is always rendered (swapping to a
 * plain tag after hydration leaves the server's inline opacity:0 in place), and
 * it simply snaps to visible. `data-reveal` also lets globals.css force it
 * visible for reduced-motion and no-JS visitors.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    io.observe(el);

    // Safety net: never leave content hidden.
    const fallback = window.setTimeout(() => {
      setShown(true);
      io.disconnect();
    }, 1800);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  const MotionTag = motion[as];
  const visible = shown || reduce;

  return (
    <MotionTag
      ref={ref as never}
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={
        reduce ? { duration: 0 } : { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </MotionTag>
  );
}
