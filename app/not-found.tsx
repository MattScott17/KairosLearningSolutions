import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Home, Phone } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { NameRing } from "@/components/concepts/NameRing";
import { HandUnderline } from "@/components/concepts/HandDrawn";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main id="main">
        <section className="overflow-hidden bg-forest-50/60 pb-16 pt-28 sm:pb-24 sm:pt-36">
          <div className="container-page grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <p className="font-display text-7xl font-semibold text-forest-700">404</p>
              <h1 className="mt-4 text-4xl font-semibold leading-[1.1] sm:text-5xl">
                That page{" "}
                <span className="relative inline-block">
                  isn&apos;t here
                  <HandUnderline className="absolute -bottom-2 left-0 h-3 w-full text-gold-500 sm:-bottom-3 sm:h-4" />
                </span>
              </h1>
              <p className="prose-kairos mt-7 max-w-xl text-lg">
                Call me at {site.phone} and I&apos;ll point you the right way, or head back to the
                programs.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/" className="btn-primary">
                  <Home className="h-4 w-4" />
                  Back home
                </Link>
                <a href={site.phoneHref} className="btn-outline">
                  <Phone className="h-4 w-4" />
                  {site.phone}
                </a>
                <Link href="/services" className="btn-ghost">
                  <ArrowLeft className="h-4 w-4" />
                  Browse programs
                </Link>
              </div>
            </div>
            <div className="relative mx-auto hidden w-full max-w-sm lg:block lg:max-w-none">
              <NameRing>
                <div className="arch relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={photos.craftTable.src}
                    alt={photos.craftTable.alt}
                    fill
                    sizes="40vw"
                    className="object-cover"
                  />
                </div>
              </NameRing>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
