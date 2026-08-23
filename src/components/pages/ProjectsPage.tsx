import React, { useState, useMemo, useEffect } from 'react';
import { PageId, Project, ProjectCategory, ProjectSortOption } from '../../types';
import { PROJECTS_DATA } from '../../data/projectsData';
import { useGitHubStats } from '../../hooks/useGitHubStats';
import { ProjectsHero } from '../projects/ProjectsHero';
import { FeaturedProjectShowcase } from '../projects/FeaturedProjectShowcase';
import { ProjectFilterToolbar } from '../projects/ProjectFilterToolbar';
import { ProjectCard } from '../projects/ProjectCard';
import { ProjectDetailModal } from '../projects/ProjectDetailModal';
import { RotateCcw } from 'lucide-react';

interface ProjectsPageProps {
  onNavigate: (page: PageId) => void;
  selectedProjectId?: string | null;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate, selectedProjectId }) => {
  const {
    statsMap,
    isLoading,
    isRefreshing,
    lastFetchedAt,
    source,
    refreshStats,
    getProjectStats,
  } = useGitHubStats();

  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<ProjectSortOption>('featured');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(() => {
    if (selectedProjectId) {
      return PROJECTS_DATA.find((p) => p.id === selectedProjectId || p.slug === selectedProjectId) || null;
    }
    return null;
  });

  // If selectedProjectId prop changes, open the corresponding project modal
  useEffect(() => {
    if (selectedProjectId) {
      const found = PROJECTS_DATA.find((p) => p.id === selectedProjectId || p.slug === selectedProjectId);
      if (found) {
        setActiveModalProject(found);
      }
    }
  }, [selectedProjectId]);

  // Featured flagship project (Seed Code CLI)
  const featuredProject = useMemo(() => {
    return PROJECTS_DATA.find((p) => p.isFeatured) || PROJECTS_DATA[0];
  }, []);

  // Category item counts
  const categoryCounts = useMemo(() => {
    const counts: Record<ProjectCategory, number> = {
      all: PROJECTS_DATA.length,
      'ai-cli': 0,
      'web-saas': 0,
      'mobile-desktop': 0,
      interactive: 0,
    };
    PROJECTS_DATA.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category]++;
      }
    });
    return counts;
  }, []);

  // Total stars across verified repositories
  const totalStarsCount = useMemo(() => {
    let sum = 0;
    PROJECTS_DATA.forEach((p) => {
      const stats = getProjectStats(p);
      if (stats.stars) sum += stats.stars;
    });
    return sum;
  }, [getProjectStats]);

  // Filtered & Sorted Projects
  const filteredAndSortedProjects = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    const filtered = PROJECTS_DATA.filter((p) => {
      // Category filter
      if (activeCategory !== 'all' && p.category !== activeCategory) {
        return false;
      }

      // Search query filter across name, description, tags, features, problem solved
      if (q) {
        const matchName = p.name.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchTagline = p.tagline?.toLowerCase().includes(q) || false;
        const matchTech = p.techStack.some((t) => t.toLowerCase().includes(q));
        const matchFeat = p.features?.some((f) => f.toLowerCase().includes(q)) || false;
        const matchLang = p.primaryLanguage?.toLowerCase().includes(q) || false;
        const matchProb = p.problemSolved?.toLowerCase().includes(q) || false;
        const matchSlug = p.slug.toLowerCase().includes(q);

        if (
          !matchName &&
          !matchDesc &&
          !matchTagline &&
          !matchTech &&
          !matchFeat &&
          !matchLang &&
          !matchProb &&
          !matchSlug
        ) {
          return false;
        }
      }

      return true;
    });

    // Sorting logic
    return [...filtered].sort((a, b) => {
      if (sortBy === 'stars') {
        const starsA = getProjectStats(a).stars || 0;
        const starsB = getProjectStats(b).stars || 0;
        if (starsB !== starsA) return starsB - starsA;
        return a.featuredOrder - b.featuredOrder;
      }

      if (sortBy === 'updated') {
        const dateA = getProjectStats(a).lastUpdated ? new Date(getProjectStats(a).lastUpdated!).getTime() : 0;
        const dateB = getProjectStats(b).lastUpdated ? new Date(getProjectStats(b).lastUpdated!).getTime() : 0;
        if (dateB !== dateA) return dateB - dateA;
        return a.featuredOrder - b.featuredOrder;
      }

      if (sortBy === 'alphabetical') {
        return a.name.localeCompare(b.name);
      }

      // Default 'featured'
      return a.featuredOrder - b.featuredOrder;
    });
  }, [activeCategory, searchQuery, sortBy, getProjectStats]);

  const openSourceCount = useMemo(() => {
    return PROJECTS_DATA.filter((p) => p.githubRepo || p.status === 'Open Source' || p.status === 'Active Release').length;
  }, []);

  const productionCount = useMemo(() => {
    return PROJECTS_DATA.filter((p) => p.liveDemoUrl || p.status === 'Production' || p.status === 'Active Release').length;
  }, []);

  const resetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="space-y-12 sm:space-y-16 animate-fade-in" id="eagox-projects-page">
      {/* 1. Verified Hero & Telemetry Banner */}
      <ProjectsHero
        totalProjects={PROJECTS_DATA.length}
        openSourceCount={openSourceCount}
        productionCount={productionCount}
        totalStars={totalStarsCount}
        lastFetchedAt={lastFetchedAt}
        isRefreshing={isRefreshing}
        onRefresh={refreshStats}
        source={source}
      />

      {/* 2. Flagship Featured Project Showcase (Only shown when no search query and 'all' or 'ai-cli' selected) */}
      {!searchQuery && (activeCategory === 'all' || activeCategory === 'ai-cli') && featuredProject && (
        <FeaturedProjectShowcase
          project={featuredProject}
          onOpenDetails={(p) => setActiveModalProject(p)}
        />
      )}

      {/* 3. Filter Toolbar & Search Bar */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white uppercase font-sans">
              All Repositories & Software Systems
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">
              Filter by category, search technologies, or inspect verified telemetry.
            </p>
          </div>
        </div>

        <ProjectFilterToolbar
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          categoryCounts={categoryCounts}
          totalResultsCount={filteredAndSortedProjects.length}
        />

        {/* 4. Projects Grid */}
        {filteredAndSortedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {filteredAndSortedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenDetails={(p) => setActiveModalProject(p)}
              />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="p-12 text-center rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-4">
            <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-zinc-950 dark:text-white">
                No matching projects found
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                No software matching &ldquo;{searchQuery}&rdquo; in category &ldquo;{activeCategory}&rdquo;. Try another keyword or reset filters.
              </p>
            </div>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-mono text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset all filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Deep Case Study & Technical Architecture Modal */}
      <ProjectDetailModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </div>
  );
};
