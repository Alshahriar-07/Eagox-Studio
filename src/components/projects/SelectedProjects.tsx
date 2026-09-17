import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectCard } from "./ProjectCard";
import { featuredProjects } from "@/data/projects";

/** Homepage selected projects per 06-HOME-PAGE.md — curated, platform-labeled. */
export function SelectedProjects() {
  return (
    <Section name="selected-projects">
      <Container>
        <Reveal className="projects-head">
          <SectionHeading kicker="Selected work">
            Built by Eagox
          </SectionHeading>
          <Button href="/projects" variant="ghost">
            All projects <span aria-hidden="true">→</span>
          </Button>
        </Reveal>

        <div className="projects-grid">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.08} size="sm">
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
