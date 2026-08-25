import React from 'react';
import AlbumCard from './AlbumCard';
import { Music, Disc } from 'lucide-react';

export default function AlbumGrid({ albums, onSelectAlbum, onResetFilters }) {
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
        />
      ))}
    </div>
  );
}
