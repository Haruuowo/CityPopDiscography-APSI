import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, X, Disc3 } from 'lucide-react';

export default function AudioPlayerBar({ currentTrack, album, isPlaying, onTogglePlay, onNextTrack, onPrevTrack, onClose }) {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);

  // Audio preview source (use track previewUrl or high quality sample audio)
  const audioSrc = currentTrack?.previewUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

  // Handle Play / Pause sync with HTML5 Audio element
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(e => console.log('Audio autoplay prevented or error:', e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, audioSrc]);

  // Sync Volume
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

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = clickX / rect.width;
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
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 40px)',
      maxWidth: '1000px',
      zIndex: 9999,
      background: 'rgba(15, 18, 30, 0.95)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid var(--bdgold)',
      borderRadius: '16px',
      padding: '12px 24px',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 25px rgba(232, 217, 184, 0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '20px'
    }}>
      
      {/* Hidden HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => onNextTrack && onNextTrack()}
      />

      {/* Track & Album Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '220px' }}>
        <div style={{ position: 'relative', width: '46px', height: '46px', flexShrink: 0 }}>
          <img 
            src={coverUrl} 
            alt={album.title} 
            style={{ 
              width: '46px', 
              height: '46px', 
              borderRadius: '8px', 
              objectFit: 'cover',
              border: '1px solid var(--border)'
            }} 
          />
          {isPlaying && (
            <Disc3 
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '18px',
                height: '18px',
                color: 'var(--gold)',
                animation: 'spin 3s linear infinite'
              }} 
            />
          )}
        </div>

        <div style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="vibe-tag" style={{ fontSize: '0.6rem', padding: '1px 6px' }}>
              NOW PLAYING
            </span>
          </div>
          <h4 style={{ 
            fontSize: '0.9rem', 
            fontWeight: 700, 
            color: 'var(--white)', 
            whiteSpace: 'nowrap', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis',
            marginTop: '2px'
          }}>
            {currentTrack.title}
          </h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--gold)' }}>
            {album.artist} • <span style={{ color: 'var(--muted)' }}>{album.title}</span>
          </p>
        </div>
      </div>

      {/* Center Playback Controls & Scrubber */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1, maxWidth: '440px', gap: '6px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {onPrevTrack && (
            <button 
              onClick={onPrevTrack}
              style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', display: 'flex' }}
              title="Previous Track"
            >
              <SkipBack size={16} />
            </button>
          )}

          <button 
            onClick={onTogglePlay}
            style={{ 
              width: '38px', 
              height: '38px', 
              borderRadius: '50%', 
              background: 'var(--gold)', 
              border: 'none', 
              color: '#000', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              cursor: 'pointer',
              boxShadow: '0 0 15px rgba(232, 217, 184, 0.4)'
            }}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={18} fill="#000" /> : <Play size={18} fill="#000" style={{ marginLeft: '2px' }} />}
          </button>

          {onNextTrack && (
            <button 
              onClick={onNextTrack}
              style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', display: 'flex' }}
              title="Next Track"
            >
              <SkipForward size={16} />
            </button>
          )}
        </div>

        {/* Progress Slider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', fontSize: '0.7rem', color: 'var(--muted)', fontFamily: 'JetBrains Mono, monospace' }}>
          <span>{formatTime(currentTime)}</span>
          <div 
            style={{ 
              flexGrow: 1, 
              height: '4px', 
              background: 'rgba(255,255,255,0.15)', 
              borderRadius: '2px', 
              position: 'relative', 
              cursor: 'pointer' 
            }}
            onClick={handleSeek}
          >
            <div style={{ 
              width: `${progressPct}%`, 
              height: '100%', 
              background: 'var(--gold)', 
              borderRadius: '2px',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                right: '-4px',
                top: '-3px',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#fff',
                boxShadow: '0 0 6px var(--gold)'
              }} />
            </div>
          </div>
          <span>{duration ? formatTime(duration) : (currentTrack.duration || '0:00')}</span>
        </div>

      </div>

      {/* Right Volume & Close Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '140px', justifyContent: 'flex-end' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            onClick={() => setIsMuted(!isMuted)} 
            style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          <input 
            type="range" 
            min="0" 
            max="100" 
            value={isMuted ? 0 : volume} 
            onChange={(e) => setVolume(Number(e.target.value))}
            style={{ 
              width: '60px', 
              accentColor: 'var(--gold)', 
              cursor: 'pointer' 
            }} 
          />
        </div>

        <button 
          onClick={onClose} 
          style={{ 
            background: 'rgba(255,255,255,0.08)', 
            border: 'none', 
            color: 'var(--muted)', 
            borderRadius: '50%', 
            width: '26px', 
            height: '26px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            cursor: 'pointer' 
          }}
          title="Close player"
        >
          <X size={14} />
        </button>

      </div>

    </div>
  );
}
