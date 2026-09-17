import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { footerNav, productCategories, siteConfig, copyright } from "@/data/site";

/**
 * Global footer per Phase 1 spec:
 * branding, navigation, service references, contact CTA, copyright.
 * Only documented routes/categories are linked — nothing invented.
 */
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p className="footer-tagline">
              {siteConfig.shortName} builds websites, web apps, desktop software and
              Android applications — designed, engineered and shipped.
            </p>
            <Link href="/order" className="btn btn-primary footer-cta">
              Start a Project
            </Link>
          </div>

          <nav aria-label="Footer">
            <h2 className="footer-heading">Studio</h2>
            <ul className="footer-list" role="list">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="footer-heading">What we build</h2>
            <ul className="footer-list" role="list">
              {productCategories.map((category) => (
                <li key={category} className="footer-item">
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{copyright}</p>
          <div className="footer-meta">
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <span className="badge">Digital product studio</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
