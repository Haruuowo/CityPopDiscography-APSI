import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Disc, Radio, Sparkles, X } from 'lucide-react';

export default function AudioPlayerBar({ currentTrack, album, isPlaying, onTogglePlay, onNextTrack, onPrevTrack, onClose }) {
  const [progress, setProgress] = useState(35);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);

  // Simulate progress when playing
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 0 : prev + 0.5));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!album || !currentTrack) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '16px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 32px)',
      maxWidth: '1200px',
      zIndex: 999,
      background: 'rgba(12, 16, 32, 0.92)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(0, 242, 254, 0.3)',
      borderRadius: '20px',
      padding: '12px 24px',
      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 242, 254, 0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '20px',
      animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      
      {/* Track & Album Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '240px' }}>
        {/* Animated Vinyl Thumbnail */}
        <div style={{ position: 'relative', width: '48px', height: '48px', flexShrink: 0 }}>
          <img 
            src={album.coverUrl} 
            alt={album.title} 
            style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '8px', 
              objectFit: 'cover',
              border: '1px solid rgba(255,255,255,0.2)'
            }} 
          />
          <div style={{
            position: 'absolute',
            inset: -4,
            borderRadius: '12px',
            border: isPlaying ? '2px solid var(--primary-cyan)' : 'none',
            pointerEvents: 'none',
            boxShadow: isPlaying ? '0 0 10px rgba(0,242,254,0.5)' : 'none'
          }} />
        </div>

        <div style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ 
              fontSize: '0.7rem', 
              padding: '1px 6px', 
              borderRadius: '4px', 
              background: 'linear-gradient(135deg, var(--primary-pink), var(--primary-purple))', 
              color: '#fff', 
              fontWeight: 700 
            }}>
              NOW PLAYING
            </span>
            <span className="japanese-sub" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {album.artistJapanese}
            </span>
          </div>
          <h4 style={{ 
            fontSize: '0.95rem', 
            fontWeight: 700, 
            color: '#fff', 
            whiteSpace: 'nowrap', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis',
            marginTop: '2px'
          }}>
            {currentTrack.title}
          </h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--primary-cyan)', opacity: 0.9 }}>
            {album.artist} • <span style={{ color: 'var(--text-muted)' }}>{album.title}</span>
          </p>
        </div>
      </div>

      {/* Center Controls & Scrubber */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1, maxWidth: '500px', gap: '6px' }}>
        
        {/* Playback Control Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={onPrevTrack}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            title="Previous Track"
          >
            <SkipBack size={18} />
          </button>

          <button 
            onClick={onTogglePlay}
            style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, #00f2fe, #ff007f)', 
              border: 'none', 
              color: '#fff', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              cursor: 'pointer',
              boxShadow: '0 0 15px rgba(0, 242, 254, 0.4)',
              transition: 'transform 0.15s ease'
            }}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={20} fill="#fff" /> : <Play size={20} fill="#fff" style={{ marginLeft: '2px' }} />}
          </button>

          <button 
            onClick={onNextTrack}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            title="Next Track"
          >
            <SkipForward size={18} />
          </button>
        </div>

        {/* Progress Slider Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          <span>1:24</span>
          <div 
            style={{ 
              flexGrow: 1, 
              height: '4px', 
              background: 'rgba(255,255,255,0.15)', 
              borderRadius: '2px', 
              position: 'relative', 
              cursor: 'pointer' 
            }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              setProgress((clickX / rect.width) * 100);
            }}
          >
            <div style={{ 
              width: `${progress}%`, 
              height: '100%', 
              background: 'linear-gradient(90deg, #00f2fe, #ff007f)', 
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
                boxShadow: '0 0 6px rgba(0,242,254,0.8)'
              }} />
            </div>
          </div>
          <span>{currentTrack.duration || "4:15"}</span>
        </div>

      </div>

      {/* Right Controls: Volume & Dismiss */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '160px', justifyContent: 'flex-end' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            onClick={() => setIsMuted(!isMuted)} 
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          <input 
            type="range" 
            min="0" 
            max="100" 
            value={isMuted ? 0 : volume} 
            onChange={(e) => setVolume(Number(e.target.value))}
            style={{ 
              width: '70px', 
              accentColor: 'var(--primary-cyan)', 
              cursor: 'pointer' 
            }} 
          />
        </div>

        <button 
          onClick={onClose} 
          style={{ 
            background: 'rgba(255,255,255,0.08)', 
            border: 'none', 
            color: 'var(--text-muted)', 
            borderRadius: '50%', 
            width: '28px', 
            height: '28px', 
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
