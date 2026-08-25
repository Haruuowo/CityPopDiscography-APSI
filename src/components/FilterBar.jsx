import React from 'react';
import { Search, RotateCcw, Calendar, Sparkles } from 'lucide-react';
import { ALL_VIBE_TAGS } from '../data/citypopData';

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedArtist,
  setSelectedArtist,
  artistsList,
  yearRange,
  setYearRange,
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

      {/* Year Range Slider Row */}
      <div className="filter-sub-row" style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px', justifyContent: 'space-between' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '.75rem', fontFamily: 'JetBrains Mono, monospace', color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, letterSpacing: '.06em' }}>
            <Calendar style={{ width: '14px', height: '14px' }} />
            ERA: {yearRange[0]} – {yearRange[1]}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '.7rem', color: 'var(--faint)', fontFamily: 'JetBrains Mono, monospace' }}>1975</span>
            <input
              type="range"
              min="1975"
              max="1990"
              value={yearRange[0]}
              onChange={(e) => setYearRange([parseInt(e.target.value), Math.max(parseInt(e.target.value), yearRange[1])])}
              style={{ accentColor: 'var(--gold)', width: '90px', cursor: 'pointer' }}
            />
            <span style={{ fontSize: '.7rem', color: 'var(--muted)' }}>to</span>
            <input
              type="range"
              min="1975"
              max="1990"
              value={yearRange[1]}
              onChange={(e) => setYearRange([Math.min(parseInt(e.target.value), yearRange[0]), parseInt(e.target.value)])}
              style={{ accentColor: 'var(--gold)', width: '90px', cursor: 'pointer' }}
            />
            <span style={{ fontSize: '.7rem', color: 'var(--faint)', fontFamily: 'JetBrains Mono, monospace' }}>1990</span>
          </div>
        </div>

        {/* Vibe Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
          <span style={{ fontSize: '.72rem', color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: '4px', marginRight: '4px', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 500 }}>
            <Sparkles style={{ width: '12px', height: '12px', color: 'var(--gold)' }} />
            Vibe:
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

    </div>
  );
}
