import { Phone } from "lucide-react";
import { site } from "@/lib/site";

export function StickyCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-forest-100 bg-cream/95 p-3 shadow-soft backdrop-blur sm:hidden">
      <a
        href={site.phoneHref}
        className="btn-primary flex w-full items-center justify-center gap-2"
      >
        <Phone className="h-4 w-4" />
        Call {site.phone}
      </a>
    </div>
  );
}
