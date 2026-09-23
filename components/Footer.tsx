import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { mainNav, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-900 text-cream/80">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <p className="font-display text-2xl font-semibold text-cream">Kairos</p>
            <p className="mt-1 text-sm uppercase tracking-[0.2em] text-forest-300">
              Learning Solutions
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
              Personalized tutoring, homeschool support, and full-time learning in Salinas —
              raising future world changers since {site.foundedYear}.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-forest-800 text-cream transition-colors hover:bg-forest-700"
                aria-label="Kairos on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-forest-800 text-cream transition-colors hover:bg-forest-700"
                aria-label="Kairos on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cream">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-cream">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cream">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/apex" className="transition-colors hover:text-cream">
                  APEX Full-Time Program
                </Link>
              </li>
              <li>
                <Link href="/kairos-kinder" className="transition-colors hover:text-cream">
                  Kairos Kinder
                </Link>
              </li>
              <li>
                <Link href="/services/private-tutoring" className="transition-colors hover:text-cream">
                  Private Tutoring
                </Link>
              </li>
              <li>
                <Link href="/services/homework-club" className="transition-colors hover:text-cream">
                  Homework Club
                </Link>
              </li>
              <li>
                <Link
                  href="/services/homeschool-support"
                  className="transition-colors hover:text-cream"
                >
                  Homeschool Support
                </Link>
              </li>
              <li>
                <Link href="/fall-classes" className="transition-colors hover:text-cream">
                  Enrichment Classes
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cream">Visit Us</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={site.address.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 transition-colors hover:text-cream"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-forest-300" />
                  <span>
                    {site.address.street}
                    <br />
                    {site.address.city}, {site.address.state} {site.address.zip}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-3 transition-colors hover:text-cream"
                >
                  <Phone className="h-4 w-4 shrink-0 text-forest-300" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.emailHref}
                  className="flex items-center gap-3 break-all transition-colors hover:text-cream"
                >
                  <Mail className="h-4 w-4 shrink-0 text-forest-300" />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-forest-800 pt-6 text-xs text-cream/50 sm:flex-row">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>Salinas, California</p>
        </div>
      </div>
    </footer>
  );
}
