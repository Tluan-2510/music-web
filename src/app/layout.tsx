import type { Metadata } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import PlayerBar from '@/components/PlayerBar';
import AudioPlayer from '@/components/AudioPlayer';
import AuthProvider from '@/components/AuthProvider';
import UserSync from '@/components/UserSync';


import ClientLayout from '@/components/ClientLayout';

const beVietnamPro = Be_Vietnam_Pro({ 
  subsets: ['vietnamese', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800']
});

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
      <body className={beVietnamPro.className}>
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
