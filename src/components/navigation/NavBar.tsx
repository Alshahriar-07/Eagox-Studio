"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/layout/Logo";
import { primaryNav } from "@/data/site";
import { GlassPanel } from "@/components/glass/GlassPanel";

/**
 * Global navigation (02-SITE-ARCHITECTURE.md):
 * Logo | Services | Projects | About | Contact | Start a Project
 *
 * Desktop: inline links + CTA. Mobile (≤899px): glass dropdown menu,
 * Escape to close, focus returns to the toggle, body scroll locked.
 */
export function NavBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Escape closes; return focus to the toggle.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  // Lock body scroll while the menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const onToggleClick = useCallback(() => setMenuOpen((open) => !open), []);

  const isActive = (href: string) => pathname === href;

  const links = (
    <>
      {primaryNav.map((link) => (
        <li key={link.href} role="presentation">
          <Link
            href={link.href}
            className="nav-link"
            data-active={isActive(link.href)}
            aria-current={isActive(link.href) ? "page" : undefined}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </>
  );

  return (
    <header
      className="site-header"
      data-scrolled={scrolled}
      data-menu-open={menuOpen}
    >
      <nav className="container nav-inner" aria-label="Primary">
        <Logo />

        <ul className="nav-links" role="list">
          {links}
        </ul>

        {/* Desktop CTA lives outside the link list (kept unique) */}
        <div className="nav-actions">
          <span className="nav-cta">
            <Link href="/order" className="btn btn-primary">
              Start a Project
            </Link>
          </span>
          <button
            ref={toggleRef}
            type="button"
            className="btn btn-secondary nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={onToggleClick}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <m.div
              className="nav-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.25 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <m.div
              ref={menuRef}
              id="mobile-menu"
              className="nav-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.3 }}
            >
              <GlassPanel tone="dark" blur="lg" radius="lg" className="nav-menu-inner">
                <ul className="nav-menu-list" role="list">
                  {primaryNav.map((link) => (
                    <li key={link.href} role="presentation">
                      <Link
                        href={link.href}
                        className="nav-menu-link"
                        data-active={isActive(link.href)}
                        aria-current={isActive(link.href) ? "page" : undefined}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="nav-menu-footer">
                  <Link href="/order" className="btn btn-primary">
                    Start a Project
                  </Link>
                  <Link href="/projects" className="btn btn-ghost">
                    Explore Projects
                  </Link>
                </div>
              </GlassPanel>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
