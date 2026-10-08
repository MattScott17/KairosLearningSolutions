"use client";

import { startTransition, useActionState, useState } from "react";
import { Loader2 } from "lucide-react";
import { BannerCard } from "@/components/home/BannerCard";
import { saveBanner, type SaveBannerState } from "@/app/(site)/landingpages/banner-actions";
import type { BannerSettings } from "@/lib/banner-schema";
import { cn } from "@/lib/utils";

const inputBase =
  "w-full rounded-lg border border-forest-200 bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-forest-500 focus:ring-2 focus:ring-forest-500/30";
const labelBase = "mb-1.5 block text-sm font-medium text-ink/80";

/** PIN-protected form for the site-wide announcement banner, with a live preview. */
export function BannerEditor({ initial }: { initial: BannerSettings }) {
  const [draft, setDraft] = useState(initial);
  const [state, action, pending] = useActionState<SaveBannerState, FormData>(saveBanner, null);
  const set = <K extends keyof BannerSettings>(key: K, value: BannerSettings[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  return (
    <form
      // Submit by hand so React doesn't reset the form after saving; the fields keep what was saved.
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        startTransition(() => action(data));
      }}
      className="grid gap-10 lg:grid-cols-[1fr_1.1fr]"
    >
      <div className="space-y-5">
        <label className="flex min-h-11 items-center gap-3">
          <input type="hidden" name="enabled" value={draft.enabled ? "on" : "off"} />
          <input
            type="checkbox"
            checked={draft.enabled}
            onChange={(e) => set("enabled", e.target.checked)}
            className="h-6 w-6 rounded border-forest-300 accent-forest-800"
          />
          <span className="font-medium text-forest-900">Show the banner on the site</span>
        </label>

        <div>
          <label htmlFor="banner-headline" className={labelBase}>
            Headline
          </label>
          <input
            id="banner-headline"
            name="headline"
            value={draft.headline}
            onChange={(e) => set("headline", e.target.value)}
            maxLength={60}
            required
            className={inputBase}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="banner-button" className={labelBase}>
              Button text
            </label>
            <input
              id="banner-button"
              name="buttonText"
              value={draft.buttonText}
              onChange={(e) => set("buttonText", e.target.value)}
              maxLength={24}
              required
              className={inputBase}
            />
          </div>
          <div>
            <label htmlFor="banner-href" className={labelBase}>
              Button link
            </label>
            <input
              id="banner-href"
              name="href"
              value={draft.href}
              onChange={(e) => set("href", e.target.value)}
              placeholder="/fall-classes"
              required
              className={inputBase}
            />
          </div>
        </div>
        <p className="-mt-2 text-sm text-ink/75">
          Link to a page here, like /fall-classes or /summer, or paste a full https:// address.
        </p>

        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label htmlFor="banner-pin" className={labelBase}>
              PIN
            </label>
            <input
              id="banner-pin"
              name="pin"
              type="password"
              inputMode="numeric"
              autoComplete="off"
              pattern="\d{4}"
              maxLength={4}
              required
              title="4 digits"
              className={cn(inputBase, "w-28 text-center tracking-[0.4em]")}
            />
          </div>
          <button type="submit" disabled={pending} className="btn-primary">
            {pending && <Loader2 className="h-4 w-4 animate-spin" />}
            Save changes
          </button>
          {state && (
            <p role="status" className={cn("basis-full text-sm font-medium", state.ok ? "text-forest-700" : "text-red-700")}>
              {state.message}
            </p>
          )}
        </div>
        <p className="-mt-2 text-sm text-ink/75">
          The PIN is four digits. Ask whoever set up the banner if you do not have it.
        </p>
      </div>

      <div>
        <p className={labelBase}>Preview</p>
        <div className={cn("space-y-6 rounded-lg border border-forest-100 py-6", !draft.enabled && "opacity-40")}>
          <div>
            <p className="px-4 pb-2 text-sm font-medium text-ink/75 sm:px-6">On the live homepage</p>
            <BannerCard banner={draft} variant="slim" className="px-4 sm:px-6" />
          </div>
          <div>
            <p className="px-4 pb-2 text-sm font-medium text-ink/75 sm:px-6">On the older homepage drafts</p>
            <BannerCard banner={draft} className="px-4 sm:px-6" />
          </div>
        </div>
        {!draft.enabled && <p className="mt-2 text-sm text-ink/75">Hidden: the banner won&apos;t show anywhere.</p>}
      </div>
    </form>
  );
}
