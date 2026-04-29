import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export interface Track {
  id: string | number;
  name: string;
  artist: string;
  cover: string;
  src: string;
}

export interface PlayerState {
  tracks: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
}

export interface PlayerActions {
  setTracks: (tracks: Track[]) => void;
  playTrack: (index: number) => void;
  togglePlay: () => void;
  setIsPlaying: (isPlaying: boolean) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  setDuration: (duration: number) => void;
}

export type PlayerStore = PlayerState & PlayerActions;

export const usePlayerStore = create<PlayerStore>()(
  subscribeWithSelector((set) => ({
    tracks: [
      {
        id: 1,
        name: "Neon Dreams",
        artist: "Stellar",
        cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      },
      {
        id: 2,
        name: "Lofi Nights",
        artist: "Chill Master",
        cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
      },
      {
        id: 3,
        name: "Electric Sky",
        artist: "Nova",
        cover: "https://images.unsplash.com/photo-1459749411177-042180ce673c?w=300&h=300&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
      }
    ],
    currentTrackIndex: 0,
    isPlaying: false,
    volume: 0.7,
    progress: 0,
    duration: 0,
    
    setTracks: (tracks) => set({ tracks }),
    playTrack: (index) => set({ currentTrackIndex: index, isPlaying: true }),
    togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
    setIsPlaying: (isPlaying) => set({ isPlaying }),
    nextTrack: () => set((state) => {
      const nextIndex = state.currentTrackIndex + 1;
      return { 
        currentTrackIndex: nextIndex >= state.tracks.length ? 0 : nextIndex,
        isPlaying: true 
      };
    }),
    prevTrack: () => set((state) => {
      const prevIndex = state.currentTrackIndex - 1;
      return { 
        currentTrackIndex: prevIndex < 0 ? state.tracks.length - 1 : prevIndex,
        isPlaying: true
      };
    }),
    setVolume: (volume) => set({ volume }),
    setProgress: (progress) => set({ progress }),
    setDuration: (duration) => set({ duration })
  }))
);
