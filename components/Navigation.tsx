"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { mainNav, site } from "@/lib/site";

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => {
    setMobileOpen(false);
    setServicesOpen(false);
  };

  // Lock body scroll when the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // The home hero is light, so a transparent bar reads well there. Every other
  // page opens on a dark hero, so keep the header solid for legible contrast.
  const isHome = pathname === "/";
  const solid = scrolled || mobileOpen || !isHome;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? "bg-cream/95 shadow-card backdrop-blur" : "bg-transparent"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between sm:h-20">
        <Logo />

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) =>
            item.children ? (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-forest-800"
                      : "text-ink/75 hover:text-forest-800"
                  }`}
                >
                  {item.label}
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </Link>
                <div className="invisible absolute left-0 top-full w-72 translate-y-2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="overflow-hidden rounded-2xl border border-forest-100 bg-cream p-2 shadow-soft">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-forest-50"
                      >
                        <span className="block text-sm font-semibold text-forest-800">
                          {child.label}
                        </span>
                        {child.description && (
                          <span className="mt-0.5 block text-xs text-ink/60">
                            {child.description}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-forest-800"
                      : "text-ink/75 hover:text-forest-800"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={site.phoneHref} className="btn-ghost text-sm">
            <Phone className="h-4 w-4" />
            {site.phone}
          </a>
          <Link href="/apex" className="btn-primary">
            Enroll in APEX
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-forest-800 hover:bg-forest-50 lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="bg-cream lg:hidden">
          <div className="container-page flex min-h-[calc(100dvh-4rem)] flex-col overflow-y-auto pb-8 pt-2">
            <ul className="flex flex-col gap-1">
              {mainNav.map((item) =>
                item.children ? (
                  <li key={item.href}>
                    <button
                      type="button"
                      onClick={() => setServicesOpen((v) => !v)}
                      className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-medium text-ink/80"
                      aria-expanded={servicesOpen}
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {servicesOpen && (
                      <div className="ml-2 flex flex-col gap-1 border-l-2 border-forest-100 pl-3">
                        <Link
                          href={item.href}
                          onClick={closeMobile}
                          className="rounded-lg px-4 py-2.5 text-sm font-medium text-forest-800"
                        >
                          All Services
                        </Link>
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={closeMobile}
                            className="rounded-lg px-4 py-2.5 text-sm text-ink/70"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMobile}
                      className={`block rounded-xl px-4 py-3 text-base font-medium ${
                        isActive(item.href) ? "text-forest-800" : "text-ink/80"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
            <div className="mt-5 flex flex-col gap-3">
              <a href={site.phoneHref} className="btn-outline w-full">
                <Phone className="h-4 w-4" />
                {site.phone}
              </a>
              <Link href="/apex" onClick={closeMobile} className="btn-primary w-full">
                Enroll in APEX
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
