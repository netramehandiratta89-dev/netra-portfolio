import { blogs } from '../../utils/constants.js';
import Reveal from '../UI/Reveal.jsx';

export default function Blog() {
  return (
    <section id="blog" className="section">
      <Reveal>
        <span className="eyebrow">Blog</span>
        <h2 className="headline">CMS-ready writing blocks for engineering, design, and product notes.</h2>
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {blogs.map((post) => (
          <Reveal key={post.title} className="premium-card">
            <div className="text-sm font-bold text-plasma">{post.category}</div>
            <h3 className="mt-4 text-2xl font-black">{post.title}</h3>
            <p className="muted mt-6">{post.date}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
