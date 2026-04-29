import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import PlayerBar from '@/components/PlayerBar';
import AudioPlayer from '@/components/AudioPlayer';
import AuthProvider from '@/components/AuthProvider';
import UserSync from '@/components/UserSync';


const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Aura Music | Premium Listening Experience',
  description: 'Experience music with Aura - the premium, glassmorphic music player.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <AuthProvider>
          <UserSync />
          <div className="app-container">
            <Sidebar />
            <main className="main-content">
              {children}
            </main>
            <PlayerBar />
            <AudioPlayer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
