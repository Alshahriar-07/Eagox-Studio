"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { ProjectFilter } from "./ProjectFilter";
import type { ProjectCategoryFilter } from "./ProjectFilter";
import { projects } from "@/data/projects";
import { Reveal } from "@/components/motion/Reveal";

const FILTERS: readonly ProjectCategoryFilter[] = [
  "All",
  "Websites",
  "Web Apps",
  "Desktop",
  "Android",
];

/**
 * Client-side project index with working category filtering
 * (08-PROJECTS-PAGE.md). Projects document one or more filter categories
 * (e.g. Seed Code Chat targets Web + Android), so matching is inclusive.
 * Minimal-premium presentation: one spacious editorial column, real
 * website previews as the visual, quiet typography around them.
 */
export function ProjectsExplorer() {
  const [filter, setFilter] = useState<ProjectCategoryFilter>("All");

  const filtered = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((project) => project.categories.includes(filter)),
    [filter],
  );

  return (
    <div>
      <ProjectFilter categories={FILTERS} active={filter} onChange={setFilter} />

      <p className="text-label projects-count" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "project" : "projects"}
        {filter !== "All" ? ` — ${filter}` : ""}
      </p>

      <ul className="projects-page-list" role="list">
        {filtered.map((project, index) => (
          <li key={project.slug}>
            <Reveal size="sm">
              <ProjectCard project={project} index={index} expanded showPreview />
            </Reveal>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="projects-empty text-secondary" role="status">
          No projects in this category yet — new work is added as it ships.
        </p>
      )}
    </div>
  );
}
