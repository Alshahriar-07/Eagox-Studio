import type { Metadata } from "next";
import { PageTransition } from "@/components/motion/PageTransition";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { pageOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Eagox Studio about websites, web apps, desktop software or Android applications.",
  alternates: { canonical: "/contact" },
  openGraph: pageOpenGraph({
    title: "Contact",
    description:
      "Contact Eagox Studio about websites, web apps, desktop software or Android applications.",
    path: "/contact",
  }),
};

/** Contact page per 10-CONTACT-ORDER.md. */
export default function ContactPage() {
  return (
    <PageTransition>
      <Section name="contact-intro" className="page-top">
        <Container>
          <SectionHeading kicker="Contact" level={1}>
            Get in touch
          </SectionHeading>
          <p className="page-intro text-secondary">
            Questions about a product, scope or pricing — send a message and
            the studio replies by email.
          </p>
        </Container>
      </Section>

      <Section name="contact-form" className="section-tight">
        <Container>
          <div className="form-layout">
            <ContactForm />
          </div>
        </Container>
      </Section>
    </PageTransition>
  );
}
