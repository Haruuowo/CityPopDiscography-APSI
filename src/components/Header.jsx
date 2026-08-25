import React from 'react';
import { Disc, Music, Sparkles, PlusCircle } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onOpenSubmitModal, albumCount, recommendationCount }) {
  return (
    <header className="glass-panel" style={{ borderRadius: '0 0 20px 20px', padding: '20px 32px', marginBottom: '32px', borderTop: 'none' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
        
        {/* Logo & Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ 
            width: '52px', 
            height: '52px', 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, #ff007f, #00f2fe)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(0, 242, 254, 0.4)'
          }}>
            <Disc size={30} color="#ffffff" className="animate-spin-slow" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>
                <span className="gradient-text">CITY POP</span> ARCHIVE
              </h1>
              <span className="japanese-sub" style={{ fontSize: '0.85rem', color: 'var(--primary-cyan)', letterSpacing: '2px' }}>
                シティーポップ
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              1970s–1980s Japanese City Pop Discography & Community Recommender
            </p>
          </div>
        </div>

        {/* Navigation & Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          
          {/* Tab Switcher */}
          <div style={{ 
            display: 'flex', 
            background: 'rgba(10, 12, 22, 0.8)', 
            padding: '4px', 
            borderRadius: '12px', 
            border: '1px solid var(--border-color)' 
          }}>
            <button
              onClick={() => setActiveTab('discography')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'discography' ? 'linear-gradient(135deg, var(--primary-pink), var(--primary-purple))' : 'transparent',
                color: activeTab === 'discography' ? '#fff' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              <Music size={16} />
              Albums ({albumCount})
            </button>

            <button
              onClick={() => setActiveTab('recommendations')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'recommendations' ? 'linear-gradient(135deg, var(--primary-pink), var(--primary-purple))' : 'transparent',
                color: activeTab === 'recommendations' ? '#fff' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              <Sparkles size={16} />
              Recommendations ({recommendationCount})
            </button>
          </div>

          {/* Submit Recommendation Trigger */}
          <button className="btn-primary" onClick={onOpenSubmitModal}>
            <PlusCircle size={18} />
            Submit Album
          </button>
        </div>

      </div>
    </header>
  );
}
