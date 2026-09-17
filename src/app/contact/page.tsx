import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { pageSeo, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title: "Contact Eagox Studio | Start a Software or Web Project",
  description:
    "Contact Eagox Studio about software, websites, web applications and digital products — tell us what you want to build and the studio replies by email.",
  path: "/contact",
});

/** Contact page per 10-CONTACT-ORDER.md. */
export default function ContactPage() {
  return (
    <>
      <Section name="contact-intro" className="page-top">
        <Container>
          <Reveal>
            <SectionHeading kicker="Contact" level={1}>
              Get in touch
            </SectionHeading>
            <p className="page-intro text-secondary">
              Questions about a product, scope or pricing — send a message and
              the studio replies by email.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section name="contact-form" className="section-tight">
        <Container>
          <Reveal delay={0.1}>
            <div className="form-layout">
              <ContactForm />
            </div>
          </Reveal>
        </Container>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Contact", path: "/contact" },
            ]),
          ),
        }}
      />
    </>
  );
}
