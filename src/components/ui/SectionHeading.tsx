import type { ReactNode } from "react";

type SectionHeadingProps = {
  /** Small technical label above the heading (mono, uppercase). */
  kicker?: string;
  /** Heading level for document outline correctness. */
  level?: 1 | 2 | 3;
  children: ReactNode;
  className?: string;
};

const headingTags = {
  1: "h1",
  2: "h2",
  3: "h3",
} as const;

/**
 * Editorial heading block: fine mono kicker + large display heading.
 * Visual scale is applied via .text-* utilities so document outline
 * stays semantically correct regardless of heading level.
 */
export function SectionHeading({
  kicker,
  level = 2,
  children,
  className = "",
}: SectionHeadingProps) {
  const Tag = headingTags[level];

  return (
    <div className={`section-heading ${className}`.trim()}>
      {kicker && <p className="text-label">{kicker}</p>}
      <Tag className="text-display section-heading-title">{children}</Tag>
    </div>
  );
}
