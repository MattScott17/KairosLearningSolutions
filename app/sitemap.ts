import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/content";

// Every indexable page. Registration, landing pages and concept pages are noindex and stay out.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/apex",
    "/early-learners",
    "/about",
    "/services",
    "/fall-classes",
    "/summer",
    "/district-partnerships",
    "/contact",
    ...services.map((s) => `/services/${s.slug}`),
  ];

  return routes.map((route) => ({ url: `${site.url}${route}` }));
}
