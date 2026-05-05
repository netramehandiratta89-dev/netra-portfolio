import { projects as fallbackProjects } from '../utils/constants.js';

const username = import.meta.env.VITE_GITHUB_USERNAME || 'netramehandiratta89-dev';
const apiBase = 'https://api.github.com';

const languageFallback = {
  JavaScript: 'SaaS',
  TypeScript: 'SaaS',
  Python: 'AI',
  HTML: 'Frontend',
  CSS: 'Frontend',
  Java: 'Backend',
  C: 'Systems'
};

export const githubConfig = {
  username,
  profileUrl: username ? `https://github.com/${username}` : 'https://github.com'
};

const request = async (path) => {
  const response = await fetch(`${apiBase}${path}`, {
    headers: { Accept: 'application/vnd.github+json' }
  });
  if (!response.ok) throw new Error(`GitHub request failed: ${response.status}`);
  return response.json();
};

const buildEmptyCells = () => Array.from({ length: 91 }, (_, index) => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - (90 - index));
  return { date: date.toISOString().slice(0, 10), count: 0, level: 0 };
});

const cellsFromDays = (days, source) => {
  const cells = buildEmptyCells().map((cell) => {
    const count = days.get(cell.date) || 0;
    return { ...cell, count, level: Math.min(4, count), source };
  });
  const total = cells.reduce((sum, cell) => sum + cell.count, 0);
  return { cells, total, source };
};

export const fetchGitHubProjects = async () => {
  if (!username) return fallbackProjects;
  const repos = await request(`/users/${username}/repos?sort=updated&per_page=8&type=owner`);
  const visible = repos.filter((repo) => !repo.fork).slice(0, 6);
  return visible.map((repo, index) => ({
    title: repo.name.replaceAll('-', ' '),
    tag: repo.language ? languageFallback[repo.language] || repo.language : 'Project',
    image: fallbackProjects[index % fallbackProjects.length].image,
    stack: [
      repo.language,
      repo.stargazers_count ? `${repo.stargazers_count} stars` : null,
      repo.updated_at ? `Updated ${new Date(repo.updated_at).toLocaleDateString()}` : null
    ].filter(Boolean).join(' - '),
    description: repo.description || 'Live GitHub repository connected from your public profile.',
    live: repo.homepage || repo.html_url,
    github: repo.html_url,
    stars: repo.stargazers_count,
    updatedAt: repo.updated_at
  }));
};

export const fetchGitHubActivity = async () => {
  if (!username) return { cells: buildEmptyCells(), total: 0, source: 'Not connected' };

  const eventDays = new Map();
  const events = await request(`/users/${username}/events/public?per_page=100`);
  events.forEach((event) => {
    const day = event.created_at.slice(0, 10);
    eventDays.set(day, (eventDays.get(day) || 0) + 1);
  });

  if (eventDays.size > 0) return cellsFromDays(eventDays, 'Public events');

  const repos = await request(`/users/${username}/repos?sort=updated&per_page=100&type=owner`);
  const repoDays = new Map();
  repos.filter((repo) => !repo.fork).forEach((repo) => {
    const day = (repo.pushed_at || repo.updated_at || repo.created_at || '').slice(0, 10);
    if (day) repoDays.set(day, (repoDays.get(day) || 0) + 1);
  });

  return cellsFromDays(repoDays, 'Repository updates');
};
