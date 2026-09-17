"use client";

import { useEffect, useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { heroStagger, heroChild, heroVisual } from "@/lib/motion";

/**
 * Homepage hero — full-bleed cinematic composition over dedicated artwork.
 *
 * Left/center column (badge → headline → support → CTAs) holds the visual
 * focus; the artwork's abstract structure sits right-of-frame and is dissolved
 * into the scene by hero-scoped atmosphere layers: a directional scrim, a
 * vignette, a cursor-tracked ambient light, and a fine film-grain pass.
 *
 * Motion: staggered cinematic entrance, scale-settle on the artwork, a very
 * subtle scroll parallax, and the ambient light. Under prefers-reduced-motion
 * all orchestration props, the parallax, and the light tracking are omitted.
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

  // Cursor-tracked ambient light — hero-scoped CSS custom properties,
  // rAF-throttled, fine pointers only. No layout work, no listeners on scroll.
  useEffect(() => {
    if (shouldReduceMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    let raf = 0;
    let lightX = 0.62;
    let lightY = 0.42;

    const apply = () => {
      raf = 0;
      section.style.setProperty("--hero-light-x", `${(lightX * 100).toFixed(2)}%`);
      section.style.setProperty("--hero-light-y", `${(lightY * 100).toFixed(2)}%`);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = section.getBoundingClientRect();
      lightX = (event.clientX - rect.left) / rect.width;
      lightY = (event.clientY - rect.top) / rect.height;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    section.addEventListener("pointermove", onPointerMove);
    return () => {
      section.removeEventListener("pointermove", onPointerMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [shouldReduceMotion]);

  return (
    <section ref={sectionRef} className="hero" aria-labelledby="hero-title">
      {/* Background artwork — right-weighted abstract structure */}
      <div className="hero-background" aria-hidden="true">
        <m.div className="hero-art" style={artStyle} {...visual} />
      </div>

      {/* Atmosphere — light, contrast scrim, vignette, grain */}
      <div className="hero-atmosphere" aria-hidden="true">
        <span className="hero-light" />
        <span className="hero-scrim" />
        <span className="hero-vignette" />
        <span className="hero-grain" />
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
            high-quality digital solutions for modern businesses.
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
