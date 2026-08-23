import React from 'react';
import { Project } from '../../types';
import { useGitHubStats, formatTimeAgo } from '../../hooks/useGitHubStats';
import {
  ExternalLink,
  Github,
  Star,
  GitFork,
  Clock,
  Layers,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Activity,
  Code2
} from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDetails }) => {
  const { getProjectStats } = useGitHubStats();

  const stats = getProjectStats(project);


  const getStatusBadge = (status: Project['status']) => {
    switch (status) {
      case 'Active Release':
      case 'Production':
        return {
          bg: 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
          dot: 'bg-emerald-500',
        };
      case 'Open Source':
        return {
          bg: 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30',
          dot: 'bg-blue-500',
        };
      case 'In Development':
        return {
          bg: 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30',
          dot: 'bg-amber-500',
        };
      default:
        return {
          bg: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700',
          dot: 'bg-zinc-400',
        };
    }
  };

  const statusStyle = getStatusBadge(project.status);

  return (
    <article
      onClick={() => onOpenDetails(project)}
      id={`project-card-${project.slug}`}
      className="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800/90 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-200 hover:-translate-y-1 shadow-xs hover:shadow-lg cursor-pointer overflow-hidden p-5 sm:p-6"
    >
      <div className="space-y-4">
        {/* Top Header: Category & Status */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
              {project.categoryLabel}
            </span>
            {project.primaryLanguage && (
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">
                {project.primaryLanguage}
              </span>
            )}
          </div>

          <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-mono font-medium ${statusStyle.bg}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`}></span>
            <span>{project.status}</span>
          </div>
        </div>

        {/* Project Name & Tagline */}
        <div className="space-y-1.5">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center justify-between">
            <span>{project.name}</span>
            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Real Dynamic GitHub / Public Metrics */}
        {(stats.stars !== null || stats.lastUpdated || stats.forks !== null) && (
          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono text-zinc-600 dark:text-zinc-400">
            {stats.stars !== null && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">{stats.stars}</span>
                <span className="text-zinc-500 text-[10px]">star{stats.stars !== 1 ? 's' : ''}</span>
              </span>
            )}

            {stats.forks !== null && stats.forks > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80">
                <GitFork className="w-3 h-3 text-zinc-500" />
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">{stats.forks}</span>
              </span>
            )}

            {stats.lastUpdated && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80">
                <Clock className="w-3 h-3 text-zinc-500" />
                <span>Updated {formatTimeAgo(stats.lastUpdated)}</span>
              </span>
            )}
          </div>
        )}

        {/* Verified Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.techStack.slice(0, 5).map((tech, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700/60"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 text-zinc-500 self-center">
              +{project.techStack.length - 5}
            </span>
          )}
        </div>

        {/* Real Features Preview */}
        {project.features && project.features.length > 0 && (
          <ul className="space-y-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800/60 text-xs text-zinc-600 dark:text-zinc-400">
            {project.features.slice(0, 2).map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span className="line-clamp-1">{feat}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer Actions */}
      <div className="pt-5 mt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title="Open Live Website / Demo"
              aria-label={`Open ${project.name} live demo`}
              className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title="View GitHub Repository"
              aria-label={`View ${project.name} GitHub repository`}
              className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
            >
              <Github className="w-4 h-4" />
            </a>
          )}

        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(project);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-bold text-xs hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors cursor-pointer"
        >
          <span>Case Study</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
};
