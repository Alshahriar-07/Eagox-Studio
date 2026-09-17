import type { Metadata } from "next";
import { PageTransition } from "@/components/motion/PageTransition";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OrderForm } from "@/components/forms/OrderForm";
import { pageOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Start a project with Eagox Studio — pick a service, describe what you want to build and send your inquiry.",
  alternates: { canonical: "/order" },
  openGraph: pageOpenGraph({
    title: "Start a Project",
    description:
      "Start a project with Eagox Studio — pick a service, describe what you want to build and send your inquiry.",
    path: "/order",
  }),
};

type OrderPageProps = {
  searchParams: Promise<{ service?: string }>;
};

/**
 * Order page — primary conversion flow per 10-CONTACT-ORDER.md.
 * Service can be preselected via /order?service=<slug>.
 */
export default async function OrderPage({ searchParams }: OrderPageProps) {
  const { service } = await searchParams;

  return (
    <PageTransition>
      <Section name="order-intro" className="page-top">
        <Container>
          <SectionHeading kicker="Start a project" level={1}>
            Tell us what to build
          </SectionHeading>
          <p className="page-intro text-secondary">
            Pick a service, describe the product and add anything useful.
            Starting prices are shown as reference — the final quote depends on
            scope.
          </p>
        </Container>
      </Section>

      <Section name="order-form" className="section-tight">
        <Container>
          <div className="form-layout">
            <OrderForm initialService={service} />
          </div>
        </Container>
      </Section>
    </PageTransition>
  );
}
