import { useState } from 'react'
import { usePlayer } from '../context/AudioPlayerContext'
import './TrackList.css'

/**
 * <TrackList album={album} />
 *
 * `album` is one entry from getAlbums() — must have a `tracks` array.
 * Each track drives its play button in one of three ways, checked in order:
 *   1. track.preview_url  → plays through the shared <audio> (AudioPlayerBar)
 *   2. track.spotify_track_id → expands an official Spotify embed player inline
 *   3. neither → button is disabled with a "No preview" label
 */
export default function TrackList({ album }) {
  const { currentTrack, isPlaying, togglePlay } = usePlayer()
  const [expandedSpotifyId, setExpandedSpotifyId] = useState(null)

  return (
    <ol className="tracklist" aria-label={`${album.title} tracklist`}>
      {album.tracks.map((track) => {
        const isCurrent = currentTrack?.id === track.id
        const isCurrentlyPlaying = isCurrent && isPlaying
        const hasNativePreview = Boolean(track.preview_url)
        const hasSpotifyFallback = !hasNativePreview && Boolean(track.spotify_track_id)
        const isSpotifyExpanded = expandedSpotifyId === track.id

        const handleClick = () => {
          if (hasNativePreview) {
            togglePlay({
              id: track.id,
              title: track.title,
              albumTitle: album.title,
              coverUrl: album.cover_url,
              previewUrl: track.preview_url,
            })
          } else if (hasSpotifyFallback) {
            setExpandedSpotifyId(isSpotifyExpanded ? null : track.id)
          }
        }

        return (
          <li
            key={track.id}
            className={`tracklist__row${isCurrent ? ' tracklist__row--active' : ''}`}
          >
            <div className="tracklist__main">
              <button
                type="button"
                className="tracklist__play-btn"
                onClick={handleClick}
                disabled={!hasNativePreview && !hasSpotifyFallback}
                aria-label={
                  hasNativePreview
                    ? isCurrentlyPlaying
                      ? `Pause ${track.title}`
                      : `Play ${track.title}`
                    : hasSpotifyFallback
                    ? `${isSpotifyExpanded ? 'Hide' : 'Show'} Spotify preview for ${track.title}`
                    : `No preview available for ${track.title}`
                }
              >
                {hasNativePreview ? (
                  isCurrentlyPlaying ? <PauseIcon /> : <PlayIcon />
                ) : hasSpotifyFallback ? (
                  <SpotifyIcon />
                ) : (
                  <DashIcon />
                )}
              </button>

              <span className="tracklist__number">{track.track_number}</span>

              <span className="tracklist__title">
                {track.title}
                {track.is_highlight && (
                  <span className="tracklist__highlight" title="Fan favorite">
                    ★
                  </span>
                )}
              </span>

              <span className="tracklist__duration">{track.duration ?? '—'}</span>
            </div>

            {isSpotifyExpanded && (
              <div className="tracklist__spotify-embed">
                <iframe
                  title={`Spotify preview — ${track.title}`}
                  src={`https://open.spotify.com/embed/track/${track.spotify_track_id}?utm_source=generator&theme=0`}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            )}
          </li>
        )
      })}
    </ol>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path d="M7 5.5v13l11-6.5z" fill="currentColor" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <rect x="6" y="5" width="4" height="14" fill="currentColor" />
      <rect x="14" y="5" width="4" height="14" fill="currentColor" />
    </svg>
  )
}

function SpotifyIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
      <path
        d="M7 15c3-1 7-1 10 1M6.5 12c3.5-1.2 8-1 11 1M6 9c4-1.4 9.5-1.1 13 1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

function DashIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <rect x="6" y="11" width="12" height="2" fill="currentColor" />
    </svg>
  )
}
