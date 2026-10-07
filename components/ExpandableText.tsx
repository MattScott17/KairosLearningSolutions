"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

/** A short preview of long text with a Read more button, so a page of bios stays scannable. */
export function ExpandableText({
  text,
  lines = 3,
  className,
}: {
  text: string;
  /** Lines shown before the button. Text shorter than about this many lines shows no button. */
  lines?: 2 | 3 | 4;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const clamp = lines === 2 ? "line-clamp-2" : lines === 4 ? "line-clamp-4" : "line-clamp-3";
  // Roughly 50 characters fit on a line in the narrow cards this is used in, so anything longer is cut off.
  const long = text.length > lines * 50;
  return (
    <div className={className}>
      <p id={id} className={cn("leading-relaxed text-ink/75", !open && clamp)}>
        {text}
      </p>
      {long && (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
          className="link-underline mt-1 inline-flex min-h-11 items-center text-sm"
        >
          {open ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}
