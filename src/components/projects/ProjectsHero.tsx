import React from 'react';
import { Sparkles, RefreshCw, Radio, GitBranch, Layers, ShieldCheck, Terminal, Star } from 'lucide-react';
import { formatTimeAgo } from '../../hooks/useGitHubStats';

interface ProjectsHeroProps {
  totalProjects: number;
  openSourceCount: number;
  productionCount: number;
  totalStars: number;
  lastFetchedAt: number | null;
  isRefreshing: boolean;
  onRefresh: () => void;
  source: 'live' | 'cache' | 'fallback' | 'offline';
}

export const ProjectsHero: React.FC<ProjectsHeroProps> = ({
  totalProjects,
  openSourceCount,
  productionCount,
  totalStars,
  lastFetchedAt,
  isRefreshing,
  onRefresh,
  source,
}) => {
  return (
    <section className="relative overflow-hidden pt-2 pb-6 border-b border-zinc-200 dark:border-zinc-800/80">
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10" />

      <div className="space-y-6">
        {/* Top Telemetry & Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 font-mono text-[11px]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold tracking-wide">VERIFIED PRODUCTION & OPEN SOURCE SHOWCASE</span>
          </div>

          {/* GitHub Live Sync Telemetry */}
          <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
            <span className="hidden sm:inline-flex items-center gap-1">
              <Radio className="w-3 h-3 text-emerald-500 animate-pulse" />
              <span>GitHub API:</span>
              <span className="text-zinc-900 dark:text-zinc-200 font-medium capitalize">
                {source === 'live' ? 'Live Connected' : source === 'cache' ? 'Cached (Sync 15m)' : 'Baseline Data'}
              </span>
            </span>
            {lastFetchedAt && (
              <span className="hidden md:inline text-zinc-500">
                • {formatTimeAgo(new Date(lastFetchedAt).toISOString())}
              </span>
            )}
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              title="Refresh live GitHub repository data"
              aria-label="Refresh repository data"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-200/70 dark:bg-zinc-800/80 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-emerald-500' : ''}`} />
              <span className="hidden xs:inline">{isRefreshing ? 'Syncing...' : 'Sync GitHub'}</span>
            </button>
          </div>
        </div>

        {/* Hero Title and Statement */}
        <div className="max-w-4xl space-y-4">
          <div className="space-y-2">
            <p className="text-xs sm:text-sm font-mono tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-semibold">
              ENGINEERING PORTFOLIO & REPOSITORY INDEX
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 dark:text-white uppercase leading-[1.04] font-sans">
              Things I’ve Built, Tested & Shipped.
            </h1>
          </div>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed">
            A genuine collection of autonomous AI CLI tools, full-stack cloud applications, custom Linux distributions, computer vision experiments, and physics engines. Every repository and statistic is verified against live public sources.
          </p>
        </div>

        {/* Real Metrics Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800/90 shadow-xs">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 mb-1">
              <span className="text-xs font-mono uppercase tracking-wider">Total Products</span>
              <Layers className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-black font-mono text-zinc-950 dark:text-white">
              {totalProjects}
            </div>
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
              Curated verified projects
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800/90 shadow-xs">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 mb-1">
              <span className="text-xs font-mono uppercase tracking-wider">Production</span>
              <ShieldCheck className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-black font-mono text-zinc-950 dark:text-white">
              {productionCount}
            </div>
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
              Live web & mobile apps
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800/90 shadow-xs">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 mb-1">
              <span className="text-xs font-mono uppercase tracking-wider">Open Source</span>
              <GitBranch className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-black font-mono text-zinc-950 dark:text-white">
              {openSourceCount}
            </div>
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
              Public GitHub repos
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800/90 shadow-xs">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 mb-1">
              <span className="text-xs font-mono uppercase tracking-wider">Core Stacks</span>
              <Terminal className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono text-zinc-950 dark:text-white truncate">
              Py • TS • React • OS
            </div>
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
              Multi-paradigm toolchains
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
