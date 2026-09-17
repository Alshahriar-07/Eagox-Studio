import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { Reveal } from "@/components/motion/Reveal";
import { pageSeo, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title: "Eagox Studio Projects | Software & Digital Products",
  description:
    "Projects by Eagox Studio — a working index of websites, web applications, developer tools, AI platforms and digital products built from Dhaka, Bangladesh, with verified live and GitHub links.",
  path: "/projects",
});

/**
 * Projects page per Eagox-Studio-plan/08-PROJECTS-PAGE.md:
 * case-study index with working platform filters. Cards render only
 * verified/available data — the page never fabricates project facts.
 */
export default function ProjectsPage() {
  return (
    <>
      <Section name="projects-page" className="page-top">
        <Container>
          <Reveal>
            <SectionHeading kicker="Projects" level={1}>
              Built by Eagox
            </SectionHeading>
            <p className="page-intro text-secondary">
              A working index of Eagox products and client builds across web,
              desktop and Android. Filter by platform — every entry links out
              only where a documented destination exists.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section name="projects-index" className="section-tight">
        <Container>
          <Reveal delay={0.1}>
            <ProjectsExplorer />
          </Reveal>
        </Container>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Projects", path: "/projects" },
            ]),
          ),
        }}
      />
    </>
  );
}
