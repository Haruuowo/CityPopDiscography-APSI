import React, { useState, useMemo, useEffect } from 'react';
import { CITY_POP_ALBUMS, INITIAL_RECOMMENDATIONS } from './data/citypopData';
import { fetchAlbums, fetchRecommendations, postRecommendation, isSupabaseConfigured } from './lib/supabaseClient';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import FilterBar from './components/FilterBar';
import AlbumGrid from './components/AlbumGrid';
import AlbumDetailModal from './components/AlbumDetailModal';
import Recommendations from './components/Recommendations';
import AddRecModal from './components/AddRecModal';
import AudioPlayerBar from './components/AudioPlayerBar';
import { Disc3, Database } from 'lucide-react';
import { getTrackAudioPreview } from './utils/audioResolver';

export default function App() {
  // Theme state: dark, white, or sunset
  const [theme, setTheme] = useState('dark');

  // Sync theme class to body element
  useEffect(() => {
    document.body.className = theme === 'dark' ? '' : `theme-${theme}`;
  }, [theme]);

  // Albums state (dynamic from Supabase or fallback to citypopData.js)
  const [albums, setAlbums] = useState(CITY_POP_ALBUMS);
  const [dataSource, setDataSource] = useState('local');

  // Audio player state
  const [activeTrack, setActiveTrack] = useState(null);
  const [activeAudioAlbum, setActiveAudioAlbum] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  // Recommendations state
  const [recommendations, setRecommendations] = useState(() => {
    const saved = localStorage.getItem('citypop_recommendations');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_RECOMMENDATIONS;
  });

  // Load Supabase Data on mount
  useEffect(() => {
    async function loadData() {
      const albRes = await fetchAlbums();
      setAlbums(albRes.data);
      setDataSource(albRes.source);

      const recRes = await fetchRecommendations();
      if (recRes.data && recRes.data.length > 0) {
        setRecommendations(recRes.data);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    localStorage.setItem('citypop_recommendations', JSON.stringify(recommendations));
  }, [recommendations]);

  // Unique artists list
  const artistsList = useMemo(() => {
    const list = Array.from(new Set(albums.map(a => a.artist)));
    return list.sort();
  }, [albums]);

  // Filtered and Sorted Albums
  const filteredAlbums = useMemo(() => {
    return albums.filter(album => {
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
  }, [albums, searchQuery, selectedArtist, yearRange, selectedVibe, sortBy]);

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

  const handleAddRecommendation = async (newRec) => {
    setRecommendations(prev => [newRec, ...prev]);
    await postRecommendation(newRec);
  };

  const handleOpenRecommendThis = (album) => {
    setPrefilledAlbumForRec(album);
    setIsAddRecOpen(true);
  };

  // Track Play handler with automatic iTunes & Spotify audio resolution
  const handlePlayTrack = async (track, album) => {
    if (activeTrack?.title === track.title && activeAudioAlbum?.id === album.id) {
      setIsPlaying(!isPlaying);
    } else {
      // Set initial playing state
      setActiveTrack({ ...track, albumId: album.id });
      setActiveAudioAlbum(album);
      setIsPlaying(true);

      // Dynamically fetch 30s MP3 preview and Spotify link via free public API
      const resolved = await getTrackAudioPreview(track.title, album.artist);
      if (resolved && resolved.previewUrl) {
        setActiveTrack(prev => {
          if (prev?.title === track.title) {
            return {
              ...prev,
              previewUrl: resolved.previewUrl,
              spotifySearchUrl: resolved.spotifySearchUrl
            };
          }
          return prev;
        });
      }
    }
  };

  const handleNextTrack = () => {
    if (!activeAudioAlbum || !activeTrack) return;
    const tracks = activeAudioAlbum.tracks;
    const currentIndex = tracks.findIndex(t => t.title === activeTrack.title);
    if (currentIndex >= 0 && currentIndex < tracks.length - 1) {
      const nextT = tracks[currentIndex + 1];
      setActiveTrack({ ...nextT, albumId: activeAudioAlbum.id });
      setIsPlaying(true);
    }
  };

  const handlePrevTrack = () => {
    if (!activeAudioAlbum || !activeTrack) return;
    const tracks = activeAudioAlbum.tracks;
    const currentIndex = tracks.findIndex(t => t.title === activeTrack.title);
    if (currentIndex > 0) {
      const prevT = tracks[currentIndex - 1];
      setActiveTrack({ ...prevT, albumId: activeAudioAlbum.id });
      setIsPlaying(true);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: activeTrack ? '90px' : '0' }}>
      <div>
        {/* Sticky Header with Theme Switcher */}
        <Header
          totalAlbums={albums.length}
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

          {/* Results & Supabase Data Source Summary */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '24px', marginBottom: '16px', fontSize: '.8rem', fontFamily: 'JetBrains Mono, monospace', color: 'var(--muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Disc3 style={{ width: '16px', height: '16px', color: 'var(--gold)' }} />
              Showing <strong style={{ color: 'var(--white)' }}>{filteredAlbums.length}</strong> of {albums.length} Albums
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="vibe-tag" style={{ fontSize: '.7rem', display: 'flex', alignItems: 'center', gap: '4px', background: dataSource === 'supabase' ? 'rgba(74, 222, 128, 0.15)' : 'rgba(232, 217, 184, 0.1)' }}>
                <Database style={{ width: '12px', height: '12px', color: dataSource === 'supabase' ? '#4ade80' : 'var(--gold)' }} />
                {dataSource === 'supabase' ? 'Supabase DB Live' : 'Local Fallback'}
              </span>

              {activeFilterCount > 0 && (
                <span className="vibe-tag">
                  {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} applied
                </span>
              )}
            </div>
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
        onPlayTrack={handlePlayTrack}
        activeTrack={activeTrack}
        isPlaying={isPlaying}
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

      {/* Floating Audio Player Bar */}
      <AudioPlayerBar
        currentTrack={activeTrack}
        album={activeAudioAlbum}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onNextTrack={handleNextTrack}
        onPrevTrack={handlePrevTrack}
        onClose={() => {
          setActiveTrack(null);
          setIsPlaying(false);
        }}
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
