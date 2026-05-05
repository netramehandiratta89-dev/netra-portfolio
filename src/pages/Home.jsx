import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Loader from '../components/UI/Loader.jsx';
import Navbar from '../components/Navbar/Navbar.jsx';
import Hero from '../components/Hero/Hero.jsx';
import About from '../components/About/About.jsx';
import Skills from '../components/Skills/Skills.jsx';
import Projects from '../components/Projects/Projects.jsx';
import Experience from '../components/Experience/Experience.jsx';
import Blog from '../components/Blog/Blog.jsx';
import Certificates from '../components/Certificates/Certificates.jsx';
import LinkedInHighlights from '../components/LinkedInHighlights/LinkedInHighlights.jsx';
import VercelDeployment from '../components/Deployment/VercelDeployment.jsx';
import Stats from '../components/Stats/Stats.jsx';
import Testimonials from '../components/Testimonials/Testimonials.jsx';
import Contact from '../components/Contact/Contact.jsx';
import Footer from '../components/Footer/Footer.jsx';

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>{!loaded && <Loader />}</AnimatePresence>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Blog />
      <LinkedInHighlights />
      <Certificates />
      <VercelDeployment />
      <Stats />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
