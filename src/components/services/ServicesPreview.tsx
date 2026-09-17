import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceCard } from "./ServiceCard";
import { services } from "@/data/services";

/** Homepage services preview — the four documented categories (06-HOME-PAGE.md). */
export function ServicesPreview() {
  return (
    <Section name="services-preview">
      <Container>
        <Reveal>
          <SectionHeading kicker="What we build">
            Four product lines. One studio.
          </SectionHeading>
        </Reveal>
        <div className="services-grid">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.08} size="sm">
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
