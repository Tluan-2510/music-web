'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import PlayerBar from '@/components/PlayerBar';
import AudioPlayer from '@/components/AudioPlayer';
import UserSync from '@/components/UserSync';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isAuthPage = ['/login', '/signup'].includes(pathname);
  const isOnboarding = pathname === '/onboarding';

  if (isAuthPage) {
    return (
      <div className="auth-container">
        {children}
      </div>
    );
  }

  if (isOnboarding) {
    return (
      <div className="onboarding-shell" style={{ 
        width: '100vw', 
        height: '100vh', 
        background: 'var(--bg-color)', 
        overflowY: 'auto', 
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {children}
      </div>
    );
  }

  return (
    <div className="app-container">
      <UserSync />
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
      <PlayerBar />
      <AudioPlayer />
    </div>
  );
}
