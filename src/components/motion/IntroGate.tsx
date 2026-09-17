"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";

/** Same physical easing as the internal page-wipe transition. */
const EASE_WIPE = [0.76, 0, 0.24, 1] as const;

/**
 * One-time site intro (~1.75s) — a studio identity reveal:
 *
 *   0.00s  dark stage
 *   0.10s  EAGOX resolves from soft blur (opacity/scale/blur settle)
 *   0.60s  thin rule draws left → right
 *   0.80s  STUDIO appears beneath
 *   0.95s  micro discipline text
 *   1.00s  solid carbon wipe covers the stage, then sweeps away in the
 *          same visual language as the internal page transition —
 *          no plain fade-out.
 *
 * Content is server-rendered underneath the veil — SEO and usability are
 * never blocked. Runs once per browser session (sessionStorage); internal
 * navigation never replays it. Reduced motion: skipped entirely.
 */
export function IntroGate() {
  const shouldReduceMotion = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) return;
    try {
      if (sessionStorage.getItem("eagox-intro-played")) return;
      sessionStorage.setItem("eagox-intro-played", "1");
    } catch {
      // Storage unavailable (privacy mode) — just play it once per mount.
    }
    setShow(true);
    const timer = window.setTimeout(() => setShow(false), 1800);
    return () => window.clearTimeout(timer);
  }, [shouldReduceMotion]);

  return (
    <AnimatePresence>
      {show && (
        <m.div
          className="intro-gate"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.01 } }}
        >
          <m.div
            className="intro-stage"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 1.26, duration: 0.1, ease: "linear" }}
          >
            <m.span
              className="intro-wordmark"
              initial={{ opacity: 0.35, y: 8, scale: 0.985, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              EAGOX
            </m.span>
            <m.span
              className="intro-rule"
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.28, delay: 0.6, ease: [0.65, 0, 0.35, 1] }}
            />
            <m.span
              className="intro-studio"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              STUDIO
            </m.span>
            <m.span
              className="intro-tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.95 }}
            >
              SOFTWARE • WEB • APPS • DIGITAL PRODUCTS
            </m.span>
          </m.div>
          {/* Solid carbon sheet — cover, hold, sweep away opposite (the
              page-transition signature, reused for the intro exit). */}
          <m.div
            className="intro-wipe"
            initial={{ x: "100%" }}
            animate={{ x: ["100%", "0%", "0%", "-100%"] }}
            transition={{
              duration: 0.75,
              delay: 1.0,
              times: [0, 0.33, 0.47, 1],
              ease: EASE_WIPE,
            }}
          />
        </m.div>
      )}
    </AnimatePresence>
  );
}
