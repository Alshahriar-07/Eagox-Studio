"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";

/**
 * One-time site intro (~1.4s): wordmark fades in with a soft scale-settle,
 * a thin light sweep crosses it, then the whole veil lifts.
 *
 * - Runs once per browser session (sessionStorage) — navigation is instant.
 * - Reduced motion: skipped entirely.
 * - Fixed overlay, no layout impact; content is server-rendered underneath.
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
    const timer = window.setTimeout(() => setShow(false), 1400);
    return () => window.clearTimeout(timer);
  }, [shouldReduceMotion]);

  return (
    <AnimatePresence>
      {show && (
        <m.div
          className="intro-gate"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeOut" } }}
        >
          <div className="intro-gate-inner">
            <m.span
              className="intro-wordmark"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              EAGOX <span>STUDIO</span>
            </m.span>
            <m.span
              className="intro-rule"
              aria-hidden="true"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            />
            <m.span
              className="intro-tagline"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              SOFTWARE · WEB · APPS · DIGITAL PRODUCTS
            </m.span>
            <m.span
              className="intro-sweep"
              aria-hidden="true"
              initial={{ x: "-130%" }}
              animate={{ x: "130%" }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.65, 0, 0.35, 1] }}
            />
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
