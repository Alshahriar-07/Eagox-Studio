import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

/**
 * Sitemap — indexable public pages only, on the production domain.
 * Excluded: /order (conversion flow, thin standalone content) and
 * /thank-you (noindex utility page). /author is intentionally included —
 * it carries the founder's Person identity.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/projects", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/author", priority: 0.6 },
    { path: "/contact", priority: 0.6 },
  ] as const;

  return routes.map(({ path, priority }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));
}
