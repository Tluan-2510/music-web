'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { usePlayerStore } from '@/store/usePlayerStore';
import { FaSearch } from 'react-icons/fa';
import Visualizer from '@/components/Visualizer';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const tracks = usePlayerStore((state) => state.tracks);
  const playTrack = usePlayerStore((state) => state.playTrack);
  const currentTrackIndex = usePlayerStore((state) => state.currentTrackIndex);

  const userPreferences = (session?.user as any)?.preferences;

  // Onboarding redirect
  useEffect(() => {
    if (status === 'authenticated' && !userPreferences) {
      router.push('/onboarding');
    }
  }, [status, userPreferences, router]);

  // Recommendations logic
  const recommendedTracks = useMemo(() => {
    if (!userPreferences) return tracks.slice(0, 4);
    
    const preferredGenres = userPreferences.split(',');
    return tracks.filter(track => 
      preferredGenres.includes(track.genre)
    );
  }, [tracks, userPreferences]);

  if (status === 'loading') return null;

  return (
    <>
      <header className="main-header">
        <div className="search-bar">
          <FaSearch />
          <input type="text" placeholder="Search artists, songs, albums..." />
        </div>
        <div className="user-profile" onClick={() => router.push('/profile')}>
          <div className="avatar">
            {session?.user?.name?.[0] || '?'}
          </div>
          <span>{session?.user?.name || 'Guest'}</span>
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

      {status === 'authenticated' && recommendedTracks.length > 0 && (
        <section className="tracks-section">
          <h2>Recommended for You</h2>
          <div className="track-grid">
            {recommendedTracks.map((track) => {
              const globalIndex = tracks.findIndex(t => t.id === track.id);
              return (
                <div 
                  key={track.id}
                  className={`track-card glass ${globalIndex === currentTrackIndex ? 'active' : ''}`}
                  onClick={() => playTrack(globalIndex)}
                >
                  <div className="genre-tag">{track.genre}</div>
                  <img src={track.cover} alt={track.name} />
                  <h4>{track.name}</h4>
                  <p>{track.artist}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

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
