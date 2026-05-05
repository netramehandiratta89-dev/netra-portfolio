import { Activity, Eye, Search, Upload } from 'lucide-react';
import AdminPanel from '../admin/AdminPanel.jsx';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-4">
        {[[Eye, '18.4k', 'Visitors'], [Activity, '72%', 'Engagement'], [Upload, 'Resume', 'Upload Ready'], [Search, 'SEO', 'Metadata Live']].map(([Icon, value, label]) => (
          <div key={label} className="premium-card bg-white/[0.06]">
            <Icon className="text-plasma" />
            <div className="mt-5 text-2xl font-black">{value}</div>
            <div className="text-sm text-white/50">{label}</div>
          </div>
        ))}
      </div>
      <AdminPanel />
    </div>
  );
}
