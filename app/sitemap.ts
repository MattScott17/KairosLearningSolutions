import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/apex",
    "/kairos-kinder",
    "/about",
    "/services",
    "/fall-classes",
    "/summer",
    "/testimonials",
    "/contact",
    ...services.map((s) => `/services/${s.slug}`),
  ];

  const lastModified = new Date("2026-09-18");

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/apex" || route === "/kairos-kinder" ? 0.9 : 0.7,
  }));
}
