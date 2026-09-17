import type { Metadata } from "next";
import { PageTransition } from "@/components/motion/PageTransition";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { Reveal } from "@/components/motion/Reveal";
import { productCategories, siteConfig, studioProductFamilies } from "@/data/site";
import { pageOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About the Studio",
  description:
    "Eagox Studio is a software engineering and digital-product studio founded in 2024 in Dhaka, Bangladesh — building high-performance software systems, AI tools, developer infrastructure, websites, web apps and desktop software.",
  alternates: { canonical: "/about" },
  openGraph: pageOpenGraph({
    title: "About the Studio",
    description:
      "Eagox Studio is a software engineering and digital-product studio building high-performance software systems, AI tools, developer infrastructure and custom digital products.",
    path: "/about",
  }),
};

const APPROACH = [
  {
    step: "01",
    title: "Design",
    text: "Every product starts from its purpose — interfaces are shaped around it.",
  },
  {
    step: "02",
    title: "Engineer",
    text: "Modern stacks, clean architecture, code that stays maintainable.",
  },
  {
    step: "03",
    title: "Ship",
    text: "Working releases on the web, the desktop and Android.",
  },
] as const;

/**
 * About page per 09-ABOUT-AUTHOR.md, populated from documented studio facts
 * (info/projects.md — Eagox Studio section). A studio profile built only from
 * documented facts: no invented history, team size, clients or metrics.
 */
export default function AboutPage() {
  return (
    <PageTransition>
      <Section name="about-intro" className="page-top">
        <Container>
          <SectionHeading kicker="About" level={1}>
            A studio that ships
          </SectionHeading>
          <p className="page-intro text-secondary">
            {siteConfig.name} is a software engineering and digital-product
            studio founded by {siteConfig.founder} in {siteConfig.founded},
            based in {siteConfig.location}.
          </p>
        </Container>
      </Section>

      <Section name="about-statement" className="section-tight">
        <Container>
          <Reveal>
            <GlassPanel tone="dark" blur="md" radius="xl" className="about-panel">
              <p className="statement-text">
                We work across the <em className="statement-accent">web</em>, the{" "}
                <em className="statement-accent">desktop</em> and{" "}
                <em className="statement-accent">Android</em> — designing,
                engineering and shipping products from first sketch to working
                release.
              </p>
              <ul className="hero-categories about-panel-categories" role="list">
                {productCategories.map((category) => (
                  <li key={category}>
                    <Badge>{category}</Badge>
                  </li>
                ))}
              </ul>
            </GlassPanel>
          </Reveal>
        </Container>
      </Section>

      <Section name="about-what-we-build" className="section-tight">
        <Container>
          <Reveal>
            <SectionHeading kicker="What Eagox Studio is">
              A studio, and an umbrella for its products
            </SectionHeading>
          </Reveal>
          <div className="about-columns">
            <Reveal size="sm">
              <div className="about-column">
                <h3 className="about-column-title">What the studio builds</h3>
                <p className="text-secondary">
                  Eagox Studio focuses on high-performance software systems, AI
                  tools, developer infrastructure, custom websites, web
                  applications, mobile applications, desktop software, and
                  experimental products.
                </p>
              </div>
            </Reveal>
            <Reveal size="sm" delay={0.08}>
              <div className="about-column">
                <h3 className="about-column-title">Product families</h3>
                <p className="text-secondary">
                  The studio acts as the umbrella around the Seed Code ecosystem
                  and several independent software projects.
                </p>
                <ul className="hero-categories about-panel-categories" role="list">
                  {studioProductFamilies.map((family) => (
                    <li key={family}>
                      <Badge>{family}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section name="about-main-areas" className="section-tight">
        <Container>
          <Reveal>
            <SectionHeading kicker="Main areas">
              Documented capabilities
            </SectionHeading>
          </Reveal>
          <ul className="about-areas-grid" role="list">
            {siteConfig.mainAreas.map((area, index) => (
              <Reveal key={area} delay={index * 0.04} size="sm" as="li">
                <div className="about-area-item">
                  <span className="about-area-index text-label" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-secondary">{area}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section name="about-approach" className="section-tight">
        <Container>
          <Reveal>
            <SectionHeading kicker="How we build">
              Design. Engineer. Ship.
            </SectionHeading>
          </Reveal>
          <div className="about-approach-grid">
            {APPROACH.map((item, index) => (
              <Reveal key={item.step} delay={index * 0.08} size="sm">
                <div className="about-approach-item">
                  <span className="about-approach-step text-label">{item.step}</span>
                  <h3 className="about-approach-title">{item.title}</h3>
                  <p className="text-secondary">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section name="about-founder" className="section-tight">
        <Container>
          <Reveal>
            <div className="about-founder-row">
              <div>
                <p className="text-label">{siteConfig.founderRole}</p>
                <h3 className="about-founder-name">{siteConfig.founder}</h3>
                <p className="text-secondary about-founder-text">
                  The studio&apos;s founder and lead engineer — creator of the
                  Seed Code ecosystem.
                </p>
              </div>
              <Button href="/author" variant="secondary">
                Meet the author <span aria-hidden="true">→</span>
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section name="about-cta" className="section-tight">
        <Container>
          <Reveal>
            <div className="about-cta-row">
              <p className="text-secondary">
                Have a product in mind? Start the conversation.
              </p>
              <div className="hero-ctas">
                <Button href="/order" variant="primary">
                  Start a Project
                </Button>
                <Button href="/projects" variant="ghost">
                  See the work
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </PageTransition>
  );
}
