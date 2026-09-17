import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { GlassPanel } from "@/components/glass/GlassPanel";

/** Final CTA per 06-HOME-PAGE.md: "Have something to build?" → Start a project. */
export function FinalCta() {
  return (
    <Section name="final-cta">
      <Container>
        <Reveal>
          <GlassPanel tone="dark" blur="lg" radius="xl" className="final-cta-panel">
            <div className="final-cta-inner">
              <p className="text-label">Start a project</p>
              <h2 className="text-display final-cta-title">
                Have something to build?
              </h2>
              <p className="final-cta-sub text-secondary">
                Tell us what you are making — we will help you ship it.
              </p>
              <div className="hero-ctas">
                <Button href="/order" variant="primary" size="lg">
                  Start a Project
                </Button>
                <Button href="/contact" variant="ghost" size="lg">
                  Contact
                </Button>
              </div>
            </div>
          </GlassPanel>
        </Reveal>
      </Container>
    </Section>
  );
}
