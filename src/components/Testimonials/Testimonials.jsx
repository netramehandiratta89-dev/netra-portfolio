import { testimonials } from '../../utils/constants.js';
import Reveal from '../UI/Reveal.jsx';

export default function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <Reveal>
        <span className="eyebrow">Testimonials</span>
        <h2 className="headline">Client notes with social proof energy and clean CMS structure.</h2>
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {testimonials.map(([name, role, quote]) => (
          <Reveal key={name} className="premium-card">
            <p className="text-lg leading-8">"{quote}"</p>
            <div className="mt-8 font-black">{name}</div>
            <div className="muted text-sm">{role}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
