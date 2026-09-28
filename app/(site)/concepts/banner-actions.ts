"use server";

import { timingSafeEqual } from "node:crypto";
import { get } from "@vercel/global-config";
import { revalidatePath, updateTag } from "next/cache";
import { BANNER_KEY, BANNER_TAG } from "@/lib/banner";
import { bannerSchema, type BannerSettings } from "@/lib/banner-schema";

export type SaveBannerState = { ok: boolean; message: string; banner?: BannerSettings } | null;

// Kairos's Vercel team; writes go through the Vercel REST API with VERCEL_API_TOKEN.
const TEAM_ID = "team_D9vPGy3iql52dkNsSZvN0jif";
const LOCK_KEY = "bannerPinLock";
const MAX_TRIES = 5;
const LOCK_MS = 15 * 60 * 1000;

type Lock = { fails: number; lockedUntil: number };

/** The store id is the path of the GLOBAL_CONFIG connection string. */
function storeId() {
  const conn = process.env.GLOBAL_CONFIG || process.env.EDGE_CONFIG;
  if (!conn) return null;
  try {
    return new URL(conn).pathname.replace(/^\//, "") || null;
  } catch {
    return null;
  }
}

async function writeItems(items: { key: string; value: unknown }[]) {
  const id = storeId();
  const res = await fetch(`https://api.vercel.com/v1/global-config/${id}/items?teamId=${TEAM_ID}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items: items.map((i) => ({ operation: "upsert", ...i })) }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Global Config write failed: ${res.status}`);
}

function pinMatches(pin: string) {
  const expected = process.env.BANNER_PIN ?? "";
  const a = Buffer.from(pin.padEnd(8));
  const b = Buffer.from(expected.padEnd(8));
  return /^\d{4}$/.test(expected) && a.length === b.length && timingSafeEqual(a, b);
}

export async function saveBanner(_prev: SaveBannerState, formData: FormData): Promise<SaveBannerState> {
  if (!storeId() || !process.env.VERCEL_API_TOKEN || !process.env.BANNER_PIN) {
    return { ok: false, message: "Editing isn't set up yet. Ask Matt to finish the Vercel settings." };
  }

  // A 4-digit PIN is easy to guess by brute force, so lock editing after a few wrong tries.
  const lock: Lock = ((await get(LOCK_KEY).catch(() => null)) as Lock | null) ?? { fails: 0, lockedUntil: 0 };
  if (lock.lockedUntil > Date.now()) {
    const minutes = Math.ceil((lock.lockedUntil - Date.now()) / 60000);
    return { ok: false, message: `Too many wrong PINs. Try again in ${minutes} minute${minutes === 1 ? "" : "s"}.` };
  }

  const pin = String(formData.get("pin") ?? "");
  if (!pinMatches(pin)) {
    const fails = lock.fails + 1;
    const next: Lock = fails >= MAX_TRIES ? { fails: 0, lockedUntil: Date.now() + LOCK_MS } : { fails, lockedUntil: 0 };
    await writeItems([{ key: LOCK_KEY, value: next }]).catch(() => {});
    await new Promise((r) => setTimeout(r, 1000));
    return { ok: false, message: "That PIN isn't right." };
  }

  const parsed = bannerSchema.safeParse({
    enabled: formData.get("enabled") === "on",
    headline: formData.get("headline"),
    buttonText: formData.get("buttonText"),
    href: formData.get("href"),
  });
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0].message };

  try {
    await writeItems([
      { key: BANNER_KEY, value: parsed.data },
      { key: LOCK_KEY, value: { fails: 0, lockedUntil: 0 } },
    ]);
  } catch {
    return { ok: false, message: "Couldn't save just now. Please try again in a minute." };
  }

  // Expire the cached banner and re-render every page that shows it.
  updateTag(BANNER_TAG);
  revalidatePath("/", "layout");
  return {
    ok: true,
    message: parsed.data.enabled ? "Saved. The banner is live." : "Saved. The banner is hidden.",
    banner: parsed.data,
  };
}
