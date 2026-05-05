import Reveal from '../components/UI/Reveal.jsx';
import { useAsyncData } from '../hooks/useAsyncData.js';
import { fetchGitHubActivity, githubConfig } from './githubService.js';

const fallbackActivity = {
  cells: Array.from({ length: 91 }, (_, index) => ({ date: '', count: (index * 17) % 5, level: (index * 17) % 5 })),
  total: 0,
  source: 'Loading'
};

export default function GitHubGraph() {
  const { data: activity, loading, error } = useAsyncData(fetchGitHubActivity, fallbackActivity);
  const { cells, total, source } = activity;
  const hasActivity = total > 0;

  return (
    <section className="section">
      <Reveal>
        <span className="eyebrow">{loading ? 'Reading GitHub' : error ? 'GitHub Fallback' : 'GitHub Analysis'}</span>
        <h2 className="headline">Repository activity and public updates visualized from your GitHub profile.</h2>
      </Reveal>
      <Reveal className="premium-card mt-12 overflow-hidden">
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="text-3xl font-black">{total}</div>
            <div className="muted text-sm">Activity points</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="text-2xl font-black">{source}</div>
            <div className="muted text-sm">Graph source</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="break-all text-xl font-black">@{githubConfig.username}</div>
            <div className="muted text-sm">Connected profile</div>
          </div>
        </div>
        <div className="grid grid-cols-13 gap-2 sm:grid-cols-[repeat(13,minmax(0,1fr))]">
          {cells.map((cell, index) => (
            <div
              key={`${cell.date}-${index}`}
              title={`${cell.date}: ${cell.count} activity points`}
              className="aspect-square rounded bg-plasma/10 transition hover:scale-110 hover:ring-2 hover:ring-plasma/40"
              style={{ opacity: 0.16 + cell.level * 0.2 }}
            />
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-3 text-sm text-zinc-600 dark:text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
          <span>{hasActivity ? `Showing ${source.toLowerCase()} from the last 91 days.` : 'No recent public GitHub activity was returned yet; this will brighten as new public updates appear.'}</span>
          <a className="font-bold text-plasma" href={githubConfig.profileUrl} target="_blank" rel="noreferrer">Open GitHub</a>
        </div>
      </Reveal>
    </section>
  );
}
