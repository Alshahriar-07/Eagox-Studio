import { Container, Section, Button } from "@/components/ui";

/** Custom 404 per Eagox-Studio-plan/02-SITE-ARCHITECTURE.md. */
export default function NotFound() {
  return (
    <Section name="not-found" className="not-found">
      <Container>
        <p className="text-label">Error 404</p>
        <h1 className="text-display">Page not found</h1>
        <p className="text-secondary">
          The page you are looking for does not exist or has moved.
        </p>
        <div className="not-found-actions">
          <Button href="/" variant="primary">
            Back to Home
          </Button>
          <Button href="/contact" variant="ghost">
            Contact
          </Button>
        </div>
      </Container>
    </Section>
  );
}
