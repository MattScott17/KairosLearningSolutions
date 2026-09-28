import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { isExternalHref, type BannerSettings } from "@/lib/banner-schema";

export type BannerVariant = "dark" | "light";

/**
 * The announcement card itself; the whole card is the link. Pure, so the /concepts editor
 * can preview it. `light` is a smaller white card for sitting on top of a photo hero.
 */
export function BannerCard({
  banner,
  variant = "dark",
  className,
}: {
  banner: Pick<BannerSettings, "headline" | "buttonText" | "href">;
  variant?: BannerVariant;
  className?: string;
}) {
  const light = variant === "light";
  const external = isExternalHref(banner.href);
  return (
    <div className={cn("container-page", className)}>
      <Link
        href={banner.href}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        className={cn(
          "group flex rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2",
          light
            ? "items-center justify-between gap-4 bg-cream/95 px-4 py-3 text-forest-900 backdrop-blur hover:bg-cream sm:px-5"
            : "flex-col gap-4 bg-forest-900 px-6 py-6 text-cream hover:bg-forest-800 sm:flex-row sm:items-center sm:justify-between sm:px-8"
        )}
      >
        <p
          className={cn(
            "font-display font-semibold leading-tight",
            light ? "text-base sm:text-xl" : "text-2xl sm:text-3xl"
          )}
        >
          {banner.headline}
        </p>
        <span
          className={cn(
            "shrink-0",
            light
              ? "inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700"
              : "btn-accent self-start py-2.5 sm:self-auto"
          )}
        >
          {/* On phones the light card is just the headline and an arrow. */}
          <span className={cn(light && "hidden sm:inline")}>{banner.buttonText}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
    </div>
  );
}
