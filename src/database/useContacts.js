import { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabaseClient';

const table = 'contacts';

export function useContacts(options = {}) {
  const { autoRefresh = 0, unreadOnly = false } = options;
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchContacts = async () => {
    try {
      let query = supabase.from(table).select('*').order('created_at', { ascending: false });
      if (unreadOnly) {
        query = query.eq('read', false);
      }
      const { data, error: err } = await query;
      if (err) throw err;
      if (data) setContacts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval;
    fetchContacts();
    if (autoRefresh > 0) {
      interval = setInterval(fetchContacts, autoRefresh);
    }
    return () => interval && clearInterval(interval);
  }, [autoRefresh, unreadOnly]);

  const submitContact = async (contact) => {
    const { data, error } = await supabase.from(table).insert(contact).select().single();
    return { data, error };
  };

  const markAsRead = async (id) => {
    const { data, error } = await supabase.from(table).update({ read: true }).eq('id', id).select().single();
    if (!error && data) {
      setContacts((prev) => prev.map((c) => (c.id === id ? data : c)));
    }
    return { data, error };
  };

  const deleteContact = async (id) => {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (!error) setContacts((prev) => prev.filter((c) => c.id !== id));
    return { error };
  };

  const unreadCount = contacts.filter((c) => !c.read).length;

  return {
    contacts,
    loading,
    error,
    unreadCount,
    submitContact,
    markAsRead,
    deleteContact,
    refetch: fetchContacts
  };
}