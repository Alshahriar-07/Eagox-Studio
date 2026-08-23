import { useState, useEffect, useCallback } from 'react';
import { GitHubRepoStats, Project } from '../types';

const STORAGE_KEY = 'eagox_github_stats_cache_v2';
const CLIENT_CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

export interface GitHubStatsState {
  statsMap: Record<string, GitHubRepoStats>;
  isLoading: boolean;
  isRefreshing: boolean;
  lastFetchedAt: number | null;
  source: 'live' | 'cache' | 'fallback' | 'offline';
  error: string | null;
}

export function useGitHubStats() {
  const [state, setState] = useState<GitHubStatsState>(() => {
    // Attempt hydration from localStorage
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.statsMap && parsed.timestamp) {
          return {
            statsMap: parsed.statsMap,
            isLoading: false,
            isRefreshing: false,
            lastFetchedAt: parsed.timestamp,
            source: 'cache',
            error: null,
          };
        }
      }
    } catch {
      // Ignore storage errors
    }

    return {
      statsMap: {},
      isLoading: true,
      isRefreshing: false,
      lastFetchedAt: null,
      source: 'fallback',
      error: null,
    };
  });

  const fetchStats = useCallback(async (isManualRefresh = false) => {
    setState((prev) => ({
      ...prev,
      isLoading: prev.lastFetchedAt === null,
      isRefreshing: isManualRefresh,
      error: null,
    }));

    try {
      // Public GitHub API: no Eagox backend or subscription required.
      let rawData: any = null;

      {
        const publicRes = await fetch('https://api.github.com/users/Alshahriar-07/repos?per_page=100&sort=updated', {
          headers: { Accept: 'application/vnd.github.v3+json' },
        });

        if (publicRes.ok) {
          const repos = await publicRes.json();
          if (Array.isArray(repos)) {
            const mapped: Record<string, GitHubRepoStats> = {};
            const now = Date.now();
            repos.forEach((r: any) => {
              const full = (r.full_name || `Alshahriar-07/${r.name}`).toLowerCase();
              const short = (r.name || '').toLowerCase();
              const statsObj: GitHubRepoStats = {
                repoKey: r.full_name || `Alshahriar-07/${r.name}`,
                name: r.name,
                fullName: r.full_name,
                stars: r.stargazers_count ?? 0,
                forks: r.forks_count ?? 0,
                openIssues: r.open_issues_count ?? 0,
                watchers: r.watchers_count ?? 0,
                primaryLanguage: r.language || null,
                description: r.description || null,
                lastUpdated: r.updated_at,
                pushedAt: r.pushed_at,
                createdAt: r.created_at,
                repoUrl: r.html_url,
                homepage: r.homepage || null,
                isArchived: Boolean(r.archived),
                license: r.license?.spdx_id || r.license?.name || null,
                sizeKb: r.size || 0,
                defaultBranch: r.default_branch || 'main',
                verified: true,
                fetchedAt: now,
              };
              mapped[full] = statsObj;
              mapped[short] = statsObj;
            });
            rawData = mapped;
          }
        }
      }

      if (rawData && Object.keys(rawData).length > 0) {
        const timestamp = Date.now();
        setState({
          statsMap: rawData,
          isLoading: false,
          isRefreshing: false,
          lastFetchedAt: timestamp,
          source: 'live',
          error: null,
        });

        try {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ statsMap: rawData, timestamp })
          );
        } catch {
          // ignore localStorage errors
        }
        return;
      }

      // If no new data could be fetched, fallback cleanly to existing state or baseline
      setState((prev) => ({
        ...prev,
        isLoading: false,
        isRefreshing: false,
        source: prev.lastFetchedAt ? 'cache' : 'fallback',
        error: 'Unable to refresh live stats. Showing verified baseline repository metrics.',
      }));
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        isRefreshing: false,
        source: prev.lastFetchedAt ? 'cache' : 'fallback',
        error: err.message || 'GitHub network connection unavailable',
      }));
    }
  }, []);

  useEffect(() => {
    // Only fetch if data is missing or stale
    const isStale = !state.lastFetchedAt || Date.now() - state.lastFetchedAt > CLIENT_CACHE_TTL_MS;
    if (isStale) {
      fetchStats();
    }
  }, [fetchStats, state.lastFetchedAt]);

  // Helper to extract verified stats for a project
  const getProjectStats = useCallback(
    (project: Project): {
      stars: number | null;
      forks: number | null;
      openIssues: number | null;
      watchers: number | null;
      primaryLanguage: string | null;
      lastUpdated: string | null;
      license: string | null;
      sizeKb: number | null;
      isArchived: boolean;
      isLive: boolean;
    } => {
      const repoKey = project.githubRepo?.toLowerCase() || '';
      const slugKey = project.slug?.toLowerCase() || '';
      const idKey = project.id?.toLowerCase() || '';

      const live =
        state.statsMap[repoKey] ||
        state.statsMap[slugKey] ||
        state.statsMap[idKey];

      if (live) {
        return {
          stars: live.stars,
          forks: live.forks,
          openIssues: live.openIssues,
          watchers: live.watchers,
          primaryLanguage: live.primaryLanguage || project.primaryLanguage || null,
          lastUpdated: live.lastUpdated || live.pushedAt || null,
          license: live.license || project.baselineStats?.license || null,
          sizeKb: live.sizeKb || null,
          isArchived: live.isArchived,
          isLive: true,
        };
      }

      // If no live stats retrieved, use verified baseline if available
      if (project.baselineStats) {
        return {
          stars: project.baselineStats.stars ?? null,
          forks: project.baselineStats.forks ?? null,
          openIssues: project.baselineStats.openIssues ?? null,
          watchers: null,
          primaryLanguage: project.baselineStats.primaryLanguage || project.primaryLanguage || null,
          lastUpdated: project.baselineStats.lastUpdated ?? null,
          license: project.baselineStats.license ?? null,
          sizeKb: null,
          isArchived: false,
          isLive: false,
        };
      }

      return {
        stars: null,
        forks: null,
        openIssues: null,
        watchers: null,
        primaryLanguage: project.primaryLanguage || null,
        lastUpdated: null,
        license: null,
        sizeKb: null,
        isArchived: false,
        isLive: false,
      };
    },
    [state.statsMap]
  );

  return {
    statsMap: state.statsMap,
    isLoading: state.isLoading,
    isRefreshing: state.isRefreshing,
    lastFetchedAt: state.lastFetchedAt,
    source: state.source,
    error: state.error,
    refreshStats: () => fetchStats(true),
    getProjectStats,
  };
}

export function formatTimeAgo(isoString: string | null | undefined): string {
  if (!isoString) return 'Not available';
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return 'Not available';

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);

    if (diffMins < 2) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 30) return `${diffDays}d ago`;
    if (diffMonths < 12) return `${diffMonths}mo ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return 'Not available';
  }
}
