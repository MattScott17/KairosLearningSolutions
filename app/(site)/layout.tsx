import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-forest-800 focus:px-4 focus:py-2 focus:text-cream"
      >
        Skip to content
      </a>
      <Navigation />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
