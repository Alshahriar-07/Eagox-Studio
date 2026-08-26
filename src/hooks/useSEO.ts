import { useEffect } from 'react';
import { PageId } from '../types';

export interface SEOData {
  title: string;
  description: string;
  canonicalPath: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: 'website' | 'article';
  twitterCard: 'summary_large_image' | 'summary';
  jsonLd?: object;
  robots?: string;
}

const BASE_URL = 'https://eagoxstudio.vercel.app';
const OG_IMAGE = `${BASE_URL}/og-image.png`;
const SITE_NAME = 'Eagox Studio';
const CREATOR_TWITTER = '@alshahriarsowan';
const SITE_TWITTER = '@eagoxstudio';

const pageSEO: Record<PageId, SEOData> = {
  home: {
    title: 'Eagox Studio — Software, AI & Digital Products by Al Shahriar Sowan',
    description: 'Eagox Studio builds high-performance software systems, AI tools, and developer infrastructure. Founded by Al Shahriar Sowan — creator of Seed Code CLI, Seed Code Chat, and the Seed Code ecosystem.',
    canonicalPath: '/',
    ogTitle: 'Eagox Studio — Software, AI & Digital Products by Al Shahriar Sowan',
    ogDescription: 'Eagox Studio builds high-performance software systems, AI tools, and developer infrastructure. Founded by Al Shahriar Sowan — creator of Seed Code CLI, Seed Code Chat, and the Seed Code ecosystem.',
    ogImage: OG_IMAGE,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  },
  about: {
    title: 'About Eagox Studio — Engineering Philosophy & Technology Stack',
    description: 'Learn about Eagox Studio\'s engineering philosophy, four-phase development methodology, and core technology matrix. Founded by Al Shahriar Sowan in Dhaka, Bangladesh.',
    canonicalPath: '/about',
    ogTitle: 'About Eagox Studio — Engineering Philosophy & Technology Stack',
    ogDescription: 'Eagox Studio\'s engineering manifesto: sub-millisecond speed, strict architectural safety, and verified AI grounding. Founded by Al Shahriar Sowan.',
    ogImage: OG_IMAGE,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    robots: 'index, follow',
  },
  projects: {
    title: 'Projects & Products — Seed Code CLI, Seed Code Chat, EAGOX AI Hub & More',
    description: 'Explore Eagox Studio\'s 9 public software systems: Seed Code CLI, Seed Code Chat, Mr Bean Run, ChayaNix OS, Hmouse, Seed Cloud, EAGOX AI Hub, The Crafting Table, and Eagox Timer.',
    canonicalPath: '/projects',
    ogTitle: 'Projects & Products — Eagox Studio Software Suite',
    ogDescription: 'Discover 9 production-ready software systems from Eagox Studio including Seed Code CLI, Seed Code Chat, and EAGOX AI Hub.',
    ogImage: OG_IMAGE,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    robots: 'index, follow',
  },
  author: {
    title: 'Al Shahriar Sowan — Founder & Lead Engineer, Eagox Studio',
    description: 'Al Shahriar Sowan (also known as Al Shahriar Sayon) is the founder and lead engineer at Eagox Studio. Creator of Seed Code CLI, Seed Code Chat, ChayaNix OS, and multiple production systems.',
    canonicalPath: '/author',
    ogTitle: 'Al Shahriar Sowan — Founder & Lead Engineer, Eagox Studio',
    ogDescription: 'Founder of Eagox Studio and creator of Seed Code ecosystem. Full-stack engineer specializing in AI systems, developer tooling, and distributed architectures.',
    ogImage: OG_IMAGE,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    robots: 'index, follow',
  },
  contact: {
    title: 'Contact Eagox Studio — Project Inquiries & Direct Communication',
    description: 'Get in touch with Eagox Studio for custom software projects, AI applications, web development, or partnership inquiries. Direct email, WhatsApp, and contact form available.',
    canonicalPath: '/contact',
    ogTitle: 'Contact Eagox Studio — Project Inquiries & Direct Communication',
    ogDescription: 'Contact Eagox Studio for custom software development, AI applications, and engineering partnerships. Response within 24 hours.',
    ogImage: OG_IMAGE,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    robots: 'index, follow',
  },
  order: {
    title: 'Order Custom Software — Transparent Pricing & Project Configuration',
    description: 'Configure your custom software project with transparent BDT pricing. Select service type, modular add-ons, timeline, and submit your technical brief directly to Al Shahriar Sowan.',
    canonicalPath: '/order',
    ogTitle: 'Order Custom Software — Transparent Pricing & Project Configuration',
    ogDescription: 'Build your project brief with Eagox Studio\'s interactive configurator. Transparent pricing in BDT, modular add-ons, direct submission to lead engineer.',
    ogImage: OG_IMAGE,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    robots: 'index, follow',
  },
  faq: {
    title: 'FAQ & Knowledge Base — Eagox Studio Support',
    description: 'Frequently asked questions about Eagox Studio\'s services, pricing, delivery timelines, technology stack, IP ownership, and post-launch support.',
    canonicalPath: '/faq',
    ogTitle: 'FAQ & Knowledge Base — Eagox Studio Support',
    ogDescription: 'Answers to common questions about Eagox Studio project orders, pricing, timelines, technology stack, and support channels.',
    ogImage: OG_IMAGE,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    robots: 'index, follow',
  },
};

function setMetaTag(name: string, content: string, isProperty = false): void {
  const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let element = document.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    if (isProperty) {
      element.setAttribute('property', name);
    } else {
      element.setAttribute('name', name);
    }
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setLinkTag(rel: string, href: string, attributes?: Record<string, string>): void {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  }
}

function removeMetaTag(name: string, isProperty = false): void {
  const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  const element = document.querySelector(selector);
  if (element) element.remove();
}

function setJSONLD(data: object): void {
  const id = 'dynamic-json-ld';
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data, null, 2);
}

function removeJSONLD(): void {
  const script = document.getElementById('dynamic-json-ld');
  if (script) script.remove();
}

export function useSEO(page: PageId, additionalJsonLd?: object): void {
  const seo = pageSEO[page];

  useEffect(() => {
    const canonicalUrl = `${BASE_URL}${seo.canonicalPath}`;

    // Title
    document.title = seo.title;

    // Core meta
    setMetaTag('description', seo.description);
    setMetaTag('robots', seo.robots || 'index, follow');
    setMetaTag('theme-color', '#09090b', false);

    // Canonical
    setLinkTag('canonical', canonicalUrl);

    // Open Graph
    setMetaTag('og:type', seo.ogType, true);
    setMetaTag('og:site_name', SITE_NAME, true);
    setMetaTag('og:title', seo.ogTitle, true);
    setMetaTag('og:description', seo.ogDescription, true);
    setMetaTag('og:url', canonicalUrl, true);
    setMetaTag('og:image', seo.ogImage, true);
    setMetaTag('og:image:secure_url', seo.ogImage, true);
    setMetaTag('og:image:type', 'image/png', true);
    setMetaTag('og:image:width', '1200', true);
    setMetaTag('og:image:height', '630', true);
    setMetaTag('og:image:alt', `Eagox Studio — ${seo.ogTitle}`, true);

    // Twitter / X
    setMetaTag('twitter:card', seo.twitterCard);
    setMetaTag('twitter:site', SITE_TWITTER);
    setMetaTag('twitter:creator', CREATOR_TWITTER);
    setMetaTag('twitter:title', seo.ogTitle);
    setMetaTag('twitter:description', seo.ogDescription);
    setMetaTag('twitter:image', seo.ogImage);
    setMetaTag('twitter:image:alt', `Eagox Studio — ${seo.ogTitle}`);

    // JSON-LD (page-specific additions)
    if (additionalJsonLd) {
      setJSONLD(additionalJsonLd);
    }

    // Cleanup
    return () => {
      removeJSONLD();
    };
  }, [page, additionalJsonLd]);
}

export { pageSEO, BASE_URL, OG_IMAGE };