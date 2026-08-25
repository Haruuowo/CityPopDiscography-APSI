import React, { useState, useEffect } from 'react';
import { X, Sparkles, Send } from 'lucide-react';
import { ALL_VIBE_TAGS } from '../data/citypopData';

export default function AddRecModal({ isOpen, onClose, initialAlbum, onSubmitRecommendation }) {
  const [formData, setFormData] = useState({
    albumTitle: '',
    artist: '',
    year: 1983,
    recommendedBy: '',
    comment: '',
    vibeTag: 'Midnight Drive'
  });

  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialAlbum) {
      setFormData(prev => ({
        ...prev,
        albumTitle: initialAlbum.title,
        artist: initialAlbum.artist,
        year: initialAlbum.year,
        vibeTag: initialAlbum.genre[0] || 'Midnight Drive'
      }));
    }
  }, [initialAlbum]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.albumTitle.trim() || !formData.artist.trim() || !formData.comment.trim() || !formData.recommendedBy.trim()) {
      setErrorMsg('Please fill in all required fields to submit your recommendation.');
      return;
    }

    const newRec = {
      id: `rec-user-${Date.now()}`,
      albumTitle: formData.albumTitle.trim(),
      artist: formData.artist.trim(),
      year: Number(formData.year),
      recommendedBy: formData.recommendedBy.trim(),
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      comment: formData.comment.trim(),
      vibeTag: formData.vibeTag,
      date: new Date().toISOString().split('T')[0]
    };

    onSubmitRecommendation(newRec);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
        
        <button onClick={onClose} className="close-btn">
          <X style={{ width: '18px', height: '18px' }} />
        </button>

        <div className="hero-tag" style={{ marginBottom: '6px' }}>★ COMMUNITY RECOMMENDATION</div>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: 'var(--white)', marginBottom: '4px' }}>
          Recommend an Album
        </h2>
        <p style={{ fontSize: '.88rem', color: 'var(--muted)', marginBottom: '24px' }}>
          Share your favorite hidden vinyl gem or iconic album review with fellow listeners.
        </p>

        {errorMsg && (
          <div style={{ padding: '10px 14px', marginBottom: '16px', borderRadius: '8px', background: 'rgba(196, 106, 106, 0.2)', border: '1px solid #c46a6a', fontSize: '.8rem', color: '#fff' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '.7rem', fontFamily: 'JetBrains Mono, monospace', color: 'var(--gold)', marginBottom: '6px' }}>
              ALBUM TITLE *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. FOR YOU"
              value={formData.albumTitle}
              onChange={(e) => setFormData({ ...formData, albumTitle: e.target.value })}
              className="inp-glass"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '.7rem', fontFamily: 'JetBrains Mono, monospace', color: 'var(--gold)', marginBottom: '6px' }}>
                ARTIST *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Tatsuro Yamashita"
                value={formData.artist}
                onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                className="inp-glass"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '.7rem', fontFamily: 'JetBrains Mono, monospace', color: 'var(--gold)', marginBottom: '6px' }}>
                RELEASE YEAR *
              </label>
              <input
                type="number"
                min="1970"
                max="1995"
                required
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="inp-glass"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '.7rem', fontFamily: 'JetBrains Mono, monospace', color: 'var(--gold)', marginBottom: '6px' }}>
                PRIMARY VIBE *
              </label>
              <select
                value={formData.vibeTag}
                onChange={(e) => setFormData({ ...formData, vibeTag: e.target.value })}
                className="sel-glass"
              >
                {ALL_VIBE_TAGS.filter(t => t !== "All Vibes").map((tag) => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '.7rem', fontFamily: 'JetBrains Mono, monospace', color: 'var(--gold)', marginBottom: '6px' }}>
                YOUR HANDLE *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. ShinjukuGroove"
                value={formData.recommendedBy}
                onChange={(e) => setFormData({ ...formData, recommendedBy: e.target.value })}
                className="inp-glass"
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '.7rem', fontFamily: 'JetBrains Mono, monospace', color: 'var(--gold)', marginBottom: '6px' }}>
              WHY RECOMMEND THIS ALBUM? *
            </label>
            <textarea
              rows={3}
              required
              placeholder="Describe the mood, standout tracks, bassline..."
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className="inp-glass"
              style={{ resize: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyEnd: 'flex-end', gap: '12px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
            <button type="button" onClick={onClose} className="btn-line">Cancel</button>
            <button type="submit" className="btn-solid">
              <Send style={{ width: '14px', height: '14px' }} /> Submit Recommendation
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
