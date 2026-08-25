import React, { useState } from 'react';
import { X, Sparkles, Send, Tag, Disc } from 'lucide-react';

export default function SubmitRecommendationModal({ isOpen, onClose, onSubmit }) {
  const [albumTitle, setAlbumTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [year, setYear] = useState('1983');
  const [vibe, setVibe] = useState('Summer Vibes');
  const [submittedBy, setSubmittedBy] = useState('');
  const [reason, setReason] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!albumTitle.trim() || !artist.trim() || !reason.trim()) {
      setErrorMsg('Please fill in the Album Title, Artist, and Review/Reason.');
      return;
    }

    const parsedTags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const newRecommendation = {
      id: 'rec-' + Date.now(),
      albumTitle: albumTitle.trim(),
      artist: artist.trim(),
      year: parseInt(year) || 1980,
      vibe,
      submittedBy: submittedBy.trim() || 'Anonymous CityPop Fan',
      reason: reason.trim(),
      tags: parsedTags.length > 0 ? parsedTags : [vibe, 'Community Choice'],
      createdAt: new Date().toISOString().split('T')[0]
    };

    onSubmit(newRecommendation);
    
    // Reset form
    setAlbumTitle('');
    setArtist('');
    setYear('1983');
    setVibe('Summer Vibes');
    setSubmittedBy('');
    setReason('');
    setTagsInput('');
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel"
        style={{ 
          maxWidth: '560px', 
          width: '100%', 
          position: 'relative',
          padding: '28px',
          border: '1px solid var(--border-glow)',
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
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--primary-pink), var(--primary-purple))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff'
          }}>
            <Sparkles size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Submit Album Recommendation</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Share a hidden City Pop gem or essential classic with the community.
            </p>
          </div>
        </div>

        {errorMsg && (
          <div style={{ background: 'rgba(255, 0, 127, 0.15)', border: '1px solid var(--primary-pink)', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.85rem', color: '#ff4d4d' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                ALBUM TITLE *
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Pacific"
                value={albumTitle}
                onChange={(e) => setAlbumTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                ARTIST *
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Haruomi Hosono"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                RELEASE YEAR
              </label>
              <input
                type="number"
                min="1970"
                max="1995"
                className="form-input"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                PRIMARY VIBE / GENRE
              </label>
              <select 
                className="form-select"
                value={vibe}
                onChange={(e) => setVibe(e.target.value)}
              >
                <option value="Summer Vibes">Summer Vibes</option>
                <option value="Midnight Drive">Midnight Drive</option>
                <option value="Funk / Groove">Funk / Groove</option>
                <option value="Synth Pop">Synth Pop</option>
                <option value="Jazz Fusion">Jazz Fusion</option>
                <option value="Mellow Pop">Mellow Pop</option>
                <option value="Resort Pop">Resort Pop</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
              YOUR NAME / HANDLE
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. NeonDriver84"
              value={submittedBy}
              onChange={(e) => setSubmittedBy(e.target.value)}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
              WHY IS THIS ALBUM A MUST-LISTEN? *
            </label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="Describe the mood, standout tracks, bassline, or arrangements..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
              TAGS (Comma separated)
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Slap Bass, Highway Drive, Ocean Resort"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Send size={16} /> Submit Recommendation
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
