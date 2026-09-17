import { ProjectPreview } from "./ProjectPreview";
import { findPreviewUrl } from "@/data/projects";
import type { Project, ProjectLink } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  /** Stable editorial number (position in the master project index). */
  index?: number;
  /** Render the documented feature list disclosure (projects page). */
  expanded?: boolean;
  /**
   * Render the tiny live iframe preview. Projects page only — the homepage
   * never renders website iframes.
   */
  showPreview?: boolean;
};

/**
 * External link with safe target/rel and an accessible name that includes
 * the project context (14-SEO-ACCESSIBILITY.md).
 */
function ProjectLinkItem({
  link,
  projectName,
  emphasized = false,
}: {
  link: ProjectLink;
  projectName: string;
  emphasized?: boolean;
}) {
  const isMail = link.url.startsWith("mailto:");
  return (
    <a
      href={link.url}
      className={emphasized ? "project-card-visit" : "project-card-link"}
      {...(isMail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      aria-label={`${link.label} — ${projectName}${isMail ? "" : " (opens in a new tab)"}`}
    >
      {link.label} <span aria-hidden="true">→</span>
    </a>
  );
}

/**
 * Editorial project entry: real website preview first, then quiet
 * typography — name, type, description, plain links. No badge clusters,
 * no monogram marks, no decorative card shell. Only documented fields
 * are rendered (info/projects.md) — nothing fabricated.
 */
export function ProjectCard({
  project,
  index,
  expanded = false,
  showPreview = false,
}: ProjectCardProps) {
  const previewUrl = findPreviewUrl(project.links);
  const webLinks = project.links.filter(
    (link) => link.url.startsWith("http") && !link.url.includes("github.com"),
  );
  const githubLinks = project.links.filter((link) =>
    link.url.includes("github.com"),
  );

  // Quiet metadata line — only documented status/version/platform facts.
  const metaFacts = [project.version, project.status, project.platforms]
    .filter((fact): fact is string => Boolean(fact));

  return (
    <article className="project-card">
      {index !== undefined && (
        <p className="project-card-index text-label" aria-hidden="true">
          Project {String(index + 1).padStart(2, "0")}
        </p>
      )}

      <div className="project-card-body">
        <h3 className="project-card-title">{project.name}</h3>
        <p className="text-label project-card-type">{project.type}</p>

        {/* Tiny live preview — projects page only, an accent beneath the
            name, never the dominant element. The homepage renders no iframe. */}
        {showPreview && previewUrl ? (
          <ProjectPreview url={previewUrl} title={project.name} />
        ) : null}

        <p className="project-card-desc text-secondary">{project.description}</p>

        {metaFacts.length > 0 && (
          <p className="text-label project-card-metatext">{metaFacts.join(" · ")}</p>
        )}

        {(webLinks.length > 0 || githubLinks.length > 0) && (
          <div className="project-card-links">
            {webLinks.map((link, linkIndex) => (
              <ProjectLinkItem
                key={link.url}
                link={link}
                projectName={project.name}
                emphasized={linkIndex === 0}
              />
            ))}
            {githubLinks.map((link) => (
              <ProjectLinkItem
                key={link.url}
                link={link}
                projectName={project.name}
              />
            ))}
          </div>
        )}

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
      </div>
    </article>
  );
}
