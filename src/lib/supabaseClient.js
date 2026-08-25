import { createClient } from '@supabase/supabase-js';
import { CITY_POP_ALBUMS, INITIAL_RECOMMENDATIONS } from '../data/citypopData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase keys are provided and non-placeholder
export const isSupabaseConfigured = () => {
  return (
    !!supabaseUrl &&
    !!supabaseAnonKey &&
    supabaseUrl !== 'https://your-project-ref.supabase.co' &&
    supabaseAnonKey !== 'your-anon-key-here'
  );
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Fetch Albums with fallback to local citypopData.js
 */
export async function fetchAlbums() {
  if (!isSupabaseConfigured() || !supabase) {
    console.log('⚡ [Supabase] Using local fallback albums data');
    return { data: CITY_POP_ALBUMS, error: null, source: 'local' };
  }

  try {
    const { data: albumsData, error: albumsErr } = await supabase
      .from('albums')
      .select('*')
      .order('rating', { ascending: false });

    if (albumsErr || !albumsData || albumsData.length === 0) {
      console.warn('⚠️ [Supabase] Failed to fetch or no albums found, using fallback data:', albumsErr);
      return { data: CITY_POP_ALBUMS, error: albumsErr, source: 'local' };
    }

    const { data: tracksData } = await supabase.from('tracks').select('*');

    // Format Supabase data into local schema
    const formattedAlbums = albumsData.map((album) => {
      const albumTracks = (tracksData || [])
        .filter((t) => t.album_id === album.id)
        .sort((a, b) => a.track_number - b.track_number)
        .map((t) => ({
          number: t.track_number,
          title: t.title,
          duration: t.duration,
          highlight: t.is_highlight,
          previewUrl: t.preview_url,
          spotifyTrackId: t.spotify_track_id,
        }));

      return {
        id: album.id,
        title: album.title,
        artist: album.artist,
        artistJp: album.artist_jp || '',
        year: album.year,
        genre: album.genre || [],
        cover: album.cover_url,
        rating: Number(album.rating),
        reviewsCount: album.reviews_count || 100,
        synopsis: album.synopsis || '',
        tracks: albumTracks.length > 0 ? albumTracks : [],
        vibes: {
          funkiness: album.funkiness || 80,
          melancholy: album.melancholy || 30,
          sunsetEnergy: album.sunset_energy || 80,
          nightDrive: album.night_drive || 80,
        },
      };
    });

    return { data: formattedAlbums, error: null, source: 'supabase' };
  } catch (err) {
    console.error('❌ [Supabase] Unexpected error fetching albums:', err);
    return { data: CITY_POP_ALBUMS, error: err, source: 'local' };
  }
}

/**
 * Fetch Community Recommendations with fallback
 */
export async function fetchRecommendations() {
  if (!isSupabaseConfigured() || !supabase) {
    return { data: INITIAL_RECOMMENDATIONS, error: null, source: 'local' };
  }

  try {
    const { data, error } = await supabase
      .from('recommendations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      return { data: INITIAL_RECOMMENDATIONS, error, source: 'local' };
    }

    const formattedRecs = data.map((rec) => ({
      id: rec.id,
      albumTitle: rec.album_title,
      artist: rec.artist,
      userName: rec.user_name || 'Anonymous Listener',
      note: rec.note,
      vibe: rec.vibe || 'Midnight Drive',
      rating: Number(rec.rating || 5.0),
      createdAt: rec.created_at,
    }));

    return { data: formattedRecs, error: null, source: 'supabase' };
  } catch (err) {
    return { data: INITIAL_RECOMMENDATIONS, error: err, source: 'local' };
  }
}

/**
 * Submit New Recommendation to Supabase
 */
export async function postRecommendation(newRec) {
  if (!isSupabaseConfigured() || !supabase) {
    return { data: newRec, error: null, source: 'local' };
  }

  try {
    const { data, error } = await supabase
      .from('recommendations')
      .insert([
        {
          album_title: newRec.albumTitle,
          artist: newRec.artist,
          user_name: newRec.userName || 'Anonymous Listener',
          note: newRec.note,
          vibe: newRec.vibe || 'Midnight Drive',
          rating: newRec.rating || 5.0,
        },
      ])
      .select();

    if (error) throw error;
    return { data: data[0], error: null, source: 'supabase' };
  } catch (err) {
    console.error('❌ [Supabase] Failed to post recommendation:', err);
    return { data: null, error: err, source: 'error' };
  }
}
