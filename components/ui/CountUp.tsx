"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * Counts from 0 up to `to` the first time it scrolls into view.
 * The server renders the final number, so it's correct without JS, reduced-motion
 * visitors just see the final value, and a number already on screen when the page
 * loads is left alone (no flash of "13+" → "0+" → "13+").
 */
export function CountUp({ to, suffix = "", duration = 1.4 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(to);
  // Decided once after hydration: only numbers that start off-screen animate.
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (el && el.getBoundingClientRect().top > window.innerHeight) setArmed(true);
  }, []);

  useEffect(() => {
    if (!armed || !inView || reduce) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [armed, inView, reduce, to, duration]);

  return (
    // Width is reserved for the final number so counting never shifts the layout.
    <span
      ref={ref}
      className="inline-block text-center tabular-nums"
      style={{ minWidth: `${String(to).length + suffix.length}ch` }}
    >
      {value}
      {suffix}
    </span>
  );
}
