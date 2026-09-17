"use client";

import { LazyMotion, MotionConfig, domMax } from "framer-motion";

/**
 * Global motion provider.
 * - LazyMotion (domMax) enables layout animations + AnimatePresence while
 *   keeping the feature bundle lazy-loaded.
 * - MotionConfig `reducedMotion="user"` makes every transform-based
 *   animation degrade to opacity-only when the OS requests reduced motion.
 */
export function MotionProvider({ children }: React.PropsWithChildren) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
