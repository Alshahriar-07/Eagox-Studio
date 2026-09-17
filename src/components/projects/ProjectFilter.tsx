"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils/cn";

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
 * Accessible category filter (08-PROJECTS-PAGE.md) — quiet editorial text
 * buttons with a 1px underline active state (no pill container, no glass).
 * Radiogroup with roving tabindex: arrow keys move between filters, Tab
 * exits the group.
 */
export function ProjectFilter({
  categories,
  active,
  onChange,
}: ProjectFilterProps) {
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
                <span className="project-filter-label">{category}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
