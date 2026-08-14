import { hiddenRepos, siteConfig } from "@/lib/data";

const FEATURED_LIMIT = 12;
const EXCLUDED = new Set(hiddenRepos.map((name) => name.toLowerCase()));

const palettes = [
  {
    glow: "violet",
    gradient: "from-violet-600/30 via-surface to-cyan-600/20",
    border: "border-violet-500/40",
  },
  {
    glow: "cyan",
    gradient: "from-cyan-600/30 via-surface to-emerald-600/20",
    border: "border-cyan-500/40",
  },
  {
    glow: "amber",
    gradient: "from-amber-600/30 via-surface to-rose-600/20",
    border: "border-amber-500/40",
  },
  {
    glow: "rose",
    gradient: "from-rose-600/30 via-surface to-violet-600/20",
    border: "border-rose-500/40",
  },
] as const;

export type GithubProject = {
  name: string;
  description: string;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  forks: number;
  topics: string[];
  glow: (typeof palettes)[number]["glow"];
  gradient: string;
  border: string;
};

type GithubApiRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  updated_at: string;
};

function normalizeHomepage(homepage: string | null): string | null {
  if (!homepage) return null;
  const trimmed = homepage.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

function scoreRepo(repo: GithubApiRepo) {
  const homepageBonus = normalizeHomepage(repo.homepage) ? 4 : 0;
  const topicBonus = repo.topics?.length ? 1 : 0;
  return repo.stargazers_count * 10 + homepageBonus + topicBonus;
}

export async function getGithubProjects(): Promise<GithubProject[]> {
  const username = siteConfig.githubUsername;
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": `${username}-portfolio`,
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers,
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      console.error(`GitHub API responded with ${response.status}`);
      return [];
    }

    const repos = (await response.json()) as GithubApiRepo[];

    return repos
      .filter(
        (repo) =>
          !repo.fork &&
          !repo.archived &&
          !EXCLUDED.has(repo.name.toLowerCase())
      )
      .sort((a, b) => {
        const scoreDiff = scoreRepo(b) - scoreRepo(a);
        if (scoreDiff !== 0) return scoreDiff;
        return (
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
      })
      .slice(0, FEATURED_LIMIT)
      .map((repo, index) => {
        const palette = palettes[index % palettes.length];
        return {
          name: repo.name,
          description:
            repo.description?.trim() ||
            "An unnamed ritual waiting to be inscribed.",
          url: repo.html_url,
          homepage: normalizeHomepage(repo.homepage),
          language: repo.language,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          topics: repo.topics ?? [],
          glow: palette.glow,
          gradient: palette.gradient,
          border: palette.border,
        };
      });
  } catch (error) {
    console.error("Failed to load GitHub repositories", error);
    return [];
  }
}
