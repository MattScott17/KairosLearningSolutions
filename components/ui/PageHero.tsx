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
    <section className="relative overflow-hidden bg-forest-900 pb-16 pt-32 text-cream sm:pb-20 sm:pt-40">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(174,213,129,0.5), transparent 45%), radial-gradient(circle at 85% 10%, rgba(224,162,60,0.4), transparent 40%)",
        }}
        aria-hidden
      />
      <div className="container-page relative">
        <div className="max-w-3xl">
          {eyebrow && (
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-forest-300">
              <span className="h-px w-6 bg-forest-300" aria-hidden />
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
