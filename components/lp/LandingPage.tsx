import { LandingHero } from "@/components/lp/LandingHero";
import { ProofStrip } from "@/components/lp/ProofStrip";
import { CallbackForm } from "@/components/lp/CallbackForm";
import type { LandingCopy } from "@/lib/landing-content";

// Shared body for all four landing routes (bare + site-chrome, per program).
// The route files differ only in which layout group they live in — this is
// the single source of the actual page content so the nav/no-nav pair for
// each program can never drift apart.
export function LandingPage({ copy }: { copy: LandingCopy }) {
  return (
    <>
      <LandingHero copy={copy} />
      <ProofStrip copy={copy} />
      <section className="py-16">
        <div className="container-page">
          <CallbackForm copy={copy} />
        </div>
      </section>
    </>
  );
}
