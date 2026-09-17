import { siteConfig } from "./site";

/**
 * Services — source of truth: Eagox-Studio-plan/07-SERVICES-PAGE.md.
 * Descriptions are restricted to the documented "suitable-for" copy.
 */
export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  /** Documented starting price string, e.g. "৳3,999+". */
  startingPrice: string;
  suitableFor: string;
};

export const services: readonly Service[] = [
  {
    slug: "websites",
    title: "Portfolio Website",
    shortTitle: "Websites",
    description:
      "Personal portfolios, landing pages and small presentation websites.",
    startingPrice: siteConfig.startingPrices.portfolioWebsite,
    suitableFor: "Individuals & small presentation sites",
  },
  {
    slug: "web-apps",
    title: "Web App / D2C Brand / Online Shop",
    shortTitle: "Web Apps",
    description:
      "Web applications, D2C brands, online stores and custom web experiences.",
    startingPrice: siteConfig.startingPrices.webApp,
    suitableFor: "D2C brands, stores & web apps",
  },
  {
    slug: "desktop-apps",
    title: "Desktop App",
    shortTitle: "Desktop Apps",
    description:
      "Windows desktop software, utilities, productivity tools and custom applications.",
    startingPrice: siteConfig.startingPrices.desktopApp,
    suitableFor: "Windows software & productivity tools",
  },
  {
    slug: "android-apps",
    title: "Android App",
    shortTitle: "Android Apps",
    description:
      "Android utilities, custom apps and AI-powered mobile products.",
    startingPrice: siteConfig.startingPrices.androidApp,
    suitableFor: "Android utilities & mobile products",
  },
] as const;
