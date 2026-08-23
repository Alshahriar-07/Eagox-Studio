export type PageId = 'home' | 'about' | 'projects' | 'author' | 'contact' | 'order' | 'faq';

export type ProjectCategory = 'all' | 'ai-cli' | 'web-saas' | 'mobile-desktop' | 'interactive';

export type ProjectSortOption = 'featured' | 'updated' | 'stars' | 'alphabetical';

export interface ArchitectureLayer {
  layer: string;
  tech: string;
  description: string;
}

export interface GitHubRepoStats {
  repoKey: string;
  name: string;
  fullName: string;
  stars: number;
  forks: number;
  openIssues: number;
  watchers: number;
  primaryLanguage: string | null;
  description: string | null;
  lastUpdated: string;
  pushedAt?: string;
  createdAt?: string;
  repoUrl: string;
  homepage: string | null;
  isArchived: boolean;
  license: string | null;
  sizeKb: number;
  defaultBranch: string;
  verified: boolean;
  fetchedAt: number;
}

export interface VerifiedHighlight {
  label: string;
  value: string;
  detail: string;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  category: 'ai-cli' | 'web-saas' | 'mobile-desktop' | 'interactive';
  categoryLabel: string;
  status: 'Production' | 'Active Release' | 'Open Source' | 'Enterprise' | 'In Development';
  featured?: boolean;
  rank?: number;
  
  // Real Information & Descriptions
  description: string;
  longDescription?: string;
  fullOverview: string;
  problemSolved?: string;
  version: string;
  
  // Repos & Verified URLs
  githubRepo?: string; // e.g. "Alshahriar-07/seedcode-cli"
  githubUrl?: string;
  websiteUrl?: string;
  mobileAppUrl?: string;
  liveDemoUrl?: string;
  documentationUrl?: string;
  packageUrl?: string;
  
  // Tech details
  primaryLanguage?: string;
  technologies?: string[];
  techStack: string[];
  frameworks?: string[];
  deploymentPlatform?: string;
  
  // Real verified features
  features: string[];
  
  // Architecture
  architecture?: ArchitectureLayer[];
  architectureHighlights: string[];
  
  // Interactive preview type
  
  // Fallback verified stats (when GitHub API is offline or not a public repo)
  baselineStats?: {
    stars?: number;
    forks?: number;
    openIssues?: number;
    primaryLanguage?: string;
    lastUpdated?: string;
    license?: string;
  };

  // Backward compatible stats
  stats: {
    label: string;
    value: string;
  }[];
  verifiedHighlights?: VerifiedHighlight[];
}

export interface ServiceOption {
  id: string;
  title: string;
  subtitle: string;
  basePrice: number;
  estimatedWeeks: string;
  description: string;
  deliverables: string[];
  iconName: string;
}

export interface AddOnOption {
  id: string;
  title: string;
  price: number;
  description: string;
}

export interface OrderFormState {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budgetTier: string;
  timeline: string;
  requirements: string;
  selectedAddOns: string[];
}

export interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface TelemetryNode {
  id: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  ping: string;
  status: 'Optimal' | 'Online' | 'Routing';
}

export interface FAQItem {
  id: string;
  category: 'orders' | 'pricing' | 'tech' | 'support' | 'delivery';
  question: string;
  answer: string;
}
