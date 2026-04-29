'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaWaveSquare, FaHome, FaSearch, FaBookOpen } from 'react-icons/fa';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar glass">
      <div className="logo">
        <FaWaveSquare />
        <span>AURA</span>
      </div>
      <nav className="nav-menu">
        <Link href="/" className={`nav-item ${pathname === '/' ? 'active' : ''}`}>
          <FaHome /> Home
        </Link>
        <Link href="/search" className={`nav-item ${pathname === '/search' ? 'active' : ''}`}>
          <FaSearch /> Search
        </Link>
        <Link href="/library" className={`nav-item ${pathname === '/library' ? 'active' : ''}`}>
          <FaBookOpen /> Library
        </Link>
      </nav>
      <div className="playlist-section">
        <h3>PLAYLISTS</h3>
        <div className="playlist-list">
          <Link href="#" className="playlist-item">Chill Vibes</Link>
          <Link href="#" className="playlist-item">Coding Session</Link>
          <Link href="#" className="playlist-item">Late Night</Link>
          <Link href="/ai-dj" className="playlist-item" style={{color: 'var(--primary-accent)', fontWeight: 'bold'}}>
            ✨ AI DJ
          </Link>
        </div>
      </div>
    </aside>
  );
}
