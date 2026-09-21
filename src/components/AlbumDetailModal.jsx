import React from 'react';
import { X, Music, Sparkles, Play, Pause } from 'lucide-react';
import { getAuthenticCoverUrl } from '../utils/audioResolver';

// shows full album info: cover, tracklist with play buttons, and a recommend action
export default function AlbumDetailModal({ album, onClose, onRecommendThis, onPlayTrack, activeTrack, isPlaying }) {
  if (!album) return null;

  const coverUrl = getAuthenticCoverUrl(album);

  const handleImageError = (e) => {
    e.target.onerror = null;
    // fallback to a known-good cover if the image link is dead
    e.target.src = 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/ac/25/fc/ac25fc82-aeff-f192-581a-e78e5bfba347/1963623486547_cover.png/600x600bb.jpg';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        <button onClick={onClose} className="close-btn">
          <X style={{ width: '18px', height: '18px' }} />
        </button>

        {/* Album header — cover art + basic metadata side by side */}
        <div className="modal-header-grid">
          <img
            src={coverUrl}
            alt={album.title}
            onError={handleImageError}
            className="modal-cover-img"
          />

          <div>
            <div className="modal-tag-row">
              <span className="vibe-tag">★ {album.year} RELEASE</span>
              <span className="vibe-tag">★ RATING: {album.rating} / 5.0</span>
            </div>

            <h2 className="modal-album-title">{album.title}</h2>

            <p className="modal-artist-name">
              {album.artist} <span className="modal-artist-jp">({album.artistJp})</span>
            </p>

            <p className="modal-synopsis">{album.synopsis}</p>
          </div>
        </div>

        {/* Tracklist */}
        <div>
          <h3 className="tracklist-heading">
            <Music style={{ width: '16px', height: '16px', color: 'var(--gold)' }} />
            Tracklist ({album.tracks.length} Songs)
          </h3>

          <div className="tracklist-items">
            {album.tracks.map((track) => {
              const isActiveTrack = activeTrack?.title === track.title && activeTrack?.albumId === album.id;
              const itemClass = `tracklist-item${track.highlight ? ' tracklist-item--highlight' : ''}`;
              const playBtnClass = `track-play-btn${isActiveTrack ? ' track-play-btn--active' : ''}`;

              return (
                <div key={track.number} className={itemClass}>
                  <div className="tracklist-item-left">

                    <button
                      onClick={() => onPlayTrack && onPlayTrack(track, album)}
                      className={playBtnClass}
                      title="Play Preview"
                    >
                      {isActiveTrack && isPlaying ? (
                        <Pause size={12} fill="#000" />
                      ) : (
                        <Play size={12} fill={isActiveTrack ? '#000' : 'var(--white)'} style={{ marginLeft: '1px' }} />
                      )}
                    </button>

                    <span className="track-number">{String(track.number).padStart(2, '0')}</span>
                    <span className="track-title">{track.title}</span>

                    {track.highlight && (
                      <span className="vibe-tag" style={{ fontSize: '.6rem', padding: '2px 6px' }}>Signature Hit</span>
                    )}
                  </div>

                  <span className="track-duration">{track.duration}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom actions */}
        <div className="modal-actions">
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
