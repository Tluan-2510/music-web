'use client';

import { usePlayerStore } from '@/store/usePlayerStore';
import { FaSearch } from 'react-icons/fa';
import Visualizer from '@/components/Visualizer';

export default function Home() {
  const tracks = usePlayerStore((state) => state.tracks);
  const playTrack = usePlayerStore((state) => state.playTrack);
  const currentTrackIndex = usePlayerStore((state) => state.currentTrackIndex);

  return (
    <>
      <header className="main-header">
        <div className="search-bar">
          <FaSearch />
          <input type="text" placeholder="Search artists, songs, albums..." />
        </div>
        <div className="user-profile">
          <span>Premium User</span>
          <div className="avatar"></div>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-card glass" style={{ position: 'relative' }}>
          <Visualizer />
          <div className="hero-content">
            <span className="badge">FEATURED</span>
            <h1>Midnight Melodies</h1>
            <p>Dive into the deepest ambient sounds for late-night focus.</p>
            <button className="btn btn-primary" onClick={() => playTrack(0)}>Listen Now</button>
          </div>
          <div className="hero-image"></div>
        </div>
      </section>

      <section className="tracks-section">
        <h2>Recently Played</h2>
        <div className="track-grid">
          {tracks.map((track, index) => (
            <div 
              key={track.id}
              className={`track-card glass ${index === currentTrackIndex ? 'active' : ''}`}
              onClick={() => playTrack(index)}
            >
              <img src={track.cover} alt={track.name} />
              <h4>{track.name}</h4>
              <p>{track.artist}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
