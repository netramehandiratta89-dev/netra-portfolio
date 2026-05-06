import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const table = 'certificates';

const fallbackCertificates = [
  {
    id: 1,
    name: 'AWS Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2024-01-15',
    url: 'https://aws.com',
    credential_id: 'ABC123'
  }
];

export function useCertificates(options = {}) {
  const { autoRefresh = 0 } = options;
  const [certificates, setCertificates] = useState(fallbackCertificates);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCertificates = async () => {
    try {
      const { data, error: err } = await supabase.from(table).select('*').order('date', { ascending: false });
      if (err) throw err;
      if (data?.length) setCertificates(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval;
    fetchCertificates();
    if (autoRefresh > 0) {
      interval = setInterval(fetchCertificates, autoRefresh);
    }
    return () => interval && clearInterval(interval);
  }, [autoRefresh]);

  const addCertificate = async (certificate) => {
    const { data, error } = await supabase.from(table).insert(certificate).select().single();
    if (!error && data) setCertificates((prev) => [data, ...prev]);
    return { data, error };
  };

  const updateCertificate = async (id, updates) => {
    const { data, error } = await supabase.from(table).update(updates).eq('id', id).select().single();
    if (!error && data) {
      setCertificates((prev) => prev.map((c) => (c.id === id ? data : c)));
    }
    return { data, error };
  };

  const deleteCertificate = async (id) => {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (!error) setCertificates((prev) => prev.filter((c) => c.id !== id));
    return { error };
  };

  return {
    certificates,
    loading,
    error,
    addCertificate,
    updateCertificate,
    deleteCertificate,
    refetch: fetchCertificates
  };
}