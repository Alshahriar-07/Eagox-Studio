/**
 * Projects — source of truth: info/projects.md (authoritative content file).
 *
 * Every name, description, type, status, technology, feature and URL below is
 * transcribed from that file. Fields that are not documented for a project are
 * null/empty — nothing is invented (Eagox-Studio-plan/11-CONTENT-DATA.md).
 *
 * `categories` maps the documented type/platform onto the site's existing
 * filter system (Websites / Web Apps / Desktop / Android) so projects can
 * appear under more than one filter when documented (e.g. Seed Code Chat
 * targets Web + Android). The documented wording is preserved in `type`.
 */

export type ProjectCategory = "Websites" | "Web Apps" | "Desktop" | "Android";

export type ProjectLink = {
  /** Short, accessible link label. */
  label: string;
  /** Exact URL as documented in info/projects.md. */
  url: string;
};

export type Project = {
  /** Unique slug used for keys and potential detail routes. */
  slug: string;
  name: string;
  /** Documented "Type" line from info/projects.md. */
  type: string;
  /** Documented description (opening of the documented About section). */
  description: string;
  /** Filter categories mapped from the documented type/platform. */
  categories: readonly ProjectCategory[];
  /** Eagox-owned product vs client project (02-SITE-ARCHITECTURE.md). */
  ownership: "eagox" | "client";
  /** Only if documented. */
  status: string | null;
  /** Only if documented. */
  version: string | null;
  /** Only if documented. */
  license: string | null;
  /** Documented platform/target line, if any. */
  platforms: string | null;
  /** Documented languages/technologies; empty when not documented. */
  technologies: readonly string[];
  /** Documented key features; empty when not documented. */
  features: readonly string[];
  /** Disclosure label for the features list. */
  featuresLabel: string;
  /** Every external link documented for the project. */
  links: readonly ProjectLink[];
};

export const projects: readonly Project[] = [
  {
    slug: "eagox-studio",
    name: "Eagox Studio",
    type: "Software engineering studio / digital product studio",
    description:
      "Eagox Studio is a software engineering and digital-product studio founded by Al Shahriar Sowan. It focuses on high-performance software systems, AI tools, developer infrastructure, custom websites, web applications, mobile applications, desktop software, and experimental products.",
    categories: ["Websites"],
    ownership: "eagox",
    status: null,
    version: null,
    license: null,
    platforms: null,
    technologies: [],
    features: [
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
    featuresLabel: "Main areas",
    links: [
      { label: "Website", url: "https://eagoxstudio.vercel.app/" },
      { label: "GitHub", url: "https://github.com/Alshahriar-07" },
      {
        label: "Founder Portfolio",
        url: "https://alshriarsowan.vercel.app/",
      },
    ],
  },
  {
    slug: "seed-code-cli",
    name: "Seed Code CLI",
    type: "AI coding CLI / developer tool",
    description:
      "Seed Code CLI is a terminal-based AI coding assistant designed to work directly with software projects. It combines AI model routing, autonomous coding workflows, terminal interaction, Git assistance, configuration management, and streamed responses.",
    categories: ["Desktop"],
    ownership: "eagox",
    status: null,
    version: "v6.1.5",
    license: "MIT",
    platforms: null,
    technologies: ["Python"],
    features: [
      "Multi-provider AI routing",
      "OpenRouter support",
      "FreeModel support",
      "AeroLink support",
      "Ollama/local-model support",
      "Autonomous agent workflows",
      "Read, create, and modify project files",
      "Terminal command execution",
      "Git workflow assistance",
      "Diff analysis",
      "Branch-state checks",
      "Commit-draft assistance",
      "Persistent conversation memory",
      "Encrypted provider/API configuration",
      "Streaming model responses",
      "Syntax-highlighted Markdown output",
    ],
    featuresLabel: "Key features",
    links: [
      { label: "GitHub", url: "https://github.com/Alshahriar-07/seedcode-cli" },
      { label: "Project Site", url: "https://seedcode-web.vercel.app/" },
    ],
  },
  {
    slug: "seed-code-chat",
    name: "Seed Code Chat",
    type: "Conversational AI platform",
    description:
      "Seed Code Chat is a modern conversational AI platform built as part of the Seed Code ecosystem. It provides a responsive chat interface with real-time streaming, multi-model support, local conversation history, and developer-oriented code rendering.",
    categories: ["Web Apps", "Android"],
    ownership: "eagox",
    status: null,
    version: null,
    license: null,
    platforms: "Web + Android",
    technologies: ["JavaScript/TypeScript", "React"],
    features: [
      "Token-by-token real-time streaming using SSE",
      "Web and Android-oriented architecture",
      "Syntax-highlighted code blocks",
      "One-click code copy/download workflows",
      "Persistent local conversation history",
      "Multi-model provider support",
      "OpenRouter integration",
      "FreeModel integration",
      "High-contrast responsive interface",
      "Mobile-focused ergonomics",
    ],
    featuresLabel: "Key features",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Alshahriar-07/seedcode-chat",
      },
      { label: "Web App", url: "https://seedcode-chat.vercel.app/" },
      { label: "Android App", url: "https://seedcode-app.vercel.app/" },
    ],
  },
  {
    slug: "eagox-ai-hub",
    name: "EAGOX AI Hub",
    type: "All-in-one AI tools platform",
    description:
      "EAGOX AI Hub is an AI workbench that brings multiple AI utilities into a single browser-based platform. It focuses on AI-assisted coding, prompt experimentation, live search grounding, and practical productivity tools.",
    categories: ["Web Apps"],
    ownership: "eagox",
    status: null,
    version: null,
    license: null,
    platforms: null,
    technologies: ["TypeScript", "React"],
    features: [
      "Multi-utility AI workbench",
      "Google Gemini API integration",
      "Live Google Search grounding",
      "Search-grounded answers with citations",
      "Code analysis",
      "Code translation",
      "Code refactoring",
      "Prompt templating/workbench",
      "Instant parameter testing",
      "Export to JSON",
      "Export to Markdown",
      "Clipboard export workflows",
    ],
    featuresLabel: "Key features",
    links: [{ label: "Live Demo", url: "https://eagox-tool-hub.vercel.app/" }],
  },
  {
    slug: "chayanix-os",
    name: "ChayaNix OS",
    type: "Debian-based Linux distribution",
    description:
      "ChayaNix OS is a lightweight Debian-based Linux distribution designed around privacy, efficiency, development tooling, and reproducible system building.",
    categories: ["Desktop"],
    ownership: "eagox",
    status: null,
    version: null,
    license: null,
    platforms: null,
    technologies: ["Shell", "Python"],
    features: [
      "Debian stable base",
      "Low idle-memory footprint target",
      "Developer tools preconfigured",
      "GCC",
      "Clang",
      "Python 3",
      "Node.js",
      "Git",
      "Neovim",
      "Automated Debian live-build scripts",
      "Reproducible ISO-generation workflow",
      "Hardened security defaults",
      "Sandboxed daemons",
      "Strict firewall profiles",
      "Lightweight window-management approach",
      "Custom keybindings and system-status metrics",
    ],
    featuresLabel: "Key features",
    links: [
      { label: "GitHub", url: "https://github.com/Alshahriar-07/ChayaNix" },
    ],
  },
  {
    slug: "mr-bean-run",
    name: "Mr Bean Run",
    type: "2D physics endless-runner game",
    description:
      "Mr Bean Run is a 2D endless-runner project built around a custom kinematics/physics system and HTML5 Canvas web delivery.",
    categories: ["Web Apps", "Desktop"],
    ownership: "eagox",
    status: null,
    version: null,
    license: null,
    platforms: "Web / Windows / Linux / macOS",
    technologies: ["Python", "JavaScript"],
    features: [
      "Custom gravity simulation",
      "Inertia curves",
      "Variable jump heights",
      "Procedural obstacle generation",
      "Deterministic seeded obstacle spacing",
      "Progressive speed curves",
      "Web Audio API procedural sound",
      "Desktop keyboard controls",
      "Mobile touch controls",
      "Real-time collision detection",
      "Spatial bounding-box adjustments",
      "60 FPS-oriented gameplay target",
    ],
    featuresLabel: "Key features",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Alshahriar-07/mr-bean-game",
      },
      { label: "Live Demo", url: "https://mrbeanrun.vercel.app/" },
    ],
  },
  {
    slug: "hmouse",
    name: "Hmouse",
    type: "Computer-vision virtual air mouse",
    description:
      "Hmouse is a webcam-based hand-gesture cursor-control system. It uses computer vision to translate hand movement and gestures into mouse interaction without requiring dedicated hardware.",
    categories: ["Desktop"],
    ownership: "eagox",
    status: null,
    version: null,
    license: null,
    platforms: "Windows / Linux",
    technologies: ["Python"],
    features: [
      "3D hand-landmark tracking",
      "MediaPipe-based hand tracking",
      "OpenCV webcam processing",
      "Cursor movement stabilization",
      "Exponential smoothing",
      "Kalman-style damping",
      "Pinch-to-click detection",
      "Two-finger scrolling",
      "Standard webcam support",
      "No dedicated gesture-control hardware required",
    ],
    featuresLabel: "Key features",
    links: [
      { label: "GitHub", url: "https://github.com/Alshahriar-07/Hmouse" },
    ],
  },
  {
    slug: "seed-cloud",
    name: "Seed Cloud",
    type: "Multi-cloud storage aggregator / encrypted file router",
    description:
      "Seed Cloud is designed as a unified cloud-storage layer capable of connecting multiple storage providers through one interface. It is intended to simplify cross-cloud search, file movement, encryption, and file preview.",
    categories: ["Web Apps"],
    ownership: "eagox",
    status: "In development",
    version: null,
    license: null,
    platforms: null,
    technologies: ["JavaScript"],
    features: [
      "Google Drive connector architecture",
      "AWS S3 connector architecture",
      "Dropbox connector architecture",
      "Unified cross-cloud search",
      "Multi-account indexing",
      "Client-side AES-256 encryption concept",
      "Cloud-to-cloud migration workflows",
      "File movement without unnecessary local intermediary downloads",
      "Responsive file browser",
      "Video preview",
      "Audio preview",
      "Code-file preview",
    ],
    featuresLabel: "Key features",
    links: [
      { label: "GitHub", url: "https://github.com/Alshahriar-07/SeedCloud" },
      { label: "Live", url: "https://seedcloud.vercel.app/" },
    ],
  },
  {
    slug: "the-crafting-table",
    name: "The Crafting Table",
    type: "Minecraft-inspired papercraft store / showcase",
    description:
      "The Crafting Table is a Minecraft-inspired web experience focused on custom paper characters, papercraft showcases, character categories, commissions, and printable assembly resources.",
    categories: ["Websites"],
    ownership: "eagox",
    status: null,
    version: null,
    license: null,
    platforms: null,
    technologies: ["JavaScript"],
    features: [
      "Minecraft-inspired voxel visual language",
      "Pixel-crisp iconography",
      "Interactive papercraft character showcase",
      "Category filtering",
      "Custom character commission workflow",
      "Instant notification workflow",
      "Printable schematic guides",
      "Step-by-step assembly diagrams",
      "High-performance static web delivery",
    ],
    featuresLabel: "Key features",
    links: [
      {
        label: "Live Demo",
        url: "https://the-crafting-table.vercel.app/",
      },
    ],
  },
  {
    slug: "eagox-timer",
    name: "Eagox Timer & Focus Suite",
    type: "Developer productivity timer / Pomodoro utility",
    description:
      "Eagox Timer is a lightweight productivity utility built around accurate timing, developer-friendly keyboard controls, and offline-first behavior.",
    categories: ["Web Apps"],
    ownership: "eagox",
    status: null,
    version: null,
    license: null,
    platforms: null,
    technologies: ["JavaScript"],
    features: [
      "Stopwatch mode",
      "Pomodoro/interval mode",
      "Countdown mode",
      "Background Web Worker timing",
      "Resistance to normal browser timer throttling",
      "Web Audio interval notifications",
      "Keyboard shortcuts",
      "Space — Start/Stop",
      "R — Reset",
      "L — Lap",
      "Offline-first design",
      "No tracking",
      "No cookies",
      "Lightweight implementation",
    ],
    featuresLabel: "Key features",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Alshahriar-07/eagoxTimer",
      },
      { label: "Live Demo", url: "https://eagox-timer.vercel.app/" },
    ],
  },
  {
    slug: "dorkey",
    name: "Dorkey",
    type: "Typing speed test / typing practice platform",
    description:
      "Dorkey is a PC-focused typing speed test project designed around a premium, responsive, neumorphic interface and a distraction-free typing experience.",
    categories: ["Websites"],
    ownership: "eagox",
    status: null,
    version: null,
    license: null,
    platforms: null,
    technologies: ["HTML", "CSS", "JavaScript"],
    features: [
      "1 / 2 / 3 / 5 / 10 minute modes",
      "Large collection of typing passages",
      "Long-form paragraphs",
      "Progress begins after the user starts typing",
      "Correct characters shown in green",
      "Incorrect characters shown in red",
      "Scrollable passage container",
      "Moving typing cursor",
      "WPM/result calculation",
      "Result certificate artwork",
      "Rank/tier system",
    ],
    featuresLabel: "Typing test features",
    links: [
      { label: "GitHub", url: "https://github.com/Alshahriar-07/Dorkey" },
      { label: "Target Site", url: "https://dorkey.vercel.app/" },
    ],
  },
  {
    slug: "colum",
    name: "COLUM",
    type: "Windows desktop AI assistant",
    description:
      "COLUM is a Windows JARVIS-style desktop assistant project. It combines a Python backend with an HTML/CSS/JavaScript interface and an AI provider layer.",
    categories: ["Desktop"],
    ownership: "eagox",
    status: null,
    version: null,
    license: null,
    platforms: "Windows",
    technologies: ["Python", "HTML", "CSS", "JavaScript"],
    features: [
      "Windows desktop assistant",
      "Wake phrase: Colum",
      "Idle auto-off behavior",
      "OpenRouter-based AI brain",
      "Python backend",
      "HTML/CSS/JavaScript frontend",
      "Multiple AI provider configuration",
      "Model selection per bot/provider",
      "Custom OpenAI-compatible base URL support",
      "Desktop-control capabilities",
      "Structured permission system",
      "Confirmation for sensitive actions",
      "Security/permission handling",
      "Installer/release workflow",
    ],
    featuresLabel: "Key features",
    links: [
      { label: "GitHub", url: "https://github.com/Alshahriar-07/COLUM" },
    ],
  },
  {
    slug: "tritech",
    name: "Tritech Computers and Engineering",
    type: "Business website / technology company website",
    description:
      "Tritech Computers and Engineering is a website project associated with a computer and engineering business brand. The project was being redesigned toward a premium neumorphism-based visual identity.",
    categories: ["Websites"],
    ownership: "client",
    status: null,
    version: null,
    license: null,
    platforms: null,
    technologies: [],
    features: [
      "Premium neumorphism",
      "Modern technology-business presentation",
      "Custom branding",
      "Logo/banner assets",
      "Responsive website structure",
    ],
    featuresLabel: "Design direction",
    links: [
      { label: "GitHub", url: "https://github.com/Alshahriar-07/tritech" },
      { label: "Website", url: "https://tritechbd.vercel.app/" },
    ],
  },
  {
    slug: "shahina-naznin-neha-portfolio",
    name: "Shahina Naznin Neha — Official Portfolio",
    type: "Personal portfolio website project",
    description:
      "A premium portfolio website project created for Shahina Naznin Neha. The design direction is centered around a white-dominant Apple/Vercel-style glassmorphism interface with translucent layers, interactive motion, bilingual content, and a cinematic visual background.",
    categories: ["Websites"],
    ownership: "client",
    status: null,
    version: null,
    license: null,
    platforms: null,
    technologies: [],
    features: [
      "Premium glassmorphism",
      "White-dominant Apple/Vercel-inspired interface",
      "Translucent UI layers",
      "Interactive navigation",
      "Cursor/reveal interactions",
      "Intro/loading animation",
      "Page transitions",
      "English + Bangla content",
      "Hind Siliguri typography support",
      "Cinematic background video",
      "Full-frame background-video presentation rather than aggressive cropping",
    ],
    featuresLabel: "Design & experience",
    links: [
      {
        label: "Portfolio",
        url: "https://shahinanazninneha.vercel.app/",
      },
      { label: "GitHub", url: "https://github.com/nazninneha19" },
      { label: "Email", url: "mailto:shahinanaznin80@gmail.com" },
    ],
  },
] as const;

/**
 * Curated homepage selection (06-HOME-PAGE.md): documented Eagox-owned
 * products with live destinations, spanning developer tools, AI platforms
 * and web utilities.
 */
const FEATURED_SLUGS = [
  "seed-code-cli",
  "seed-code-chat",
  "eagox-ai-hub",
  "eagox-timer",
] as const;

export const featuredProjects: readonly Project[] = FEATURED_SLUGS.map(
  (slug) => {
    const project = projects.find((candidate) => candidate.slug === slug);
    if (!project) {
      throw new Error(`Featured project slug not found: ${slug}`);
    }
    return project;
  },
);
