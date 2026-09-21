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

      {/* top row: search, artist dropdown, sort, reset */}
      <div className="filter-grid">

        <div className="filter-search-wrap">
          <Search className="filter-search-icon" />
          <input
            type="text"
            placeholder="Search album, artist, or song title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="inp-glass filter-search-input"
          />
        </div>

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

        <div>
          <button
            onClick={onResetFilters}
            disabled={activeFilterCount === 0}
            title="Reset Filters"
            className="btn-line btn-line--reset"
          >
            <RotateCcw style={{ width: '14px', height: '14px' }} />
          </button>
        </div>

      </div>

      {/* vibe genre filter pills */}
      <div className="filter-vibe-row">
        <span className="filter-vibe-label">
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
