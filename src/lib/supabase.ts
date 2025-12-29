import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ssvnopjpfllytekromhe.supabase.co';
const supabaseKey = 'sb_publishable_JvLTnbRnOtHuvhunnRvWSA_iKl60Q_N';

export const supabase = createClient(supabaseUrl, supabaseKey);
