import { useExperiences } from '../../database/useExperiences';
import Reveal from '../UI/Reveal.jsx';

export default function Experience() {
  const { experiences, loading } = useExperiences();

  return (
    <section id="experience" className="section">
      <Reveal>
        <span className="eyebrow">{loading ? 'Loading...' : 'Timeline'}</span>
        <h2 className="headline">Experience and education with a product-first trajectory.</h2>
      </Reveal>
      <div className="mt-12 border-l border-plasma/30 pl-6">
        {experiences.map((exp) => (
          <Reveal key={exp.id} className="relative mb-8 premium-card">
            <div className="absolute -left-[39px] top-7 h-5 w-5 rounded-full border-4 border-ink bg-plasma dark:border-ink" />
            <div className="text-sm font-black text-plasma">{exp.period}</div>
            <h3 className="mt-2 text-2xl font-black">{exp.role}</h3>
            <div className="font-semibold text-champagne">{exp.company}</div>
            {exp.description && <p className="muted mt-3">{exp.description}</p>}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
