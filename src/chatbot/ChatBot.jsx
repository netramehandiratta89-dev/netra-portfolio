import { Bot, Send, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { getBotReply } from './chatbotService.js';

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ from: 'ai', text: 'Hi, I am the portfolio assistant. Ask me about work, skills, or availability.' }]);
  const send = () => {
    if (!input.trim()) return;
    setMessages((items) => [...items, { from: 'me', text: input }, { from: 'ai', text: getBotReply(input) }]);
    setInput('');
  };
  return (
    <div className="fixed bottom-5 right-5 z-40">
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 24, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.95 }} className="mb-4 w-[min(360px,calc(100vw-40px))] overflow-hidden rounded-lg border border-white/10 bg-ink/90 shadow-luxury backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <span className="font-bold text-white">AI Portfolio Assistant</span>
              <button onClick={() => setOpen(false)} className="text-white/70" aria-label="Close"><X size={18} /></button>
            </div>
            <div className="max-h-80 space-y-3 overflow-auto p-4">
              {messages.map((message, index) => (
                <div key={index} className={`rounded-lg px-3 py-2 text-sm ${message.from === 'me' ? 'ml-10 bg-plasma text-ink' : 'mr-10 bg-white/10 text-white'}`}>{message.text}</div>
              ))}
            </div>
            <div className="flex gap-2 border-t border-white/10 p-3">
              <input className="admin-input text-white" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} placeholder="Ask anything" />
              <button className="icon-button" onClick={send} aria-label="Send"><Send size={16} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button className="button-primary h-14 w-14 rounded-full p-0" onClick={() => setOpen((value) => !value)} aria-label="Open chatbot"><Bot /></button>
    </div>
  );
}
