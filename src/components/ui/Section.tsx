import type { ElementType, HTMLAttributes, ReactNode } from "react";

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  as?: ElementType;
  /** Accessible section name; renders an aria-label when no visible heading. */
  name?: string;
};

/** Vertical-rhythm section wrapper. */
export function Section({
  children,
  as: Tag = "section",
  name,
  className = "",
  ...rest
}: SectionProps) {
  return (
    <Tag
      className={`section ${className}`.trim()}
      aria-label={name}
      {...rest}
    >
      {children}
    </Tag>
  );
}
