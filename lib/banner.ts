import { get } from "@vercel/global-config";
import { unstable_cache } from "next/cache";
import { bannerSchema, defaultBanner, type BannerSettings } from "@/lib/banner-schema";

// Banner settings live in the "kairos-site" Vercel Global Config store so they can be
// changed from /concepts without a redeploy. GLOBAL_CONFIG is its read connection string.
export const BANNER_KEY = "fallBanner";
export const BANNER_TAG = "fall-banner";

const hasStore = () => Boolean(process.env.GLOBAL_CONFIG || process.env.EDGE_CONFIG);

async function readBanner(): Promise<BannerSettings> {
  if (!hasStore()) return defaultBanner;
  try {
    const parsed = bannerSchema.safeParse(await get(BANNER_KEY));
    return parsed.success ? parsed.data : defaultBanner;
  } catch {
    // Never let a config hiccup break the page; fall back to the built-in banner.
    return defaultBanner;
  }
}

/** Cached so pages stay static; saving from /concepts expires the tag. */
export const getBanner = unstable_cache(readBanner, [BANNER_TAG], { tags: [BANNER_TAG] });
