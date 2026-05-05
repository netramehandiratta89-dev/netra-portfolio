import { useEffect, useMemo, useState } from 'react';

export const websiteSections = [
  { id: 'hero', label: 'Hero Section', path: '/#hero', description: 'Intro, profile image, CTA buttons, and social links.' },
  { id: 'about', label: 'About Me', path: '/#about', description: 'Personal summary cards and positioning.' },
  { id: 'skills', label: 'Skills', path: '/#skills', description: 'Skill bars, languages, tools, and strengths.' },
  { id: 'projects', label: 'Projects', path: '/#projects', description: 'GitHub-powered project showcase and filters.' },
  { id: 'experience', label: 'Experience', path: '/#experience', description: 'Education and experience timeline.' },
  { id: 'blog', label: 'Blog', path: '/#blog', description: 'CMS-ready articles and learning notes.' },
  { id: 'linkedin', label: 'LinkedIn Highlights', path: '/#linkedin', description: 'Public LinkedIn milestones and activity links.' },
  { id: 'certificates', label: 'Certificates', path: '/#certificates', description: 'Certificate and achievement cards.' },
  { id: 'deployment', label: 'Deployment', path: '/#deployment', description: 'Vercel live deployment information.' },
  { id: 'stats', label: 'Stats', path: '/#stats', description: 'Portfolio metrics and achievement numbers.' },
  { id: 'testimonials', label: 'Testimonials', path: '/#testimonials', description: 'Social proof and profile statements.' },
  { id: 'contact', label: 'Contact', path: '/#contact', description: 'Contact details and frontend form UI.' },
  { id: 'footer', label: 'Footer', path: '/#footer', description: 'Social links and closing navigation.' }
];

const storageKey = 'portfolio-website-controls';

const defaultState = {
  deletedSections: [],
  editedSections: {}
};

const readState = () => {
  try {
    return { ...defaultState, ...JSON.parse(localStorage.getItem(storageKey) || '{}') };
  } catch {
    return defaultState;
  }
};

export function useWebsiteControls() {
  const [state, setState] = useState(readState);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent('portfolio-controls-change'));
  }, [state]);

  useEffect(() => {
    const sync = () => setState(readState());
    window.addEventListener('storage', sync);
    window.addEventListener('portfolio-controls-change', sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('portfolio-controls-change', sync);
    };
  }, []);

  const deleted = useMemo(() => new Set(state.deletedSections), [state.deletedSections]);

  const deleteSection = (id) => {
    setState((current) => ({
      ...current,
      deletedSections: [...new Set([...current.deletedSections, id])]
    }));
  };

  const restoreSection = (id) => {
    setState((current) => ({
      ...current,
      deletedSections: current.deletedSections.filter((sectionId) => sectionId !== id)
    }));
  };

  const hideAll = () => {
    setState((current) => ({
      ...current,
      deletedSections: websiteSections.filter((section) => !['hero', 'footer'].includes(section.id)).map((section) => section.id)
    }));
  };

  const restoreAll = () => {
    setState((current) => ({ ...current, deletedSections: [] }));
  };

  const resetEdits = () => {
    setState(defaultState);
  };

  const saveSectionEdit = (id, values) => {
    setState((current) => ({
      ...current,
      editedSections: {
        ...current.editedSections,
        [id]: values
      }
    }));
  };

  return {
    state,
    sections: websiteSections,
    deleted,
    isVisible: (id) => !deleted.has(id),
    deleteSection,
    restoreSection,
    hideAll,
    restoreAll,
    resetEdits,
    saveSectionEdit
  };
}
