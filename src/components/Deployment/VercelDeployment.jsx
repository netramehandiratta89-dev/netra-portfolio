import { ExternalLink, Rocket } from 'lucide-react';
import Reveal from '../UI/Reveal.jsx';

const deploymentUrl = import.meta.env.VITE_VERCEL_DEPLOYMENT_URL;
const projectName = import.meta.env.VITE_VERCEL_PROJECT_NAME || 'portfolio-webapp';

export default function VercelDeployment() {
  const currentHost = typeof window !== 'undefined' ? window.location.host : '';
  const isVercelRuntime = currentHost.includes('vercel.app');
  const displayUrl = deploymentUrl || (isVercelRuntime ? window.location.href : '');
  const status = displayUrl ? 'Live on Vercel' : 'Local preview';

  return (
    <section className="section">
      <Reveal>
        <span className="eyebrow">Deployment</span>
        <h2 className="headline">Real-time deployment surface for your Vercel portfolio.</h2>
      </Reveal>
      <Reveal className="premium-card mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-plasma/15 text-plasma">
            <Rocket />
          </div>
          <div>
            <div className="text-2xl font-black">{projectName}</div>
            <div className="muted">{status}</div>
          </div>
        </div>
        {displayUrl ? (
          <a className="button-primary" href={displayUrl} target="_blank" rel="noreferrer">
            Open Deployment <ExternalLink size={16} />
          </a>
        ) : (
          <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-600 dark:text-zinc-300">
            Add VITE_VERCEL_DEPLOYMENT_URL after deploy.
          </div>
        )}
      </Reveal>
    </section>
  );
}
