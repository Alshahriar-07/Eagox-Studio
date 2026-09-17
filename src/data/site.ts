/**
 * Site-wide configuration.
 * Single source of truth for navigation structure, routes and metadata.
 * Per Eagox-Studio-plan/11-CONTENT-DATA.md — no fabricated URLs or facts.
 */

export const siteConfig = {
  name: "Eagox Studio",
  shortName: "Eagox",
  description:
    "Eagox Studio is a digital product studio building websites, web apps, desktop software and Android applications — designed, engineered and shipped.",
  /** Official production URL (owner-supplied, final SEO correction). */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://eagoxstudio.vercel.app",
  /**
   * Documented studio facts (info/projects.md — Eagox Studio section).
   * The About page renders only these; nothing invented.
   */
  founded: "2024",
  location: "Dhaka, Bangladesh",
  founder: "Al Shahriar Sowan",
  founderRole: "Founder & Lead Software Engineer",
  /** Documented studio links (Core Links section). */
  githubUrl: "https://github.com/Alshahriar-07",
  founderPortfolioUrl: "https://alshahriarsayon.vercel.app/",
  /**
   * Documented "Main Areas" of the studio (info/projects.md). Rendered on
   * the About page as capability chips.
   */
  mainAreas: [
    "Modern website and portfolio development",
    "Full-stack web applications and SaaS",
    "AI applications and custom AI tooling",
    "Developer tools and CLI applications",
    "Android/mobile applications",
    "Desktop software",
    "Linux/OS development",
    "Computer vision",
    "Game development",
    "Cloud and developer infrastructure",
  ],
  /** Documented starting prices (Eagox-Studio-plan/README.md). Currency: BDT (৳). */
  startingPrices: {
    portfolioWebsite: "৳3,999+",
    webApp: "৳5,999+",
    desktopApp: "৳8,999+",
    androidApp: "৳8,499+",
  },
} as const;

export type NavLink = {
  href: string;
  label: string;
};

/** Global navigation per Eagox-Studio-plan/02-SITE-ARCHITECTURE.md.
 *  Includes Home so the homepage is reachable from the navbar. */
export const primaryNav: readonly NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/author", label: "Author" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerNav: readonly NavLink[] = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/author", label: "Author" },
  { href: "/order", label: "Start a Project" },
  { href: "/contact", label: "Contact" },
] as const;

/** Documented product categories (see 01-PRODUCT-SCOPE.md). */
export const productCategories = [
  "Websites",
  "Web Apps",
  "Desktop Apps",
  "Android Apps",
] as const;

/**
 * The studio acts as the umbrella for these documented product families
 * (info/projects.md — Eagox Studio section / Seed Code ecosystem).
 */
export const studioProductFamilies = [
  "Seed Code ecosystem",
  "AI tools & workbenches",
  "Developer infrastructure",
  "Desktop & OS software",
  "Games & experimental products",
] as const;

/** Approved contact address used for mailto fallbacks only. */
export const contactEmail = "hello@eagox.com";

export const copyright = `© ${new Date().getFullYear()} Eagox Studio. All rights reserved.`;
