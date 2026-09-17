import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

/** Owner-supplied branded social asset (1200×630) — not a screenshot. */
const DEFAULT_OG_IMAGE = "/assets/social/eagox-og-image.jpg";

type PageSeoOptions = {
  /**
   * Full page title. Pages embed the brand themselves (e.g.
   * "Eagox Studio Services | …"), so it is rendered as an absolute title —
   * bypassing the root layout's "%s — Eagox Studio" template — and reused
   * verbatim for Open Graph and Twitter.
   */
  title: string;
  description: string;
  /** Canonical path, e.g. "/services". Resolved against metadataBase. */
  path: string;
  /** Optional dedicated social image (absolute path under /public). */
  image?: string;
};

/**
 * Per-page SEO metadata (canonical + Open Graph + Twitter card).
 * Twitter falls back to OG values where omitted — here every field is
 * explicit so crawlers never have to guess.
 */
export function pageSeo({
  title,
  description,
  path,
  image,
}: PageSeoOptions): Metadata {
  const imageUrl = image ?? DEFAULT_OG_IMAGE;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

type BreadcrumbItem = {
  name: string;
  path: string;
};

/**
 * BreadcrumbList JSON-LD node for internal pages. Represents only the real
 * URL hierarchy — no visual breadcrumbs are rendered.
 */
export function breadcrumbSchema(items: readonly BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
