import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

/** Documented routes per Eagox-Studio-plan/02-SITE-ARCHITECTURE.md. */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/projects",
    "/about",
    "/author",
    "/order",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));
}
