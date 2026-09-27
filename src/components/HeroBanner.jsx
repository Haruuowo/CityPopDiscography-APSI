import React, { useState } from 'react';
import { ArrowDown, HelpCircle, CheckCircle2, Video, Edit3, Mail } from 'lucide-react';

// Helper to convert standard video links (YouTube, Vimeo, MP4) to playable embed URLs
function formatVideoEmbedUrl(url) {
  if (!url) return null;
  const cleanUrl = url.trim();

  // YouTube watch format (youtube.com/watch?v=ID)
  if (cleanUrl.includes('youtube.com/watch')) {
    try {
      const urlObj = new URL(cleanUrl);
      const videoId = urlObj.searchParams.get('v');
      if (videoId) {
        return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1`;
      }
    } catch (e) {}
  }

  // YouTube short format (youtu.be/ID)
  if (cleanUrl.includes('youtu.be/')) {
    const videoId = cleanUrl.split('youtu.be/')[1]?.split('?')[0];
    if (videoId) {
      return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1`;
    }
  }

  // Direct embed or MP4
  return cleanUrl;
}

export default function HeroBanner({ onOpenAddRec, onOpenSuggestAlbum, initialVideoUrl }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [videoUrlInput, setVideoUrlInput] = useState(
    initialVideoUrl || 'https://youtu.be/VtRIRJ0tBRc'
  );
  const [showVideoInputModal, setShowVideoInputModal] = useState(false);
  const [tempUrl, setTempUrl] = useState('');

  const handleScrollToGrid = () => {
    document.getElementById('discography-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 5000);
    }
  };

  const handleSaveVideoUrl = (e) => {
    e.preventDefault();
    if (tempUrl.trim()) {
      setVideoUrlInput(tempUrl.trim());
    }
    setShowVideoInputModal(false);
  };

  const formattedEmbed = formatVideoEmbedUrl(videoUrlInput);
  const isDirectVideo = formattedEmbed && (formattedEmbed.endsWith('.mp4') || formattedEmbed.endsWith('.webm'));
  const triggerSuggestModal = onOpenSuggestAlbum || onOpenAddRec;

  return (
    <>
      {/* 1. TOP HERO TITLE BANNER */}
      <section id="hero">
        <div className="hero-content-wrapper">
          <div className="hero-title-box">
            <div className="hero-tag">
              ★ JAPANESE CITY POP DISCOGRAPHY · 1975 – 1990
            </div>
            <h1>INTRODUCTION TO <span className="gold-accent">CITYPOP</span></h1>
            <p className="hero-sub">
              Immerse yourself in nostalgic Tokyo night drives, coastal synth funk, and golden sunset grooves. Filter by artist, era, or mood, and suggest what albums we should feature next.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '24px', alignItems: 'center' }}>
              <button onClick={handleScrollToGrid} className="btn-solid">
                <span>Explore Discography</span>
                <ArrowDown style={{ width: '14px', height: '14px' }} />
              </button>

              <button onClick={triggerSuggestModal} className="btn-line">
                <HelpCircle style={{ width: '14px', height: '14px' }} />
                <span>Ask what album to add next</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FULL-WIDTH CONTACT BANNER SECTION */}
      <section id="contact-section" className="contact-full-banner">
        <div className="contact-banner-container">
          
          {/* Left Side: Video Player Frame */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
            <div className="contact-featured-video-frame">
              <span className="contact-video-overlay-badge">
                <Video style={{ width: '11px', height: '11px', display: 'inline-block', marginRight: '4px' }} />
                FEATURED CITYPOP VIDEO
              </span>

              {isDirectVideo ? (
                <video
                  src={formattedEmbed}
                  autoPlay
                  muted
                  loop
                  controls
                  playsInline
                />
              ) : (
                <iframe
                  src={formattedEmbed}
                  title="Featured City Pop Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>

            {/* Quick action to paste/change video link */}
            <button
              onClick={() => {
                setTempUrl(videoUrlInput);
                setShowVideoInputModal(true);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--gold)',
                fontSize: '0.72rem',
                fontFamily: 'DM Sans, sans-serif',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                opacity: 0.85,
                alignSelf: 'flex-start',
                padding: '2px 0'
              }}
            >
              <Edit3 size={12} /> Paste / Change Video Link
            </button>
          </div>

          {/* Right Side: Description, Form & Aligned Action Buttons */}
          <div className="contact-form-side">
            <h2 className="contact-yellow-title">CONTACT US HERE</h2>
            <p className="contact-white-subtext">A song for no one is a song for everyone</p>

            {/* Short Description explaining the site/project */}
            <p className="contact-description-body">
              Welcome to City Records — a curated digital archive exploring 1970s–1980s Japanese City Pop, Funk, AOR, and Boogie. Listen to audio previews, explore authentic vinyl artwork, and submit requests for what albums we should add next!
            </p>

            {/* Intuitive Newsletter Subscription Form */}
            <form onSubmit={handleSubscribe} className="contact-stacked-form">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ color: 'var(--gold)', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  SUBSCRIBE TO CITY RECORDS NEWSLETTER
                </label>
                <div style={{ position: 'relative', width: '100%' }}>
                  <input
                    type="email"
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="contact-magenta-input"
                    style={{ paddingLeft: '36px' }}
                  />
                  <Mail
                    size={15}
                    style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6B7280' }}
                  />
                </div>
              </div>

              <button type="submit" className="contact-red-subscribe-btn">
                {subscribed ? (
                  <>
                    <CheckCircle2 style={{ width: '16px', height: '16px' }} />
                    <span>SUBSCRIBED!</span>
                  </>
                ) : (
                  <span>SUBSCRIBE</span>
                )}
              </button>

              {subscribed && (
                <span style={{ fontSize: '0.8rem', color: '#4ade80', marginTop: '2px' }}>
                  ✓ Thank you! You're now subscribed to City Records weekly updates.
                </span>
              )}
            </form>

            {/* Action Links Row */}
            <div className="contact-action-links">
              <button onClick={handleScrollToGrid} className="btn-line">
                <span>EXPLORE DISCOGRAPHY</span>
                <ArrowDown style={{ width: '14px', height: '14px' }} />
              </button>
              <button onClick={triggerSuggestModal} className="btn-solid">
                <HelpCircle style={{ width: '14px', height: '14px' }} />
                <span>Ask what album to add next</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Video URL Input Modal */}
      {showVideoInputModal && (
        <div className="modal-overlay" onClick={() => setShowVideoInputModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '440px', padding: '24px' }}
          >
            <h3 style={{ color: 'var(--gold)', fontFamily: 'Syne, sans-serif', fontSize: '1.2rem', marginBottom: '8px' }}>
              Set Featured Video Link
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', marginBottom: '16px' }}>
              Paste any YouTube URL (e.g. <code>https://youtube.com/watch?v=...</code>) or direct video URL to display in the header banner.
            </p>
            <form onSubmit={handleSaveVideoUrl}>
              <input
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={tempUrl}
                onChange={(e) => setTempUrl(e.target.value)}
                required
                className="contact-magenta-input"
                style={{ marginBottom: '16px', background: '#fff', color: '#000' }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowVideoInputModal(false)}
                  className="btn-line"
                  style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-solid"
                  style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                >
                  Save Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
