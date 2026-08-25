import React, { useState } from 'react';
import { Disc, Star, ListMusic, Calendar, ChevronRight, Play } from 'lucide-react';

export default function AlbumCard({ album, onSelectAlbum, onPlayAlbum }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="glass-panel glass-panel-interactive"
      style={{ 
        overflow: 'hidden', 
        display: 'flex', 
        flexDirection: 'column', 
        cursor: 'pointer',
        position: 'relative'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelectAlbum(album)}
    >
      
      {/* Cover Image & Vinyl Animation Box */}
      <div style={{ position: 'relative', width: '100%', height: '240px', overflow: 'hidden', background: '#101424' }}>
        
        {/* Vinyl Record sliding out on hover */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: isHovered ? '10px' : '-50px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #222 25%, #111 26%, #111 40%, #000 41%)',
          boxShadow: '0 0 15px rgba(0,0,0,0.8)',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1
        }}>
          {/* Vinyl label center */}
          <div style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            background: album.colorGradient || 'linear-gradient(135deg, #ff007f, #00f2fe)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '3px solid #000'
          }}>
            <Disc size={20} color="#fff" className={isHovered ? "animate-spin-slow" : ""} />
          </div>
        </div>

        {/* Album Artwork Image */}
        <img
          src={album.coverUrl}
          alt={`${album.title} by ${album.artist}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'relative',
            zIndex: 2,
            transition: 'transform 0.4s ease',
            transform: isHovered ? 'scale(1.03) translateX(-10px)' : 'scale(1)'
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop';
          }}
        />

        {/* Overlay gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(10, 12, 22, 0.95) 0%, transparent 60%)',
          zIndex: 3
        }} />

        {/* Quick Play Floating Button on Hover */}
        {isHovered && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (onPlayAlbum) onPlayAlbum(album);
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 5,
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00f2fe, #ff007f)',
              border: 'none',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 25px rgba(0, 242, 254, 0.7)',
              cursor: 'pointer',
              animation: 'fadeIn 0.2s ease'
            }}
            title="Play Album"
          >
            <Play size={24} fill="#fff" style={{ marginLeft: '3px' }} />
          </button>
        )}

        {/* Year & Rating Badges on Cover */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 4, display: 'flex', gap: '8px' }}>
          <span style={{ 
            background: 'rgba(10, 12, 22, 0.85)', 
            backdropFilter: 'blur(8px)',
            color: 'var(--primary-cyan)', 
            padding: '4px 10px', 
            borderRadius: '20px', 
            fontSize: '0.8rem', 
            fontWeight: 700,
            fontFamily: 'var(--font-mono)',
            border: '1px solid rgba(0, 242, 254, 0.3)'
          }}>
            {album.year}
          </span>
        </div>

        <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 4 }}>
          <span style={{ 
            background: 'rgba(10, 12, 22, 0.85)', 
            backdropFilter: 'blur(8px)',
            color: 'var(--accent-gold)', 
            padding: '4px 10px', 
            borderRadius: '20px', 
            fontSize: '0.8rem', 
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            border: '1px solid rgba(255, 183, 3, 0.3)'
          }}>
            <Star size={13} fill="var(--accent-gold)" /> {album.rating}
          </span>
        </div>

        {/* Album Title & Artist over cover base */}
        <div style={{ position: 'absolute', bottom: '12px', left: '16px', right: '16px', zIndex: 4 }}>
          <span className="japanese-sub" style={{ fontSize: '0.75rem', color: 'var(--primary-pink)', display: 'block', marginBottom: '2px' }}>
            {album.artistJapanese} • {album.titleJapanese}
          </span>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', lineHeight: '1.2' }}>
            {album.title}
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            {album.artist}
          </p>
        </div>

      </div>

      {/* Card Content & Vibes */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between', gap: '14px' }}>
        
        {/* Vibe Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {album.vibes.map((vibe, idx) => (
            <span key={idx} className="vibe-badge" style={{ fontSize: '0.7rem' }}>
              {vibe}
            </span>
          ))}
        </div>

        {/* Card Footer: Track count + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <ListMusic size={14} style={{ color: 'var(--primary-cyan)' }} />
            {album.tracks.length} Tracks
          </span>

          <span style={{ 
            fontSize: '0.85rem', 
            fontWeight: 700, 
            color: isHovered ? 'var(--primary-cyan)' : 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            transition: 'color 0.2s ease'
          }}>
            Explore <ChevronRight size={16} />
          </span>
        </div>

      </div>

    </div>
  );
}
