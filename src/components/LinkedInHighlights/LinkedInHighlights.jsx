import { ExternalLink, Linkedin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { linkedInHighlights, profile } from '../../utils/constants.js';
import { supabase } from '../../supabase/supabaseClient.js';
import Reveal from '../UI/Reveal.jsx';

export default function LinkedInHighlights() {
  const [posts, setPosts] = useState(linkedInHighlights);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const { data, error } = await supabase
          .from('linkedin_posts')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(12);

        if (error) {
          if (error.code === '42P01') return;
          throw error;
        }

        if (isMounted && Array.isArray(data) && data.length > 0) {
          setPosts(data);
        }
      } catch {
        // keep fallback constants
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="linkedin" className="section">
      <Reveal>
        <span className="eyebrow">LinkedIn Highlights</span>
        <h2 className="headline">Public milestones across hackathons, AI learning, leadership, and student communities.</h2>
      </Reveal>
      <div className="mt-8 flex flex-wrap gap-3">
        <a className="button-primary" href={profile.linkedin} target="_blank" rel="noreferrer">
          <Linkedin size={17} /> Open LinkedIn Profile
        </a>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <Reveal key={post.id ?? post.url} className="premium-card flex min-h-72 flex-col">
            <div className="mb-5 flex items-center justify-between gap-4">
              <span className="rounded-full border border-plasma/30 bg-plasma/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-plasma">{post.category}</span>
              <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">{post.date}</span>
            </div>
            <h3 className="text-2xl font-black">{post.title}</h3>
            <p className="muted mt-4 leading-7">{post.body}</p>
            <a className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-black text-plasma" href={post.url} target="_blank" rel="noreferrer">
              View Post <ExternalLink size={15} />
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
