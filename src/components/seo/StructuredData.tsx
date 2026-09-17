import { siteConfig } from "@/data/site";
import { author } from "@/data/author";

/**
 * Global structured data — rendered once per page as the site's canonical
 * identity graph:
 *
 * - Organization (@id …/#organization): Eagox Studio, documented facts only.
 * - Person (@id …/#person): Al Shahriar Sowan, founder — documented facts
 *   only (info/person-author.md), with approved profile links via sameAs.
 * - WebSite (@id …/#website): the site itself.
 *
 * No fabricated ratings, addresses, statistics or social profiles. Page-level
 * graphs (BreadcrumbList) reference these nodes by @id.
 */
export default function StructuredData() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      alternateName: siteConfig.shortName,
      url: siteConfig.url,
      logo: `${siteConfig.url}/assets/branding/eagox-logo-horizontal-white.svg`,
      description: siteConfig.description,
      foundingDate: siteConfig.founded,
      founder: {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: author.name,
        jobTitle: author.role,
        url: siteConfig.founderPortfolioUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: author.name,
      alternateName: author.alternateName ?? undefined,
      jobTitle: author.role,
      description: author.bio[0],
      image: author.imageUrl ?? undefined,
      worksFor: {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
      },
      url: `${siteConfig.url}/author`,
      homeLocation: author.location
        ? { "@type": "Place", name: author.location }
        : undefined,
      sameAs: author.links.map((link) => link.url),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
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
