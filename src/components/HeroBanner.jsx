import React, { useState } from 'react';
import { ArrowDown, PlusCircle, Send, CheckCircle2 } from 'lucide-react';

export default function HeroBanner({ onOpenAddRec }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

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
      }, 4000);
    }
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/81/ad/b2/81adb240-233e-705a-7397-1e8187c97561/artwork.jpg/600x600bb.jpg';
  };

  return (
    <>
      {/* 1. TOP HERO TITLE BANNER (WITH OLD WALLPAPER BACKGROUND & FULL SCREEN FIT) */}
      <section id="hero">
        <div className="hero-content-wrapper">
          <div className="hero-title-box">
            <div className="hero-tag">
              ★ JAPANESE CITY POP DISCOGRAPHY · 1975 – 1990
            </div>
            <h1>INTRODUCTION TO <span className="gold-accent">CITYPOP</span></h1>
            <p className="hero-sub">
              Immerse yourself in nostalgic Tokyo night drives, coastal synth funk, and golden sunset grooves. Filter by artist, era, or mood, and share your favorite album recommendations.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '24px', alignItems: 'center' }}>
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
        </div>
      </section>

      {/* 2. FULL-WIDTH CONTACT BANNER SECTION */}
      <section id="contact-section" className="contact-full-banner">
        <div className="contact-banner-container">
          
          {/* Left Side: Mariya Takeuchi Vinyl Cover Frame */}
          <div className="contact-featured-img-frame">
            <img 
              src="https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/4a/6c/fb/4a6cfb1c-92a2-8e10-9189-63a12a52efc1/4582290457635.jpg/600x600bb.jpg" 
              alt="Mariya Takeuchi - Sweetest Music Vinyl Cover" 
              onError={handleImageError}
            />
          </div>

          {/* Right Side: Form Controls */}
          <div className="contact-form-side">
            <h2 className="contact-yellow-title">CONTACT US HERE</h2>
            <p className="contact-white-subtext">A song for no one is a song for everyone</p>

            <form onSubmit={handleSubscribe} className="contact-stacked-form">
              <input
                type="email"
                placeholder="CityRecords@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="contact-magenta-input"
              />
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
            </form>

            <div className="contact-action-links">
              <button onClick={handleScrollToGrid} className="btn-line">
                <span>EXPLORE DISCOGRAPHY</span>
                <ArrowDown style={{ width: '14px', height: '14px' }} />
              </button>
              <button onClick={onOpenAddRec} className="btn-solid">
                <PlusCircle style={{ width: '14px', height: '14px' }} />
                <span>SUBMIT RECOMMENDATION</span>
              </button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
