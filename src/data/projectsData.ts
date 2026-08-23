import { Project, ServiceOption, AddOnOption, TelemetryNode } from '../types';

export const TELEMETRY_NODES: TelemetryNode[] = [
  {
    id: 'bd-dhaka',
    city: 'Dhaka',
    country: 'Bangladesh (HQ Hub)',
    lat: 23.6850,
    lng: 90.3563,
    ping: '2ms',
    status: 'Optimal',
  },
  {
    id: 'sg-singapore',
    city: 'Singapore',
    country: 'Singapore',
    lat: 1.3521,
    lng: 103.8198,
    ping: '34ms',
    status: 'Optimal',
  },
  {
    id: 'de-frankfurt',
    city: 'Frankfurt',
    country: 'Germany',
    lat: 50.1109,
    lng: 8.6821,
    ping: '118ms',
    status: 'Optimal',
  },
  {
    id: 'us-siliconvalley',
    city: 'San Jose',
    country: 'United States',
    lat: 37.3861,
    lng: -122.0839,
    ping: '184ms',
    status: 'Routing',
  },
  {
    id: 'jp-tokyo',
    city: 'Tokyo',
    country: 'Japan',
    lat: 35.6762,
    lng: 139.6503,
    ping: '78ms',
    status: 'Optimal',
  },
  {
    id: 'uk-london',
    city: 'London',
    country: 'United Kingdom',
    lat: 51.5074,
    lng: -0.1278,
    ping: '124ms',
    status: 'Optimal',
  },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'seedcode-cli',
    slug: 'seedcode-cli',
    name: 'Seed Code CLI',
    tagline: 'Production-ready AI coding CLI with multi-model routing & autonomous agent mode',
    category: 'ai-cli',
    categoryLabel: 'CLI & AI Tooling',
    status: 'Active Release',
    featured: true,
    rank: 1,
    description: 'An open-source, production-ready AI coding command-line interface supporting OpenRouter, FreeModel, AeroLink, and Ollama with autonomous multi-file agent execution.',
    longDescription: 'Seed Code CLI brings intelligent coding workflows directly into the developer terminal. Engineered in Python 3.12+, it features a resilient multi-provider router allowing seamless switching between local and remote LLM backends, conversational memory, streaming AST-aware token formatting, and automated Git diff generation.',
    fullOverview: 'Seed Code CLI is designed from the ground up for developers who demand high throughput in terminal environments without bloated web wrappers. It includes an autonomous agent mode that can inspect project directories, read and modify code files, execute build and test commands, and manage Git staging automatically.',
    problemSolved: 'Eliminates the friction of switching between browser AI chats and IDEs by bringing multi-provider AI agents directly into the terminal shell with automated file operations and zero telemetry.',
    version: 'v2.4.0',
    githubRepo: 'Alshahriar-07/seedcode-cli',
    githubUrl: 'https://github.com/Alshahriar-07/seedcode-cli',
    websiteUrl: 'https://seedcode-web.vercel.app/',
    liveDemoUrl: 'https://seedcode-web.vercel.app/',
    documentationUrl: 'https://github.com/Alshahriar-07/seedcode-cli#readme',
    primaryLanguage: 'Python',
    deploymentPlatform: 'PyPI / GitHub Releases',
    technologies: ['Python 3.12+', 'OpenRouter API', 'Ollama (Local)', 'FreeModel.dev', 'AeroLink', 'Rich CLI', 'GitPython', 'Asyncio'],
    techStack: ['Python', 'OpenRouter API', 'Ollama', 'Rich CLI', 'GitPython', 'Asyncio'],
    frameworks: ['Rich Terminal', 'Asyncio', 'Pydantic'],
    features: [
      'Multi-provider AI routing (OpenRouter, FreeModel, AeroLink, Ollama)',
      'Autonomous Agent Mode for reading, modifying, and creating codebase files',
      'Integrated terminal command execution and test runners',
      'Automated Git workflow assistance (diff analysis, branch checks, commit drafts)',
      'Independent provider configurations, API key encryption, and persistent conversation memory',
      'Real-time token streaming with syntax-highlighted terminal Markdown rendering'
    ],
    architecture: [
      {
        layer: 'Interface Layer',
        tech: 'Rich CLI / Prompt Toolkit',
        description: 'ANSI syntax formatting, reactive input prompts, spinner animations, and terminal Markdown rendering.'
      },
      {
        layer: 'Agent & Command Engine',
        tech: 'Python Asyncio Core',
        description: 'Orchestrates file system operations, command execution sub-processes, and conversation memory buffers.'
      },
      {
        layer: 'AI Provider Gateway',
        tech: 'OpenRouter / Ollama / FreeModel Adapters',
        description: 'Abstracted provider interface with token streaming, rate limit backoff, and fallback failover.'
      },
      {
        layer: 'Local Storage & Config',
        tech: 'Encrypted JSON Keyring',
        description: 'Stores model preferences, API tokens, and project session history locally on disk.'
      }
    ],
    architectureHighlights: [
      'Abstracted LLM Provider Strategy pattern for pluggable models',
      'Streaming parser with live syntax highlighting and chunked terminal output',
      'Sub-process execution sandbox with user confirmation gates'
    ],
    stats: [
      { label: 'Language', value: 'Python 3.12+' },
      { label: 'AI Providers', value: '4 Backends' },
      { label: 'Local Support', value: 'Ollama Ready' }
    ],
    verifiedHighlights: [
      { label: 'Multi-Model', value: '4 Providers', detail: 'OpenRouter, FreeModel, AeroLink & Local Ollama' },
      { label: 'Agent Mode', value: 'Autonomous', detail: 'Read, modify & create project files from terminal' },
      { label: 'Runtime', value: 'Python 3.12+', detail: 'Lightweight asynchronous event loop' }
    ],
    baselineStats: {
      stars: 1,
      forks: 0,
      openIssues: 0,
      primaryLanguage: 'Python',
      lastUpdated: '2026-08-20T13:46:42Z',
      license: 'MIT'
    }
  },
  {
    id: 'seedcode-chat',
    slug: 'seedcode-chat',
    name: 'Seed Code Chat & Android App',
    tagline: 'Modern conversational AI platform with real-time streaming & Android companion',
    category: 'web-saas',
    categoryLabel: 'AI Web & Mobile App',
    status: 'Production',
    featured: true,
    rank: 2,
    description: 'An AI-powered conversational web application and Android mobile client engineered for code debugging, conceptual exploration, and rapid markdown export.',
    longDescription: 'Seed Code Chat is the dedicated web and mobile conversational application of the Seed Code ecosystem. Powered by OpenRouter and FreeModel API endpoints, it provides developers and students with an instant, token-streaming AI companion with high-contrast UI and thread persistence.',
    fullOverview: 'Available as a web application and an Android client, Seed Code Chat solves the need for a fast, responsive AI assistant. Users can ask programming questions, paste and refactor code, review syntax-highlighted outputs, copy code blocks with one click, and continue conversations on mobile.',
    problemSolved: 'Provides a clean, distraction-free conversational AI experience on web and mobile with direct code formatting and rapid token streaming.',
    version: 'v3.2.0',
    githubRepo: 'Alshahriar-07/seedcode-chat',
    githubUrl: 'https://github.com/Alshahriar-07/seedcode-chat',
    websiteUrl: 'https://seedcode-chat.vercel.app/',
    mobileAppUrl: 'https://seedcode-app.vercel.app/',
    liveDemoUrl: 'https://seedcode-chat.vercel.app/',
    documentationUrl: 'https://github.com/Alshahriar-07/SeedCode-app',
    primaryLanguage: 'JavaScript',
    deploymentPlatform: 'Vercel / Android Web APK',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'OpenRouter API', 'FreeModel.dev', 'Vite', 'LocalStorage API'],
    techStack: ['React', 'JavaScript', 'Tailwind CSS', 'OpenRouter', 'FreeModel.dev', 'Vite'],
    frameworks: ['React 18', 'Tailwind CSS v3', 'Vite'],
    features: [
      'Token-by-token real-time message streaming with minimal latency',
      'Dual-target responsive architecture: Web and Android mobile client',
      'Syntax-highlighted code blocks with 1-click copy and download',
      'Persistent local conversation thread history across browser sessions',
      'Multi-model provider support via OpenRouter and FreeModel API',
      'Ultra-clean dark/light high-contrast interface designed for mobile ergonomics'
    ],
    architecture: [
      {
        layer: 'Client UI',
        tech: 'React / Tailwind CSS',
        description: 'Responsive chat viewport, dynamic auto-scrolling, mobile drawer gestures, and code syntax renderers.'
      },
      {
        layer: 'Streaming Handler',
        tech: 'Fetch SSE Stream Reader',
        description: 'Consumes Server-Sent Events / chunked streams and updates state incrementally at 60 FPS.'
      },
      {
        layer: 'AI Gateway',
        tech: 'OpenRouter & FreeModel Endpoints',
        description: 'Routes conversational prompts to state-of-the-art language models with prompt system instructions.'
      },
      {
        layer: 'Persistence',
        tech: 'Client LocalStorage',
        description: 'Stores conversation histories and user preferences with zero server-side telemetry.'
      }
    ],
    architectureHighlights: [
      'Chunked stream transformer with zero markdown flickering',
      'Optimistic state updating with offline error recovery',
      'Adaptive mobile viewport scaling for seamless Android experience'
    ],
    stats: [
      { label: 'Platforms', value: 'Web + Android' },
      { label: 'Streaming', value: 'SSE Token Stream' },
      { label: 'Interface', value: 'High-Contrast UI' }
    ],
    verifiedHighlights: [
      { label: 'Platforms', value: 'Web & Android', detail: 'Dedicated desktop web and mobile app interfaces' },
      { label: 'Streaming', value: 'SSE Stream', detail: 'Token-level incremental markdown rendering' },
      { label: 'Status', value: 'Live on Vercel', detail: 'Active production deployment' }
    ],
    baselineStats: {
      stars: 1,
      forks: 0,
      openIssues: 0,
      primaryLanguage: 'JavaScript',
      lastUpdated: '2026-08-23T03:43:09Z'
    }
  },
  {
    id: 'mr-bean-run',
    slug: 'mr-bean-run',
    name: 'Mr Bean Run',
    tagline: '2D physics endless runner game & kinematics engine in Python & HTML5 Canvas',
    category: 'interactive',
    categoryLabel: 'Game & Canvas Physics',
    status: 'Active Release',
    featured: true,
    rank: 3,
    description: 'An arcade-style endless runner featuring custom jump physics, inertia kinematics, procedural obstacle generation, and a Web-playable Canvas edition.',
    longDescription: 'Mr Bean Run demonstrates custom 2D game engine architecture. Originally built in Python with Pygame and ported to a high-performance HTML5 Canvas edition, it implements custom collision detection algorithms, inertia kinematics, procedural terrain pacing, and retro Web Audio sound synthesis.',
    fullOverview: 'Mr Bean Run showcases real-time game loop design without reliance on heavy commercial engines. Players control the runner across dynamically speeding terrain with dual keyboard and touch input controls, responsive jump curves, and real-time score tracking.',
    problemSolved: 'Demonstrates low-level game kinematics, frame-rate independent physics loops, and zero-dependency procedural obstacle generation.',
    version: 'v1.5.0',
    githubRepo: 'Alshahriar-07/mr-bean-game',
    githubUrl: 'https://github.com/Alshahriar-07/mr-bean-game',
    websiteUrl: 'https://mrbeanrun.vercel.app/',
    liveDemoUrl: 'https://mrbeanrun.vercel.app/',
    documentationUrl: 'https://github.com/Alshahriar-07/mr-bean-game',
    primaryLanguage: 'Python / JavaScript',
    deploymentPlatform: 'Vercel / Pygame Desktop',
    technologies: ['Python', 'Pygame', 'HTML5 Canvas 2D', 'Web Audio API', 'JavaScript', 'RequestAnimationFrame'],
    techStack: ['Python', 'Pygame', 'HTML5 Canvas', 'Web Audio API', 'JavaScript'],
    frameworks: ['Pygame', 'HTML5 Canvas 2D'],
    features: [
      'Custom physics engine with gravity simulation, inertia curves, and variable jump heights',
      'Procedural obstacle generation with deterministic seeded spacing and progressive speed curves',
      'Zero-dependency Web Audio API procedural sound synthesizer (jump, score, hit tones)',
      'Dual-input binding: Desktop Space/Arrow keys and mobile touch tap zones',
      'Real-time collision detection with spatial bounding box adjustments',
      'Personal high score persistence in browser local state'
    ],
    architecture: [
      {
        layer: 'Kinematics Loop',
        tech: 'RequestAnimationFrame / Pygame Clock',
        description: '60 FPS fixed-timestep physics step updating velocities, gravity, and position vectors.'
      },
      {
        layer: 'Collision Engine',
        tech: 'AABB Bounding Box Algorithm',
        description: 'Calculates axis-aligned bounding box intersections between player hitboxes and dynamic obstacles.'
      },
      {
        layer: 'Audio Synthesis',
        tech: 'Web Audio API Oscillator Nodes',
        description: 'Real-time procedural sine and sawtooth wave generation for zero-asset audio playback.'
      },
      {
        layer: 'Render Pipeline',
        tech: 'Canvas 2D Context',
        description: 'Double-buffered particle systems, parallax ground scrolling, and responsive aspect scaling.'
      }
    ],
    architectureHighlights: [
      'Zero-allocation game loop for smooth 60 FPS rendering',
      'Custom procedural oscillator sound engine without external audio files',
      'Responsive touch and keyboard unified input mapping'
    ],
    stats: [
      { label: 'Engine', value: 'Pygame & Canvas' },
      { label: 'Frame Rate', value: '60 FPS Target' },
      { label: 'Audio', value: 'Web Audio Synth' }
    ],
    verifiedHighlights: [
      { label: 'Physics', value: 'Kinematics 60FPS', detail: 'Accurate gravity and jump velocity curve' },
      { label: 'Web Edition', value: 'Live on Vercel', detail: 'Instant in-browser playability' },
      { label: 'Audio', value: 'Procedural Synth', detail: 'Real-time Web Audio API sound synthesis' }
    ],
    baselineStats: {
      stars: 1,
      forks: 0,
      openIssues: 0,
      primaryLanguage: 'Python',
      lastUpdated: '2026-08-19T16:41:00Z'
    }
  },
  {
    id: 'chayanix',
    slug: 'chayanix',
    name: 'ChayaNix OS',
    tagline: 'Debian-based Linux OS distribution tailored for privacy, efficiency & development',
    category: 'mobile-desktop',
    categoryLabel: 'Operating System & Linux',
    status: 'Open Source',
    featured: false,
    rank: 4,
    description: 'A custom Debian-based Linux distribution engineered for developer productivity, minimal RAM consumption, privacy hardening, and developer toolchain pre-configuration.',
    longDescription: 'ChayaNix is an independent Linux operating system distribution project created by Al Shahriar Sayon. Built upon the rock-solid Debian stable foundation, it strips away telemetry, bloat, and unnecessary daemons to provide an ultra-responsive workstation with pre-installed compilers, Python environments, Git, and lightweight window management.',
    fullOverview: 'ChayaNix provides developers and privacy advocates with an out-of-the-box workstation OS. It combines Debian\'s enterprise-grade package stability with automated build scripts, customized shell configurations, and optimized systemd service trees.',
    problemSolved: 'Solves the bloat, telemetry, and tedious initial setup of general-purpose Linux distributions by offering a tailored, lightweight developer OS.',
    version: 'v1.0.2',
    githubRepo: 'Alshahriar-07/ChayaNix',
    githubUrl: 'https://github.com/Alshahriar-07/ChayaNix',
    documentationUrl: 'https://github.com/Alshahriar-07/ChayaNix#readme',
    primaryLanguage: 'Python / Shell',
    deploymentPlatform: 'Bootable ISO / Debian Live-Build',
    technologies: ['Debian Stable', 'Linux Kernel', 'Bash / Shell Scripting', 'Python', 'Systemd', 'GRUB', 'X11 / Wayland'],
    techStack: ['Debian Linux', 'Bash', 'Python', 'Systemd', 'GRUB'],
    frameworks: ['Debian Live-Build', 'Custom Kernel Configurations'],
    features: [
      'Debian stable base with zero commercial telemetry and minimal RAM footprint (<350MB idle)',
      'Pre-configured developer tools: GCC, Clang, Python 3, Node.js, Git, and Neovim',
      'Automated Debian live-build scripts for reproducible ISO generation',
      'Hardened security defaults with sandboxed daemons and strict firewall profiles',
      'Lightweight window management with custom keybindings and status metrics'
    ],
    architecture: [
      {
        layer: 'Kernel & Base',
        tech: 'Linux Kernel / Debian Stable',
        description: 'Hardened kernel configuration with stripped proprietary telemetry and modular driver support.'
      },
      {
        layer: 'Init & Daemons',
        tech: 'Systemd Minimal Unit Tree',
        description: 'Optimized boot sequence disabling non-essential services for sub-7 second boot times.'
      },
      {
        layer: 'Toolchain Package Layer',
        tech: 'APT Package Profiles',
        description: 'Curated developer tool bundles with pre-configured dotfiles and shell integrations.'
      },
      {
        layer: 'Desktop Environment',
        tech: 'Lightweight X11/Wayland Shell',
        description: 'Resource-efficient window manager with custom status monitoring scripts.'
      }
    ],
    architectureHighlights: [
      'Reproducible live-build Debian automation scripts',
      'Modular configuration package profiles for fast deployment',
      'Minimal background resource consumption for maximum compiler speed'
    ],
    stats: [
      { label: 'Base Distro', value: 'Debian Stable' },
      { label: 'Memory Footprint', value: '< 350 MB Idle' },
      { label: 'Type', value: 'Developer Distro' }
    ],
    verifiedHighlights: [
      { label: 'Base', value: 'Debian Stable', detail: 'Rock-solid Linux foundation and security updates' },
      { label: 'Footprint', value: '<350MB RAM', detail: 'Ultra-lightweight background memory footprint' },
      { label: 'Status', value: 'Open Source', detail: 'Public GitHub repository with build scripts' }
    ],
    baselineStats: {
      stars: 0,
      forks: 0,
      openIssues: 0,
      primaryLanguage: 'Python / Shell',
      lastUpdated: '2026-08-21T06:17:10Z'
    }
  },
  {
    id: 'hmouse',
    slug: 'hmouse',
    name: 'Hmouse (Virtual Air Mouse)',
    tagline: 'Computer vision webcam hand-gesture cursor control & kinematic bridge',
    category: 'mobile-desktop',
    categoryLabel: 'Computer Vision & Desktop Tool',
    status: 'Open Source',
    featured: false,
    rank: 5,
    description: 'A Python computer vision desktop utility that enables hands-free Windows mouse navigation and clicking using webcam hand landmark detection.',
    longDescription: 'Hmouse utilizes OpenCV and MediaPipe to detect 21 3D hand landmarks in real time. It calculates Euclidean distances between finger nodes to recognize clicks, drags, and scrolling, while applying exponential smoothing to eliminate cursor jitter.',
    fullOverview: 'Hmouse provides a contact-free human-computer interaction solution. By processing standard webcam video streams at 30+ FPS, it maps index finger coordinates to screen coordinates and triggers click events when pinch gestures are detected.',
    problemSolved: 'Enables contact-free computer interaction for accessibility, presentations, and remote desktop control without specialized hardware.',
    version: 'v1.1.0',
    githubRepo: 'Alshahriar-07/Hmouse',
    githubUrl: 'https://github.com/Alshahriar-07/Hmouse',
    documentationUrl: 'https://github.com/Alshahriar-07/Hmouse#readme',
    primaryLanguage: 'Python',
    deploymentPlatform: 'Python Desktop / Windows',
    technologies: ['Python 3', 'OpenCV', 'MediaPipe Hands', 'PyAutoGUI', 'NumPy', 'Math Vector Geometry'],
    techStack: ['Python', 'OpenCV', 'MediaPipe', 'PyAutoGUI', 'NumPy'],
    frameworks: ['MediaPipe Hands', 'OpenCV VideoCapture'],
    features: [
      '21 3D hand landmark tracking using MediaPipe neural models',
      'Real-time webcam video feed processing with OpenCV',
      'Exponential smoothing and Kalman damping algorithms for steady cursor movement',
      'Pinch-to-click detection between index finger and thumb landmarks',
      'Two-finger scroll gesture recognition for document browsing',
      'Zero external hardware requirement — works with standard laptop webcams'
    ],
    architecture: [
      {
        layer: 'Video Capture',
        tech: 'OpenCV VideoCapture',
        description: 'Frames acquired from standard USB/integrated webcams with color space conversion.'
      },
      {
        layer: 'Inference Engine',
        tech: 'MediaPipe Hands Pipeline',
        description: 'Neural hand landmark topology extraction returning normalized (x, y, z) joint vectors.'
      },
      {
        layer: 'Kinematics & Smoothing',
        tech: 'NumPy Vector Interpolation',
        description: 'Transforms normalized camera space to screen resolution with jitter-damping algorithms.'
      },
      {
        layer: 'OS Input Emulation',
        tech: 'PyAutoGUI / OS APIs',
        description: 'Dispatches mouse motion, left/right clicks, and wheel scroll events to the operating system.'
      }
    ],
    architectureHighlights: [
      'Sub-20ms landmark inference on CPU without discrete GPU requirement',
      'Adaptive sensitivity thresholding based on hand bounding box scale',
      'Zero external sensor dependencies'
    ],
    stats: [
      { label: 'Tracking', value: '21 Hand Joints' },
      { label: 'Vision Engine', value: 'MediaPipe + OpenCV' },
      { label: 'Hardware', value: 'Standard Webcam' }
    ],
    verifiedHighlights: [
      { label: 'Vision Model', value: 'MediaPipe Hands', detail: '21 real-time 3D landmark joint coordinates' },
      { label: 'Smoothing', value: 'Jitter Damping', detail: 'Smooth sub-pixel cursor coordinate interpolation' },
      { label: 'Hardware', value: 'Webcam Only', detail: 'Runs on standard consumer laptop cameras' }
    ],
    baselineStats: {
      stars: 0,
      forks: 0,
      openIssues: 0,
      primaryLanguage: 'Python',
      lastUpdated: '2026-08-18T04:28:12Z'
    }
  },
  {
    id: 'seed-cloud',
    slug: 'seedcloud',
    name: 'Seed Cloud',
    tagline: 'Universal multi-provider cloud storage aggregator & encrypted file router',
    category: 'web-saas',
    categoryLabel: 'Cloud Infrastructure & SaaS',
    status: 'In Development',
    featured: false,
    rank: 6,
    description: 'A cloud storage aggregator designed to unify Google Drive, Dropbox, AWS S3, and local storage into a single encrypted file management interface.',
    longDescription: 'Seed Cloud addresses storage fragmentation by providing a single authenticated gateway to multiple cloud providers. It features client-side AES-256 chunk encryption before transmission, unified cross-cloud search, and peer-to-peer file synchronization pipelines.',
    fullOverview: 'Seed Cloud is currently under active development as part of the Seed Code cloud architecture. It simplifies managing multiple personal and business cloud storage accounts through a centralized dashboard with unified tagging and streaming previews.',
    problemSolved: 'Solves cloud storage fragmentation by allowing developers to search, manage, and transfer files across multiple cloud providers in a single encrypted interface.',
    version: 'v0.9.0-dev',
    githubRepo: 'Alshahriar-07/SeedCloud',
    githubUrl: 'https://github.com/Alshahriar-07/SeedCloud',
    websiteUrl: 'https://seedcloud.vercel.app',
    liveDemoUrl: 'https://seedcloud.vercel.app',
    documentationUrl: 'https://github.com/Alshahriar-07/SeedCloud#readme',
    primaryLanguage: 'JavaScript',
    deploymentPlatform: 'Vercel / Cloud Run',
    technologies: ['JavaScript', 'React', 'Cloud Storage APIs', 'OAuth 2.0', 'Web Crypto API', 'Tailwind CSS', 'Node.js'],
    techStack: ['React', 'JavaScript', 'Cloud Storage APIs', 'OAuth 2.0', 'Web Crypto'],
    frameworks: ['React 18', 'Tailwind CSS'],
    features: [
      'Multi-cloud storage connector architecture (Google Drive, AWS S3, Dropbox)',
      'Unified search indexing across all connected accounts simultaneously',
      'Client-side zero-knowledge AES-256 encryption before transmission',
      'Cloud-to-cloud file migration pipelines without intermediate local downloads',
      'Responsive file browser with video, audio, and code file previewers'
    ],
    architecture: [
      {
        layer: 'Client Web Interface',
        tech: 'React / Tailwind CSS',
        description: 'Multi-pane file explorer, file tree virtualizer, upload queues, and streaming player.'
      },
      {
        layer: 'Crypto Subsystem',
        tech: 'Web Crypto API (SubtleCrypto)',
        description: 'Client-side key derivation (PBKDF2) and AES-GCM 256-bit stream chunk encryption.'
      },
      {
        layer: 'Provider Gateway',
        tech: 'OAuth 2.0 & Cloud REST Adapters',
        description: 'Unified storage adapter normalizing disparate S3, Drive, and Dropbox API responses.'
      },
      {
        layer: 'Sync Dispatcher',
        tech: 'Web Workers Stream Pipeline',
        description: 'Multipart chunked transfer engine with automatic retry and resume capabilities.'
      }
    ],
    architectureHighlights: [
      'Normalized storage provider abstraction interface',
      'Client-side zero-knowledge encryption guarantees',
      'Chunked stream multiplexer for large file uploads'
    ],
    stats: [
      { label: 'Providers', value: 'Multi-Cloud' },
      { label: 'Encryption', value: 'AES-256 GCM' },
      { label: 'Status', value: 'In Development' }
    ],
    verifiedHighlights: [
      { label: 'Architecture', value: 'Multi-Cloud Adapter', detail: 'Universal abstraction layer over S3, Drive & Dropbox' },
      { label: 'Security', value: 'AES-256 Client', detail: 'Zero-knowledge browser-side chunk encryption' },
      { label: 'Status', value: 'In Development', detail: 'Active development on Vercel & GitHub' }
    ],
    baselineStats: {
      stars: 0,
      forks: 0,
      openIssues: 0,
      primaryLanguage: 'JavaScript',
      lastUpdated: '2026-08-19T16:41:04Z'
    }
  },
  {
    id: 'eagox-ai-hub',
    slug: 'eagox-ai-hub',
    name: 'EAGOX AI Hub',
    tagline: 'All-in-one AI tools platform & unified intelligence suite',
    category: 'ai-cli',
    categoryLabel: 'AI Platform & Workbench',
    status: 'Production',
    featured: false,
    rank: 7,
    description: 'An all-in-one AI tools platform unifying multi-model AI utilities, prompt workbenches, automated code analysis, and live Google search grounding.',
    longDescription: 'EAGOX AI Hub provides developers and creators with a centralized workbench for AI operations. It integrates Google Gemini APIs with live Google Search grounding to deliver verifiable citations, automated text generation, code transformation, and export capabilities in a single high-contrast interface.',
    fullOverview: 'EAGOX AI Hub eliminates the need for scattered bookmarking of different AI utilities. Users can test prompts, ground responses with verified search results, analyze code snippets, and export structured outputs as JSON or Markdown instantly.',
    problemSolved: 'Centralizes prompt engineering, grounded search intelligence, and developer AI utilities into a unified zero-lag workspace.',
    version: 'v4.0.0',
    websiteUrl: 'https://eagox-tool-hub.vercel.app/',
    liveDemoUrl: 'https://eagox-tool-hub.vercel.app/',
    primaryLanguage: 'TypeScript / React',
    deploymentPlatform: 'Vercel',
    technologies: ['React', 'TypeScript', 'Google Gemini AI', 'Search Grounding', 'Tailwind CSS', 'Vite'],
    techStack: ['React', 'TypeScript', 'Gemini AI', 'Node.js', 'Tailwind CSS', 'Vite'],
    frameworks: ['React 18', 'Tailwind CSS v3', 'Vite'],
    features: [
      'Multi-utility AI workbench with zero-setup browser access',
      'Google Gemini API integration with verified live search citations',
      'Syntax-highlighted code analysis, translation, and refactoring utilities',
      'Prompt templating workbench with instant parameter testing',
      '1-click export to JSON, Markdown, and clipboard data'
    ],
    architecture: [
      {
        layer: 'Frontend Workspace',
        tech: 'React / Tailwind CSS',
        description: 'Multi-tool tabbed workspace with keyboard shortcuts, copy buffers, and responsive layouts.'
      },
      {
        layer: 'AI Gateway',
        tech: 'Google GenAI SDK (Gemini Models)',
        description: 'Server-side API calls with system instructions, temperature controls, and search grounding.'
      },
      {
        layer: 'Grounding Subsystem',
        tech: 'Google Search Tools',
        description: 'Retrieves web metadata and returns structured citation footnotes for verified claims.'
      },
      {
        layer: 'Export Engine',
        tech: 'Client File & Clipboard APIs',
        description: 'Transforms structured responses into formatted Markdown files and JSON payloads.'
      }
    ],
    architectureHighlights: [
      'Real-time Google search citation grounding integration',
      'Sub-400ms cached prompt execution pipeline',
      'Clean high-contrast theme system'
    ],
    stats: [
      { label: 'Grounding', value: 'Google Search' },
      { label: 'Engine', value: 'Gemini Models' },
      { label: 'Platform', value: 'Production' }
    ],
    verifiedHighlights: [
      { label: 'Grounding', value: 'Google Search', detail: 'Real-time search verification and citation links' },
      { label: 'Tools Suite', value: 'Unified Nexus', detail: 'Code helpers, prompt benches & text generators' },
      { label: 'Deployment', value: 'Live on Vercel', detail: 'High-availability production hosting' }
    ],
    baselineStats: {
      stars: 0,
      primaryLanguage: 'TypeScript',
      lastUpdated: '2026-08-15T12:00:00Z'
    }
  },
  {
    id: 'the-crafting-table',
    slug: 'the-crafting-table',
    name: 'The Crafting Table',
    tagline: 'Minecraft-inspired custom paper character store & craft showcase',
    category: 'web-saas',
    categoryLabel: 'E-Commerce & Creative Shop',
    status: 'Production',
    featured: false,
    rank: 8,
    description: 'A Minecraft-inspired paper character store featuring interactive voxel-styled catalog displays, bespoke character commission requests, and printable folding guides.',
    longDescription: 'The Crafting Table brings beloved voxel-style gaming aesthetics into physical papercraft. Built with clean HTML, CSS, JavaScript, and React, it lets gaming enthusiasts browse papercraft character models, review assembly diagrams, and submit bespoke custom craft orders.',
    fullOverview: 'The Crafting Table provides an intuitive catalog where users can select their favorite Minecraft characters, preview 3D paper models, download printable folding templates, and submit custom skin commission requests with automated email notifications.',
    problemSolved: 'Brings digital voxel game characters into tangible physical paper crafts with easy-to-follow folding guides and seamless online ordering.',
    version: 'v2.1.0',
    websiteUrl: 'https://the-crafting-table.vercel.app/',
    liveDemoUrl: 'https://the-crafting-table.vercel.app/',
    primaryLanguage: 'JavaScript / HTML5',
    deploymentPlatform: 'Vercel',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind CSS', 'Formspree API'],
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind CSS'],
    frameworks: ['React', 'Tailwind CSS'],
    features: [
      'Minecraft-inspired voxel design system with pixel-crisp iconography',
      'Interactive papercraft character model showcase with filter categories',
      'Bespoke custom character commission request workflow with instant notifications',
      'Printable schematic download guides and step-by-step assembly diagrams',
      'High-performance static delivery scoring 99+ on Lighthouse'
    ],
    architecture: [
      {
        layer: 'UI & Theming',
        tech: 'Voxel CSS / Tailwind',
        description: 'Custom pixelated borders, retro game typography, and responsive grid layouts.'
      },
      {
        layer: 'Catalog Store',
        tech: 'React State Machine',
        description: 'Filterable character gallery with search, category filtering, and modal detail views.'
      },
      {
        layer: 'Order Intake',
        tech: 'Formspree REST API',
        description: 'Submits user custom character specs, skin files, and contact info securely.'
      }
    ],
    architectureHighlights: [
      'Pixel-perfect voxel design tokens and SVG icons',
      'Instant client-side catalog filtering',
      'Lighthouse 100/100 performance profile'
    ],
    stats: [
      { label: 'Aesthetic', value: 'Voxel Design' },
      { label: 'Speed', value: 'Instant (<50ms)' },
      { label: 'Status', value: 'Live on Vercel' }
    ],
    verifiedHighlights: [
      { label: 'Theme', value: 'Voxel Gaming', detail: 'Minecraft-inspired pixel art design aesthetic' },
      { label: 'Orders', value: 'Custom Intake', detail: 'Bespoke character papercraft commission pipeline' },
      { label: 'Performance', value: 'Lighthouse 99+', detail: 'Optimized static web assets and rapid load' }
    ],
    baselineStats: {
      stars: 0,
      primaryLanguage: 'JavaScript',
      lastUpdated: '2026-08-10T10:00:00Z'
    }
  },
  {
    id: 'eagox-timer',
    slug: 'eagox-timer',
    name: 'Eagox Timer & Focus Suite',
    tagline: 'Minimalist high-precision developer productivity stopwatch & interval loop',
    category: 'interactive',
    categoryLabel: 'Developer Utility & Audio',
    status: 'Production',
    featured: false,
    rank: 9,
    description: 'A minimalist, high-precision developer focus timer and Pomodoro stopwatch built for deep work sessions with ambient soundscapes and lap telemetry.',
    longDescription: 'Eagox Timer is a distraction-free productivity utility. Engineered for developers doing deep coding sprints, it offers sub-millisecond precision via Web Workers to prevent background tab throttling, keyboard shortcut controls, and ambient audio cues.',
    fullOverview: 'Eagox Timer solves background timer drift in modern browsers by running its tick loops on dedicated Web Workers. It provides custom interval settings, deep work Pomodoro cycles, and lap history exports.',
    problemSolved: 'Prevents timer lag in throttled background browser tabs during intense coding sessions with Web Worker timing.',
    version: 'v1.2.0',
    githubRepo: 'Alshahriar-07/eagoxTimer',
    githubUrl: 'https://github.com/Alshahriar-07/eagoxTimer',
    websiteUrl: 'https://eagox-timer.vercel.app',
    liveDemoUrl: 'https://eagox-timer.vercel.app',
    documentationUrl: 'https://github.com/Alshahriar-07/eagoxTimer',
    primaryLanguage: 'JavaScript',
    deploymentPlatform: 'Vercel',
    technologies: ['JavaScript', 'HTML5', 'Web Audio API', 'Web Workers', 'CSS3', 'LocalStorage'],
    techStack: ['JavaScript', 'HTML5', 'Web Workers', 'Web Audio API'],
    frameworks: ['Vanilla JavaScript', 'Web Workers API'],
    features: [
      'Throttling-immune timing engine powered by background Web Workers',
      'Multiple operating modes: Stopwatch, Pomodoro Interval, and Countdown Timer',
      'Subtle Web Audio API chime notifications for interval transitions',
      'Keyboard shortcut navigation (Space = Start/Stop, R = Reset, L = Lap)',
      'Zero tracking, zero cookies, zero bloat — 100% private offline-first design'
    ],
    architecture: [
      {
        layer: 'Timing Core',
        tech: 'Web Worker Thread',
        description: 'Runs high-resolution performance.now() ticks isolated from main thread UI throttling.'
      },
      {
        layer: 'Display Renderer',
        tech: 'DOM & Canvas Interpolator',
        description: 'Renders millisecond counters and circular progress rings smoothly.'
      },
      {
        layer: 'Audio Dispatcher',
        tech: 'Web Audio Synthesizer',
        description: 'Generates soft harmonic sine bells for work/rest transitions.'
      }
    ],
    architectureHighlights: [
      'Web Worker isolation for zero tab-sleep drift',
      'Zero external asset dependencies (<15KB total footprint)',
      'Keyboard-first UX design'
    ],
    stats: [
      { label: 'Precision', value: 'Web Worker Drift-Free' },
      { label: 'Footprint', value: '< 15 KB Total' },
      { label: 'Audio', value: 'Synthesized Chimes' }
    ],
    verifiedHighlights: [
      { label: 'Precision', value: 'Worker Thread', detail: 'Immune to background tab throttling drift' },
      { label: 'Footprint', value: '<15KB', detail: 'Zero external dependencies or tracking scripts' },
      { label: 'Status', value: 'Live on Vercel', detail: 'Active production deployment' }
    ],
    baselineStats: {
      stars: 0,
      forks: 0,
      openIssues: 0,
      primaryLanguage: 'JavaScript',
      lastUpdated: '2026-08-07T17:20:05Z'
    }
  }
];

export const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: 'custom-web',
    title: 'Modern Website / Portfolio',
    subtitle: 'High-Impact Brand & Responsive UI',
    basePrice: 12999,
    estimatedWeeks: '1 - 2 Weeks',
    description: 'High-speed, SEO-optimized, responsive web platform featuring custom animations, 3D interactive graphics, and seamless typography.',
    deliverables: [
      'Custom Responsive UI with Tailwind CSS',
      'Interactive 3D Elements / Three.js or Canvas graphics',
      'Ultra-fast static generation & Lighthouse 100/100 score',
      'Contact forms & API integrations (Formspree, Webhooks)',
      'Free 1 Year hosting guidance & custom domain setup'
    ],
    iconName: 'Globe'
  },
  {
    id: 'saas-webapp',
    title: 'Full-Stack Web App',
    subtitle: 'Production Cloud Platform & Database',
    basePrice: 14999,
    estimatedWeeks: '2 - 4 Weeks',
    description: 'Robust web application with user authentication, database persistence, dashboard analytics, and API integrations.',
    deliverables: [
      'Modern Single Page App (React / Vite / TypeScript)',
      'Node.js / Express or Cloud Database backend',
      'Role-based access control & secure JWT/OAuth auth',
      'Payment gateway integrations & webhooks',
      'Admin dashboard, analytics charts, and export tooling'
    ],
    iconName: 'Layers'
  },
  {
    id: 'android-app',
    title: 'Android App',
    subtitle: 'High-Performance Native Mobile',
    basePrice: 15999,
    estimatedWeeks: '3 - 4 Weeks',
    description: 'Fluid mobile application built for Android with smooth native gestures, offline caching, push notifications, and camera/sensor integration.',
    deliverables: [
      'Native Android / Kotlin / React Native architecture',
      'Local SQLite / Room offline-first synchronization',
      'Push notification pipeline and background services',
      'Play Store packaging, signing, and release readiness',
      'Hardware sensor hooks (Camera, GPS, Biometrics)'
    ],
    iconName: 'Smartphone'
  },
  {
    id: 'desktop-app',
    title: 'Desktop Software App',
    subtitle: 'Cross-Platform Windows, macOS & Linux',
    basePrice: 17999,
    estimatedWeeks: '3 - 5 Weeks',
    description: 'Powerful desktop client engineered for hardware access, local file system manipulation, high throughput data processing, and system tray tools.',
    deliverables: [
      'Electron / Tauri / C++ lightweight native shell',
      'Local hardware & OS-level background daemon hooks',
      'Auto-updater pipeline & code signing integration',
      'Encrypted local storage and multi-window management',
      'Zero bloat, sub-second boot time optimization'
    ],
    iconName: 'Monitor'
  },
  {
    id: 'ai-tooling',
    title: 'AI Pipeline & Custom Tooling',
    subtitle: 'Gemini 3.7 Grounding & Autonomous Agents',
    basePrice: 19999,
    estimatedWeeks: '2 - 4 Weeks',
    description: 'Custom AI agent orchestration, Google Search grounding integration, automated document extraction, CLI tools, and specialized LLM workflows.',
    deliverables: [
      'Google GenAI SDK (Gemini 3.7 / 2.5) server-side integration',
      'Live Google Search grounding and verified citation engine',
      'Function calling & tool invocation pipelines',
      'Custom CLI / Terminal developer workflow automation',
      'Private vector search and embedding retrieval systems'
    ],
    iconName: 'Cpu'
  }
];

export const ADDON_OPTIONS: AddOnOption[] = [
  {
    id: 'search-grounding',
    title: 'Google Search AI Grounding Engine',
    price: 3499,
    description: 'Connects your application to real-time live Google Search data via Gemini API for up-to-date verifiable intelligence.'
  },
  {
    id: 'database-cluster',
    title: 'Cloud Database & Cloud Run Setup',
    price: 2999,
    description: 'Production-hardened PostgreSQL or Firestore deployment with automated backups and failover.'
  },
  {
    id: 'mobile-companion',
    title: 'Companion Android / Mobile Client',
    price: 4999,
    description: 'Synchronized mobile app sharing your web application backend and real-time state.'
  },
  {
    id: 'priority-delivery',
    title: 'Fast-Track Priority Engineering (2x Speed)',
    price: 3999,
    description: 'Dedicated full-time sprint allocation for rapid MVP delivery in half the standard timeline.'
  },
  {
    id: 'ci-cd-docker',
    title: 'Docker & Automated CI/CD Deployment',
    price: 1999,
    description: 'Automated GitHub Actions pipeline with zero-downtime containerized production releases.'
  }
];
