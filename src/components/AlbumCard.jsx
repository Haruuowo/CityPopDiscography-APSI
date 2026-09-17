import React from 'react';
import { Star, Music2, Disc } from 'lucide-react';
import { getAuthenticCoverUrl } from '../utils/audioResolver';

export default function AlbumCard({ album, onSelectAlbum }) {
  const coverUrl = getAuthenticCoverUrl(album);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/ac/25/fc/ac25fc82-aeff-f192-581a-e78e5bfba347/1963623486547_cover.png/600x600bb.jpg';
  };

  return (
    <div onClick={() => onSelectAlbum(album)} className="album-card">
      <div>
        {/* Artwork */}
        <div className="album-media-box">
          <img 
            src={coverUrl} 
            alt={album.title} 
            onError={handleImageError} 
          />

          {/* Year & Rating Badge */}
          <div className="badge-gold">
            ★ {album.year} · {album.rating}
          </div>
        </div>

        {/* Card Info */}
        <div className="album-card-body">
          <h3 className="album-title">{album.title}</h3>
          <p className="album-artist">
            {album.artist} <span style={{ fontSize: '.75rem', color: 'var(--darker)' }}>({album.artistJp})</span>
          </p>

          <div>
            {album.genre.map((g) => (
              <span key={g} className="vibe-tag">
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '10px 16px', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '.75rem', fontFamily: 'JetBrains Mono, monospace', color: 'var(--muted)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Music2 style={{ width: '13px', height: '13px', color: 'var(--gold)' }} />
          {album.tracks.length} tracks
        </span>
        <span style={{ color: 'var(--gold)', fontWeight: 600 }}>
          View →
        </span>
      </div>
    </div>
  );
}
