import React from 'react';
import { Search, RotateCcw, Sparkles } from 'lucide-react';
import { ALL_VIBE_TAGS } from '../data/citypopData';

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedArtist,
  setSelectedArtist,
  artistsList,
  selectedVibe,
  setSelectedVibe,
  sortBy,
  setSortBy,
  onResetFilters,
  activeFilterCount
}) {
  return (
    <div id="discography-section" className="glass filter-card">
      
      {/* Search, Artist, Sort & Reset Row */}
      <div className="filter-grid">
        
        {/* Search with Search Icon */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search style={{ position: 'absolute', left: '14px', width: '16px', height: '16px', color: 'var(--muted)', pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Search album, artist, or song title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="inp-glass"
            style={{ paddingLeft: '40px' }}
          />
        </div>

        {/* Artist Select */}
        <div>
          <select
            value={selectedArtist}
            onChange={(e) => setSelectedArtist(e.target.value)}
            className="sel-glass"
          >
            <option value="All Artists">All Artists ({artistsList.length})</option>
            {artistsList.map((artist) => (
              <option key={artist} value={artist}>
                {artist}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Select */}
        <div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sel-glass"
          >
            <option value="rating-desc">Top Rated</option>
            <option value="year-desc">Newest First</option>
            <option value="year-asc">Oldest First</option>
            <option value="title-asc">Title (A-Z)</option>
          </select>
        </div>

        {/* Reset Button */}
        <div>
          <button
            onClick={onResetFilters}
            disabled={activeFilterCount === 0}
            title="Reset Filters"
            className="btn-line"
            style={{ padding: '12px', width: '100%', justifyContent: 'center', opacity: activeFilterCount > 0 ? 1 : 0.4 }}
          >
            <RotateCcw style={{ width: '14px', height: '14px' }} />
          </button>
        </div>

      </div>

      {/* Vibe Filter Pills Row */}
      <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--border)', display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
        <span style={{ fontSize: '.75rem', color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: '6px', marginRight: '6px', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>
          <Sparkles style={{ width: '13px', height: '13px', color: 'var(--gold)' }} />
          VIBE FILTER:
        </span>
        {ALL_VIBE_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedVibe(tag)}
            className={`vibe-pill ${selectedVibe === tag ? 'active' : ''}`}
          >
            {tag}
          </button>
        ))}
      </div>

    </div>
  );
}
