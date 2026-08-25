import React, { useState, useMemo, useEffect } from 'react';
import { CITY_POP_ALBUMS, INITIAL_RECOMMENDATIONS } from './data/citypopData';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import FilterBar from './components/FilterBar';
import AlbumGrid from './components/AlbumGrid';
import AlbumDetailModal from './components/AlbumDetailModal';
import Recommendations from './components/Recommendations';
import AddRecModal from './components/AddRecModal';
import { Disc3 } from 'lucide-react';

export default function App() {
  // Theme state: dark, white, or sunset
  const [theme, setTheme] = useState('dark');

  // Sync theme class to body element
  useEffect(() => {
    document.body.className = theme === 'dark' ? '' : `theme-${theme}`;
  }, [theme]);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArtist, setSelectedArtist] = useState('All Artists');
  const [yearRange, setYearRange] = useState([1975, 1990]);
  const [selectedVibe, setSelectedVibe] = useState('All Vibes');
  const [sortBy, setSortBy] = useState('rating-desc');

  // Modal states
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [isAddRecOpen, setIsAddRecOpen] = useState(false);
  const [prefilledAlbumForRec, setPrefilledAlbumForRec] = useState(null);

  // Recommendations state with localStorage persistence
  const [recommendations, setRecommendations] = useState(() => {
    const saved = localStorage.getItem('citypop_recommendations');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved recommendations", e);
      }
    }
    return INITIAL_RECOMMENDATIONS;
  });

  useEffect(() => {
    localStorage.setItem('citypop_recommendations', JSON.stringify(recommendations));
  }, [recommendations]);

  // Unique artists list
  const artistsList = useMemo(() => {
    const list = Array.from(new Set(CITY_POP_ALBUMS.map(a => a.artist)));
    return list.sort();
  }, []);

  // Filtered and Sorted Albums
  const filteredAlbums = useMemo(() => {
    return CITY_POP_ALBUMS.filter(album => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = album.title.toLowerCase().includes(query);
        const matchesArtist = album.artist.toLowerCase().includes(query);
        const matchesTrack = album.tracks.some(t => t.title.toLowerCase().includes(query));
        if (!matchesTitle && !matchesArtist && !matchesTrack) return false;
      }

      if (selectedArtist !== 'All Artists' && album.artist !== selectedArtist) {
        return false;
      }

      if (album.year < yearRange[0] || album.year > yearRange[1]) {
        return false;
      }

      if (selectedVibe !== 'All Vibes' && !album.genre.includes(selectedVibe)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating-desc') return b.rating - a.rating;
      if (sortBy === 'year-desc') return b.year - a.year;
      if (sortBy === 'year-asc') return a.year - b.year;
      if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
      return 0;
    });
  }, [searchQuery, selectedArtist, yearRange, selectedVibe, sortBy]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count++;
    if (selectedArtist !== 'All Artists') count++;
    if (yearRange[0] !== 1975 || yearRange[1] !== 1990) count++;
    if (selectedVibe !== 'All Vibes') count++;
    return count;
  }, [searchQuery, selectedArtist, yearRange, selectedVibe]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedArtist('All Artists');
    setYearRange([1975, 1990]);
    setSelectedVibe('All Vibes');
    setSortBy('rating-desc');
  };

  const handleAddRecommendation = (newRec) => {
    setRecommendations(prev => [newRec, ...prev]);
  };

  const handleOpenRecommendThis = (album) => {
    setPrefilledAlbumForRec(album);
    setIsAddRecOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        {/* Sticky Header with Theme Switcher */}
        <Header
          totalAlbums={CITY_POP_ALBUMS.length}
          totalRecs={recommendations.length}
          onOpenAddRec={() => {
            setPrefilledAlbumForRec(null);
            setIsAddRecOpen(true);
          }}
          theme={theme}
          setTheme={setTheme}
        />

        {/* Hero Section */}
        <HeroBanner
          onOpenAddRec={() => {
            setPrefilledAlbumForRec(null);
            setIsAddRecOpen(true);
          }}
        />

        {/* Main Content */}
        <main className="container">
          
          {/* Floating Filter Card */}
          <FilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedArtist={selectedArtist}
            setSelectedArtist={setSelectedArtist}
            artistsList={artistsList}
            yearRange={yearRange}
            setYearRange={setYearRange}
            selectedVibe={selectedVibe}
            setSelectedVibe={setSelectedVibe}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onResetFilters={handleResetFilters}
            activeFilterCount={activeFilterCount}
          />

          {/* Results Summary */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '24px', marginBottom: '16px', fontSize: '.8rem', fontFamily: 'JetBrains Mono, monospace', color: 'var(--muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Disc3 style={{ width: '16px', height: '16px', color: 'var(--gold)' }} />
              Showing <strong style={{ color: 'var(--white)' }}>{filteredAlbums.length}</strong> of {CITY_POP_ALBUMS.length} Albums
            </span>
            {activeFilterCount > 0 && (
              <span className="vibe-tag">
                {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} applied
              </span>
            )}
          </div>

          {/* Album Grid */}
          <AlbumGrid
            albums={filteredAlbums}
            onSelectAlbum={setSelectedAlbum}
            onResetFilters={handleResetFilters}
          />

          {/* Community Recommendations */}
          <Recommendations
            recommendations={recommendations}
            onOpenAddRec={() => {
              setPrefilledAlbumForRec(null);
              setIsAddRecOpen(true);
            }}
          />

        </main>
      </div>

      {/* Modals */}
      <AlbumDetailModal
        album={selectedAlbum}
        onClose={() => setSelectedAlbum(null)}
        onRecommendThis={handleOpenRecommendThis}
      />

      <AddRecModal
        isOpen={isAddRecOpen}
        onClose={() => {
          setIsAddRecOpen(false);
          setPrefilledAlbumForRec(null);
        }}
        initialAlbum={prefilledAlbumForRec}
        onSubmitRecommendation={handleAddRecommendation}
      />

      {/* Footer */}
      <footer>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Disc3 style={{ width: '16px', height: '16px', color: 'var(--gold)' }} />
          <span style={{ fontFamily: 'Syne, sans-serif', color: 'var(--white)', fontWeight: 700 }}>CITY POP VAULT</span>
          <span style={{ color: 'var(--darker)' }}>| Tokyo 1975–1990 Discography</span>
        </div>

        <span>
          Designed in John Harold Doton Portfolio Style
        </span>
      </footer>

    </div>
  );
}
