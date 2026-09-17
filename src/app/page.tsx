import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { ServicesPreview } from "@/components/services/ServicesPreview";
import { SelectedProjects } from "@/components/projects/SelectedProjects";
import { PricingPreview } from "@/components/home/PricingPreview";
import { StudioStatement } from "@/components/home/StudioStatement";
import { FinalCta } from "@/components/home/FinalCta";
import { siteConfig } from "@/data/site";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title:
    "Eagox Studio | Software, Web & Digital Product Development in Bangladesh",
  description:
    "Eagox Studio is a software and digital product studio by Al Shahriar Sowan, building modern websites, web applications, mobile apps and digital solutions in Bangladesh.",
  path: "/",
});

/** Homepage breadcrumb — identity graph (Organization/Person/WebSite) is
 *  rendered globally by StructuredData in the root layout. */
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
    ],
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <ServicesPreview />
      <SelectedProjects />
      <StudioStatement />
      <PricingPreview />
      <FinalCta />
    </>
  );
}
