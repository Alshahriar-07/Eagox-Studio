import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

type PageOgOptions = {
  /** Page title (already templated by the root layout — pass the plain title). */
  title: string;
  description: string;
  /** Canonical path, e.g. "/services". */
  path: string;
};

/**
 * Per-page Open Graph metadata (final SEO correction).
 * Uses the supplied Eagox OG asset and resolves absolute URLs against
 * metadataBase (siteConfig.url). Twitter metadata inherits the root card.
 */
export function pageOpenGraph({
  title,
  description,
  path,
}: PageOgOptions): Metadata["openGraph"] {
  return {
    title,
    description,
    url: path,
    siteName: siteConfig.name,
    images: [
      {
        url: "/assets/social/eagox-og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${title}`,
      },
    ],
  };
}
