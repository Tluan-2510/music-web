'use client';

import { useEffect, useRef } from 'react';
import { usePlayerStore } from '@/store/usePlayerStore';

// Add global declaration for the analyser node
declare global {
  interface Window {
    globalAudioAnalyser?: AnalyserNode;
  }
}

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const tracks = usePlayerStore((state) => state.tracks);
  const currentTrackIndex = usePlayerStore((state) => state.currentTrackIndex);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const volume = usePlayerStore((state) => state.volume);
  
  const setIsPlaying = usePlayerStore((state) => state.setIsPlaying);
  const setProgress = usePlayerStore((state) => state.setProgress);
  const setDuration = usePlayerStore((state) => state.setDuration);
  const nextTrack = usePlayerStore((state) => state.nextTrack);

  const audioInitialized = useRef(false);

  const getProxiedSrc = usePlayerStore((state) => state.getProxiedSrc);
  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      if (!audioInitialized.current) {
        // Initialize Web Audio API
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
          const audioCtx = new AudioContextClass();
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 256;
          
          const source = audioCtx.createMediaElementSource(audio);
          source.connect(analyser);
          analyser.connect(audioCtx.destination);
          
          window.globalAudioAnalyser = analyser;
          audioInitialized.current = true;
        } catch (err) {
          console.error("Audio Context initialization failed:", err);
        }
      }

      audio.play().catch((e) => {
        console.error("Playback failed:", e);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrackIndex, setIsPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  return (
    <audio
      id="global-audio"
      crossOrigin="anonymous"
      ref={audioRef}
      src={currentTrack ? getProxiedSrc(currentTrack.src) : undefined}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoadedMetadata}
      onEnded={nextTrack}
    />
  );
}
