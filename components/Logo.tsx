import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center ${className}`}
      aria-label={`${site.name} — home`}
    >
      <Image
        src="/images/logo.png"
        alt={site.name}
        width={400}
        height={120}
        priority
        className="h-10 w-auto sm:h-11"
      />
    </Link>
  );
}
