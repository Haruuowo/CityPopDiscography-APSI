import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envContent = fs.readFileSync('.env', 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let key = match[1];
    let value = (match[2] || '').trim();
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    env[key] = value;
  }
});

const url = env.VITE_SUPABASE_URL;
const key = env.VITE_SUPABASE_ANON_KEY;

console.log('Testing Supabase Connection:');
console.log('URL:', url);
console.log('Key prefix:', key ? key.substring(0, 15) + '...' : 'NONE');

if (!url || !key) {
  console.error('Missing URL or Key');
  process.exit(1);
}

const supabase = createClient(url, key);

async function test() {
  try {
    console.log('\n1. Testing "albums" table:');
    const { data: albums, error: albumErr } = await supabase.from('albums').select('*').limit(3);
    if (albumErr) {
      console.error('❌ Albums query error:', albumErr);
    } else {
      console.log(`✅ Albums success (${albums.length} found):`, albums.map(a => a.title || a.name));
    }

    console.log('\n2. Testing "recommendations" table:');
    const { data: recs, error: recErr } = await supabase.from('recommendations').select('*').limit(3);
    if (recErr) {
      console.error('❌ Recommendations query error:', recErr);
    } else {
      console.log(`✅ Recommendations success (${recs.length} found):`, recs);
    }

    console.log('\n3. Testing "tracks" table:');
    const { data: tracks, error: trackErr } = await supabase.from('tracks').select('*').limit(3);
    if (trackErr) {
      console.error('❌ Tracks query error:', trackErr);
    } else {
      console.log(`✅ Tracks success (${tracks.length} found):`, tracks.map(t => t.title));
    }
  } catch (e) {
    console.error('Crash in test:', e);
  }
}

test();
