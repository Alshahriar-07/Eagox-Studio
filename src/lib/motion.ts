/**
 * Eagox Studio — Motion system
 * Source of truth: Eagox-Studio-plan/05-ANIMATION-MOTION.md
 *
 * Centralized variants + timings. GPU-friendly (opacity/transform only),
 * subtle, premium. No particles, no neon, no glow.
 */
import type { Transition, Variants } from "framer-motion";

/** Motion timings kept in sync with src/styles/tokens.css */
export const durations = {
  fast: 0.15,
  base: 0.3,
  slow: 0.6,
  reveal: 0.7,
} as const;

export const easing = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
  glass: [0.25, 0.6, 0.3, 1],
} as const;

export const transitions = {
  fast: { duration: durations.fast, ease: easing.out },
  base: { duration: durations.base, ease: easing.out },
  slow: { duration: durations.slow, ease: easing.out },
  reveal: { duration: durations.reveal, ease: easing.out },
  glass: { duration: durations.base, ease: easing.glass },
} satisfies Record<string, Transition>;

/** Shared reduced-motion behavior for all variants. */
export const reducedMotion: Variants = {
  hidden: { opacity: 0, transition: transitions.fast },
  visible: {
    opacity: 1,
    transition: { duration: 0.01 },
  },
};

/** Section/content reveal — subtle rise. */
export const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.reveal,
  },
};

/** Smaller reveal for inline elements (labels, cards inside grids). */
export const revealSm: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.reveal,
  },
};

/** Page transition — subtle opacity/transform between routes. */
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.slow, ease: easing.out },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: durations.fast, ease: easing.inOut },
  },
};

/** Hero entrance — cinematic stagger used by the homepage hero. */
export const heroStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

/** Hero child element — gentle rise + fade. */
export const heroChild: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.reveal, ease: easing.out },
  },
};

/** Hero visual — scale-settle entrance so the globe feels anchored. */
export const heroVisual: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.1, ease: easing.out, delay: 0.15 },
  },
};

/** Glass card hover — gentle lift, no glow. */
export const cardHover = {
  rest: { y: 0 },
  hover: { y: -4, transition: transitions.glass },
} satisfies Variants;

/** Standard viewport config for scroll reveals. */
export const viewportOnce = { once: true, margin: "-72px 0px" } as const;
