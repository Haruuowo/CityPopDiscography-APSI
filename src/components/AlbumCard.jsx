import React from 'react';
import { Music2 } from 'lucide-react';
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
        {/* cover art with year+rating badge overlay */}
        <div className="album-media-box">
          <img
            src={coverUrl}
            alt={album.title}
            onError={handleImageError}
          />
          <div className="badge-gold">
            ★ {album.year} · {album.rating}
          </div>
        </div>

        {/* title, artist, genre tags */}
        <div className="album-card-body">
          <h3 className="album-title">{album.title}</h3>
          <p className="album-artist">
            {album.artist} <span className="card-artist-jp">({album.artistJp})</span>
          </p>
          <div>
            {album.genre.map((g) => (
              <span key={g} className="vibe-tag">{g}</span>
            ))}
          </div>
        </div>
      </div>

      {/* card footer — track count and view prompt */}
      <div className="card-footer">
        <span className="card-footer-tracks">
          <Music2 style={{ width: '13px', height: '13px', color: 'var(--gold)' }} />
          {album.tracks.length} tracks
        </span>
        <span className="card-footer-view">View →</span>
      </div>
    </div>
  );
}
