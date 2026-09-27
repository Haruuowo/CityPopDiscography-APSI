import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2, Music2 } from 'lucide-react';

export default function SuggestAlbumModal({ isOpen, onClose }) {
  const [albumTitle, setAlbumTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!albumTitle.trim() || !artist.trim()) return;

    setSubmitted(true);

    // Create mailto fallback so user can optionally send directly via email
    const subject = encodeURIComponent(`[City Records Request] Add Album: ${albumTitle} by ${artist}`);
    const body = encodeURIComponent(
      `Hi City Records Team,\n\nI would love for you to add the following album to the discography:\n\nAlbum: ${albumTitle}\nArtist: ${artist}\nNotes: ${note}\n\nSuggested by: ${userEmail || 'Anonymous Listener'}`
    );

    setTimeout(() => {
      // Open default mail client if available
      window.location.href = `mailto:CityRecords@gmail.com?subject=${subject}&body=${body}`;
    }, 800);
  };

  const handleReset = () => {
    setSubmitted(false);
    setAlbumTitle('');
    setArtist('');
    setUserEmail('');
    setNote('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleReset}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '520px', padding: '32px 28px', position: 'relative' }}
      >
        <button onClick={handleReset} className="close-btn" title="Close">
          <X style={{ width: '18px', height: '18px' }} />
        </button>

        {!submitted ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold)', marginBottom: '6px' }}>
              <Music2 size={18} />
              <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                CURATION REQUEST
              </span>
            </div>

            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.5rem', color: '#fff', marginBottom: '8px', fontWeight: 800 }}>
              Ask What Album To Add Next
            </h2>

            <p style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '20px', lineHeight: 1.5 }}>
              Have an iconic 70s or 80s City Pop, Funk, or AOR album you want included in our discography? Tell us below and our curation team will review it!
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 700, marginBottom: '6px' }}>
                  ALBUM TITLE *
                </label>
                <input
                  type="text"
                  placeholder="e.g. For You, Spacy, First Light..."
                  value={albumTitle}
                  onChange={(e) => setAlbumTitle(e.target.value)}
                  required
                  className="contact-magenta-input"
                  style={{ background: '#1e1e24', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 700, marginBottom: '6px' }}>
                  ARTIST / BAND NAME *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tatsuro Yamashita, Makoto Matsushita..."
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  required
                  className="contact-magenta-input"
                  style={{ background: '#1e1e24', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', fontWeight: 600, marginBottom: '6px' }}>
                  YOUR EMAIL (Optional - to notify you when added)
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="contact-magenta-input"
                  style={{ background: '#1e1e24', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', fontWeight: 600, marginBottom: '6px' }}>
                  WHY SHOULD WE ADD THIS ALBUM? (Optional)
                </label>
                <textarea
                  placeholder="Tell us about your favorite track or why this album is a masterpiece..."
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="contact-magenta-input"
                  style={{ background: '#1e1e24', color: '#fff', borderColor: 'rgba(255,255,255,0.2)', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
                <button type="button" onClick={handleReset} className="btn-line">
                  Cancel
                </button>
                <button type="submit" className="btn-solid" style={{ background: '#B91C1C' }}>
                  <Send size={14} /> Send Album Suggestion
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <CheckCircle2 style={{ width: '48px', height: '48px', color: '#4ade80', margin: '0 auto 16px' }} />
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.4rem', color: '#fff', marginBottom: '8px' }}>
              Request Received!
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)', marginBottom: '24px', lineHeight: 1.5 }}>
              Thank you for suggesting <strong>{albumTitle}</strong> by <strong>{artist}</strong>! Our team will review the tracklist and vinyl artwork to add it to City Records.
            </p>
            <button onClick={handleReset} className="btn-solid">
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
