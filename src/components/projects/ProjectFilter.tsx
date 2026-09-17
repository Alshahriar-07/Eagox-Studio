"use client";

import { useRef } from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { transitions } from "@/lib/motion";
import { useReducedMotion } from "framer-motion";

export type ProjectCategoryFilter =
  | "All"
  | "Websites"
  | "Web Apps"
  | "Desktop"
  | "Android";

type ProjectFilterProps = {
  categories: readonly ProjectCategoryFilter[];
  active: ProjectCategoryFilter;
  onChange: (category: ProjectCategoryFilter) => void;
};

/**
 * Accessible category filter (08-PROJECTS-PAGE.md).
 * Implemented as a radiogroup with roving tabindex: arrow keys move between
 * filters (native radio behavior), Tab exits the group. The active pill gets
 * a shared-layout indicator that slides between filters.
 */
export function ProjectFilter({
  categories,
  active,
  onChange,
}: ProjectFilterProps) {
  const shouldReduceMotion = useReducedMotion();
  const listRef = useRef<HTMLUListElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const currentIndex = categories.indexOf(active);
    const delta = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex =
      (currentIndex + delta + categories.length) % categories.length;
    const next = categories[nextIndex];
    onChange(next);

    // Move focus with the selection (roving tabindex)
    const labels = listRef.current?.querySelectorAll<HTMLButtonElement>(
      "button[role='radio']",
    );
    labels?.[nextIndex]?.focus();
  };

  return (
    <div
      className="project-filter"
      role="radiogroup"
      aria-label="Filter projects by platform"
    >
      <ul
        ref={listRef}
        className="project-filter-list"
        role="presentation"
        onKeyDown={handleKeyDown}
      >
        {categories.map((category) => {
          const isActive = category === active;
          return (
            <li key={category} role="presentation">
              <button
                type="button"
                role="radio"
                aria-checked={isActive}
                tabIndex={isActive ? 0 : -1}
                className={cn("project-filter-pill", isActive && "is-active")}
                onClick={() => onChange(category)}
              >
                {isActive && !shouldReduceMotion && (
                  <m.span
                    className="project-filter-indicator"
                    layoutId="project-filter-indicator"
                    transition={transitions.glass}
                    aria-hidden="true"
                  >
                  </m.span>
                )}
                <span className="project-filter-label">{category}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
