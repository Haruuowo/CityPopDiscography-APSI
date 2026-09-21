import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, X, Disc3 } from 'lucide-react';

// persistent bottom bar that shows while a track is active
export default function AudioPlayerBar({ currentTrack, album, isPlaying, onTogglePlay, onNextTrack, onPrevTrack, onClose }) {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);

  // grab the preview URL off the track object (resolved async in App.jsx)
  const audioSrc = currentTrack?.previewUrl || null;

  // keep the HTML5 audio element in sync with isPlaying state
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(e => console.log('Audio autoplay prevented:', e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, audioSrc]);

  // sync volume slider and mute toggle to the audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  // click anywhere on the progress bar to seek
  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    if (audioRef.current && duration) {
      const newTime = pct * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!album || !currentTrack) return null;

  const coverUrl = album.cover || album.coverUrl;
  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="player-bar">

      {/* hidden audio element — actual playback happens here */}
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => onNextTrack && onNextTrack()}
      />

      {/* left: album cover + track name */}
      <div className="player-info">
        <div className="player-cover-wrap">
          <img
            src={coverUrl}
            alt={album.title}
            className="player-cover-img"
          />
          {isPlaying && <Disc3 className="player-disc-spin" />}
        </div>

        <div className="player-meta">
          <div className="player-meta-label-row">
            <span className="vibe-tag" style={{ fontSize: '0.6rem', padding: '1px 6px' }}>
              NOW PLAYING
            </span>
          </div>
          <h4 className="player-track-name">{currentTrack.title}</h4>
          <p className="player-album-artist">
            {album.artist} • <span className="player-album-title">{album.title}</span>
          </p>
        </div>
      </div>

      {/* center: play/pause, skip, and scrubber */}
      <div className="player-controls">
        <div className="player-btns-row">
          {onPrevTrack && (
            <button onClick={onPrevTrack} className="player-skip-btn" title="Previous Track">
              <SkipBack size={16} />
            </button>
          )}

          <button onClick={onTogglePlay} className="player-play-btn" title={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? <Pause size={18} fill="#000" /> : <Play size={18} fill="#000" style={{ marginLeft: '2px' }} />}
          </button>

          {onNextTrack && (
            <button onClick={onNextTrack} className="player-skip-btn" title="Next Track">
              <SkipForward size={16} />
            </button>
          )}
        </div>

        <div className="player-progress-row">
          <span>{formatTime(currentTime)}</span>
          <div className="player-progress-track" onClick={handleSeek}>
            <div className="player-progress-fill" style={{ width: `${progressPct}%` }}>
              <div className="player-progress-thumb" />
            </div>
          </div>
          <span>{duration ? formatTime(duration) : (currentTrack.duration || '0:00')}</span>
        </div>
      </div>

      {/* right: spotify link, volume, close */}
      <div className="player-right">
        {currentTrack.spotifySearchUrl && (
          <a
            href={currentTrack.spotifySearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="player-spotify-link"
            title="Open track on Spotify"
          >
            <span>Spotify ↗</span>
          </a>
        )}

        <div className="player-vol-group">
          <button onClick={() => setIsMuted(!isMuted)} className="player-vol-btn">
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="player-vol-slider"
          />
        </div>

        <button onClick={onClose} className="player-close-btn" title="Close player">
          <X size={14} />
        </button>
      </div>

    </div>
  );
}
