import React from 'react';
import { X, Star, Calendar, Music, Sparkles, Zap, Moon, Flame, Play, Pause } from 'lucide-react';
import { getAuthenticCoverUrl } from '../utils/audioResolver';

export default function AlbumDetailModal({ album, onClose, onRecommendThis, onPlayTrack, activeTrack, isPlaying }) {
  if (!album) return null;

  const coverUrl = getAuthenticCoverUrl(album);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/ac/25/fc/ac25fc82-aeff-f192-581a-e78e5bfba347/1963623486547_cover.png/600x600bb.jpg';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button onClick={onClose} className="close-btn">
          <X style={{ width: '18px', height: '18px' }} />
        </button>

        {/* Top Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '28px', marginBottom: '28px', paddingBottom: '28px', borderBottom: '1px solid var(--border)' }}>
          <img
            src={coverUrl}
            alt={album.title}
            onError={handleImageError}
            style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '14px', border: '1px solid var(--bdgold)', boxShadow: '0 12px 30px rgba(0,0,0,0.6)' }}
          />

          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <span className="vibe-tag">★ {album.year} RELEASE</span>
              <span className="vibe-tag">★ RATING: {album.rating} / 5.0</span>
            </div>

            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2.2rem', fontWeight: 800, color: 'var(--white)', marginBottom: '4px' }}>
              {album.title}
            </h2>

            <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--gold)', marginBottom: '16px' }}>
              {album.artist} <span style={{ fontSize: '.85rem', color: 'var(--muted)', fontFamily: 'JetBrains Mono, monospace' }}>({album.artistJp})</span>
            </p>

            <p style={{ fontSize: '.9rem', color: 'var(--muted)', lineHeight: '1.7', marginBottom: '20px' }}>
              {album.synopsis}
            </p>

            {/* Vibe Breakdown */}
            <div style={{ background: 'var(--glass)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '.75rem', fontFamily: 'JetBrains Mono, monospace', color: 'var(--gold)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles style={{ width: '13px', height: '13px' }} /> ALBUM VIBE BREAKDOWN
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '.75rem', color: 'var(--muted)', marginBottom: '6px' }}>
                <span style={{ width: '80px', display: 'flex', alignItems: 'center', gap: '4px' }}><Zap style={{ width: '12px', height: '12px' }} /> Funk</span>
                <div style={{ flexGrow: 1, height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,.1)', overflow: 'hidden' }}>
                  <div style={{ width: `${album.vibes.funkiness}%`, height: '100%', background: 'var(--gold)' }} />
                </div>
                <span>{album.vibes.funkiness}%</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '.75rem', color: 'var(--muted)', marginBottom: '6px' }}>
                <span style={{ width: '80px', display: 'flex', alignItems: 'center', gap: '4px' }}><Flame style={{ width: '12px', height: '12px' }} /> Sunset</span>
                <div style={{ flexGrow: 1, height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,.1)', overflow: 'hidden' }}>
                  <div style={{ width: `${album.vibes.sunsetEnergy}%`, height: '100%', background: 'var(--gold)' }} />
                </div>
                <span>{album.vibes.sunsetEnergy}%</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '.75rem', color: 'var(--muted)' }}>
                <span style={{ width: '80px', display: 'flex', alignItems: 'center', gap: '4px' }}><Moon style={{ width: '12px', height: '12px' }} /> Night</span>
                <div style={{ flexGrow: 1, height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,.1)', overflow: 'hidden' }}>
                  <div style={{ width: `${album.vibes.nightDrive}%`, height: '100%', background: 'var(--gold)' }} />
                </div>
                <span>{album.vibes.nightDrive}%</span>
              </div>

            </div>

          </div>
        </div>

        {/* Tracklist */}
        <div>
          <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--white)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Music style={{ width: '16px', height: '16px', color: 'var(--gold)' }} /> Tracklist ({album.tracks.length} Songs)
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '28px' }}>
            {album.tracks.map((track) => {
              const isCurrentPlayingTrack = activeTrack?.title === track.title && activeTrack?.albumId === album.id;
              
              return (
                <div
                  key={track.number}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    background: track.highlight ? 'rgba(232, 217, 184, 0.08)' : 'var(--glass)',
                    border: '1px solid ' + (track.highlight ? 'var(--bdgold)' : 'var(--border)'),
                    fontSize: '.85rem',
                    transition: 'border-color 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {/* Play Button */}
                    <button
                      onClick={() => onPlayTrack && onPlayTrack(track, album)}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: isCurrentPlayingTrack ? 'var(--gold)' : 'rgba(255, 255, 255, 0.1)',
                        border: 'none',
                        color: isCurrentPlayingTrack ? '#000' : 'var(--white)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      title="Play Preview"
                    >
                      {isCurrentPlayingTrack && isPlaying ? (
                        <Pause size={12} fill="#000" />
                      ) : (
                        <Play size={12} fill={isCurrentPlayingTrack ? "#000" : "var(--white)"} style={{ marginLeft: '1px' }} />
                      )}
                    </button>

                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.75rem', color: 'var(--darker)', width: '20px' }}>
                      {String(track.number).padStart(2, '0')}
                    </span>
                    <span style={{ fontWeight: 500, color: 'var(--white)' }}>{track.title}</span>
                    {track.highlight && (
                      <span className="vibe-tag" style={{ fontSize: '.6rem', padding: '2px 6px' }}>Signature Hit</span>
                    )}
                  </div>

                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.75rem', color: 'var(--muted)' }}>{track.duration}</span>
                </div>
              );
            })}
          </div>
        </div>


        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
          <button onClick={onClose} className="btn-line">Close</button>
          <button
            onClick={() => {
              onClose();
              onRecommendThis(album);
            }}
            className="btn-solid"
          >
            <Sparkles style={{ width: '14px', height: '14px' }} /> Recommend Album
          </button>
        </div>

      </div>
    </div>
  );
}
