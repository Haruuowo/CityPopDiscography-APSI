import React from 'react';
import AlbumCard from './AlbumCard';
import { Music, Disc, Play, Star, Calendar, ArrowRight } from 'lucide-react';

export default function AlbumGrid({ albums, onSelectAlbum, onResetFilters, viewMode = 'grid', onPlayAlbum }) {
  if (albums.length === 0) {
    return (
      <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center', margin: '40px 0' }}>
        <div style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: 'rgba(255, 0, 127, 0.1)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px'
        }}>
          <Disc size={36} color="var(--primary-pink)" />
        </div>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>No City Pop Albums Found</h3>
        <p style={{ color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 20px' }}>
          No albums matched your current search filters. Try adjusting your search query, artist selection, or release year range.
        </p>
        <button className="btn-secondary" onClick={onResetFilters}>
          Clear All Filters
        </button>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '48px' }}>
        {albums.map((album) => (
          <div 
            key={album.id}
            className="glass-panel glass-panel-interactive"
            style={{ 
              padding: '16px 20px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              gap: '20px',
              cursor: 'pointer',
              flexWrap: 'wrap'
            }}
            onClick={() => onSelectAlbum(album)}
          >
            {/* Left Cover & Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexGrow: 1 }}>
              <img 
                src={album.coverUrl} 
                alt={album.title} 
                style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover' }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>{album.title}</h3>
                  <span className="japanese-sub" style={{ fontSize: '0.8rem', color: 'var(--primary-pink)' }}>
                    {album.titleJapanese}
                  </span>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {album.artist} ({album.artistJapanese}) • <span style={{ color: 'var(--primary-cyan)', fontWeight: 600 }}>{album.year}</span>
                </p>
              </div>
            </div>

            {/* Vibe Tags */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {album.vibes.slice(0, 3).map((vibe, idx) => (
                <span key={idx} className="vibe-badge" style={{ fontSize: '0.75rem' }}>
                  {vibe}
                </span>
              ))}
            </div>

            {/* Rating & Play CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} onClick={(e) => e.stopPropagation()}>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={14} fill="var(--accent-gold)" /> {album.rating}
              </span>

              <button 
                className="btn-secondary"
                onClick={() => onPlayAlbum(album)}
                style={{ padding: '8px 14px', fontSize: '0.85rem' }}
              >
                <Play size={14} fill="#fff" /> Listen
              </button>
            </div>

          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '24px',
      marginBottom: '48px'
    }}>
      {albums.map((album) => (
        <AlbumCard
          key={album.id}
          album={album}
          onSelectAlbum={onSelectAlbum}
          onPlayAlbum={() => onPlayAlbum(album)}
        />
      ))}
    </div>
  );
}
