"use client";

import { m, useReducedMotion } from "framer-motion";
import type { HTMLAttributes, ReactNode } from "react";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { cardHover } from "@/lib/motion";

/** HTML attrs that clash with framer-motion's own gesture handlers. */
type OmittedNativeProps =
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration";

type GlassCardProps = Omit<HTMLAttributes<HTMLDivElement>, OmittedNativeProps> & {
  children: ReactNode;
  tone?: "light" | "dark";
  /** Subtle hover lift (pointer devices only). */
  interactive?: boolean;
};

/**
 * Glass surface card for grids (services, projects, pricing).
 * Hover is a restrained lift; disabled under reduced motion and touch.
 */
export function GlassCard({
  children,
  tone = "light",
  interactive = true,
  className = "",
  ...rest
}: GlassCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const motionProps =
    interactive && !shouldReduceMotion
      ? {
          variants: cardHover,
          initial: "rest" as const,
          whileHover: "hover" as const,
        }
      : {};

  return (
    <m.div {...motionProps} {...rest}>
      <GlassPanel tone={tone} blur="md" radius="lg" className={className}>
        {children}
      </GlassPanel>
    </m.div>
  );
}
