import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rncrkhsijxfpkgxnvegm.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_qgLcFFx3SLtLh0hx0VElaQ_6YPQ-8SB';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const visitorsConfig = {
  table: 'visitors',
  defaultCount: 12840
};