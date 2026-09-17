import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

/** Technical meta label (platform tags, section markers). */
export function Badge({ children, className = "" }: BadgeProps) {
  return <span className={`badge ${className}`.trim()}>{children}</span>;
}
