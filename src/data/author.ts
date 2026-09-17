/**
 * Author / founder data — source of truth: info/person-author.md
 * (authoritative content file, together with the primary-creator section of
 * info/projects.md).
 *
 * Every name, role, summary, focus area and link below is transcribed from
 * that file. Nothing is inferred or invented
 * (Eagox-Studio-plan/09-ABOUT-AUTHOR.md, 11-CONTENT-DATA.md).
 *
 * Portrait: owner-supplied official profile image (exact URL, no generated
 * replacement) — used as the primary visual identity of the Author page and
 * referenced as the `image` property of the Person structured data.
 */

export type AuthorLink = {
  label: string;
  url: string;
};

export type FocusGroup = {
  /** Group heading as documented ("Software Engineering", …). */
  label: string;
  items: readonly string[];
};

export type AuthorProfile = {
  name: string;
  /** Documented alternate name. */
  alternateName: string | null;
  role: string;
  studio: string;
  location: string | null;
  /** Documented professional summary paragraphs. */
  bio: readonly string[];
  /** Owner-supplied official portrait URL; null when unavailable. */
  imageUrl: string | null;
  /** Approved external links only (info/person-author.md). */
  links: readonly AuthorLink[];
  /** Documented professional focus areas grouped as documented. */
  focus: readonly FocusGroup[];
};

export const author: AuthorProfile = {
  name: "Al Shahriar Sowan",
  alternateName: "Al Shahriar Sayon",
  role: "Founder & Lead Software Engineer",
  studio: "Eagox Studio",
  location: "Dhaka, Bangladesh",
  bio: [
    "Al Shahriar Sowan, also known as Al Shahriar Sayon, is an independent software engineer and product creator focused on building clean, low-latency, resilient, and practical software systems.",
    "His work spans AI applications, developer tooling, CLI software, desktop assistants, web applications, Linux/OS development, computer vision, games, cloud infrastructure, and custom digital products.",
    "He is the founder of Eagox Studio and the creator of the Seed Code ecosystem.",
  ],
  imageUrl:
    "https://raw.githubusercontent.com/Alshahriar-07/portfolio/refs/heads/main/me.png",
  links: [
    {
      label: "Portfolio",
      url: "https://alshahriarsayon.vercel.app/",
    },
    { label: "Eagox Studio", url: "https://eagoxstudio.vercel.app/" },
    { label: "GitHub", url: "https://github.com/Alshahriar-07/" },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/alshahriarsowan",
    },
  ],
  focus: [
    {
      label: "Software Engineering",
      items: [
        "TypeScript",
        "JavaScript",
        "Python",
        "C++",
        "SQL",
        "Shell",
      ],
    },
    {
      label: "Frontend Engineering",
      items: [
        "React",
        "Vite",
        "Tailwind CSS",
        "Motion",
        "Three.js",
        "Canvas API",
        "Responsive UI engineering",
        "Interactive web experiences",
      ],
    },
    {
      label: "Backend / Systems",
      items: [
        "Node.js",
        "Express",
        "WebSocket architectures",
        "Redis",
        "PostgreSQL",
        "Docker",
        "API integration",
        "Real-time systems",
      ],
    },
    {
      label: "AI Engineering",
      items: [
        "OpenRouter",
        "Google GenAI / Gemini",
        "Search grounding",
        "Function calling",
        "Multi-provider AI routing",
        "Local LLMs",
        "Ollama",
        "AI agents",
        "Developer AI tooling",
        "Desktop AI assistants",
      ],
    },
    {
      label: "Computer Vision",
      items: [
        "MediaPipe",
        "OpenCV",
        "Hand tracking",
        "Gesture recognition",
        "Real-time webcam processing",
      ],
    },
    {
      label: "Desktop / Mobile / OS",
      items: [
        "Windows desktop software",
        "Android",
        "Electron",
        "Tauri",
        "Debian",
        "Linux",
        "Debian live-build",
        "System-level tooling",
      ],
    },
    {
      label: "Other Areas",
      items: [
        "Game development",
        "CLI development",
        "Cloud tooling",
        "Developer infrastructure",
        "Automation",
        "Performance-oriented software",
      ],
    },
  ],
} as const;
