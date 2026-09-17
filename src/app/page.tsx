import type { Metadata } from "next";
import { PageTransition } from "@/components/motion/PageTransition";
import { Hero } from "@/components/hero/Hero";
import { ServicesPreview } from "@/components/services/ServicesPreview";
import { SelectedProjects } from "@/components/projects/SelectedProjects";
import { PricingPreview } from "@/components/home/PricingPreview";
import { StudioStatement } from "@/components/home/StudioStatement";
import { FinalCta } from "@/components/home/FinalCta";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Eagox Studio — We Build Digital Products",
  description:
    "Eagox Studio designs, engineers and ships websites, web apps, desktop software and Android applications. Transparent starting prices — start your project today.",
  alternates: { canonical: "/" },
};

/** Structured data: organization identity for the studio. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/assets/branding/eagox-logo-horizontal-white.svg`,
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <PageTransition>
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
    </PageTransition>
  );
}
