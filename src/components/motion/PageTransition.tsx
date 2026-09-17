"use client";

import {
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

/**
 * Solid-color page wipe — global navigation transition.
 *
 * Sequence (per the motion spec):
 *   1. current page stays visible while a solid Eagox panel sweeps across
 *   2. panel fully covers the viewport (no transparency/gradient/blur)
 *   3. destination route is pushed underneath the full cover
 *   4. panel sweeps away in the opposite direction, revealing the new page
 *   5. destination content rises in subtly (heading → text → cards)
 *
 * Architecture notes:
 * - One component at the layout level. Navigation is intercepted in the
 *   capture phase (plain <a> detection, so next/link anchors qualify),
 *   then completed with router.push — Next.js client-side navigation,
 *   prefetching and URL handling are untouched.
 * - The panel lives in a portal on <body> so it covers nav + content,
 *   clipped by a fixed inset layer (never causes horizontal overflow).
 * - GPU-friendly only: transform: translateX() + opacity, CSS transitions,
 *   no rAF loops, no extra dependencies.
 * - Reduced motion: no wipe at all — direct navigation, instant page.
 */

const WIPE_IN_MS = 380; // panel enters (cubic-bezier(0.76, 0, 0.24, 1))
const WIPE_OUT_MS = 420; // panel exits
const HOLD_MS = 140; // full-cover hold while the route swaps underneath
const ARRIVE_FALLBACK_MS = 400; // swap even if the pathname never changed (query-only navs)

type WipePhase = "idle" | "covering" | "swap" | "revealing";
type WipeDir = 1 | -1; // 1: enter right → exit left · -1: mirrored

export function PageTransition({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const [phase, setPhase] = useState<WipePhase>("idle");
  const [dir, setDir] = useState<WipeDir>(1);
  const [mounted, setMounted] = useState(false);

  const busyRef = useRef(false);
  const reducedRef = useRef(false);
  const routerRef = useRef(router);
  const pathnameRef = useRef(pathname);
  const targetRef = useRef<string | null>(null);
  const lastDirRef = useRef<WipeDir>(-1); // first wipe reads as dir 1

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);
  useEffect(() => {
    reducedRef.current = shouldReduceMotion;
  }, [shouldReduceMotion]);
  useEffect(() => {
    routerRef.current = router;
  }, [router]);

  // Navigation interceptor — bound once, reads fresh state via refs.
  useEffect(() => {
    const startWipe = (href: string) => {
      busyRef.current = true;
      targetRef.current = href.split("?")[0];
      const nextDir: WipeDir = lastDirRef.current === 1 ? -1 : 1; // alternate direction
      lastDirRef.current = nextDir;
      setDir(nextDir);
      setPhase("covering");

      window.setTimeout(() => {
        routerRef.current.push(href);
      }, WIPE_IN_MS);
    };

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      // Ignore clicks while a wipe is in flight — no mid-wipe route swaps.
      if (busyRef.current) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      if (anchor.relList?.contains?.("external")) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) return;
      if (href.split("?")[0] === pathnameRef.current) return;

      // Take over the click; complete it through the router.
      event.preventDefault();
      event.stopPropagation();

      if (reducedRef.current) {
        // Reduced motion: navigate immediately, no wipe.
        routerRef.current.push(href);
        return;
      }
      startWipe(href);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Route arrived (or arrival fallback elapsed) → prepare the swap.
  useEffect(() => {
    if (phase !== "covering") return;
    if (targetRef.current && pathname === targetRef.current) {
      targetRef.current = null;
      const t = window.setTimeout(() => setPhase("swap"), HOLD_MS);
      return () => window.clearTimeout(t);
    }
    // Query-only navigation never changes the pathname — swap anyway.
    const fallback = window.setTimeout(() => {
      targetRef.current = null;
      setPhase("swap");
    }, WIPE_IN_MS + ARRIVE_FALLBACK_MS);
    return () => window.clearTimeout(fallback);
  }, [phase, pathname]);

  // Hold under full cover → reveal.
  useEffect(() => {
    if (phase !== "swap") return;
    const t = window.setTimeout(() => setPhase("revealing"), HOLD_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  // Panel gone → back to idle, accept navigation again.
  useEffect(() => {
    if (phase !== "revealing") return;
    const t = window.setTimeout(() => {
      setPhase("idle");
      busyRef.current = false;
    }, WIPE_OUT_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  const contentClass =
    phase === "swap"
      ? "wipe-content wipe-content--pending"
      : phase === "revealing"
        ? "wipe-content wipe-content--in"
        : "wipe-content";

  return (
    <>
      <div className={contentClass}>{children}</div>
      {mounted && !shouldReduceMotion && (
        createPortal(
          <div
            className="wipe-layer"
            data-phase={phase}
            data-dir={dir}
            aria-hidden="true"
          >
            <span className="wipe-panel" />
          </div>,
          document.body,
        )
      )}
    </>
  );
}
