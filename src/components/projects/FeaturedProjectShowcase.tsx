import React from 'react';
import { Project } from '../../types';
import { useGitHubStats, formatTimeAgo } from '../../hooks/useGitHubStats';
import {
  ExternalLink,
  Github,
  Star,
  GitFork,
  ArrowRight,
  Sparkles,
  Cpu,
  Layers,
  CheckCircle2,
  Clock,
  Radio,
  BookOpen
} from 'lucide-react';

interface FeaturedProjectShowcaseProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export const FeaturedProjectShowcase: React.FC<FeaturedProjectShowcaseProps> = ({
  project,
  onOpenDetails,
}) => {
  const { getProjectStats } = useGitHubStats();
  const stats = getProjectStats(project);


  return (
    <section className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-zinc-900 to-zinc-950 text-white border border-zinc-800 shadow-xl" id="featured-showcase">
      {/* Subtle Matrix Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Top Banner Tag */}
      <div className="flex items-center justify-between px-6 sm:px-8 py-3 bg-zinc-950/80 border-b border-zinc-800/80 text-xs font-mono">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>FLAGSHIP PRODUCT & OPEN SOURCE ENGINE</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-400 text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{project.status}</span>
          <span className="text-zinc-600">|</span>
          <span>{project.version}</span>
        </div>
      </div>

      <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Information & Specs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
                {project.categoryLabel}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-mono">
                {project.primaryLanguage || 'Python 3.12+'}
              </span>
              {stats.stars !== null && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{stats.stars} star{stats.stars !== 1 ? 's' : ''}</span>
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase font-sans">
              {project.name}
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
              {project.description}
            </p>
          </div>

          {/* Verified Highlights Chips */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {project.verifiedHighlights?.map((item, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-zinc-900/90 border border-zinc-800/80">
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">{item.label}</div>
                <div className="text-sm font-bold text-white font-mono mt-0.5">{item.value}</div>
                <div className="text-[11px] text-zinc-400 mt-1 leading-snug">{item.detail}</div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onOpenDetails(project)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm transition-all shadow-lg hover:shadow-emerald-500/20 cursor-pointer"
            >
              <span>Explore Technical Architecture</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 text-sm font-medium transition-colors border border-zinc-700"
              >
                <span>Live Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 text-sm font-medium transition-colors border border-zinc-700"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repo</span>
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Architecture & Delivery Signals */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl bg-zinc-950/90 border border-zinc-800 p-5 shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-4">
              <Layers className="w-4 h-4" />
              <span>Production Engineering</span>
            </div>
            <div className="space-y-3">
              {(project.architectureHighlights || []).slice(0, 5).map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-zinc-300 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-400 leading-relaxed">
            Eagox Studio focuses on maintainable, responsive, production-ready software rather than browser-only demonstrations.
          </div>
        </div>
      </div>
    </section>
  );
};
