import React from 'react';
import { PageId } from '../../types';
import { useToast } from '../../context/ToastContext';
import authorImage from '../../assets/founder.jpeg';
import { useSEO } from '../../hooks/useSEO';
import {
  User,
  Mail,
  MapPin,
  Github,
  Globe,
  Linkedin,
  ExternalLink,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  Code2,
  CheckCircle2,
  Coffee,
  HardDrive,
  Copy,
} from 'lucide-react';

interface AuthorPageProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const AuthorPage: React.FC<AuthorPageProps> = ({ currentPage, onNavigate }) => {
  useSEO(currentPage);
  const { toast } = useToast();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('alshahriarsayon425@gmail.com');
    toast.success('Email address copied to clipboard: alshahriarsayon425@gmail.com', 'Copied');
  };

  const competencies = [
    { title: 'Full-Stack Web Systems', desc: 'React, TypeScript, Node.js, Express, Tailwind CSS, Vite' },
    { title: 'AI Engineering & Grounding', desc: 'Google GenAI (Gemini 3.7 / 2.5), Live Google Search Grounding, Agent Scaffolding' },
    { title: 'Developer Tooling & CLI', desc: 'Node.js, Commander.js, AST parsers, Custom Terminal Workflows (Seed Code CLI)' },
    { title: 'Real-Time & Distributed', desc: 'WebSockets, Channel Multiplexing, Distributed State Synchronization' },
    { title: 'Operating Systems & Linux', desc: 'Debian distributions, Kernel configs, Systemd, Shell scripting (ChayaNix OS)' },
    { title: 'Game Development & Graphics', desc: 'Python, Pygame, HTML5 Canvas 2D, Inertia Physics Engine (Mr Bean Run)' },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 animate-fade-in" id="eagox-author-page">
      {/* Profile Header */}
      <section className="p-8 sm:p-12 rounded-3xl bg-zinc-950 text-white border border-zinc-800 shadow-xl overflow-hidden relative">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Avatar / Photo & Quick Info */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
            <div className="relative">
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl bg-zinc-900 border-2 border-emerald-500/80 flex items-center justify-center shadow-2xl overflow-hidden group">
                <img
                  src={authorImage}
                  alt="Al Shahriar Sayon - Founder & Lead Engineer"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://raw.githubusercontent.com/Alshahriar-07/portfolio/refs/heads/main/me.png';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                />
              </div>
              <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-emerald-500 text-zinc-950 font-mono text-[10px] font-bold shadow-md">
                FOUNDER
              </span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-white font-display uppercase leading-tight">
                Al Shahriar Sayon
              </h1>
              <p className="text-xs font-mono text-zinc-400 mt-0.5">
                (Also known as <span className="text-emerald-400 font-semibold">Al Shahriar Sowan</span>)
              </p>
              <p className="text-xs font-mono text-emerald-400 mt-1 font-semibold">
                Lead Software Engineer & Founder @ Eagox Studio
              </p>
            </div>

            <div className="flex flex-col gap-1.5 text-xs text-zinc-400 font-mono">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span>Dhaka, Bangladesh [23.685°N, 90.356°E]</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <Mail className="w-3.5 h-3.5 text-zinc-400" />
                <button
                  onClick={handleCopyEmail}
                  className="hover:text-emerald-400 transition-colors underline flex items-center gap-1 text-left"
                  title="Click to copy email"
                >
                  <span>alshahriarsayon425@gmail.com</span>
                  <Copy className="w-3 h-3 text-zinc-500 hover:text-emerald-400 inline" />
                </button>
              </div>
            </div>

            {/* Quick Profile Social Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2">
              <a
                href="https://alshahriarsowan.vercel.app/"
                target="_blank"
                rel="noreferrer noopener"
                className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-mono flex items-center gap-1.5 transition-colors"
                title="Personal Portfolio"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>Portfolio</span>
                <ExternalLink className="w-3 h-3 text-zinc-400" />
              </a>

              <a
                href="https://github.com/Alshahriar-07"
                target="_blank"
                rel="noreferrer noopener"
                className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-mono flex items-center gap-1.5 transition-colors"
                title="GitHub Profile"
              >
                <Github className="w-3.5 h-3.5 text-emerald-400" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 text-zinc-400" />
              </a>

              <a
                href="https://www.linkedin.com/in/alshahriarsowan"
                target="_blank"
                rel="noreferrer noopener"
                className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-mono flex items-center gap-1.5 transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-zinc-400" />
              </a>
            </div>
          </div>

          {/* Bio Description */}
          <div className="lg:col-span-8 space-y-4 border-t lg:border-t-0 lg:border-l border-zinc-800 pt-6 lg:pt-0 lg:pl-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 text-xs font-mono text-zinc-300 border border-zinc-800">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full-Stack Engineering · AI Systems · Systems Tooling</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 font-display">
              Crafting reliable, math-driven digital architectures with modern standards.
            </h2>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              I am an independent software engineer and creator dedicated to building clean, low-latency, and resilient systems. From
              authoring developer tooling like <strong>Seed Code CLI</strong> and the <strong>Seed Code Chat</strong> ecosystem to engineering
              Debian-based operating systems (<strong>ChayaNix</strong>), games (<strong>Mr Bean Run</strong>), and unified cloud hubs (<strong>EAGOX AI Hub</strong>, <strong>Seed Cloud</strong>), my focus
              is on pristine code quality and zero unnecessary dependencies.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onNavigate('order')}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-mono font-bold flex items-center gap-1.5 shadow-xs transition-all"
              >
                <span>Work with Al Shahriar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigate('projects')}
                className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 text-xs font-mono flex items-center gap-1.5 transition-all"
              >
                <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Explore 7 Studio Projects</span>
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 text-xs font-mono flex items-center gap-1.5 transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>Send Direct Inquiry</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Competencies Grid */}
      <section className="space-y-6">
        <div className="max-w-2xl space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            TECHNICAL PROFICIENCY
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-display">
            Engineering Competencies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competencies.map((comp, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs space-y-2 hover:border-zinc-900 dark:hover:border-zinc-600 transition-all"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <h3 className="text-sm font-bold text-zinc-950 dark:text-white font-mono">{comp.title}</h3>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed pl-6">{comp.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Engineering Philosophy & Workstation Environment */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
          <h3 className="text-lg font-bold text-zinc-950 dark:text-white flex items-center gap-2 font-mono">
            <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Engineering Philosophy</span>
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">1.</span>
              <span><strong className="text-zinc-950 dark:text-white">Type-Safe Contracts:</strong> Every data boundary must be guaranteed with strict TypeScript schemas.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">2.</span>
              <span><strong className="text-zinc-950 dark:text-white">Zero UI Slop:</strong> Mathematically balanced padding, high-contrast typography, and accessible interaction states.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">3.</span>
              <span><strong className="text-zinc-950 dark:text-white">Grounding & Verifiability:</strong> AI systems must cite real-time, verifiable search sources rather than hallucinations.</span>
            </li>
          </ul>
        </div>

        <div className="p-8 rounded-2xl bg-zinc-900 dark:bg-zinc-900/90 text-white border border-zinc-800 shadow-xs space-y-4 font-mono text-xs">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-emerald-400" />
            <span>Workstation & Toolchain</span>
          </h3>
          <div className="space-y-2 text-zinc-300">
            <div><span className="text-zinc-500">OS:</span> Linux (Debian / Arch / ChayaNix) & WSL2</div>
            <div><span className="text-zinc-500">Terminal:</span> Zsh / Custom Seed Code CLI</div>
            <div><span className="text-zinc-500">Primary AI:</span> Google GenAI (Gemini 3.7 Flash) + Local LLMs</div>
            <div><span className="text-zinc-500">Editor:</span> VS Code / Neovim with strict ESLint & Prettier</div>
            <div><span className="text-zinc-500">Location:</span> Dhaka Innovation Zone, Bangladesh</div>
          </div>
        </div>
      </section>
    </div>
  );
};
