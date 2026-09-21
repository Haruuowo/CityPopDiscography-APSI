import React, { useState, useMemo, useEffect } from 'react';
import { CITY_POP_ALBUMS, INITIAL_RECOMMENDATIONS } from './data/citypopData';
import { fetchAlbums, fetchRecommendations, postRecommendation, isSupabaseConfigured } from './lib/supabaseClient';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import FilterBar from './components/FilterBar';
import AlbumGrid from './components/AlbumGrid';
import AlbumCard from './components/AlbumCard';
import AlbumDetailModal from './components/AlbumDetailModal';
import Recommendations from './components/Recommendations';
import AddRecModal from './components/AddRecModal';
import AudioPlayerBar from './components/AudioPlayerBar';
import { Disc3, Database, Sparkles } from 'lucide-react';
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

  // Featured 4 Recommendations for "This week's Recommendation!" section
  const featuredWeeklyAlbums = useMemo(() => {
    return albums.slice(0, 4);
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
  }, [albums, searchQuery, selectedArtist, selectedVibe, sortBy]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count++;
    if (selectedArtist !== 'All Artists') count++;
    if (selectedVibe !== 'All Vibes') count++;
    return count;
  }, [searchQuery, selectedArtist, selectedVibe]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedArtist('All Artists');
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
      setActiveTrack({ ...track, albumId: album.id });
      setActiveAudioAlbum(album);
      setIsPlaying(true);

      const resolved = await getTrackAudioPreview(track.title, album.artist, album.title, track.number);
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
        {/* Sticky Header */}
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

        {/* Hero Banner with Contact Box */}
        <HeroBanner
          onOpenAddRec={() => {
            setPrefilledAlbumForRec(null);
            setIsAddRecOpen(true);
          }}
        />

        {/* Main Page Container */}
        <main className="container page-content-container">
          
          {/* SECTION 1: This week's Recommendation! */}
          <section className="discography-section-block">
            <div className="section-ribbon">
              This week's Recommendation!
            </div>

            <div className="album-grid-4col">
              {featuredWeeklyAlbums.map((album) => (
                <AlbumCard
                  key={`weekly-${album.id}`}
                  album={album}
                  onSelectAlbum={setSelectedAlbum}
                />
              ))}
            </div>
          </section>

          {/* SECTION 2: All time Favorites & Full Discography */}
          <section id="discography-section" className="discography-section-block">
            <div className="section-ribbon">
              All time Favorites
            </div>

            {/* Filter Bar Controls */}
            <FilterBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedArtist={selectedArtist}
              setSelectedArtist={setSelectedArtist}
              artistsList={artistsList}
              selectedVibe={selectedVibe}
              setSelectedVibe={setSelectedVibe}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onResetFilters={handleResetFilters}
              activeFilterCount={activeFilterCount}
            />

            {/* album count and live/local data source indicator */}
            <div className="results-meta-row">
              <span className="results-count">
                <Disc3 style={{ width: '16px', height: '16px', color: 'var(--gold)' }} />
                Showing <strong>{filteredAlbums.length}</strong> of {albums.length} Albums
              </span>

              <div className="results-badges">
                <span className={`vibe-tag datasource-badge ${dataSource === 'supabase' ? 'datasource-badge--live' : ''}`}>
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
          </section>

          {/* SECTION 3: Community Recommendations */}
          <section id="recommendations-section" className="discography-section-block">
            <div className="section-ribbon">
              Community Recommendations
            </div>

            <Recommendations
              recommendations={recommendations}
              onOpenAddRec={() => {
                setPrefilledAlbumForRec(null);
                setIsAddRecOpen(true);
              }}
            />
          </section>

        </main>
      </div>

      {/* Audio Player Bar */}
      {activeTrack && activeAudioAlbum && (
        <AudioPlayerBar
          currentTrack={activeTrack}
          album={activeAudioAlbum}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          onNextTrack={handleNextTrack}
          onPrevTrack={handlePrevTrack}
          onClose={() => {
            setActiveTrack(null);
            setActiveAudioAlbum(null);
            setIsPlaying(false);
          }}
        />
      )}

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
    </div>
  );
}
