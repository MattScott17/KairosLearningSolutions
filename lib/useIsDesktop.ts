"use client";

import { useEffect, useState } from "react";

/**
 * True at ≥1024px (Tailwind `lg`). Starts false so server and first client
 * render match; desktop-only effects switch on after hydration.
 */
export function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return desktop;
}
