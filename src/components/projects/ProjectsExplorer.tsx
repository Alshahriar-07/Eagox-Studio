"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { ProjectFilter } from "./ProjectFilter";
import type { ProjectCategoryFilter } from "./ProjectFilter";
import { projects } from "@/data/projects";
import { transitions } from "@/lib/motion";

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
 * Layout-animated grid moves — disabled under reduced motion — with no
 * layout instability (single grid container).
 */
export function ProjectsExplorer() {
  const [filter, setFilter] = useState<ProjectCategoryFilter>("All");
  const shouldReduceMotion = useReducedMotion();

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

      <ul className="projects-page-grid" role="list">
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.map((project) => (
            <m.li
              key={project.slug}
              layout={!shouldReduceMotion}
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              transition={transitions.glass}
            >
              <ProjectCard project={project} expanded />
            </m.li>
          ))}
        </AnimatePresence>
      </ul>

      {filtered.length === 0 && (
        <p className="projects-empty text-secondary" role="status">
          No projects in this category yet — new work is added as it ships.
        </p>
      )}
    </div>
  );
}
