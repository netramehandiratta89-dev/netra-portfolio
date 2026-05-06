import { Eye, Activity, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase, visitorsConfig } from '../supabase/supabaseClient';

export default function VisitorCounter() {
  const [count, setCount] = useState(visitorsConfig.defaultCount);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchCount = async () => {
      try {
        const { data, error: err } = await supabase
          .from(visitorsConfig.table)
          .select('count')
          .order('id', { ascending: false })
          .limit(1)
          .single();

        if (err) {
          if (err.code === 'PGRST116') {
            return;
          }
          throw err;
        }

        if (isMounted && data) {
          setCount(data.count);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCount();

    const channel = supabase
      .channel('visitors-change')
      .on('postgres_changes', { event: '*', schema: 'public', table: visitorsConfig.table }, (payload) => {
        if (payload.new?.count && isMounted) {
          setCount(payload.new.count);
        }
      })
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="premium-card flex items-center gap-4">
      <div className="relative">
        <Eye className="text-plasma" />
        <span className="absolute -right-1 -top-1 h-2 w-2 animate-pulse rounded-full bg-green-500" />
      </div>
      <div>
        {loading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="animate-spin text-plasma" size={16} />
            <span className="muted text-sm">Connecting...</span>
          </div>
        ) : error ? (
          <div className="text-2xl font-black text-red-500">{visitorsConfig.defaultCount.toLocaleString()}</div>
        ) : (
          <div className="text-2xl font-black">{count.toLocaleString()}</div>
        )}
        <div className="muted flex items-center gap-2 text-sm">
          Portfolio visitors
          {!loading && !error && <Activity size={12} className="text-green-500" />}
        </div>
      </div>
    </div>
  );
}
