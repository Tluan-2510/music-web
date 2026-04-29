import { create } from 'zustand';
import { subscribeWithSelector, persist } from 'zustand/middleware';

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
  favorites: (string | number)[];
  isShuffle: boolean;
  repeatMode: 'off' | 'all' | 'one';
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
  toggleFavorite: (id: string | number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
}

export type PlayerStore = PlayerState & PlayerActions;

export const usePlayerStore = create<PlayerStore>()(
  persist(
    subscribeWithSelector((set) => ({
      tracks: [
        {
          id: 0,
          name: "Neon Dreams",
          artist: "Stellar",
          cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop&auto=format",
          src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        },
        {
          id: 1,
          name: "Lofi Nights",
          artist: "Chill Master",
          cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop&auto=format",
          src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
        },
        {
          id: 2,
          name: "Electric Sky",
          artist: "Nova",
          cover: "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?w=300&h=300&fit=crop&auto=format",
          src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
        },
        {
          id: 3,
          name: "Deep Ocean",
          artist: "Aquatic",
          cover: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=300&fit=crop&auto=format",
          src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
        },
        {
          id: 4,
          name: "Mountain Echoes",
          artist: "Naturals",
          cover: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300&h=300&fit=crop&auto=format",
          src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
        },
        {
          id: 5,
          name: "City Lights",
          artist: "Urban Beats",
          cover: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=300&fit=crop&auto=format",
          src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
        },
        {
          id: 6,
          name: "Desert Wind",
          artist: "Sandstorm",
          cover: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=300&h=300&fit=crop&auto=format",
          src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
        },
        {
          id: 7,
          name: "Cosmic Journey",
          artist: "Astro",
          cover: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&h=300&fit=crop&auto=format",
          src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
        }
      ],
      currentTrackIndex: 0,
      isPlaying: false,
      volume: 0.7,
      progress: 0,
      duration: 0,
      favorites: [],
      isShuffle: false,
      repeatMode: 'off',
      
      setTracks: (tracks) => set({ tracks }),
      playTrack: (index) => set({ currentTrackIndex: index, isPlaying: true }),
      togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
      setIsPlaying: (isPlaying) => set({ isPlaying }),
      nextTrack: () => set((state) => {
        if (state.repeatMode === 'one') {
          return { isPlaying: true }; // Audio will restart itself, or we can force it by not changing index
        }
        if (state.isShuffle) {
          let nextIndex = Math.floor(Math.random() * state.tracks.length);
          while (nextIndex === state.currentTrackIndex && state.tracks.length > 1) {
            nextIndex = Math.floor(Math.random() * state.tracks.length);
          }
          return { currentTrackIndex: nextIndex, isPlaying: true };
        }
        
        const nextIndex = state.currentTrackIndex + 1;
        if (nextIndex >= state.tracks.length) {
          if (state.repeatMode === 'all') {
            return { currentTrackIndex: 0, isPlaying: true };
          }
          return { currentTrackIndex: 0, isPlaying: false, progress: 0 };
        }
        return { currentTrackIndex: nextIndex, isPlaying: true };
      }),
      prevTrack: () => set((state) => {
        if (state.progress > 3) {
          // If song has played for more than 3 seconds, previous usually restarts current track
          return { isPlaying: true, progress: 0 };
        }
        if (state.isShuffle) {
          const prevIndex = Math.floor(Math.random() * state.tracks.length);
          return { currentTrackIndex: prevIndex, isPlaying: true };
        }
        const prevIndex = state.currentTrackIndex - 1;
        return { 
          currentTrackIndex: prevIndex < 0 ? state.tracks.length - 1 : prevIndex,
          isPlaying: true
        };
      }),
      setVolume: (volume) => set({ volume }),
      setProgress: (progress) => set({ progress }),
      setDuration: (duration) => set({ duration }),
      toggleFavorite: (id) => set((state) => {
        const isFav = state.favorites.includes(id);
        if (isFav) {
          return { favorites: state.favorites.filter(favId => favId !== id) };
        } else {
          return { favorites: [...state.favorites, id] };
        }
      }),
      toggleShuffle: () => set((state) => ({ isShuffle: !state.isShuffle })),
      toggleRepeat: () => set((state) => {
        const modes: ('off' | 'all' | 'one')[] = ['off', 'all', 'one'];
        const nextMode = modes[(modes.indexOf(state.repeatMode) + 1) % modes.length];
        return { repeatMode: nextMode };
      })
    })),
    {
      name: 'aura-music-storage',
      partialize: (state) => ({ 
        favorites: state.favorites, 
        volume: state.volume,
        isShuffle: state.isShuffle,
        repeatMode: state.repeatMode
      }),
    }
  )
);
