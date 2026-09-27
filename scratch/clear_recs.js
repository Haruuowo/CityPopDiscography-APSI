import { createClient } from '@supabase/supabase-js';

const url = 'https://nsjtlnihmnjqzzwxsafj.supabase.co';
const key = 'sb_publishable_S64bCVaIbO6AAYen9kh-RA_n3JIYJ7C';

const supabase = createClient(url, key);

async function check() {
  const { data, error } = await supabase.from('recommendations').select('*');
  console.log('Recommendations count in Supabase:', data ? data.length : 0);
}

check();
