"use client";

import { useState } from "react";

/** Copies the page's full address so it can be pasted into a text or an ad. */
export function CopyLinkButton({ href, name }: { href: string; name: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(new URL(href, window.location.origin).toString());
      setState("copied");
    } catch {
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 2500);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-11 items-center rounded-md px-1 text-sm font-semibold text-forest-800 underline underline-offset-4 hover:text-forest-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600"
    >
      {state === "copied" ? "Link copied" : state === "failed" ? "Could not copy" : "Copy link"}
      <span className="sr-only"> to {name}</span>
    </button>
  );
}
