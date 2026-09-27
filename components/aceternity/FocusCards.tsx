"use client";

// Adapted from Aceternity UI "Focus Cards" (https://ui.aceternity.com/components/focus-cards),
// free tier. Changes: next/image, cards are links, titles always visible (phones can't hover),
// and the blur-the-others effect only applies on hover-capable desktops.

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { Photo } from "@/lib/photos";
import { cn } from "@/lib/utils";

export type FocusCard = { title: string; detail: string; href: string; photo: Photo };

export function FocusCards({ cards }: { cards: FocusCard[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, i) => (
        <Link
          key={card.title}
          href={card.href}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          className={cn(
            "group relative block h-72 overflow-hidden rounded-lg transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2 md:h-96",
            hovered !== null && hovered !== i && "md:scale-[0.98] md:blur-sm"
          )}
        >
          <Image
            src={card.photo.src}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
            <p className="text-sm text-cream/85">{card.detail}</p>
            <h3 className="mt-1 flex items-center justify-between gap-3 text-2xl font-semibold text-cream">
              {card.title}
              <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
