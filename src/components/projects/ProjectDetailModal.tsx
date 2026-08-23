import React, { useState, useEffect } from 'react';
import { Project } from '../../types';
import { useGitHubStats, formatTimeAgo } from '../../hooks/useGitHubStats';
import {
  X,
  ExternalLink,
  Github,
  Star,
  GitFork,
  AlertCircle,
  Clock,
  Layers,
  Sparkles,
  CheckCircle2,
  Cpu,
  Radio,
  FileCode,
  ShieldCheck,
  BookOpen,
  Share2,
  GitBranch
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const { getProjectStats } = useGitHubStats();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'stats'>('overview');

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  const stats = getProjectStats(project);


  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success('Project link copied to clipboard', 'Share Link');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl text-zinc-900 dark:text-zinc-100 overflow-hidden my-auto"
      >
        {/* Top Header Navigation Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 shrink-0">
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 dark:text-zinc-400">
            <span className="text-zinc-900 dark:text-zinc-200 font-semibold uppercase">{project.categoryLabel}</span>
            <span>/</span>
            <span className="text-emerald-600 dark:text-emerald-400">{project.slug}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              title="Share project link"
              aria-label="Share project"
              className="p-1.5 rounded-lg bg-zinc-200/70 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              title="Close modal (Esc)"
              aria-label="Close modal"
              className="p-1.5 rounded-lg bg-zinc-200/70 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Project Title & Links Banner */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-mono font-medium">
                {project.status}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 text-xs font-mono">
                {project.version}
              </span>
              {project.primaryLanguage && (
                <span className="px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 text-xs font-mono">
                  {project.primaryLanguage}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-white uppercase font-sans">
                {project.name}
              </h2>
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
                {project.tagline}
              </p>
            </div>

            {/* Direct Action Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs sm:text-sm transition-colors shadow-sm"
                >
                  <span>Open Live Application</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {project.mobileAppUrl && (
                <a
                  href={project.mobileAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-colors shadow-sm"
                >
                  <span>Android App Client</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 text-xs sm:text-sm font-medium transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              )}

              {project.documentationUrl && (
                <a
                  href={project.documentationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 text-xs sm:text-sm font-medium transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Documentation / README</span>
                </a>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto pb-1 text-xs font-mono">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Overview & Features
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer ${
                activeTab === 'architecture'
                  ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Technical Architecture
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer ${
                activeTab === 'stats'
                  ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Repository Telemetry
            </button>
          </div>

          {/* TAB 1: OVERVIEW & FEATURES */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              {/* Problem Solved */}
              {project.problemSolved && (
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Problem Solved</span>
                  </div>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
                    {project.problemSolved}
                  </p>
                </div>
              )}

              {/* Full Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
                  Detailed Specifications
                </h4>
                <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
                  {project.longDescription || project.fullOverview}
                </p>
              </div>

              {/* Verified Features */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
                  Verified Capabilities & Key Features
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 flex items-start gap-2.5 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(project.technologies || project.techStack).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 text-xs font-mono font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TECHNICAL ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-zinc-950 dark:text-white">
                  Technical Architecture Pipeline
                </h4>
                <p className="text-xs text-zinc-500 font-mono">
                  Verified system design and execution layers extracted from source code.
                </p>
              </div>

              {/* Architecture Step Breakdown */}
              <div className="space-y-3">
                {project.architecture?.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center text-[10px] font-mono font-bold">
                          0{idx + 1}
                        </span>
                        <span className="text-xs font-mono font-bold uppercase text-zinc-900 dark:text-white">
                          {step.layer}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 pl-7">
                        {step.description}
                      </p>
                    </div>

                    <span className="self-start sm:self-center px-2.5 py-1 rounded-md bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-mono text-[11px] font-medium shrink-0">
                      {step.tech}
                    </span>
                  </div>
                ))}
              </div>

              {/* Architecture Highlights */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
                  Engineering Highlights & Design Decisions
                </h4>
                <div className="space-y-2">
                  {project.architectureHighlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: REPOSITORY TELEMETRY */}
          {activeTab === 'stats' && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                  <span>Verified Public Metrics</span>
                  {stats.isLive && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-medium">
                      Live API Connected
                    </span>
                  )}
                </h4>
                <p className="text-xs text-zinc-500 font-mono">
                  All statistics are retrieved from official public repositories and verified APIs.
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-mono mb-1">
                    <Star className="w-3.5 h-3.5 text-amber-500" />
                    <span>GitHub Stars</span>
                  </div>
                  <div className="text-2xl font-black font-mono text-zinc-950 dark:text-white">
                    {stats.stars !== null ? stats.stars : 'Not available'}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-mono mb-1">
                    <GitFork className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Forks</span>
                  </div>
                  <div className="text-2xl font-black font-mono text-zinc-950 dark:text-white">
                    {stats.forks !== null ? stats.forks : 'Not available'}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-mono mb-1">
                    <AlertCircle className="w-3.5 h-3.5 text-blue-500" />
                    <span>Open Issues</span>
                  </div>
                  <div className="text-2xl font-black font-mono text-zinc-950 dark:text-white">
                    {stats.openIssues !== null ? stats.openIssues : 'Not available'}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-mono mb-1">
                    <FileCode className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Primary Language</span>
                  </div>
                  <div className="text-base font-bold font-mono text-zinc-950 dark:text-white truncate">
                    {stats.primaryLanguage || 'Not available'}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-mono mb-1">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Last Updated</span>
                  </div>
                  <div className="text-sm font-semibold font-mono text-zinc-950 dark:text-white">
                    {formatTimeAgo(stats.lastUpdated)}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-mono mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Open Source License</span>
                  </div>
                  <div className="text-base font-bold font-mono text-zinc-950 dark:text-white">
                    {stats.license || 'Open License'}
                  </div>
                </div>
              </div>

              {/* Repo Information Box */}
              {project.githubRepo && (
                <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between text-zinc-500">
                    <span>Target Repository:</span>
                    <a
                      href={`https://github.com/${project.githubRepo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <span>github.com/{project.githubRepo}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-zinc-50 dark:bg-zinc-950/80 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-500">
          <span>EAGOX VERIFIED PROJECT REPO</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
