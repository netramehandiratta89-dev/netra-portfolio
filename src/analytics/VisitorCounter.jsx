import { Eye } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function VisitorCounter() {
  const [count, setCount] = useState(12840);
  useEffect(() => {
    const next = Number(localStorage.getItem('visitor-count') || count) + 1;
    localStorage.setItem('visitor-count', String(next));
    setCount(next);
  }, []);
  return (
    <div className="premium-card flex items-center gap-4">
      <Eye className="text-plasma" />
      <div>
        <div className="text-2xl font-black">{count.toLocaleString()}</div>
        <div className="muted text-sm">Portfolio visitors</div>
      </div>
    </div>
  );
}
