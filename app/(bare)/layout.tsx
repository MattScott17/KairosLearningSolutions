import { Logo } from "@/components/Logo";
import { StickyCallBar } from "@/components/lp/StickyCallBar";

export default function BareLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-forest-800 focus:px-4 focus:py-2 focus:text-cream"
      >
        Skip to content
      </a>
      <header className="container-page flex justify-center py-6">
        <Logo linkToHome={false} />
      </header>
      <main id="main" className="pb-20 sm:pb-0">
        {children}
      </main>
      <StickyCallBar />
    </>
  );
}
