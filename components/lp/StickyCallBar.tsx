"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";

// The hero already has its own call and book buttons, so the bar waits until
// the visitor scrolls past them instead of covering them on short phones.
export function StickyCallBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={`sticky-call-bar fixed inset-x-0 bottom-0 z-50 border-t border-forest-100 bg-cream/95 p-3 backdrop-blur transition-transform duration-300 motion-reduce:transition-none sm:hidden ${
        show ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
    >
      <a
        href={site.phoneHref}
        tabIndex={show ? undefined : -1}
        className="btn-primary flex min-h-[44px] w-full items-center justify-center gap-2"
      >
        <Phone className="h-4 w-4" />
        Call {site.phone}
      </a>
    </div>
  );
}
