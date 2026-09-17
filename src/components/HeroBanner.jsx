import React from 'react';
import { ArrowDown, PlusCircle } from 'lucide-react';

export default function HeroBanner({ onOpenAddRec }) {
  const handleScrollToGrid = () => {
    document.getElementById('discography-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // YouTube video ID — Tokyo night drive aesthetic
  const videoId = 'bMHJMsNvDnM';

  return (
    <section id="hero">
      {/* YouTube Video Background */}
      <div className="hero-video-bg">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&iv_load_policy=3&disablekb=1`}
          title="Background video"
          allow="autoplay; fullscreen"
          allowFullScreen
          frameBorder="0"
        />
      </div>

      {/* Dark overlay for text readability */}
      <div className="hero-video-overlay" />

      {/* Hero content */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '620px' }}>
        
        <div className="hero-tag">
          ★ JAPANESE CITY POP DISCOGRAPHY · 1975 – 1990
        </div>

        <h1>
          Explore Legendary <span className="gold-accent">City Pop</span> Vinyl & Grooves
        </h1>

        <p className="hero-sub">
          Immerse yourself in nostalgic Tokyo night drives, coastal synth funk, and golden sunset grooves. Filter by artist, era, or mood, and share your favorite album recommendations with the community.
        </p>

        {/* Hero Call to Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '28px', alignItems: 'center' }}>
          <button onClick={handleScrollToGrid} className="btn-solid">
            <span>Explore Discography</span>
            <ArrowDown style={{ width: '14px', height: '14px' }} />
          </button>

          <button onClick={onOpenAddRec} className="btn-line">
            <PlusCircle style={{ width: '14px', height: '14px' }} />
            <span>Recommend Album</span>
          </button>
        </div>

      </div>
    </section>
  );
}
