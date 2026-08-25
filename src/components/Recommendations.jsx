import React from 'react';
import { Sparkles, PlusCircle, MessageSquareQuote, Calendar, Music } from 'lucide-react';

export default function Recommendations({ recommendations, onOpenAddRec }) {
  return (
    <section style={{ padding: '60px 0', borderTop: '1px solid var(--border)' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '32px' }}>
        <div>
          <div className="hero-tag" style={{ marginBottom: '6px' }}>
            COMMUNITY PICKS
          </div>
          <h2 className="sec-title">
            Listener Recommendations
          </h2>
        </div>

        <button onClick={onOpenAddRec} className="btn-solid">
          <PlusCircle style={{ width: '14px', height: '14px' }} />
          <span>Write Recommendation</span>
        </button>
      </div>

      {/* Cards Grid */}
      <div className="rec-grid">
        {recommendations.map((rec) => (
          <div key={rec.id} className="rec-card glass">
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src={rec.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"}
                  alt={rec.recommendedBy}
                  style={{ width: '38px', height: '38px', borderRadius: '50%', border: '1px solid var(--bdgold)' }}
                />
                <div>
                  <h4 style={{ fontSize: '.88rem', fontWeight: 700, color: 'var(--white)' }}>
                    {rec.recommendedBy}
                  </h4>
                  <span style={{ fontSize: '.7rem', fontFamily: 'JetBrains Mono, monospace', color: 'var(--darker)' }}>
                    {rec.date}
                  </span>
                </div>
              </div>

              <span className="vibe-tag">{rec.vibeTag || "Classic"}</span>
            </div>

            <div style={{ padding: '8px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', fontSize: '.75rem', fontFamily: 'JetBrains Mono, monospace', color: 'var(--gold)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Music style={{ width: '13px', height: '13px' }} />
              <strong>{rec.albumTitle}</strong> ({rec.artist}, {rec.year})
            </div>

            <p style={{ fontSize: '.88rem', color: 'var(--muted)', fontStyle: 'italic', lineHeight: '1.6', marginBottom: '16px' }}>
              "{rec.comment}"
            </p>

            <div style={{ fontSize: '.72rem', fontFamily: 'JetBrains Mono, monospace', color: 'var(--darker)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MessageSquareQuote style={{ width: '13px', height: '13px', color: 'var(--gold)' }} /> Verified Listener Review
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
