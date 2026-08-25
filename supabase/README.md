# City Pop Discography & Community Vault — Supabase Integration

Everything here is copy-paste-ready. Files map 1:1 onto a typical Vite + React
project:

```
schema.sql                              → run in Supabase SQL Editor
src/lib/supabaseClient.js                → drop into src/lib/
src/data/citypopData.js                  → drop into src/data/
src/context/AudioPlayerContext.jsx       → drop into src/context/
src/components/TrackList.jsx (+ .css)    → drop into src/components/
src/components/AudioPlayerBar.jsx (+ .css) → drop into src/components/
```

## 1. Create the database

1. In your Supabase project, go to **SQL Editor → New query**.
2. Paste in the full contents of `schema.sql` and click **Run**.
3. This creates `albums`, `tracks`, `recommendations`, enables RLS with
   public read + public insert policies, adds all three tables to the
   `supabase_realtime` publication, and seeds 7 verified classic City Pop
   albums plus 3 sample recommendations.

**Security note:** the brief asked for public read *and* public insert on
every table, so that's what's implemented — anyone with your public anon key
(i.e. any site visitor) can insert into `albums` and `tracks`, not just
`recommendations`. That's fine for a solo/demo project. If this ever gets
real traffic, lock `albums`/`tracks` inserts down to an authenticated
admin role and leave `recommendations` open as the public guestbook.

## 2. Install the client

```bash
npm install @supabase/supabase-js
```

## 3. Set your environment variables

Create `.env.local` in your project root (Vite auto-loads this, and it's
git-ignored by default):

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

Both values are in **Supabase Dashboard → Project Settings → API**. If
either variable is missing, `supabaseClient.js` logs a warning and silently
serves `citypopData.js` instead — the app never crashes on a missing `.env`.

## 4. Wire the audio player into your app root

The player needs one shared `<audio>` element, so wrap your app in
`AudioPlayerProvider` once and mount `AudioPlayerBar` alongside it:

```jsx
// src/main.jsx or src/App.jsx
import { AudioPlayerProvider } from './context/AudioPlayerContext'
import AudioPlayerBar from './components/AudioPlayerBar'

export default function App() {
  return (
    <AudioPlayerProvider>
      {/* ...your routes/pages... */}
      <AudioPlayerBar />
    </AudioPlayerProvider>
  )
}
```

## 5. Fetch and render albums

```jsx
import { useEffect, useState } from 'react'
import { getAlbums } from './lib/supabaseClient'
import TrackList from './components/TrackList'

function AlbumPage() {
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    getAlbums().then(setAlbums)
  }, [])

  return albums.map((album) => (
    <section key={album.id}>
      <h2>{album.title} — {album.artist} ({album.year})</h2>
      <TrackList album={album} />
    </section>
  ))
}
```

## 6. Recommendations: read, write, and live updates

```jsx
import { useEffect, useState } from 'react'
import {
  getRecommendations,
  addRecommendation,
  subscribeToRecommendations,
} from './lib/supabaseClient'

function RecommendationsWall() {
  const [recs, setRecs] = useState([])

  useEffect(() => {
    getRecommendations().then(setRecs)
    const unsubscribe = subscribeToRecommendations((newRow) =>
      setRecs((prev) => [newRow, ...prev])
    )
    return unsubscribe
  }, [])

  async function handleSubmit(formValues) {
    const saved = await addRecommendation(formValues)
    // Only needed if you're not relying on the realtime subscription above:
    setRecs((prev) => [saved, ...prev])
  }

  // ...render recs + a form that calls handleSubmit...
}
```

## Audio sources — read this before wiring up previews

The brief asks for "a 30-second audio preview MP3 link **or** a Spotify
preview widget." Both are supported, but they need different data:

- **`preview_url` (native `<audio>` playback, styled by `AudioPlayerBar`)**
  — Spotify's own Web API **stopped returning `preview_url` for apps
  created after Nov 27, 2024**, and it's largely `null` even for older apps
  now. Don't build on that field expecting it to work. Two legitimate
  options instead:
  1. Self-host short, license-cleared clips (e.g. in Supabase Storage) and
     point `preview_url` at those.
  2. Use the free, unauthenticated **iTunes Search API**
     (`https://itunes.apple.com/search?term=...`) — it still returns
     `previewUrl` fields for most commercial tracks and needs no API key.
- **`spotify_track_id` (official embed widget, used by `TrackList`'s
  fallback)** — this doesn't touch the deprecated API at all. It renders
  Spotify's own `open.spotify.com/embed/track/{id}` iframe, which still
  plays a preview inline. Grab the ID from any track's Spotify share link
  (`open.spotify.com/track/{id}`).

The sample data in `schema.sql`/`citypopData.js` intentionally leaves both
fields `null` rather than guessing at unverified IDs — fill them in with
real values from one of the sources above.

## Component behavior summary

- **`TrackList`** — one row per track. Click behavior depends on what data
  the track has: native preview → toggles playback through the shared
  player; Spotify ID only → expands an inline official Spotify embed;
  neither → button is disabled.
- **`AudioPlayerBar`** — floating, docked to the bottom of the viewport.
  Shows cover art, title/album, play/pause, a scrubber (styled as a
  setting sun sliding along the horizon — click/drag to seek), and a
  volume slider. Stays hidden until the first track is played, and
  collapses to a simplified layout under 640px.
