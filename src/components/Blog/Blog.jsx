import { useBlogs } from '../../database/useBlogs';
import Reveal from '../UI/Reveal.jsx';

export default function Blog() {
  const { blogs, loading } = useBlogs();

  return (
    <section id="blog" className="section">
      <Reveal>
        <span className="eyebrow">{loading ? 'Loading...' : 'Blog'}</span>
        <h2 className="headline">CMS-ready writing blocks for engineering, design, and product notes.</h2>
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {blogs.map((post) => (
          <Reveal key={post.id} className="premium-card">
            {post.excerpt && <div className="text-sm font-bold text-plasma">Article</div>}
            <h3 className="mt-4 text-2xl font-black">{post.title}</h3>
            {post.excerpt && <p className="muted mt-6">{post.excerpt}</p>}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
