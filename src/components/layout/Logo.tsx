import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";

type LogoProps = {
  /** Include the "EAGOX" horizontal wordmark (icon is embedded in the lockup). */
  withWordmark?: boolean;
  className?: string;
};

/**
 * Eagox brand lockup using the supplied horizontal white SVG
 * (assets/branding/eagox-logo-horizontal-white.svg) for the dark/glass UI.
 * Aspect ratio is preserved; no recoloring per asset spec.
 */
export function Logo({ withWordmark = true, className = "" }: LogoProps) {
  const size = withWordmark ? { width: 168, height: 34 } : { width: 34, height: 34 };

  return (
    <Link
      href="/"
      className={`logo-link ${className}`.trim()}
      aria-label={`${siteConfig.name} — home`}
    >
      <Image
        src="/assets/branding/eagox-logo-horizontal-white.svg"
        alt={`${siteConfig.name} logo`}
        className="logo-img"
        style={{ width: "auto", height: "auto" }}
        priority
        {...size}
      />
    </Link>
  );
}
