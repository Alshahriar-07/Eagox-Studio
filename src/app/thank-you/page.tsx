import type { Metadata } from "next";
import { PageTransition } from "@/components/motion/PageTransition";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Thank You",
  description:
    "Your project inquiry has been received by Eagox Studio. We will review it and respond through the contact details you provided.",
  robots: { index: false, follow: false },
};

/**
 * Post-submission completion state for the Order flow.
 * Utility page — not in primary navigation and excluded from search
 * indexing. Shows only documented facts: no response-time promises,
 * no invented contact details.
 */
export default function ThankYouPage() {
  return (
    <PageTransition>
      <Section name="thank-you" className="page-top thank-you-section">
        <Container>
          <Reveal>
            <GlassPanel
              tone="dark"
              blur="lg"
              radius="xl"
              className="thank-you-panel"
            >
              <p className="text-label thank-you-kicker">Inquiry received</p>
              <h1 className="text-display thank-you-title">Thank you.</h1>
              <p className="text-secondary thank-you-text">
                Your project inquiry has been received. The studio will review
                the details you submitted and respond through the contact
                information you provided.
              </p>
              <div className="hero-ctas thank-you-actions">
                <Button href="/" variant="primary">
                  Back to Home
                </Button>
                <Button href="/projects" variant="ghost">
                  Explore Projects
                </Button>
              </div>
            </GlassPanel>
          </Reveal>
        </Container>
      </Section>
    </PageTransition>
  );
}
