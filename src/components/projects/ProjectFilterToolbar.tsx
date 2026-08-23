import React from 'react';
import { ProjectCategory, ProjectSortOption } from '../../types';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface ProjectFilterToolbarProps {
  activeCategory: ProjectCategory;
  onCategoryChange: (category: ProjectCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: ProjectSortOption;
  onSortChange: (sort: ProjectSortOption) => void;
  categoryCounts: Record<ProjectCategory, number>;
  totalResultsCount: number;
}

export const ProjectFilterToolbar: React.FC<ProjectFilterToolbarProps> = ({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  categoryCounts,
  totalResultsCount,
}) => {
  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai-cli', label: 'AI & CLI' },
    { id: 'web-saas', label: 'Web & Cloud' },
    { id: 'mobile-desktop', label: 'OS & Desktop' },
    { id: 'interactive', label: 'Games & Canvas' },
  ];

  return (
    <div className="space-y-4 pt-2 pb-2" id="project-filter-toolbar">
      {/* Search Bar & Sort Dropdown Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search projects, technologies, features, architecture..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as ProjectSortOption)}
              className="bg-transparent text-zinc-900 dark:text-zinc-100 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="featured" className="dark:bg-zinc-900">Featured (Hierarchy)</option>
              <option value="updated" className="dark:bg-zinc-900">Recently Updated</option>
              <option value="stars" className="dark:bg-zinc-900">Most Starred</option>
              <option value="alphabetical" className="dark:bg-zinc-900">Alphabetical (A-Z)</option>
            </select>
          </div>

          <div className="hidden lg:flex items-center px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-500">
            <span>{totalResultsCount} result{totalResultsCount !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const count = categoryCounts[cat.id] || 0;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-sm'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive
                    ? 'bg-zinc-800 dark:bg-zinc-200 text-zinc-200 dark:text-zinc-800'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
