import Image from "next/image";
import type { Photo } from "@/lib/photos";
import { cn } from "@/lib/utils";

// Alternate portrait and landscape frames so the strip doesn't look like a grid.
const widths = ["w-[180px] sm:w-[260px]", "w-[260px] sm:w-[380px]"];

function Frames({ photos, hidden }: { photos: Photo[]; hidden?: boolean }) {
  return (
    <div className={cn("flex gap-4", hidden && "motion-reduce:hidden")} aria-hidden={hidden || undefined}>
      {photos.map((photo, i) => (
        <div
          key={photo.src + i}
          className={cn("relative h-[200px] shrink-0 overflow-hidden rounded-lg sm:h-[280px]", widths[i % 2])}
        >
          <Image
            src={photo.src}
            alt={hidden ? "" : photo.alt}
            fill
            sizes="380px"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

/**
 * A slow, continuous strip of real Kairos photos. Pauses on hover; for reduced-motion
 * visitors it's a normal sideways-scrolling row.
 */
export function PhotoStrip({ photos, className }: { photos: Photo[]; className?: string }) {
  return (
    <div className={cn("group flex overflow-hidden motion-reduce:overflow-x-auto", className)}>
      <div
        className="flex w-max shrink-0 gap-4 animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ ["--marquee-duration" as string]: "70s", ["--marquee-half-gap" as string]: "0.5rem" }}
      >
        <Frames photos={photos} />
        <Frames photos={photos} hidden />
      </div>
    </div>
  );
}
