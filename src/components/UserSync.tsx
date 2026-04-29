'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { usePlayerStore } from '@/store/usePlayerStore';

export default function UserSync() {
  const { data: session } = useSession();
  const setFavorites = usePlayerStore((state) => state.setFavorites);

  useEffect(() => {
    if (session?.user) {
      // Fetch favorites from DB on login
      fetch('/api/user/favorites')
        .then((res) => res.json())
        .then((data) => {
          if (data.favorites) {
            setFavorites(data.favorites);
          }
        })
        .catch((err) => console.error('Failed to fetch favorites:', err));
    }
  }, [session, setFavorites]);

  return null; // This component doesn't render anything
}
