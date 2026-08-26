import React from 'react';
import { PageId } from '../../types';
import { Globe3D } from '../Globe3D';
import { FAQSection } from '../FAQSection';
import { PROJECTS_DATA, SERVICE_OPTIONS } from '../../data/projectsData';
import founderJpeg from '../../assets/founder.jpeg';
import { useSEO } from '../../hooks/useSEO';
import {
  ArrowRight,
  MessageCircle,
  Code2,
  CheckCircle2,
  Globe2,
  Github,
  User,
  Phone,
} from 'lucide-react';

interface HomePageProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onSelectProject: (projectId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  currentPage,
  onNavigate,
  onSelectProject,
}) => {
  useSEO(currentPage);

  return (
    <div className="space-y-20 sm:space-y-28 animate-fade-in" id="eagox-homepage-view">
      {/* ========================================================================= */}
      {/* HERO SECTION: High-Impact Typography (Left) + 3D Bangladesh Globe (Right) */}
      {/* ========================================================================= */}
      <section className="pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Branding & Positioning */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-zinc-900 dark:text-white">EAGOX STUDIO</span>
              <span className="text-zinc-400 dark:text-zinc-600">·</span>
              <span className="text-zinc-600 dark:text-zinc-400">Dhaka Hub Online</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tighter text-zinc-950 dark:text-white leading-[0.98] font-display uppercase">
                ENGINEERING DIGITAL <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500">
                  INFRASTRUCTURE.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium max-w-xl">
                Eagox Studio builds high-performance software systems, distributed real-time engines,
                and custom developer tools. From custom web applications to native cross-platform
                architectures — delivered with mathematical precision.
              </p>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('order')}
                className="px-6 py-3.5 rounded-xl bg-zinc-950 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-sm font-semibold tracking-wide flex items-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
                id="hero-start-project-btn"
              >
                <span>Initiate Project Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('projects')}
                className="px-5 py-3.5 rounded-xl bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200/90 dark:border-zinc-800 text-sm font-semibold tracking-wide flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                id="hero-explore-work-btn"
              >
                <span>Explore Products</span>
                <Code2 className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-200/80 dark:border-zinc-800">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white font-mono tracking-tight">7+</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">Active Systems</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white font-mono tracking-tight">&lt;24ms</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">Socket Telemetry</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono tracking-tight">100%</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">Strict Type Safety</div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Bangladesh Globe with SVG Arcs */}
          <div className="lg:col-span-6 xl:col-span-7">
            <Globe3D />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FEATURED PRODUCTS SHOWCASE PREVIEW */}
      {/* ========================================================================= */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b-2 border-zinc-900 dark:border-zinc-700">
          <div>
            <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block mb-1">
              PROPRIETARY SOFTWARE SUITE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tighter text-zinc-950 dark:text-white font-display uppercase">
              Flagship Studio Engineering
            </h2>
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="text-xs font-mono font-extrabold tracking-wider uppercase text-zinc-950 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>View All 7 Products & Live Demos</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="max-w-4xl rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8">
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Eagox Studio is a professional software development studio for businesses, founders, and creators who need a reliable digital product. We build professional websites and portfolios, full-stack web applications and SaaS platforms, Android and mobile apps, desktop software, AI-powered applications, API integrations, and custom software systems. Every project is designed around performance, accessibility, responsive UX, maintainability, and production-ready delivery.
          </p>
          <div className="flex flex-wrap gap-2 pt-4 text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
            <span>Website Development</span><span>Web App Development</span><span>Android App Development</span><span>Custom Software</span><span>SaaS Development</span><span>AI App Development</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS_DATA.slice(0, 3).map((project) => (
            <div
              key={project.id}
              onClick={() => {
                onSelectProject(project.id);
                onNavigate('projects');
              }}
              className="group cursor-pointer rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 p-6 hover:border-zinc-900 dark:hover:border-zinc-600 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                    {project.categoryLabel}
                  </span>
                  <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">{project.version}</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-zinc-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                    <span>{project.name}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-1">{project.tagline}</p>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.techStack.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-50 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats Footer */}
              <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-2 gap-2 text-xs font-mono">
                {project.stats.slice(0, 2).map((st, sIdx) => (
                  <div key={sIdx}>
                    <div className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase">{st.label}</div>
                    <div className="font-bold text-zinc-900 dark:text-white">{st.value}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* INTEGRATED FAQ SECTION ON HOMEPAGE */}
      {/* ========================================================================= */}
      <FAQSection onNavigate={onNavigate} />

      {/* ========================================================================= */}
      {/* FOUNDER & LEAD ENGINEER SPOTLIGHT */}
      {/* ========================================================================= */}
      <section className="p-8 sm:p-10 rounded-3xl bg-zinc-900 text-white border border-zinc-800 shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-zinc-800 border-2 border-emerald-500/80 overflow-hidden shadow-xl group">
                <img
                  src={founderJpeg}
                  alt="Al Shahriar Sayon - Founder"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://raw.githubusercontent.com/Alshahriar-07/portfolio/refs/heads/main/me.png';
                  }}
                />
              </div>
              <span className="absolute -bottom-2 -right-1 px-2 py-0.5 rounded-full bg-emerald-500 text-zinc-950 font-mono text-[9px] font-extrabold uppercase">
                FOUNDER
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-semibold">
                <span>FOUNDER & LEAD ENGINEER</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-white">
                Al Shahriar Sayon
              </h3>
              <p className="text-xs text-zinc-400 max-w-md leading-relaxed">
                Frontend Developer, Tool Builder, and Distributed Systems Engineer behind Seedcode CLI,
                ChayaNix OS, and Eagox Studio client infrastructure.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('author')}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>Full Biography</span>
            </button>
            <a
              href="https://github.com/Alshahriar-07"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono flex items-center gap-2 transition-all border border-zinc-700"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* BANGLADESH TO THE WORLD BANNER */}
      {/* ========================================================================= */}
      <section className="rounded-3xl bg-zinc-950 text-white p-8 sm:p-12 border border-zinc-800 shadow-xl overflow-hidden relative">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-emerald-400">
            <Globe2 className="w-3.5 h-3.5" />
            <span>GLOBAL INFRASTRUCTURE · DHAKA HQ</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Ready to deploy your next high-performance system?
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            From modern responsive web platforms to native Android apps and specialized custom software pipelines,
            Eagox Studio delivers production systems on time, within budget, and built to scale.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('order')}
              className="px-5 py-3 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold font-mono tracking-wider uppercase transition-all shadow-md active:scale-98 cursor-pointer"
            >
              Configure Order Now
            </button>
          </div>
        </div>

        {/* Decorative Grid Graphic in Background */}
        <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-10 pointer-events-none hidden md:block">
          <div className="w-full h-full border-l border-zinc-700 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>
      </section>
    </div>
  );
};
