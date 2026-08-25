import React from 'react';
import { ArrowDown, PlusCircle } from 'lucide-react';

export default function HeroBanner({ onOpenAddRec }) {
  const handleScrollToGrid = () => {
    document.getElementById('discography-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero">
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '750px' }}>
        
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
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '32px', alignItems: 'center' }}>
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
