"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

// Matches the .arch shape in globals.css: elliptical top corners (50% wide, 40% tall)
// and 1.75rem feet.
const FOOT = 28;
const TOP_RY = 0.4;

/** Wraps an .arch photo in a ring of "KAIROS" set along the arch's outline. */
export function NameRing({
  children,
  word = "KAIROS",
  gap = 34,
  compactGap = 26,
}: {
  children: ReactNode;
  word?: string;
  /** Width of the band the text sits in, in px. */
  gap?: number;
  /** Band width when the ring is under 400px wide (phones). */
  compactGap?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [length, setLength] = useState(0);
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    // Border box, not contentRect: the SVG covers the padding band too.
    const ro = new ResizeObserver(() => setSize({ w: el.offsetWidth, h: el.offsetHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (pathRef.current) setLength(pathRef.current.getTotalLength());
  }, [size]);

  const compact = size !== null && size.w < 400;
  const band = compact ? compactGap : gap;

  // The text runs down the middle of the band, halfway between the photo and the outer edge.
  let d = "";
  if (size) {
    const inset = band / 2;
    const x0 = inset;
    const x1 = size.w - inset;
    const y0 = inset;
    const y1 = size.h - inset;
    const rx = (x1 - x0) / 2;
    const ry = TOP_RY * (size.h - band * 2) + inset;
    const r = FOOT + inset;
    // Clockwise from the bottom middle so the text reads upright across the top of the arch.
    d = [
      `M ${size.w / 2} ${y1}`,
      `L ${x0 + r} ${y1}`,
      `A ${r} ${r} 0 0 1 ${x0} ${y1 - r}`,
      `L ${x0} ${y0 + ry}`,
      `A ${rx} ${ry} 0 0 1 ${size.w / 2} ${y0}`,
      `A ${rx} ${ry} 0 0 1 ${x1} ${y0 + ry}`,
      `L ${x1} ${y1 - r}`,
      `A ${r} ${r} 0 0 1 ${x1 - r} ${y1}`,
      "Z",
    ].join(" ");
  }

  // Roughly one word plus its dot per 95px (75px compact); textLength then stretches the spacing
  // so the last repeat meets the first with no seam.
  const repeats = Math.max(1, Math.round(length / (compact ? 75 : 95)));
  // Non-breaking spaces, because SVG trims a trailing normal space and the seam would close up.
  const text = Array.from({ length: repeats }, () => `${word}\u00A0•\u00A0`).join("");

  return (
    <div ref={wrapRef} className="relative" style={{ padding: band }}>
      {children}
      {size && (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          viewBox={`0 0 ${size.w} ${size.h}`}
        >
          <path ref={pathRef} id={`ring-${id}`} d={d} fill="none" />
          {length > 0 && (
            <text
              className={`fill-forest-700 font-display font-semibold ${compact ? "text-[10.5px]" : "text-[13px]"}`}
              dominantBaseline="central"
              letterSpacing="0.12em"
            >
              <textPath href={`#ring-${id}`} textLength={length} lengthAdjust="spacing">
                {text}
              </textPath>
            </text>
          )}
        </svg>
      )}
    </div>
  );
}
