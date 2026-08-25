import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import FilterBar from './components/FilterBar';
import AlbumGrid from './components/AlbumGrid';
import AlbumDetailModal from './components/AlbumDetailModal';
import RecommendationSection from './components/RecommendationSection';
import SubmitRecommendationModal from './components/SubmitRecommendationModal';
import AudioPlayerBar from './components/AudioPlayerBar';

import { INITIAL_ALBUMS } from './data/initialAlbums';
import { getStoredRecommendations, saveRecommendation } from './utils/storage';

export default function App() {
  const [albums, setAlbums] = useState(INITIAL_ALBUMS);
  const [recommendations, setRecommendations] = useState([]);
  const [activeTab, setActiveTab] = useState('discography'); // 'discography' | 'recommendations'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArtist, setSelectedArtist] = useState('ALL');
  const [selectedVibe, setSelectedVibe] = useState('ALL');
  const [yearRange, setYearRange] = useState([1975, 1989]);
  const [sortBy, setSortBy] = useState('year-desc');

  // Modal States
  const [selectedAlbumModal, setSelectedAlbumModal] = useState(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Audio Player State
  const [activeAlbum, setActiveAlbum] = useState(INITIAL_ALBUMS[0]);
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  // Load recommendations on mount
  useEffect(() => {
    const loaded = getStoredRecommendations();
    setRecommendations(loaded);
  }, []);

  // Play a specific album track
  const handlePlayAlbumTrack = (album, trackIndex = 0) => {
    setActiveAlbum(album);
    setActiveTrackIndex(trackIndex);
    setIsPlaying(true);
    setShowPlayer(true);
  };

  // Player handlers
  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = () => {
    if (!activeAlbum || !activeAlbum.tracks) return;
    const nextIdx = (activeTrackIndex + 1) % activeAlbum.tracks.length;
    setActiveTrackIndex(nextIdx);
    setIsPlaying(true);
  };

  const handlePrevTrack = () => {
    if (!activeAlbum || !activeAlbum.tracks) return;
    const prevIdx = (activeTrackIndex - 1 + activeAlbum.tracks.length) % activeAlbum.tracks.length;
    setActiveTrackIndex(prevIdx);
    setIsPlaying(true);
  };

  // Derive unique artist list & unique vibes list for filters
  const artistsList = Array.from(new Set(INITIAL_ALBUMS.map(a => a.artist))).sort();
  const vibesList = Array.from(new Set(INITIAL_ALBUMS.flatMap(a => a.vibes))).sort();

  // Reset filters handler
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedArtist('ALL');
    setSelectedVibe('ALL');
    setYearRange([1975, 1989]);
    setSortBy('year-desc');
  };

  // Filter & Sort logic for Albums
  const filteredAlbums = albums.filter(album => {
    const matchesSearch = 
      searchQuery === '' ||
      album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      album.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      album.titleJapanese.includes(searchQuery) ||
      album.artistJapanese.includes(searchQuery) ||
      album.tracks.some(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesArtist = selectedArtist === 'ALL' || album.artist === selectedArtist;
    const matchesVibe = selectedVibe === 'ALL' || album.vibes.includes(selectedVibe);
    const matchesYear = album.year >= yearRange[0] && album.year <= yearRange[1];

    return matchesSearch && matchesArtist && matchesVibe && matchesYear;
  }).sort((a, b) => {
    if (sortBy === 'year-desc') return b.year - a.year;
    if (sortBy === 'year-asc') return a.year - b.year;
    if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
    if (sortBy === 'rating-desc') return b.rating - a.rating;
    return 0;
  });

  // Handle Submit Recommendation
  const handleAddRecommendation = (newRec) => {
    const updated = saveRecommendation(newRec);
    setRecommendations(updated);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingBottom: showPlayer ? '90px' : '0' }}>
      
      {/* Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        albumCount={albums.length}
        recommendationCount={recommendations.length}
      />

      {/* Main Container */}
      <main style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '0 20px', flexGrow: 1 }}>
        
        {/* Portfolio Hero Banner */}
        <HeroBanner 
          totalAlbums={albums.length}
          onSelectFeatured={() => handlePlayAlbumTrack(INITIAL_ALBUMS[0], 0)}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {activeTab === 'discography' ? (
          <>
            {/* Filter Bar */}
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
              vibesList={vibesList}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onResetFilters={handleResetFilters}
            />

            {/* Results count banner */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
                City Pop Catalog <span style={{ fontSize: '0.9rem', color: 'var(--primary-cyan)', fontWeight: 600 }}>({filteredAlbums.length} albums)</span>
              </h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Click any album card for full case study & tracklist
              </span>
            </div>

            {/* Album Grid / List */}
            <AlbumGrid
              albums={filteredAlbums}
              viewMode={viewMode}
              onSelectAlbum={(album) => setSelectedAlbumModal(album)}
              onPlayAlbum={(album) => handlePlayAlbumTrack(album, 0)}
              onResetFilters={handleResetFilters}
            />
          </>
        ) : (
          /* Community Recommendations Section */
          <RecommendationSection
            recommendations={recommendations}
            onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
          />
        )}

      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-color)',
        padding: '24px 20px',
        textAlign: 'center',
        background: 'rgba(10, 12, 22, 0.9)',
        marginTop: 'auto'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <div>
            <span style={{ fontWeight: 700, color: '#fff' }}>CITY POP ARCHIVE</span> — 1970s–1980s Japanese Golden Era Discography
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Built with React + Vite</span>
            <span>•</span>
            <span className="japanese-sub" style={{ color: 'var(--primary-pink)' }}>シティーポップ・ディスコグラフィー</span>
          </div>
        </div>
      </footer>

      {/* Album Detail Modal */}
      <AlbumDetailModal
        album={selectedAlbumModal}
        onClose={() => setSelectedAlbumModal(null)}
        onPlayTrack={(trackIndex) => {
          handlePlayAlbumTrack(selectedAlbumModal, trackIndex);
          setSelectedAlbumModal(null);
        }}
      />

      {/* Submit Recommendation Modal */}
      <SubmitRecommendationModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmit={handleAddRecommendation}
      />

      {/* Audio Player Bar */}
      {showPlayer && activeAlbum && activeAlbum.tracks[activeTrackIndex] && (
        <AudioPlayerBar
          album={activeAlbum}
          currentTrack={activeAlbum.tracks[activeTrackIndex]}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          onNextTrack={handleNextTrack}
          onPrevTrack={handlePrevTrack}
          onClose={() => setShowPlayer(false)}
        />
      )}

    </div>
  );
}
