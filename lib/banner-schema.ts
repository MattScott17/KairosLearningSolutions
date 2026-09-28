import { z } from "zod";

/** The announcement banner at the top of the homepage and concept pages. Shared client/server. */
export const bannerSchema = z.object({
  enabled: z.boolean(),
  headline: z.string().trim().min(1, "Add a headline").max(60, "Keep the headline under 60 characters"),
  buttonText: z.string().trim().min(1, "Add button text").max(24, "Keep the button under 24 characters"),
  // A page on this site ("/fall-classes") or a full web address.
  href: z
    .string()
    .trim()
    .refine((v) => /^\/(?!\/)\S*$/.test(v) || /^https:\/\/\S+$/.test(v), {
      message: 'Use a page like "/fall-classes" or a full address starting with https://',
    }),
});

export type BannerSettings = z.infer<typeof bannerSchema>;

/** Used until the store has been set up, or if it can't be reached. */
export const defaultBanner: BannerSettings = {
  enabled: true,
  headline: "Fall 2026 classes are here",
  buttonText: "See the classes",
  href: "/fall-classes",
};

export const isExternalHref = (href: string) => href.startsWith("https://");
