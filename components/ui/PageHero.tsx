import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
};

/** Consistent interior-page header used across every non-home page. */
export function PageHero({ eyebrow, title, intro, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-forest-950 to-forest-800 pb-16 pt-32 text-cream sm:pb-20 sm:pt-40">
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl"
        aria-hidden
      />
      <div className="container-page relative">
        <div className="max-w-3xl border-l-2 border-gold-500/40 pl-6">
          {eyebrow && (
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-forest-300">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-4 text-4xl font-semibold text-cream sm:text-5xl">{title}</h1>
          {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/80">{intro}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
