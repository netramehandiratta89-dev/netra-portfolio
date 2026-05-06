import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rncrkhsijxfpkgxnvegm.supabase.co';
const supabaseAnonKey = 'sb_publishable_qgLcFFx3SLtLh0hx0VElaQ_6YPQ-8SB';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const visitorsConfig = {
  table: 'visitors',
  defaultCount: 12840
};