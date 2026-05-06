import { ExternalLink, Trash2, Search, Link2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { toLinkedInEmbedUrl } from '../utils/linkedin.js';

export default function ManageLinkedIn() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [adding, setAdding] = useState(false);

  async function fetchPosts() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('linkedin_posts')
        .select('*')
        .order('created_at', { ascending: false });
      if (error && error.code !== '42P01') throw error;
      setPosts(data || []);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  async function handleAddFromUrl() {
    if (!urlInput.includes('linkedin.com')) return;
    
    setAdding(true);
    
    try {
      const embedUrl = toLinkedInEmbedUrl(urlInput);
      
      const post = {
        title: 'LinkedIn Post',
        url: urlInput,
        category: 'Post',
        date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        body: embedUrl ? 'Embedded LinkedIn post.' : 'View post on LinkedIn'
      };

      const { error } = await supabase.from('linkedin_posts').insert([post]);
      if (error) throw error;
      
      setUrlInput('');
      fetchPosts();
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id) {
    try {
      const { error } = await supabase.from('linkedin_posts').delete().eq('id', id);
      if (!error) setPosts(posts.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error:', err);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-plasma">CMS</p>
          <h2 className="text-3xl font-black">LinkedIn Posts</h2>
        </div>
        <a 
          className="button-ghost" 
          href="https://www.linkedin.com/feed/" 
          target="_blank" 
          rel="noreferrer"
        >
          <ExternalLink size={16} /> Open LinkedIn
        </a>
      </div>

      <div className="premium-card bg-white/[0.06]">
        <h3 className="text-2xl font-black">Quick Add from URL</h3>
        <p className="mt-2 text-sm text-white/50">
          Paste your LinkedIn post URL below - it will be automatically added and embedded.
        </p>
        <div className="mt-4 flex gap-3">
          <input 
            className="admin-input flex-1"
            placeholder="https://www.linkedin.com/posts/..." 
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAddFromUrl()}
          />
          <button 
            className="button-primary"
            onClick={handleAddFromUrl}
            disabled={adding || !urlInput.includes('linkedin.com')}
          >
            <Link2 size={16} />{adding ? 'Adding...' : 'Add Post'}
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-1">
        <div className="premium-card bg-white/[0.06]">
          <div className="flex items-center gap-3">
            <Search className="text-white/50" size={18} />
            <input 
              className="admin-input" 
              placeholder="Search posts..." 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
            />
          </div>
        </div>

        <div className="space-y-4">
          {loading ? (
            <p className="text-white/50 text-center py-8">Loading...</p>
          ) : posts.length === 0 ? (
            <p className="text-white/50 text-center py-8">
              No LinkedIn posts yet. Paste a post URL above to add.
            </p>
          ) : (
            posts.filter(p => 
              p.title?.toLowerCase().includes(search.toLowerCase()) ||
              p.category?.toLowerCase().includes(search.toLowerCase())
            ).map(post => (
              <div key={post.id} className="rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="rounded-full border border-plasma/30 bg-plasma/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-plasma">
                        {post.category || 'Post'}
                      </span>
                      <span className="text-xs text-white/50">{post.date}</span>
                    </div>
                    <div className="mt-3 text-lg font-black">{post.title}</div>
                    <p className="mt-2 text-sm text-white/70">{post.body}</p>
                    
                    {post.url && (
                      <div className="mt-4">
                        {toLinkedInEmbedUrl(post.url) ? (
                          <iframe
                            src={toLinkedInEmbedUrl(post.url)}
                            className="w-full rounded-lg border-0"
                            style={{ height: '300px', background: '#0d1117' }}
                            title="LinkedIn Post"
                          />
                        ) : (
                          <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/60">
                            Couldn’t generate an embed from this URL. Use “Embed this post” on LinkedIn and paste the iframe code here.
                          </div>
                        )}
                        <a 
                          className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-plasma hover:underline" 
                          href={post.url} 
                          target="_blank" 
                          rel="noreferrer"
                        >
                          <ExternalLink size={14} /> View Full Post on LinkedIn
                        </a>
                      </div>
                    )}
                  </div>
                  <button 
                    className="button-ghost py-2 text-red-200 shrink-0" 
                    onClick={() => handleDelete(post.id)}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
