"use client";

import { m, useReducedMotion } from "framer-motion";
import type { PropsWithChildren } from "react";
import { pageTransition } from "@/lib/motion";

/**
 * Wraps route content. Subtle opacity/transform entrance per the motion spec.
 * (exit animations are intentionally minimal — App Router unmounts quickly
 * and heavy exit choreography blocks navigation)
 */
export function PageTransition({ children }: PropsWithChildren) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.div
      variants={shouldReduceMotion ? undefined : pageTransition}
      initial={shouldReduceMotion ? false : "hidden"}
      animate="visible"
    >
      {children}
    </m.div>
  );
}
