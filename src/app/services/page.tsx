import type { Metadata } from "next";
import { PageTransition } from "@/components/motion/PageTransition";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";
import { pageOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description:
    "Websites, web apps, desktop software and Android apps by Eagox Studio. Transparent starting prices in BDT — final quotes depend on scope.",
  alternates: { canonical: "/services" },
  openGraph: pageOpenGraph({
    title: "Services & Pricing",
    description:
      "Websites, web apps, desktop software and Android apps by Eagox Studio. Transparent starting prices in BDT.",
    path: "/services",
  }),
};

/**
 * Services page per Eagox-Studio-plan/07-SERVICES-PAGE.md.
 * Card structure: service → description → starting price → suitable-for → CTA.
 * Prices are always labeled as starting prices; no invented package features.
 */
export default function ServicesPage() {
  return (
    <PageTransition>
      <Section name="services-page" className="page-top">
        <Container>
          <SectionHeading kicker="Services" level={1}>
            What Eagox builds
          </SectionHeading>
          <p className="page-intro text-secondary">
            Four product lines, one standard of engineering. Every engagement
            starts from a documented starting price — final quotes depend on
            scope and requirements.
          </p>
        </Container>
      </Section>

      <Section name="services-list" className="section-tight">
        <Container>
          <ul className="services-page-grid" role="list">
            {services.map((service, index) => (
              <Reveal key={service.slug} as="li" delay={index * 0.06} size="sm">
                <GlassCard className="pricing-card">
                  <div className="pricing-card-body">
                    <p className="text-label">{service.suitableFor}</p>
                    <h2 className="pricing-card-title">{service.title}</h2>
                    <p className="pricing-card-desc text-secondary">
                      {service.description}
                    </p>
                    <p className="pricing-card-price">
                      <span className="service-card-price-label">Starting from</span>
                      <span className="pricing-card-price-value">
                        {service.startingPrice}
                      </span>
                    </p>
                    <p className="pricing-card-note text-muted">
                      Starting price — final pricing depends on scope and
                      requirements.
                    </p>
                    <Button href="/order" variant="primary">
                      Start a Project
                    </Button>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section name="services-custom" className="section-tight">
        <Container>
          <Reveal>
            <div className="services-custom-row">
              <div>
                <h2 className="text-display services-custom-title">
                  Custom scope?
                </h2>
                <p className="text-secondary">
                  Custom projects can receive custom quotes — describe what you
                  are building and we will respond with a fitting estimate.
                </p>
              </div>
              <Button href="/contact" variant="secondary">
                Contact the studio
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "OfferCatalog",
            name: `${siteConfig.name} services`,
            itemListElement: services.map((service, index) => ({
              "@type": "Offer",
              position: index + 1,
              name: service.title,
              priceSpecification: {
                "@type": "PriceSpecification",
                minPrice: service.startingPrice.replace(/[^\d]/g, ""),
                priceCurrency: "BDT",
              },
            })),
          }),
        }}
      />
    </PageTransition>
  );
}
