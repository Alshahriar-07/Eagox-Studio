import { siteConfig } from "@/data/site";
import { author } from "@/data/author";

/**
 * Global structured data per 14-SEO-ACCESSIBILITY.md.
 * Organization + WebSite only — no fabricated ratings, addresses,
 * statistics or social profiles beyond those documented in
 * info/person-author.md. Rendered as JSON-LD on every page.
 */
export default function StructuredData() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      foundingDate: siteConfig.founded,
      founder: {
        "@type": "Person",
        name: author.name,
        jobTitle: author.role,
        url: siteConfig.founderPortfolioUrl,
        sameAs: [
          author.links.find((link) => link.label === "GitHub")?.url,
          author.links.find((link) => link.label === "LinkedIn")?.url,
        ].filter((url): url is string => Boolean(url)),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
