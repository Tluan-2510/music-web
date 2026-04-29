'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaWaveSquare, FaHome, FaSearch, FaBookOpen, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useSession, signOut } from 'next-auth/react';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/login');
    router.refresh();
  };

  const userInitial = session?.user?.name?.charAt(0)?.toUpperCase() ?? 
                      session?.user?.email?.charAt(0)?.toUpperCase() ?? '?';

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

      {/* User section at bottom */}
      <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: 'var(--glass-border)' }}>
        {session?.user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px',
              background: 'var(--primary-gradient)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: '0.9rem', flexShrink: 0,
            }}>
              {userInitial}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {session.user.name ?? 'User'}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {session.user.email}
              </div>
            </div>
            <button
              onClick={handleSignOut}
              title="Sign out"
              style={{
                background: 'none', border: 'none',
                color: 'var(--text-secondary)', cursor: 'pointer',
                padding: '4px', borderRadius: '6px',
                display: 'flex', alignItems: 'center',
                transition: 'color 0.2s',
              }}
            >
              <FaSignOutAlt size={14} />
            </button>
          </div>
        ) : (
          <Link href="/login" style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 12px', borderRadius: '10px',
            background: 'var(--primary-gradient)',
            color: 'white', textDecoration: 'none', fontWeight: 600,
            fontSize: '0.85rem', justifyContent: 'center',
          }}>
            <FaSignInAlt size={13} />
            Sign In
          </Link>
        )}
      </div>
    </aside>
  );
}
