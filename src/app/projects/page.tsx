import type { Metadata } from "next";
import { PageTransition } from "@/components/motion/PageTransition";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { pageOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "The Eagox Studio project index — Seed Code developer tools, AI platforms, ChayaNix OS, desktop assistants, games and client websites, with verified live and GitHub links.",
  alternates: { canonical: "/projects" },
  openGraph: pageOpenGraph({
    title: "Projects",
    description:
      "The Eagox Studio project index — Seed Code tools, AI platforms, OS work, games and client websites.",
    path: "/projects",
  }),
};

/**
 * Projects page per Eagox-Studio-plan/08-PROJECTS-PAGE.md:
 * case-study index with working platform filters. Cards render only
 * verified/available data — the page never fabricates project facts.
 */
export default function ProjectsPage() {
  return (
    <PageTransition>
      <Section name="projects-page" className="page-top">
        <Container>
          <SectionHeading kicker="Projects" level={1}>
            Built by Eagox
          </SectionHeading>
          <p className="page-intro text-secondary">
            A working index of Eagox products and client builds across web,
            desktop and Android. Filter by platform — every entry links out
            only where a documented destination exists.
          </p>
        </Container>
      </Section>

      <Section name="projects-index" className="section-tight">
        <Container>
          <ProjectsExplorer />
        </Container>
      </Section>
    </PageTransition>
  );
}
