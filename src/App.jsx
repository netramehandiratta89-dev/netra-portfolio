import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { routes } from './routes.jsx';
import { pageTransition } from './animations/pageTransition.js';
import CursorGlow from './effects/CursorGlow.jsx';
import MouseFollower from './effects/MouseFollower.jsx';
import ParticleBackground from './effects/ParticleBackground.jsx';
import ScrollOrchestrator from './effects/ScrollOrchestrator.jsx';
import ChatBot from './chatbot/ChatBot.jsx';

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-pearl text-ink transition-colors duration-500 dark:bg-ink dark:text-white">
      {!isAdmin && <ParticleBackground />}
      {!isAdmin && <CursorGlow />}
      {!isAdmin && <MouseFollower />}
      {!isAdmin && <ScrollOrchestrator />}
      <AnimatePresence mode="wait">
        <motion.main key={location.pathname} {...pageTransition}>
          {routes}
        </motion.main>
      </AnimatePresence>
      {!isAdmin && <ChatBot />}
    </div>
  );
}
