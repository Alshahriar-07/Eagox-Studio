import React from 'react';
import { PageId } from '../../types';
import { EagoxLogo, EagoxIcon } from '../EagoxLogo';
import {
  Compass,
  Cpu,
  Layers,
  Shield,
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  GitBranch,
  Terminal,
  Server,
  Globe2,
  Code2,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const engineeringPhases = [
    {
      step: '01',
      title: 'Architectural Discovery',
      subtitle: 'Requirements & Math-Driven Layout',
      description:
        'We dissect business constraints, define data models, analyze packet throughput, and select exact technology stacks without unnecessary dependencies.',
      icon: Compass,
    },
    {
      step: '02',
      title: 'Rapid MVP & Benchmarking',
      subtitle: 'Zero-Bloat Implementation',
      description:
        'We build high-fidelity interactive prototypes with sub-50ms latency targets, strict TypeScript type checking, and fluid layout physics.',
      icon: Zap,
    },
    {
      step: '03',
      title: 'Security & Telemetry Hardening',
      subtitle: 'Cryptographic Integrity',
      description:
        'We lock down server-side API keys, implement cryptographic handshakes, configure rate limiting, and test across high-concurrency workloads.',
      icon: Shield,
    },
    {
      step: '04',
      title: 'Global Cloud Deployment',
      subtitle: 'Containerized CI/CD',
      description:
        'We package services with Docker, provision scalable Cloud Run or Firestore instances, and connect automated monitoring hooks.',
      icon: Server,
    },
  ];

  const techStacks = [
    {
      category: 'Languages & Core',
      skills: ['TypeScript 5.8', 'JavaScript (ESM)', 'Python 3.12', 'C++ 20', 'HTML5/CSS3', 'SQL'],
    },
    {
      category: 'Frontend & UI',
      skills: ['React 19', 'Vite 6', 'Tailwind CSS v4', 'Motion React', 'Three.js / WebGL', 'Canvas API'],
    },
    {
      category: 'Backend & Real-Time',
      skills: ['Node.js', 'Express', 'WebSocket Clusters', 'Redis Pub/Sub', 'PostgreSQL', 'Docker'],
    },
    {
      category: 'AI & Machine Learning',
      skills: ['Google GenAI SDK', 'Gemini 3.7 Flash', 'Google Search Grounding', 'Function Calling', 'Local Ollama/vLLM'],
    },
    {
      category: 'Mobile & Desktop',
      skills: ['Android Native / Kotlin', 'Electron', 'Tauri', 'UDP Hardware Bridges', 'IMU Kinematics'],
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 animate-fade-in" id="eagox-about-page">
      {/* ========================================================================= */}
      {/* HEADER SECTION */}
      {/* ========================================================================= */}
      <section className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-800 dark:text-zinc-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>EAGOX STUDIO MANIFESTO</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-zinc-950 dark:text-white leading-[1.02] font-display uppercase">
          Engineering High-Performance Software with Zero Compromise.
        </h1>

        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
          Eagox Studio is an independent software engineering studio founded by <strong>Al Shahriar Sayon</strong>,
          headquartered in Dhaka, Bangladesh. We specialize in building resilient digital products, developer
          tooling, real-time WebSocket backbones, and search-grounded AI architectures for global clients.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* BRAND PHILOSOPHY & THREE PILLARS */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-100">
            <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-lg font-bold text-zinc-950 dark:text-white">1. Sub-Millisecond Speed</h3>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Every line of code is optimized for raw execution performance. We eliminate bloated runtime dependencies
            and enforce sub-50ms round-trip latency across web sockets and APIs.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-100">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-bold text-zinc-950 dark:text-white">2. Strict Architectural Safety</h3>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            100% strict TypeScript types, server-side secret isolation, and defensive error propagation guarantee
            rock-solid reliability under intense production traffic.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-100">
            <Cpu className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="text-lg font-bold text-zinc-950 dark:text-white">3. Verified AI Grounding</h3>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            We integrate state-of-the-art Google Gemini models with real-time Google Search grounding to deliver
            verifiable, hallucination-free intelligence in client workflows.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4-PHASE DEVELOPMENT METHODOLOGY */}
      {/* ========================================================================= */}
      <section className="space-y-10">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            HOW WE BUILD
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
            The Eagox Engineering Lifecycle
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            Our disciplined four-phase pipeline guarantees transparent timelines, predictable milestones, and
            production readiness.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {engineeringPhases.map((phase, idx) => {
            const Icon = phase.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-zinc-600 transition-all flex flex-col justify-between shadow-xs space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black font-mono text-zinc-300 dark:text-zinc-700">{phase.step}</span>
                    <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300">
                      <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-zinc-950 dark:text-white">{phase.title}</h3>
                  <div className="text-[11px] font-mono font-semibold text-zinc-500 dark:text-zinc-400 uppercase">{phase.subtitle}</div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{phase.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* TECH STACK MATRIX */}
      {/* ========================================================================= */}
      <section className="space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            SYSTEM MASTERY
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Core Technology Matrix
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            Toolchains and runtimes tested across thousands of production hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStacks.map((group, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white font-mono flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{group.category}</span>
              </h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {group.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-xs px-2.5 py-1 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 font-mono font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CALL TO ACTION */}
      {/* ========================================================================= */}
      <section className="p-8 sm:p-10 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-xl font-bold text-zinc-950 dark:text-white">Have a system in mind?</h3>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-md">
            Let’s discuss your technical architecture, project specifications, and release schedule.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigate('order')}
            className="px-5 py-2.5 rounded-xl bg-zinc-950 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-xs font-bold font-mono tracking-wider uppercase transition-all shadow-xs cursor-pointer"
          >
            Place Project Order
          </button>
        </div>
      </section>
    </div>
  );
};
