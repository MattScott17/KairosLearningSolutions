"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * Counts from 0 up to `to` the first time it scrolls into view.
 * The server renders the final number, so it's correct without JS and
 * reduced-motion visitors just see the final value.
 */
export function CountUp({ to, suffix = "", duration = 1.4 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);

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
