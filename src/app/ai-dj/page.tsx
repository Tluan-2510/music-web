'use client';

import AiAssistant from '@/components/AiAssistant';

export default function AiDjPage() {
  return (
    <div style={{ padding: '20px', animation: 'fadeUp 0.8s ease-out forwards' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>AI DJ</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
        Let our advanced AI curate the perfect track for your current mood or activity.
      </p>
      <div style={{ maxWidth: '600px' }}>
        <AiAssistant />
      </div>
    </div>
  );
}
