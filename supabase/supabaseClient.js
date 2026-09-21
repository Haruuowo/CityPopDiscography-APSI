import { createClient } from '@supabase/supabase-js'
import {
  albums as localAlbums,
  recommendations as localRecommendations,
} from '../data/citypopData'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const hasCredentials = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)

if (!hasCredentials) {
  console.warn(
    '[supabaseClient] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY not set — ' +
      'running on local static data from src/data/citypopData.js.'
  )
}

// `supabase` is null when env vars are missing. Every function below checks
// this and falls back to local data instead of throwing, so the app never
// crashes just because Supabase isn't configured yet (e.g. in local dev,
// CI, or a fresh clone before .env.local exists).
export const supabase = hasCredentials
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null

export const isSupabaseConfigured = hasCredentials

/**
 * Fetch every album with its tracks attached (tracks sorted by track_number).
 * Falls back to the local dataset if Supabase isn't configured or the
 * request fails.
 */
export async function getAlbums() {
  if (!supabase) return localAlbums

  const { data, error } = await supabase
    .from('albums')
    .select('*, tracks(*)')
    .order('year', { ascending: true })

  if (error) {
    console.error('[getAlbums] falling back to local data:', error.message)
    return localAlbums
  }

  // Keep track order stable regardless of what the DB returns it in.
  return data.map((album) => ({
    ...album,
    tracks: [...(album.tracks ?? [])].sort(
      (a, b) => a.track_number - b.track_number
    ),
  }))
}

/**
 * Fetch community recommendations, most recent first.
 * Falls back to the local dataset if Supabase isn't configured or the
 * request fails.
 */
export async function getRecommendations() {
  if (!supabase) return localRecommendations

  const { data, error } = await supabase
    .from('recommendations')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[getRecommendations] falling back to local data:', error.message)
    return localRecommendations
  }

  return data
}

/**
 * Insert a new community recommendation.
 * `rec` shape: { album_title, artist, user_name, note, vibe, rating }
 *
 * Returns the inserted row on success. In local-fallback mode it just
 * echoes the row back (with a generated id/timestamp) so the UI can still
 * optimistically update — nothing is persisted, since there's no backend.
 */
export async function addRecommendation(rec) {
  const payload = {
    album_title: rec.album_title?.trim(),
    artist: rec.artist?.trim(),
    user_name: rec.user_name?.trim() || 'Anonymous',
    note: rec.note?.trim() ?? null,
    vibe: rec.vibe?.trim() ?? null,
    rating: rec.rating ?? null,
  }

  if (!payload.album_title || !payload.artist) {
    throw new Error('album_title and artist are required')
  }

  if (!supabase) {
    console.warn('[addRecommendation] Supabase not configured — not persisted.')
    return {
      id: `local-${Date.now()}`,
      created_at: new Date().toISOString(),
      ...payload,
    }
  }

  const { data, error } = await supabase
    .from('recommendations')
    .insert(payload)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Subscribe to live INSERTs on `recommendations` so the UI can update in
 * real time as other visitors submit picks. No-ops (returns a dummy
 * unsubscribe) when Supabase isn't configured.
 *
 * Usage:
 *   useEffect(() => {
 *     const unsubscribe = subscribeToRecommendations((row) => {
 *       setRecommendations((prev) => [row, ...prev])
 *     })
 *     return unsubscribe
 *   }, [])
 */
export function subscribeToRecommendations(onInsert) {
  if (!supabase) return () => {}

  const channel = supabase
    .channel('recommendations-changes')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'recommendations' },
      (payload) => onInsert(payload.new)
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}
