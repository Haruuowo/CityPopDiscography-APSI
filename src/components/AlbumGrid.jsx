import React from 'react';
import AlbumCard from './AlbumCard';
import { Disc, RotateCcw } from 'lucide-react';

export default function AlbumGrid({ albums, onSelectAlbum, onResetFilters }) {
  if (albums.length === 0) {
    return (
      <div className="glass-panel p-12 text-center max-w-lg mx-auto my-12 border border-white/10">
        <Disc className="w-16 h-16 text-[#606885] mx-auto mb-4 animate-bounce" />
        <h3 className="title-display text-2xl font-bold text-white mb-2">No City Pop Albums Found</h3>
        <p className="text-sm text-[#9BA3BD] mb-6">
          No albums matched your current search filters or era selections. Try resetting filters or searching for another artist like Tatsuro Yamashita or Mariya Takeuchi.
        </p>
        <button onClick={onResetFilters} className="btn-primary mx-auto">
          <RotateCcw className="w-4 h-4" /> Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
      {albums.map((album) => (
        <AlbumCard
          key={album.id}
          album={album}
          onSelectAlbum={onSelectAlbum}
        />
      ))}
    </div>
  );
}
