import React, { useState } from 'react';
import { Sparkles, MessageSquare, PlusCircle, Search, Calendar, User, Tag, Music, Heart } from 'lucide-react';

export default function RecommendationSection({ recommendations, onOpenSubmitModal }) {
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('ALL');

  // Filter recommendations based on search input & tag selection
  const filteredRecs = recommendations.filter(rec => {
    const matchesQuery = 
      rec.albumTitle.toLowerCase().includes(filterQuery.toLowerCase()) ||
      rec.artist.toLowerCase().includes(filterQuery.toLowerCase()) ||
      rec.reason.toLowerCase().includes(filterQuery.toLowerCase()) ||
      rec.submittedBy.toLowerCase().includes(filterQuery.toLowerCase());

    const matchesTag = selectedTag === 'ALL' || (rec.tags && rec.tags.includes(selectedTag));

    return matchesQuery && matchesTag;
  });

  // Extract all unique tags
  const allTags = Array.from(new Set(recommendations.flatMap(r => r.tags || [])));

  return (
    <div style={{ marginBottom: '60px' }}>
      
      {/* Section Header */}
      <div className="glass-panel" style={{ padding: '28px', marginBottom: '28px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <Sparkles size={24} color="var(--primary-pink)" />
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Community Recommendations</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Crowdsourced City Pop album discoveries, reviews, and hidden gems submitted by enthusiasts.
          </p>
        </div>

        <button className="btn-primary" onClick={onOpenSubmitModal}>
          <PlusCircle size={18} /> Submit Recommendation
        </button>
      </div>

      {/* Filter bar for Recommendations */}
      <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Search Input */}
        <div style={{ position: 'relative', minWidth: '280px', flexGrow: 1 }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '40px' }}
            placeholder="Search community recommendations..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
          />
        </div>

        {/* Tag Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          <button
            className={`vibe-badge ${selectedTag === 'ALL' ? 'active' : ''}`}
            onClick={() => setSelectedTag('ALL')}
            style={{ cursor: 'pointer' }}
          >
            All Tags
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              className={`vibe-badge ${selectedTag === tag ? 'active' : ''}`}
              onClick={() => setSelectedTag(tag)}
              style={{ cursor: 'pointer' }}
            >
              {tag}
            </button>
          ))}
        </div>

      </div>

      {/* Recommendations Feed Grid */}
      {filteredRecs.length === 0 ? (
        <div className="glass-panel" style={{ padding: '48px', textAlign: 'center' }}>
          <MessageSquare size={36} color="var(--primary-cyan)" style={{ marginBottom: '12px' }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>No Recommendations Match</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Be the first to recommend a City Pop album under this category!</p>
          <button className="btn-primary" onClick={onOpenSubmitModal}>
            Submit a Recommendation
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
          {filteredRecs.map((rec) => (
            <div 
              key={rec.id} 
              className="glass-panel glass-panel-interactive"
              style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}
            >
              
              {/* Rec Album Title & Submitter */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--primary-cyan)', 
                      fontWeight: 700,
                      background: 'rgba(0, 242, 254, 0.1)',
                      padding: '2px 8px',
                      borderRadius: '12px'
                    }}>
                      RELEASED IN {rec.year}
                    </span>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginTop: '6px', lineHeight: '1.2' }}>
                      {rec.albumTitle}
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--primary-pink)', fontWeight: 600 }}>
                      by {rec.artist}
                    </p>
                  </div>
                </div>

                {/* Recommendation Reason */}
                <p style={{ 
                  fontSize: '0.92rem', 
                  color: '#cbd5e1', 
                  lineHeight: '1.6', 
                  background: 'rgba(10, 12, 22, 0.6)', 
                  padding: '14px', 
                  borderRadius: '10px',
                  borderLeft: '3px solid var(--primary-pink)',
                  marginTop: '8px'
                }}>
                  "{rec.reason}"
                </p>
              </div>

              {/* Footer: Tags & Submitter Info */}
              <div>
                {rec.tags && rec.tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                    {rec.tags.map((t, idx) => (
                      <span key={idx} className="vibe-badge" style={{ fontSize: '0.7rem' }}>
                        #{t}
                      </span>
                    ))}
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <User size={13} color="var(--primary-cyan)" /> Recommended by <strong style={{ color: '#fff' }}>{rec.submittedBy}</strong>
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>
                    {rec.createdAt}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
