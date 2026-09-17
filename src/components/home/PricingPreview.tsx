import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { services } from "@/data/services";

/**
 * Homepage pricing preview per 06-HOME-PAGE.md: the four documented
 * starting prices, clearly labeled as starting prices, linked to Services/Order.
 * No fake package features.
 */
export function PricingPreview() {
  return (
    <Section name="pricing-preview">
      <Container>
        <Reveal>
          <SectionHeading kicker="Starting points">
            Transparent starting prices
          </SectionHeading>
        </Reveal>

        <ul className="pricing-list" role="list">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.06} size="sm" as="li">
              <div className="pricing-row">
                <span className="pricing-row-name">{service.title}</span>
                <span className="pricing-row-dots" aria-hidden="true" />
                <span className="pricing-row-price">
                  {service.startingPrice}
                </span>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.2} className="pricing-actions">
          <p className="text-muted pricing-note">
            All prices are starting prices — final quotes depend on scope and
            requirements.
          </p>
          <div className="hero-ctas">
            <Button href="/services" variant="secondary">
              View Services
            </Button>
            <Button href="/order" variant="primary">
              Start a Project
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
