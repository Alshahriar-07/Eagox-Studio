import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

/**
 * robots.txt — full crawl access for public pages, sitemap declared.
 *
 * Nothing is disallowed: CSS/JS/images live under /_next/static and /assets,
 * which stay crawlable when no rule blocks them. Pages that must stay out of
 * results (/thank-you) use `robots: { index: false }` meta instead —
 * robots.txt disallow would hide the noindex directive from Google.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
