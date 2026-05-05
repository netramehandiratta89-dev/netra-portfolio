import { timeline } from '../../utils/constants.js';
import Reveal from '../UI/Reveal.jsx';

export default function Experience() {
  return (
    <section id="experience" className="section">
      <Reveal>
        <span className="eyebrow">Timeline</span>
        <h2 className="headline">Experience and education with a product-first trajectory.</h2>
      </Reveal>
      <div className="mt-12 border-l border-plasma/30 pl-6">
        {timeline.map((item) => (
          <Reveal key={item.title} className="relative mb-8 premium-card">
            <div className="absolute -left-[39px] top-7 h-5 w-5 rounded-full border-4 border-ink bg-plasma dark:border-ink" />
            <div className="text-sm font-black text-plasma">{item.year}</div>
            <h3 className="mt-2 text-2xl font-black">{item.title}</h3>
            <div className="font-semibold text-champagne">{item.place}</div>
            <p className="muted mt-3">{item.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
