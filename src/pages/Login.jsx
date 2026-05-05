import { Lock } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@portfolio.dev');
  const [password, setPassword] = useState('premium123');
  const [error, setError] = useState('');
  const submit = (event) => {
    event.preventDefault();
    if (login(email, password)) navigate('/admin');
    else setError('Invalid secure admin credentials.');
  };
  return (
    <div className="aurora grid min-h-screen place-items-center px-5">
      <form onSubmit={submit} className="w-full max-w-md rounded-lg border border-white/10 bg-ink/80 p-8 text-white shadow-luxury backdrop-blur-2xl">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-plasma/15 text-plasma"><Lock /></div>
        <h1 className="text-3xl font-black">Secure Admin Login</h1>
        <p className="mt-2 text-sm text-white/55">Hidden CMS access for portfolio management.</p>
        <div className="mt-8 grid gap-4">
          <input className="admin-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
          <input className="admin-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
          {error && <p className="text-sm text-red-300">{error}</p>}
          <button className="button-primary" type="submit">Enter Dashboard</button>
        </div>
      </form>
    </div>
  );
}
