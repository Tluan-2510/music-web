'use client';

import { usePlayerStore } from '@/store/usePlayerStore';
import { FaHeart, FaPlay } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function LibraryPage() {
  const router = useRouter();
  const tracks = usePlayerStore((state) => state.tracks);
  const favorites = usePlayerStore((state) => state.favorites);
  const playTrack = usePlayerStore((state) => state.playTrack);
  const currentTrackIndex = usePlayerStore((state) => state.currentTrackIndex);

  const favoriteTracks = tracks.filter(t => favorites.includes(t.id));

  return (
    <div style={{ animation: 'fadeUp 0.8s ease-out forwards', paddingTop: '20px' }}>
      <header className="main-header" style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Your Library</h1>
        <div className="user-profile" onClick={() => router.push('/profile')}>
          <div className="avatar">P</div>
          <span>Premium User</span>
        </div>
      </header>

      <section className="hero-section" style={{ marginBottom: '40px' }}>
        <div className="hero-card glass" style={{ height: '200px', background: 'linear-gradient(45deg, rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.2))' }}>
          <div className="hero-content" style={{ maxWidth: '100%' }}>
            <span className="badge" style={{ background: 'var(--secondary-accent)' }}>FAVORITES</span>
            <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Liked Songs</h2>
            <p>{favoriteTracks.length} tracks</p>
            {favoriteTracks.length > 0 && (
              <button 
                className="btn btn-primary" 
                style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}
                onClick={() => {
                  const firstFavIndex = tracks.findIndex(t => t.id === favoriteTracks[0].id);
                  if (firstFavIndex !== -1) playTrack(firstFavIndex);
                }}
              >
                <FaPlay /> Play All
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="tracks-section">
        <h2 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <FaHeart style={{ color: 'var(--primary-accent)' }} /> Saved Tracks
        </h2>
        
        {favoriteTracks.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)', padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', textAlign: 'center' }}>
            You haven't liked any songs yet. Go discover some music!
          </p>
        ) : (
          <div className="track-grid">
            {favoriteTracks.map((track) => {
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
