import { CITY_POP_ALBUMS, INITIAL_RECOMMENDATIONS } from '../data/citypopData';

// Supabase removed — all data now comes from local citypopData.js
// keeping these exported function signatures so nothing else in the app needs to change

export const isSupabaseConfigured = () => false;

export const supabase = null;

export async function fetchAlbums() {
  return { data: CITY_POP_ALBUMS, error: null, source: 'local' };
}

export async function fetchRecommendations() {
  return { data: INITIAL_RECOMMENDATIONS, error: null, source: 'local' };
}

export async function postRecommendation(newRec) {
  // saves to localStorage via App.jsx useEffect — no remote call needed
  return { data: newRec, error: null, source: 'local' };
}
