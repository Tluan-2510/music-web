'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { usePlayerStore } from '@/store/usePlayerStore';

export default function UserSync() {
  const { data: session } = useSession();
  const setFavorites = usePlayerStore((state) => state.setFavorites);
  const setRecents = usePlayerStore((state) => state.setRecents);

  useEffect(() => {
    if (session?.user) {
      // Fetch favorites from DB
      fetch('/api/user/favorites')
        .then((res) => res.json())
        .then((data) => {
          if (data.favorites) setFavorites(data.favorites);
        });

      // Fetch recents from DB
      fetch('/api/user/recents')
        .then((res) => res.json())
        .then((data) => {
          if (data.recents) setRecents(data.recents);
        });
    }
  }, [session, setFavorites, setRecents]);

  return null; // This component doesn't render anything
}
