import React from 'react';
import { Star, Music2, Disc } from 'lucide-react';

export default function AlbumCard({ album, onSelectAlbum }) {
  return (
    <div onClick={() => onSelectAlbum(album)} className="album-card">
      <div>
        {/* Artwork + Spinning Vinyl Overlay */}
        <div className="album-media-box">
          <div className="vinyl-record-overlay spin-vinyl">
            <div className="vinyl-center" />
          </div>

          <img src={album.cover} alt={album.title} />

          {/* Gold Badge */}
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
      <div style={{ padding: '12px 24px', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '.75rem', fontFamily: 'JetBrains Mono, monospace', color: 'var(--muted)' }}>
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
