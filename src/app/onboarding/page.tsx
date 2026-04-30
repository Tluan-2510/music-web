'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import Visualizer from '@/components/Visualizer';

const GENRES = [
  { id: 'lofi', name: 'Lofi Chill', artist: 'Focus & Relax', cover: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=800' },
  { id: 'jazz', name: 'Classic Jazz', artist: 'Smooth & Soulful', cover: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=800' },
  { id: 'pop', name: 'Modern Pop', artist: 'Fresh & Upbeat', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800' },
  { id: 'rock', name: 'Classic Rock', artist: 'Powerful & Raw', cover: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=800' },
  { id: 'electronic', name: 'Electronic', artist: 'Techno & House', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800' },
  { id: 'classical', name: 'Classical', artist: 'Orchestral Art', cover: 'https://images.unsplash.com/photo-1519682577862-22b62b24e493?q=80&w=800' },
  { id: 'acoustic', name: 'Acoustic', artist: 'Intimate Strings', cover: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800' },
  { id: 'ambient', name: 'Ambient', artist: 'Atmospheric', cover: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=800' },
];

export default function Onboarding() {
  const { update } = useSession();
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleGenre = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleFinish = async () => {
    if (selected.length < 3) return;
    setLoading(true);
    try {
      const res = await fetch('/api/user/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ genres: selected }),
      });
      if (res.ok) {
        await update({ preferences: selected.join(',') });
        router.push('/');
      }
    } catch (error) {
      console.error('Failed to save preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center px-6 md:px-10" style={{ paddingTop: '40px', paddingBottom: '160px' }}>
      <div className="w-full max-w-[1100px]">
        
        {/* Hero Section */}
        <section className="hero-section mb-10">
          <div className="hero-card glass !h-auto !min-h-[300px] !p-10 md:!p-12 !flex !flex-col md:!flex-row !items-center !justify-between gap-8 relative overflow-hidden">
            
            {/* Background elements */}
            <div className="absolute inset-0 z-0">
              <Visualizer />
              <div className="hero-image opacity-20 scale-150 origin-right pointer-events-none absolute right-0 top-0 bottom-0 w-1/2"></div>
            </div>

            {/* Left Column: Text Content */}
            <div className="hero-content relative z-10 w-full md:w-[60%] m-0 !max-w-none">
              <span className="badge mb-4 inline-block">ONBOARDING</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-4">
                Giai điệu <br />
                <span className="text-[#a855f7]">tâm hồn</span>
              </h1>
              <p className="text-base md:text-lg text-slate-400 m-0 leading-relaxed max-w-[500px]">
                Chọn ít nhất 3 thể loại để Aura có thể thấu hiểu phong cách âm nhạc đặc trưng của riêng bạn.
              </p>
            </div>

            {/* Right Column: Hero Image */}
            <div className="relative z-10 w-full md:w-[35%] flex justify-center md:justify-end">
              <div className="relative w-[200px] h-[200px] md:w-[240px] md:h-[240px] rounded-[24px] overflow-hidden shadow-[0_20px_40px_rgba(168,85,247,0.3)] border border-[#a855f7]/30 transform md:rotate-3 hover:rotate-0 transition-all duration-500 flex-shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800" 
                  alt="Melody of the soul" 
                  className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-700"
                />
                {/* Subtle gradient overlay to blend with dark theme */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent opacity-60"></div>
              </div>
            </div>

          </div>
        </section>

        {/* Tracks Section (Genres) */}
        <section className="tracks-section">
          <div className="flex items-end justify-between pb-4 border-b border-white/10" style={{ marginBottom: '32px' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>Sở thích của bạn</h2>
              <p className="text-sm text-slate-400 mt-1">Chọn những dòng nhạc bạn muốn nghe nhất</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-[#a855f7] leading-none">{selected.length}</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mt-1">Đã chọn</span>
            </div>
          </div>
          
          <div className="track-grid" style={{ marginTop: '24px' }}>
            {GENRES.map((genre) => (
              <div 
                key={genre.id}
                className={`track-card glass ${selected.includes(genre.id) ? 'active' : ''}`}
                onClick={() => toggleGenre(genre.id)}
                style={{ 
                  boxShadow: selected.includes(genre.id) ? '0 0 20px rgba(168,85,247,0.3)' : 'none',
                  transform: selected.includes(genre.id) ? 'translateY(-4px)' : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                <img src={genre.cover} alt={genre.name} />
                <h4>{genre.name}</h4>
                <p>{genre.artist}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Floating Bottom Bar (Independent Container) */}
      {selected.length > 0 && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[95%] max-w-[900px] z-50 flex justify-center pointer-events-none"
        >
          {/* Inner content wrapper with pointer-events-auto so we can click inside it */}
          <div className="pointer-events-auto px-8 md:px-12 py-5 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 w-full" style={{ background: '#0f0f14', border: '1px solid rgba(168,85,247,0.35)', boxShadow: '0 8px 48px rgba(0,0,0,0.95), 0 0 0 1px rgba(168,85,247,0.15)' }}>
            <div className="flex items-center gap-6 w-full md:w-auto justify-center md:justify-start">
              <div className="flex -space-x-3">
                {selected.slice(0, 5).map(id => (
                  <div 
                    key={id}
                    className="w-12 h-12 rounded-full border-[3px] border-[#050507] overflow-hidden bg-[#a855f7] shadow-xl transition-transform hover:-translate-y-2 flex-shrink-0"
                  >
                    <img 
                      src={GENRES.find(g => g.id === id)?.cover} 
                      alt="Selected preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {selected.length > 5 && (
                  <div className="w-12 h-12 rounded-full border-[3px] border-[#050507] bg-[#1a1a1c] flex items-center justify-center text-xs font-black text-[#a855f7] shadow-xl flex-shrink-0">
                    +{selected.length - 5}
                  </div>
                )}
              </div>
              
              <div className="flex flex-col justify-center whitespace-nowrap">
                <h4 className="text-lg md:text-xl font-black text-white tracking-tight leading-none mb-1">Thư viện của bạn</h4>
                <p className="text-[10px] font-bold text-[#a855f7] uppercase tracking-widest">
                  {selected.length < 3 ? `Cần chọn thêm ${3 - selected.length} thể loại` : 'Sẵn sàng trải nghiệm!'}
                </p>
              </div>
            </div>

            <button 
              disabled={selected.length < 3 || loading}
              onClick={handleFinish}
              className={`btn btn-primary px-8 py-3 text-xs font-black tracking-[0.2em] uppercase rounded-full transition-all duration-300 flex-shrink-0 whitespace-nowrap ${
                selected.length < 3 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-105 active:scale-95 shadow-purple-500/30 shadow-2xl'
              }`}
            >
              {loading ? 'ĐANG XỬ LÝ...' : 'KHÁM PHÁ NGAY'}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
