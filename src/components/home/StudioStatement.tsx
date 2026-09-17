import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Studio statement per 06-HOME-PAGE.md: Eagox works across web, desktop
 * and Android products. Editorial typography, Cormorant Garamond accents.
 */
export function StudioStatement() {
  return (
    <Section name="studio-statement">
      <Container>
        <Reveal className="statement-block">
          <p className="text-label">The studio</p>
          <p className="statement-text">
            Eagox Studio is a digital product studio. We design, engineer and
            ship software across the{" "}
            <em className="statement-accent">web</em>, the{" "}
            <em className="statement-accent">desktop</em> and{" "}
            <em className="statement-accent">Android</em> — taking products
            from first sketch to working release.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
