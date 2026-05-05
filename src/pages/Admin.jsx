import { BarChart3, FileText, FolderKanban, GraduationCap, LogOut, MessageSquare, Sparkles } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

const nav = [
  ['Overview', '/admin', BarChart3],
  ['Projects', '/admin/projects', FolderKanban],
  ['Skills', '/admin/skills', Sparkles],
  ['Blogs', '/admin/blogs', FileText],
  ['Certificates', '/admin/certificates', GraduationCap],
  ['Messages', '/admin/messages', MessageSquare]
];

export default function Admin() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const leave = () => {
    logout();
    navigate('/admin/login');
  };
  return (
    <div className="min-h-screen bg-[#08090f] text-white">
      <aside className="fixed bottom-0 left-0 top-0 hidden w-72 border-r border-white/10 bg-white/[0.04] p-5 lg:block">
        <div className="mb-8 text-2xl font-black">Admin<span className="text-plasma">.</span></div>
        <nav className="space-y-2">
          {nav.map(([label, to, Icon]) => (
            <NavLink key={to} to={to} end={to === '/admin'} className={({ isActive }) => `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold transition ${isActive ? 'bg-plasma text-ink' : 'text-white/65 hover:bg-white/10 hover:text-white'}`}>
              <Icon size={18} />{label}
            </NavLink>
          ))}
        </nav>
        <button onClick={leave} className="absolute bottom-5 left-5 right-5 flex items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-sm font-bold text-white/70 hover:text-white"><LogOut size={18} />Logout</button>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-ink/80 px-5 py-4 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/50">CMS Dashboard</p>
              <h1 className="text-xl font-black">Portfolio Control Center</h1>
            </div>
            <button onClick={leave} className="icon-button"><LogOut size={18} /></button>
          </div>
        </header>
        <div className="p-5 lg:p-8"><Outlet /></div>
      </div>
    </div>
  );
}
