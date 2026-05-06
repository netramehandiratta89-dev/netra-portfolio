import { useTestimonials } from '../../database/useTestimonials';
import Reveal from '../UI/Reveal.jsx';

export default function Testimonials() {
  const { testimonials, loading } = useTestimonials();

  return (
    <section id="testimonials" className="section">
      <Reveal>
        <span className="eyebrow">{loading ? 'Loading...' : 'Testimonials'}</span>
        <h2 className="headline">Client notes with social proof energy and clean CMS structure.</h2>
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {testimonials.map((t) => (
          <Reveal key={t.id} className="premium-card">
            <p className="text-lg leading-8">"{t.content}"</p>
            <div className="mt-8 font-black">{t.name}</div>
            <div className="muted text-sm">{t.role} {t.company && `at ${t.company}`}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
