"use client";

import { useCallback, useId, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

/** A short preview of long text with a Read more button, so a page of bios stays scannable. */
export function ExpandableText({
  text,
  lines = 3,
  className,
}: {
  text: string;
  /** Lines shown before the button. */
  lines?: 2 | 3 | 4;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const ref = useRef<HTMLParagraphElement>(null);
  const clamp = lines === 2 ? "line-clamp-2" : lines === 4 ? "line-clamp-4" : "line-clamp-3";

  // The button only shows when the text is really cut off at this width, so it never appears over
  // text that already fits and never goes missing over text that doesn't. A resize observer re-checks
  // as the card changes size.
  const subscribe = useCallback((notify: () => void) => {
    const el = ref.current;
    if (!el) return () => {};
    const observer = new ResizeObserver(notify);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const cutOff = useSyncExternalStore(
    subscribe,
    () => (ref.current ? ref.current.scrollHeight > ref.current.clientHeight + 1 : false),
    () => false
  );

  return (
    <div className={className}>
      <p id={id} ref={ref} className={cn("leading-relaxed text-ink/75", !open && clamp)}>
        {text}
      </p>
      {(open || cutOff) && (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
          className="link-underline mt-1 inline-flex min-h-11 items-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600 focus-visible:ring-offset-2"
        >
          {open ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}
