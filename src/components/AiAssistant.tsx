'use client';

import { useState } from 'react';
import { usePlayerStore } from '@/store/usePlayerStore';

export default function AiAssistant() {
  const [prompt, setPrompt] = useState('');
  const [responseMsg, setResponseMsg] = useState('');
  const [loading, setLoading] = useState(false);
  
  const playTrack = usePlayerStore((state) => state.playTrack);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setResponseMsg('AI DJ is thinking...');
    
    try {
      const res = await fetch('/api/ai-dj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      const data = await res.json();
      
      if (data.error) {
        setResponseMsg(`Error: ${data.error}`);
      } else {
        setResponseMsg(data.message);
        if (data.trackIndices && data.trackIndices.length > 0) {
          // Play the first recommended track
          playTrack(data.trackIndices[0]);
        }
      }
    } catch (err) {
      setResponseMsg('Failed to connect to AI DJ.');
    } finally {
      setLoading(false);
      setPrompt('');
    }
  };

  return (
    <div className="glass" style={{ padding: '20px', borderRadius: '16px', marginTop: '20px', border: 'var(--glass-border)' }}>
      <h3 style={{ marginBottom: '12px', color: 'var(--primary-accent)' }}>✨ AI DJ Assistant</h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
        Tell me your mood and I'll spin the perfect track.
      </p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input 
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., I need focus..."
          style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white' }}
          disabled={loading}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: 'var(--primary-accent)', color: 'white', cursor: 'pointer' }}
        >
          {loading ? '...' : 'Ask'}
        </button>
      </form>

      {responseMsg && (
        <div style={{ fontSize: '0.9rem', padding: '12px', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '8px', borderLeft: '3px solid var(--primary-accent)' }}>
          {responseMsg}
        </div>
      )}
    </div>
  );
}
