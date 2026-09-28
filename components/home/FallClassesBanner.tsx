import { BannerCard, type BannerVariant } from "@/components/home/BannerCard";
import { getBanner } from "@/lib/banner";

/** The announcement banner, as set on /concepts. Renders nothing when it's switched off. */
export async function FallClassesBanner({
  variant,
  className,
}: {
  variant?: BannerVariant;
  className?: string;
}) {
  const banner = await getBanner();
  if (!banner.enabled) return null;
  return <BannerCard banner={banner} variant={variant} className={className} />;
}
