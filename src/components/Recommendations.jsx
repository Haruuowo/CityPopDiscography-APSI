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

      {/* Cards Grid or Empty State */}
      {recommendations.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 24px', background: 'var(--glass)', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <MessageSquareQuote style={{ width: '36px', height: '36px', color: 'var(--gold)', margin: '0 auto 12px' }} />
          <h3 style={{ fontFamily: 'Instrument Serif, Georgia, serif', color: '#fff', fontSize: '1.5rem', fontWeight: 400, marginBottom: '6px' }}>No listener recommendations yet</h3>
          <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '18px' }}>Be the first listener to share your favorite City Pop album recommendation!</p>
          <button onClick={onOpenAddRec} className="btn-solid">
            <PlusCircle style={{ width: '14px', height: '14px' }} />
            <span>Write First Recommendation</span>
          </button>
        </div>
      ) : (
        <div className="rec-grid">
          {recommendations.map((rec) => (
            <div key={rec.id} className="rec-card glass">
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src={rec.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"}
                    alt={rec.recommendedBy || 'Listener'}
                    style={{ width: '38px', height: '38px', borderRadius: '50%', border: '1px solid var(--bdgold)' }}
                  />
                  <div>
                    <h4 style={{ fontSize: '.88rem', fontWeight: 700, color: 'var(--white)' }}>
                      {rec.userName || rec.recommendedBy || 'Anonymous Listener'}
                    </h4>
                    <span style={{ fontSize: '.7rem', fontFamily: 'JetBrains Mono, monospace', color: 'var(--darker)' }}>
                      {rec.createdAt ? new Date(rec.createdAt).toLocaleDateString() : rec.date || 'Recent'}
                    </span>
                  </div>
                </div>

                <span className="vibe-tag">{rec.vibe || rec.vibeTag || "Classic"}</span>
              </div>

              <div style={{ padding: '8px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', fontSize: '.75rem', fontFamily: 'JetBrains Mono, monospace', color: 'var(--gold)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Music style={{ width: '13px', height: '13px' }} />
                <strong>{rec.albumTitle}</strong> {rec.artist ? `(${rec.artist})` : ''}
              </div>

              <p style={{ fontSize: '.88rem', color: 'var(--muted)', fontStyle: 'italic', lineHeight: '1.6', marginBottom: '16px' }}>
                "{rec.note || rec.comment}"
              </p>

              <div style={{ fontSize: '.72rem', fontFamily: 'JetBrains Mono, monospace', color: 'var(--darker)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MessageSquareQuote style={{ width: '13px', height: '13px', color: 'var(--gold)' }} /> Verified Listener Review
              </div>

            </div>
          ))}
        </div>
      )}

    </section>
  );
}
