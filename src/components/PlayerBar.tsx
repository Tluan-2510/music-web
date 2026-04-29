'use client';

import { usePlayerStore } from '@/store/usePlayerStore';
import { FaHeart, FaRegHeart, FaStepBackward, FaPlay, FaPause, FaStepForward, FaVolumeUp, FaRandom, FaRedo } from 'react-icons/fa';

function formatTime(seconds: number) {
  if (!seconds || isNaN(seconds)) return "0:00";
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

export default function PlayerBar() {
  const { 
    tracks, currentTrackIndex, isPlaying, volume, progress, duration, favorites,
    isShuffle, repeatMode,
    togglePlay, nextTrack, prevTrack, setVolume, setProgress, toggleFavorite,
    toggleShuffle, toggleRepeat
  } = usePlayerStore();

  const currentTrack = tracks[currentTrackIndex];

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = e.currentTarget;
    const clickX = e.nativeEvent.offsetX;
    const width = bar.clientWidth;
    const newTime = (clickX / width) * duration;
    
    const audioElement = document.getElementById('global-audio') as HTMLAudioElement;
    if (audioElement) {
      audioElement.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const handleVolume = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = e.currentTarget;
    const clickX = e.nativeEvent.offsetX;
    const width = bar.clientWidth;
    const newVol = clickX / width;
    setVolume(newVol);
  };

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;
  const volumePercent = volume * 100;

  if (!currentTrack) return null;

  const isFav = favorites.includes(currentTrack.id);

  return (
    <footer className="player-bar glass">
      <div className="current-track">
        <div className="track-info">
          <div 
            className="track-img" 
            style={{ backgroundImage: `url(${currentTrack.cover})`, backgroundSize: 'cover' }}
          ></div>
          <div className="track-details">
            <h4>{currentTrack.name}</h4>
            <p>{currentTrack.artist}</p>
          </div>
        </div>
        <button className="btn-icon" onClick={() => toggleFavorite(currentTrack.id)}>
          {isFav ? <FaHeart style={{ color: 'var(--primary-accent)' }} /> : <FaRegHeart />}
        </button>
      </div>

      <div className="player-controls">
        <div className="control-btns">
          <button 
            className="btn-icon" 
            onClick={toggleShuffle} 
            style={{ color: isShuffle ? 'var(--primary-accent)' : 'var(--text-secondary)' }}
          >
            <FaRandom />
          </button>
          <button className="btn-icon" onClick={prevTrack}><FaStepBackward /></button>
          <button className="play-btn" onClick={togglePlay}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button className="btn-icon" onClick={nextTrack}><FaStepForward /></button>
          <button 
            className="btn-icon" 
            onClick={toggleRepeat}
            style={{ 
              color: repeatMode !== 'off' ? 'var(--primary-accent)' : 'var(--text-secondary)',
              position: 'relative'
            }}
          >
            <FaRedo />
            {repeatMode === 'one' && (
              <span style={{ 
                position: 'absolute', top: '-8px', right: '-8px', 
                fontSize: '0.6rem', background: 'var(--primary-accent)', 
                color: 'white', borderRadius: '50%', width: '14px', height: '14px', 
                display: 'flex', alignItems: 'center', justifyContent: 'center' 
              }}>1</span>
            )}
          </button>
        </div>
        <div className="progress-container">
          <span>{formatTime(progress)}</span>
          <div className="progress-bar" onClick={handleSeek}>
            <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="volume-controls">
        <FaVolumeUp />
        <div className="volume-bar" onClick={handleVolume}>
          <div className="volume-fill" style={{ width: `${volumePercent}%` }}></div>
        </div>
      </div>
    </footer>
  );
}
