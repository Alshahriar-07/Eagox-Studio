import type { Metadata } from "next";
import { PageTransition } from "@/components/motion/PageTransition";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { Reveal } from "@/components/motion/Reveal";
import { author } from "@/data/author";
import { siteConfig } from "@/data/site";
import { pageOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Author — Al Shahriar Sowan",
  description:
    "Al Shahriar Sowan (Al Shahriar Sayon), Founder & Lead Software Engineer at Eagox Studio — independent software engineer behind the Seed Code ecosystem, AI tooling, developer infrastructure and desktop software.",
  alternates: { canonical: "/author" },
  openGraph: pageOpenGraph({
    title: "Author — Al Shahriar Sowan",
    description:
      "Al Shahriar Sowan, Founder & Lead Software Engineer at Eagox Studio — independent software engineer and product creator.",
    path: "/author",
  }),
};

/**
 * Author page per 09-ABOUT-AUTHOR.md, populated from info/person-author.md —
 * the authoritative source of truth. Every rendered field is documented;
 * nothing is inferred or invented.
 */
export default function AuthorPage() {
  const focusEntries = author.focus;

  return (
    <PageTransition>
      <Section name="author-intro" className="page-top">
        <Container>
          <SectionHeading kicker="Author" level={1}>
            The founder behind {siteConfig.shortName}
          </SectionHeading>
          <p className="page-intro text-secondary">
            {author.role} at {author.studio} — independent software engineer
            and product creator.
          </p>
        </Container>
      </Section>

      <Section name="author-profile" className="section-tight">
        <Container>
          <Reveal>
            <GlassPanel tone="dark" blur="md" radius="xl" className="author-panel">
              {author.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- owner-supplied asset, exact path kept
                <img
                  src={author.imageUrl}
                  alt={`Portrait of ${author.name}`}
                  className="author-portrait"
                  loading="lazy"
                />
              ) : (
                /* No portrait asset is documented — typographic monogram
                   instead of a fake photo. */
                <span className="author-monogram" aria-hidden="true">
                  {author.name
                    .split(" ")
                    .map((part) => part.slice(0, 1))
                    .join("")}
                </span>
              )}
              <div className="author-body">
                <p className="text-label">{author.role}</p>
                <h2 className="author-name text-display">{author.name}</h2>
                {author.alternateName && (
                  <p className="text-label author-alias">
                    Also known as {author.alternateName}
                  </p>
                )}
                {author.location && (
                  <p className="text-label author-location">
                    {author.location} · {author.studio}
                  </p>
                )}
                <div className="author-bio">
                  {author.bio.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)} className="text-secondary">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {author.links.length > 0 && (
                  <ul className="author-links" role="list" aria-label="Official links">
                    {author.links.map((link) => (
                      <li key={link.url}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary"
                          aria-label={`${link.label} (opens in a new tab)`}
                        >
                          {link.label} <span aria-hidden="true">↗</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </GlassPanel>
          </Reveal>
        </Container>
      </Section>

      <Section name="author-focus" className="section-tight">
        <Container>
          <Reveal>
            <SectionHeading kicker="Professional focus">
              Engineering focus
            </SectionHeading>
          </Reveal>
          <div className="author-focus-grid">
            {focusEntries.map((group, index) => (
              <Reveal key={group.label} delay={index * 0.06} size="sm">
                <div className="author-focus-item">
                  <h3 className="author-focus-label text-label">{group.label}</h3>
                  <ul
                    className="author-focus-tags"
                    role="list"
                    aria-label={`${group.label} skills`}
                  >
                    {group.items.map((item) => (
                      <li key={item}>
                        <Badge>{item}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section name="author-cta" className="section-tight">
        <Container>
          <Reveal>
            <div className="about-cta-row">
              <p className="text-secondary">
                Want to work with the studio? Start a project.
              </p>
              <Button href="/order" variant="primary">
                Start a Project
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </PageTransition>
  );
}
