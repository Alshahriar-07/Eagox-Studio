"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { heroStagger, heroChild, heroVisual } from "@/lib/motion";

/**
 * Homepage hero — minimal editorial composition over dedicated artwork.
 *
 * Left column (badge → headline → support → CTAs) holds the visual focus;
 * the artwork sits right-of-frame and stays visible behind the typography.
 * Minimal-premium refinement: the decorative atmosphere layers (ambient
 * light, scrim, vignette, grain) and the cursor-tracked light effect were
 * removed — one subtle directional gradient on the background protects
 * text contrast, and the copy sits directly on the artwork.
 *
 * Motion: staggered entrance, scale-settle on the artwork, and a very
 * subtle scroll parallax. Under prefers-reduced-motion all orchestration
 * props and the parallax are omitted.
 */
export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Very subtle scroll parallax — the artwork lags the content slightly.
  const { scrollY } = useScroll();
  const artY = useTransform(scrollY, [0, 720], [0, 48]);

  // Variant orchestration only when motion is allowed.
  const orchestrate = shouldReduceMotion
    ? {}
    : {
        variants: heroStagger,
        initial: "hidden" as const,
        animate: "visible" as const,
      };
  const child = shouldReduceMotion ? undefined : heroChild;
  const visual = shouldReduceMotion
    ? {}
    : {
        variants: heroVisual,
        initial: "hidden" as const,
        animate: "visible" as const,
      };
  const artStyle = shouldReduceMotion ? undefined : { y: artY };

  return (
    <section ref={sectionRef} className="hero" aria-labelledby="hero-title">
      {/* Background artwork — right-weighted abstract structure */}
      <div className="hero-background" aria-hidden="true">
        <m.div className="hero-art" style={artStyle} {...visual} />
      </div>

      {/* Editorial column — the dominant visual focus */}
      <div className="container hero-content">
        <m.div className="hero-main" {...orchestrate}>
          <m.p className="hero-badge" variants={child}>
            <span className="hero-badge-dot" aria-hidden="true" />
            Eagox Studio — Software • Web • Apps • Digital Products
          </m.p>

          <m.h1 id="hero-title" className="hero-title text-display" variants={child}>
            <span className="hero-title-line">We Build Modern</span>
            <span className="hero-title-accent">
              <span className="hero-title-line">Software &amp; Digital</span>
              <span className="hero-title-line">Products.</span>
            </span>
          </m.h1>

          <m.p className="hero-description text-secondary" variants={child}>
            From web applications to mobile apps, we design, develop and ship
            high-quality digital solutions for modern businesses in Bangladesh
            and worldwide.
          </m.p>

          <m.div className="hero-actions" variants={child}>
            <Button href="/contact" variant="primary" size="lg">
              Start a Project
              <span className="hero-cta-arrow" aria-hidden="true">
                →
              </span>
            </Button>
            <Button href="/projects" variant="secondary" size="lg">
              Explore Our Work
              <span className="hero-cta-arrow" aria-hidden="true">
                →
              </span>
            </Button>
          </m.div>
        </m.div>
      </div>

      {/* Full-bleed foot band — location as quiet editorial metadata */}
      <div className="hero-foot-band">
        <div className="container hero-foot-inner">
          <m.p className="hero-meta" {...(shouldReduceMotion ? {} : child)}>
            <span className="hero-meta-dot" aria-hidden="true" />
            Dhaka, Bangladesh — Working Worldwide
          </m.p>
        </div>
      </div>
    </section>
  );
}
