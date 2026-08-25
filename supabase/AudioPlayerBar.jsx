import { usePlayer } from '../context/AudioPlayerContext'
import './AudioPlayerBar.css'

/**
 * Mount this once near the root of your app (inside <AudioPlayerProvider>).
 * It stays hidden until a track has been played at least once, then docks
 * to the bottom of the viewport.
 */
export default function AudioPlayerBar() {
  const { currentTrack, isPlaying, progress, duration, volume, togglePlay, seek, setVolume } =
    usePlayer()

  if (!currentTrack) return null

  const pct = duration > 0 ? (progress / duration) * 100 : 0

  return (
    <div className="player-bar" role="region" aria-label="Now playing">
      <div className="player-bar__track">
        <div className="player-bar__cover" aria-hidden="true">
          {currentTrack.coverUrl ? (
            <img src={currentTrack.coverUrl} alt="" />
          ) : (
            <div className="player-bar__cover-fallback" />
          )}
        </div>
        <div className="player-bar__meta">
          <span className="player-bar__title">{currentTrack.title}</span>
          <span className="player-bar__album">{currentTrack.albumTitle}</span>
        </div>
      </div>

      <div className="player-bar__center">
        <button
          type="button"
          className="player-bar__toggle"
          onClick={() => togglePlay(currentTrack)}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>

        <span className="player-bar__time">{formatTime(progress)}</span>

        {/* Sunset-horizon scrubber: the fill mimics a setting sun, the thumb is the sun itself. */}
        <input
          className="player-bar__scrubber"
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={progress}
          onChange={(e) => seek(Number(e.target.value))}
          style={{ '--pct': `${pct}%` }}
          aria-label="Seek"
        />

        <span className="player-bar__time">{formatTime(duration)}</span>
      </div>

      <div className="player-bar__volume">
        <VolumeIcon muted={volume === 0} />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          aria-label="Volume"
        />
      </div>
    </div>
  )
}

function formatTime(seconds = 0) {
  if (!Number.isFinite(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M7 5.5v13l11-6.5z" fill="currentColor" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <rect x="6" y="5" width="4" height="14" fill="currentColor" />
      <rect x="14" y="5" width="4" height="14" fill="currentColor" />
    </svg>
  )
}

function VolumeIcon({ muted }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
      {!muted && (
        <path
          d="M16.5 8.5a5 5 0 0 1 0 7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
      )}
    </svg>
  )
}
