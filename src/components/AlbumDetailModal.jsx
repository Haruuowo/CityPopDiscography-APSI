import React from 'react';
import { X, Disc, Star, Calendar, Music, Sparkles, Award, Tag, Play } from 'lucide-react';

export default function AlbumDetailModal({ album, onClose, onPlayTrack }) {
  if (!album) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel" 
        style={{ 
          maxWidth: '850px', 
          width: '100%', 
          maxHeight: '90vh', 
          overflowY: 'auto',
          position: 'relative',
          padding: '0',
          border: '1px solid rgba(0, 242, 254, 0.3)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            background: 'rgba(10, 12, 22, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#fff',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Hero Banner */}
        <div style={{
          position: 'relative',
          padding: '32px',
          background: album.colorGradient || 'linear-gradient(135deg, #10002b, #240b36)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          
          {/* Cover & Vinyl Artwork visual */}
          <div style={{ position: 'relative', width: '160px', height: '160px', flexShrink: 0 }}>
            {/* Spinning vinyl disk in background */}
            <div style={{
              position: 'absolute',
              top: '5px',
              right: '-25px',
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #222 25%, #111 26%, #111 40%, #000 41%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(0,0,0,0.7)',
              zIndex: 1
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ff007f, #00f2fe)',
                border: '2px solid #000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Disc size={16} color="#fff" className="animate-spin-slow" />
              </div>
            </div>

            {/* Album Cover */}
            <img
              src={album.coverUrl}
              alt={album.title}
              style={{
                width: '160px',
                height: '160px',
                objectFit: 'cover',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                position: 'relative',
                zIndex: 2,
                border: '1px solid rgba(255,255,255,0.2)'
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop';
              }}
            />
          </div>

          {/* Album Title & Metadata */}
          <div style={{ flexGrow: 1, color: '#fff' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span className="japanese-sub" style={{ fontSize: '0.9rem', color: 'var(--primary-cyan)', fontWeight: 600 }}>
                {album.artistJapanese} • {album.titleJapanese}
              </span>
            </div>

            <h2 style={{ fontSize: '2rem', fontWeight: 900, lineHeight: '1.1', marginBottom: '6px' }}>
              {album.title}
            </h2>

            <p style={{ fontSize: '1.1rem', color: '#e2e8f0', marginBottom: '14px', fontWeight: 600 }}>
              {album.artist}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', marginBottom: '16px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={14} color="var(--primary-cyan)" /> Year: <strong style={{ color: '#fff' }}>{album.year}</strong>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Award size={14} color="var(--primary-pink)" /> Producer: <strong style={{ color: '#fff' }}>{album.producer}</strong>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Tag size={14} color="var(--accent-gold)" /> Label: <strong style={{ color: '#fff' }}>{album.label}</strong>
              </span>
            </div>

            <button 
              className="btn-primary"
              onClick={() => onPlayTrack && onPlayTrack(0)}
              style={{ fontSize: '0.9rem', padding: '8px 18px' }}
            >
              <Play size={16} fill="#fff" /> Play Full Album
            </button>

          </div>

        </div>

        {/* Body Content */}
        <div style={{ padding: '28px' }}>
          
          {/* Curator Notes */}
          <div style={{ 
            background: 'rgba(0, 242, 254, 0.05)', 
            borderLeft: '4px solid var(--primary-cyan)', 
            padding: '16px 20px', 
            borderRadius: '0 12px 12px 0',
            marginBottom: '28px' 
          }}>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--primary-cyan)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={16} /> Curator Commentary
            </h4>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
              {album.curatorNotes}
            </p>
          </div>

          {/* Vibe Tags */}
          <div style={{ marginBottom: '28px' }}>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
              GENRE & MOOD TAGS
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {album.vibes.map((vibe, idx) => (
                <span key={idx} className="vibe-badge active">
                  {vibe}
                </span>
              ))}
            </div>
          </div>

          {/* Tracklist Table */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Music size={18} color="var(--primary-pink)" /> Track Listing ({album.tracks.length} Songs)
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {album.tracks.map((track, idx) => (
                <div 
                  key={track.number}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: track.highlight ? 'rgba(255, 0, 127, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                    border: track.highlight ? '1px solid rgba(255, 0, 127, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => onPlayTrack && onPlayTrack(idx)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span style={{ 
                      fontFamily: 'var(--font-mono)', 
                      fontSize: '0.9rem', 
                      color: track.highlight ? 'var(--primary-pink)' : 'var(--text-muted)',
                      fontWeight: 700,
                      minWidth: '24px'
                    }}>
                      {String(track.number).padStart(2, '0')}
                    </span>
                    <div>
                      <span style={{ fontWeight: 600, fontSize: '0.95rem', color: track.highlight ? '#fff' : '#e2e8f0' }}>
                        {track.title}
                      </span>
                      {track.highlight && (
                        <span style={{
                          marginLeft: '10px',
                          fontSize: '0.7rem',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          background: 'linear-gradient(135deg, var(--primary-pink), var(--primary-purple))',
                          color: '#fff',
                          fontWeight: 700,
                          textTransform: 'uppercase'
                        }}>
                          Fan Favorite
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      {track.duration}
                    </span>
                    <Play size={14} color="var(--primary-cyan)" />
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
