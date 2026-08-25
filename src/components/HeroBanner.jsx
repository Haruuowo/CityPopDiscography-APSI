import React from 'react';
import { Disc, Play, Sparkles, Trophy, Flame, Layers, Radio } from 'lucide-react';

export default function HeroBanner({ totalAlbums, onSelectFeatured, viewMode, setViewMode }) {
  return (
    <div className="glass-panel" style={{ 
      position: 'relative', 
      overflow: 'hidden', 
      padding: '36px 40px', 
      borderRadius: '24px', 
      marginBottom: '28px',
      background: 'linear-gradient(135deg, rgba(18, 22, 45, 0.85) 0%, rgba(10, 12, 25, 0.95) 100%)',
      border: '1px solid rgba(0, 242, 254, 0.2)'
    }}>
      
      {/* Background Neon Glowing Shapes */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        right: '-40px',
        width: '320px',
        height: '320px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,0,127,0.2) 0%, rgba(0,0,0,0) 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '-50px',
        left: '20%',
        width: '280px',
        height: '280px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,242,254,0.15) 0%, rgba(0,0,0,0) 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '28px' }}>
        
        {/* Left Column: Curator Title & Bio */}
        <div style={{ maxWidth: '680px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span style={{ 
              background: 'linear-gradient(135deg, rgba(255,0,127,0.2), rgba(121,40,202,0.3))', 
              border: '1px solid rgba(255,0,127,0.4)',
              color: '#ff77c2', 
              padding: '5px 14px', 
              borderRadius: '20px', 
              fontSize: '0.78rem', 
              fontWeight: 700, 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Flame size={14} color="#ff007f" />
              CURATOR PORTFOLIO & ARCHIVE
            </span>

            <span style={{ 
              background: 'rgba(0, 242, 254, 0.1)', 
              border: '1px solid rgba(0, 242, 254, 0.3)',
              color: 'var(--primary-cyan)', 
              padding: '5px 14px', 
              borderRadius: '20px', 
              fontSize: '0.78rem', 
              fontWeight: 700, 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Radio size={14} /> 1975–1989 GOLDEN ERA
            </span>
          </div>

          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, lineHeight: '1.25', color: '#fff', marginBottom: '14px' }}>
            Tokyo Soundscapes & <span className="gradient-text">City Pop Masterpieces</span>
          </h2>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '22px' }}>
            Explore an interactive portfolio catalog celebrating the funk, jazz-fusion, and synthesized romance of 1980s Japan. Listen to iconic tracks, filter by mood & vibe, and discover rare vinyl pressings.
          </p>

          {/* Featured Quick Action & View Switchers */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button 
              className="btn-primary" 
              onClick={onSelectFeatured} 
              style={{ padding: '12px 24px', fontSize: '0.95rem' }}
            >
              <Play size={18} fill="#fff" />
              Play Definitive Album: "For You"
            </button>

            {/* Layout View Toggles */}
            <div style={{ display: 'flex', background: 'rgba(10,12,22,0.8)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  background: viewMode === 'grid' ? 'var(--primary-purple)' : 'transparent',
                  color: viewMode === 'grid' ? '#fff' : 'var(--text-muted)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Disc size={15} /> Grid Gallery
              </button>

              <button
                onClick={() => setViewMode('list')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  background: viewMode === 'list' ? 'var(--primary-purple)' : 'transparent',
                  color: viewMode === 'list' ? '#fff' : 'var(--text-muted)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Layers size={15} /> Catalog List
              </button>
            </div>

          </div>

        </div>

        {/* Right Column: Portfolio Quick Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', minWidth: '280px' }}>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '16px 20px',
            borderRadius: '16px',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--primary-cyan)', fontFamily: 'var(--font-mono)' }}>
              {totalAlbums}
            </span>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginTop: '4px' }}>
              Masterpiece Albums
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '16px 20px',
            borderRadius: '16px',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--primary-pink)', fontFamily: 'var(--font-mono)' }}>
              85+
            </span>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginTop: '4px' }}>
              Curated Tracks
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '16px 20px',
            borderRadius: '16px',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)' }}>
              4.9★
            </span>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginTop: '4px' }}>
              Avg Rating
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '16px 20px',
            borderRadius: '16px',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#a78bfa', fontFamily: 'var(--font-mono)' }}>
              100%
            </span>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginTop: '4px' }}>
              Analogue Vibe
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
