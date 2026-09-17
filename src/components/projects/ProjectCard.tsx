import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import type { Project, ProjectLink } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  /** Cards can render the full documented feature list (project page). */
  expanded?: boolean;
};

/**
 * External link with safe target/rel and an accessible name that includes
 * the project context (14-SEO-ACCESSIBILITY.md).
 */
function ProjectLinkItem({
  link,
  projectName,
}: {
  link: ProjectLink;
  projectName: string;
}) {
  const isMail = link.url.startsWith("mailto:");
  return (
    <a
      href={link.url}
      className="service-card-link project-card-link"
      {...(isMail
        ? {}
        : { target: "_blank", rel: "noopener noreferrer" })}
      aria-label={`${link.label} — ${projectName} (opens in a new tab)`}
    >
      {link.label} <span aria-hidden="true">↗</span>
    </a>
  );
}

/**
 * Project card per 08-PROJECTS-PAGE.md, populated from info/projects.md.
 * Renders only documented fields — no fabricated facts. With no thumbnails
 * documented, the card uses a typographic monogram instead of a fake image.
 */
export function ProjectCard({ project, expanded = false }: ProjectCardProps) {
  const hasLinks = project.links.length > 0;

  return (
    <GlassCard className="project-card">
      <div className="project-card-body">
        <div className="project-card-head">
          <span className="project-card-mark" aria-hidden="true">
            {project.name.slice(0, 1)}
          </span>
          {project.ownership === "client" && (
            <Badge>Client project</Badge>
          )}
        </div>

        <h3 className="project-card-title">{project.name}</h3>
        <p className="text-label project-card-type">{project.type}</p>

        <ul
          className="project-card-tech"
          role="list"
          aria-label="Platform categories"
        >
          {project.categories.map((category) => (
            <li key={category}>
              <Badge>{category}</Badge>
            </li>
          ))}
        </ul>

        <p className="project-card-desc text-secondary">{project.description}</p>

        {expanded && project.features.length > 0 && (
          <details className="project-card-features">
            <summary className="text-label">
              {project.featuresLabel} ({project.features.length})
            </summary>
            <ul role="list" className="project-card-feature-list">
              {project.features.map((feature) => (
                <li key={feature} className="project-card-feature text-secondary">
                  {feature}
                </li>
              ))}
            </ul>
          </details>
        )}

        <div className="project-card-foot">
          <div className="project-card-status">
            {project.status && <span className="badge">{project.status}</span>}
            {project.version && (
              <span className="badge">{project.version}</span>
            )}
            {project.platforms && (
              <span className="text-label project-card-platforms">
                {project.platforms}
              </span>
            )}
          </div>
          {hasLinks ? (
            <div className="project-card-links">
              {project.links.map((link) => (
                <ProjectLinkItem
                  key={link.url}
                  link={link}
                  projectName={project.name}
                />
              ))}
            </div>
          ) : (
            <span className="text-label project-card-soon">
              Case study coming soon
            </span>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
