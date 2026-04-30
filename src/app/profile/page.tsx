import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { FaUserEdit, FaSignOutAlt, FaSearch, FaWaveSquare, FaCrown, FaMusic, FaHeart } from 'react-icons/fa';

export default async function ProfilePage() {
  const session = await auth();
  
  if (!session?.user?.email) {
    redirect('/login');
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    include: {
      favorites: true,
      recents: {
        orderBy: { playedAt: 'desc' },
        take: 10,
      }
    }
  });

  if (!user) return null;

  const genres = user.preferences ? user.preferences.split(',') : [];

  return (
    <div className="flex flex-col gap-12 pb-32 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between pt-6 px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="group w-12 h-12 glass rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all active:scale-95">
            <FaSearch className="text-gray-400 group-hover:text-white transition-colors" />
          </Link>
          <div className="space-y-0.5">
            <h1 className="text-3xl font-black tracking-tighter uppercase text-white">Your Aura</h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Identity Hub</p>
          </div>
        </div>
        
        <div className="user-profile shadow-2xl">
          <div className="avatar">
            {user.name?.[0] || 'U'}
          </div>
          <span className="font-bold">{user.name}</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4">
        <div className="hero-card glass" style={{ 
          background: 'linear-gradient(135deg, #1a1a1e 0%, #0a0a0c 100%)',
          minHeight: '340px',
          padding: '0',
          position: 'relative',
          border: '1px solid rgba(255,255,255,0.05)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}>
          {/* Decorative Mesh Gradient */}
          <div className="absolute top-0 right-0 w-2/3 h-full overflow-hidden opacity-40 pointer-events-none">
            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-20%] right-[20%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px]"></div>
          </div>

          <div className="relative z-10 w-full h-full p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Avatar Circle */}
            <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 p-1.5 shadow-[0_0_50px_rgba(168,85,247,0.3)] flex-shrink-0">
              <div className="w-full h-full rounded-full bg-[#0a0a0c] flex items-center justify-center text-6xl md:text-7xl font-black text-white">
                {user.name?.[0] || 'U'}
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left space-y-6">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <span className="px-4 py-1.5 rounded-full bg-purple-500 text-[10px] font-black tracking-widest text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]">PRO MEMBER</span>
                <span className="px-4 py-1.5 rounded-full bg-white/10 text-[10px] font-black tracking-widest text-white border border-white/10">VERIFIED</span>
              </div>
              
              <div className="space-y-2">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-none break-words">
                  {user.name}
                </h1>
                <p className="text-gray-400 font-bold tracking-wide text-sm md:text-lg break-all">
                  {user.email}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
                <Link href="/profile/edit" className="btn btn-primary px-10 py-4 flex items-center gap-3 active:scale-95 transition-all shadow-xl">
                  <FaUserEdit size={18} /> 
                  <span>Edit Profile</span>
                </Link>
                <button className="px-10 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all active:scale-95 shadow-lg">
                  Settings
                </button>
              </div>
            </div>

            {/* Quick Insights - Fills the right side on large screens */}
            <div className="hidden xl:flex flex-col gap-4 w-64 flex-shrink-0">
              <div className="glass p-4 rounded-2xl border-white/5 bg-white/[0.02] flex items-center gap-4 hover:bg-white/5 transition-colors group cursor-default">
                <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 group-hover:scale-110 transition-transform">
                  <FaCrown size={14} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Aura Level</p>
                  <p className="text-white font-black text-lg">Master Elite</p>
                </div>
              </div>
              
              <div className="glass p-4 rounded-2xl border-white/5 bg-white/[0.02] flex items-center gap-4 hover:bg-white/5 transition-colors group cursor-default">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <FaMusic size={14} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Top Genre</p>
                  <p className="text-white font-black text-lg capitalize">{genres[0] || 'Ambient'}</p>
                </div>
              </div>

              <div className="glass p-4 rounded-2xl border-white/5 bg-white/[0.02] flex items-center gap-4 hover:bg-white/5 transition-colors group cursor-default">
                <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                  <FaHeart size={14} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Favorites</p>
                  <p className="text-white font-black text-lg">{user.favorites.length} Tracks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-4">
        {/* Account Details */}
        <div className="glass p-8 md:p-12 rounded-[3rem] border border-white/5 space-y-10 relative overflow-hidden">
          <div className="flex items-center gap-4 border-b border-white/5 pb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
              <FaUserEdit size={20} />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-white">Account Status</h2>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] text-gray-500 uppercase font-black tracking-[0.3em] block">Primary Email</label>
              <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                <p className="text-white font-bold text-lg md:text-xl break-all leading-tight">{user.email}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-[10px] text-gray-500 uppercase font-black tracking-[0.3em] block">Active Subscription</label>
              <div className="bg-gradient-to-br from-purple-500/20 to-transparent border border-purple-500/30 p-8 rounded-[2rem] relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-all duration-700">
                  <FaWaveSquare size={80} />
                </div>
                <p className="text-purple-400 font-black text-3xl md:text-4xl drop-shadow-sm">Aura Ultra</p>
                <p className="text-white/40 text-xs mt-3 font-bold uppercase tracking-[0.2em]">Next Renewal: May 20, 2027</p>
              </div>
            </div>
          </div>
        </div>

        {/* Music Identity */}
        <div className="glass p-8 md:p-12 rounded-[3rem] border border-white/5 space-y-10 relative overflow-hidden flex flex-col">
          <div className="flex items-center gap-4 border-b border-white/5 pb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
              <FaWaveSquare size={20} />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-white">Music Identity</h2>
          </div>

          <div className="space-y-6">
            <label className="text-[10px] text-gray-500 uppercase font-black tracking-[0.3em] block">Top Preferences</label>
            <div className="flex flex-wrap gap-3">
              {genres.length > 0 ? genres.map(genre => (
                <span key={genre} className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-sm font-black capitalize hover:border-purple-500/50 hover:bg-white/10 transition-all cursor-default shadow-sm">
                  {genre}
                </span>
              )) : (
                <p className="text-gray-500 italic font-medium bg-white/5 px-6 py-4 rounded-2xl w-full border border-white/5">
                  Update your genres in settings.
                </p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 pt-6 mt-auto">
            <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/5 hover:bg-white/[0.05] transition-all group shadow-inner">
              <span className="block text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-purple-400 transition-colors">{user.favorites.length}</span>
              <span className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em]">Liked Songs</span>
            </div>
            <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/5 hover:bg-white/[0.05] transition-all group shadow-inner">
              <span className="block text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-blue-400 transition-colors">{user.recents.length}</span>
              <span className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em]">History</span>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <section className="px-4">
        <div className="glass p-10 md:p-12 rounded-[3rem] border border-red-500/20 flex flex-col md:flex-row items-center justify-between gap-8 bg-red-500/[0.03] shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/10 blur-[80px] rounded-full"></div>
          
          <div className="text-center md:text-left space-y-3 relative z-10">
            <div className="flex items-center justify-center md:justify-start gap-3 text-red-500">
              <FaSignOutAlt size={22} />
              <h3 className="font-black text-2xl uppercase tracking-tighter">Session Controls</h3>
            </div>
            <p className="text-gray-400 text-sm font-bold max-w-sm leading-relaxed">
              Logging out will end your current session and pause playback across all linked devices.
            </p>
          </div>
          
          <button className="btn-premium px-12 py-5 whitespace-nowrap bg-red-600 hover:bg-red-700 w-full md:w-auto flex justify-center text-lg font-black tracking-tight shadow-red-900/40 relative z-10 active:scale-95 transition-all" style={{ 
            background: 'linear-gradient(135deg, #ef4444, #b91c1c)', 
            boxShadow: '0 20px 40px rgba(239, 68, 68, 0.3)',
            border: 'none'
          }}>
            <FaSignOutAlt className="mr-3" /> Sign Out Securely
          </button>
        </div>
      </section>
    </div>
  );
}
