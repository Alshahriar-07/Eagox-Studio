"use client";

import { m, useReducedMotion } from "framer-motion";
import type { PropsWithChildren } from "react";
import { reveal, revealSm, viewportOnce } from "@/lib/motion";

type RevealProps = PropsWithChildren<{
  /** Delay before the reveal starts (seconds). */
  delay?: number;
  /** Use the smaller offset variant for inline/grid items. */
  size?: "md" | "sm";
  className?: string;
  as?: "div" | "section" | "li" | "article" | "span" | "ul";
  /** Animate layout position changes (used by filter grids). */
  layout?: boolean;
}>;

/**
 * Scroll-triggered reveal — subtle rise + fade, runs once.
 * Respect reduced motion via MotionConfig and per-frame checks.
 * With `layout`, position changes (e.g. filtering) animate smoothly.
 */
export function Reveal({
  children,
  delay = 0,
  size = "md",
  className,
  as = "div",
  layout = false,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const Component = m[as];
  const variants = size === "sm" ? revealSm : reveal;

  return (
    <Component
      className={className}
      variants={shouldReduceMotion ? undefined : variants}
      initial={layout ? false : "hidden"}
      whileInView="visible"
      viewport={viewportOnce}
      layout={layout && !shouldReduceMotion ? true : undefined}
      transition={shouldReduceMotion ? { duration: 0.01 } : { delay }}
    >
      {children}
    </Component>
  );
}
