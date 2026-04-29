'use client';

import { useState } from 'react';
import { usePlayerStore } from '@/store/usePlayerStore';
import { FaSearch } from 'react-icons/fa';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const tracks = usePlayerStore((state) => state.tracks);
  const playTrack = usePlayerStore((state) => state.playTrack);
  const currentTrackIndex = usePlayerStore((state) => state.currentTrackIndex);

  const filteredTracks = tracks.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ animation: 'fadeUp 0.8s ease-out forwards', paddingTop: '20px' }}>
      <header className="main-header" style={{ marginBottom: '40px' }}>
        <div className="search-bar" style={{ width: '100%', maxWidth: '600px' }}>
          <FaSearch />
          <input 
            type="text" 
            placeholder="Search artists, songs, albums..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <section className="tracks-section">
        <h2 style={{ marginBottom: '24px' }}>
          {searchQuery ? `Results for "${searchQuery}"` : 'Browse All Tracks'}
        </h2>
        
        {filteredTracks.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>No tracks found matching your search.</p>
        ) : (
          <div className="track-grid">
            {filteredTracks.map((track) => {
              const globalIndex = tracks.findIndex(t => t.id === track.id);
              const isActive = globalIndex === currentTrackIndex;
              
              return (
                <div 
                  key={track.id}
                  className={`track-card glass ${isActive ? 'active' : ''}`}
                  onClick={() => playTrack(globalIndex)}
                >
                  <img src={track.cover} alt={track.name} />
                  <h4>{track.name}</h4>
                  <p>{track.artist}</p>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
