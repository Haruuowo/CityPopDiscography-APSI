import React from 'react';
import { Search, Filter, Calendar, User, SlidersHorizontal, RotateCcw } from 'lucide-react';

export default function FilterBar({ 
  searchQuery, setSearchQuery, 
  selectedArtist, setSelectedArtist, 
  artistsList,
  yearRange, setYearRange,
  selectedVibe, setSelectedVibe,
  vibesList,
  sortBy, setSortBy,
  onResetFilters
}) {
  const isFiltered = searchQuery !== '' || selectedArtist !== 'ALL' || selectedVibe !== 'ALL' || yearRange[0] !== 1975 || yearRange[1] !== 1989;

  return (
    <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px' }}>
      
      {/* Top Row: Search + Sort + Reset */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '20px' }}>
        
        {/* Search Field */}
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '42px' }}
            placeholder="Search album title, artist, or song..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Artist Filter Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <User size={18} style={{ color: 'var(--primary-cyan)' }} />
          <select 
            className="form-select"
            value={selectedArtist}
            onChange={(e) => setSelectedArtist(e.target.value)}
          >
            <option value="ALL">All Artists ({artistsList.length})</option>
            {artistsList.map(artist => (
              <option key={artist} value={artist}>{artist}</option>
            ))}
          </select>
        </div>

        {/* Sort Select */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SlidersHorizontal size={18} style={{ color: 'var(--primary-pink)' }} />
          <select 
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="year-desc">Sort by Year (Newest First)</option>
            <option value="year-asc">Sort by Year (Oldest First)</option>
            <option value="title-asc">Sort by Album Title (A-Z)</option>
            <option value="rating-desc">Sort by Rating (Highest)</option>
          </select>
        </div>

      </div>

      {/* Second Row: Year Range + Vibe Badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
        
        {/* Year Slider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
            <Calendar size={16} style={{ color: 'var(--accent-gold)' }} />
            <span>Release Era:</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--primary-cyan)', fontWeight: 700 }}>
              {yearRange[0]}
            </span>
            <input
              type="range"
              min="1975"
              max="1989"
              value={yearRange[0]}
              onChange={(e) => setYearRange([parseInt(e.target.value), Math.max(parseInt(e.target.value), yearRange[1])])}
              style={{ width: '90px', accentColor: 'var(--primary-cyan)', cursor: 'pointer' }}
            />
            <span style={{ color: 'var(--text-muted)' }}>–</span>
            <input
              type="range"
              min="1975"
              max="1989"
              value={yearRange[1]}
              onChange={(e) => setYearRange([Math.min(parseInt(e.target.value), yearRange[0]), parseInt(e.target.value)])}
              style={{ width: '90px', accentColor: 'var(--primary-pink)', cursor: 'pointer' }}
            />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--primary-pink)', fontWeight: 700 }}>
              {yearRange[1]}
            </span>
          </div>
        </div>

        {/* Vibe Tag Filter Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            className={`vibe-badge ${selectedVibe === 'ALL' ? 'active' : ''}`}
            onClick={() => setSelectedVibe('ALL')}
            style={{ cursor: 'pointer' }}
          >
            All Vibes
          </button>
          {vibesList.map(vibe => (
            <button
              key={vibe}
              className={`vibe-badge ${selectedVibe === vibe ? 'active' : ''}`}
              onClick={() => setSelectedVibe(vibe)}
              style={{ cursor: 'pointer' }}
            >
              {vibe}
            </button>
          ))}

          {/* Reset Filters button if any filter is applied */}
          {isFiltered && (
            <button
              onClick={onResetFilters}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: 'none',
                border: 'none',
                color: '#ff4d4d',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                marginLeft: '8px',
                textDecoration: 'underline'
              }}
            >
              <RotateCcw size={14} /> Reset
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
