'use client';

import { useEffect, useRef } from 'react';
import { usePlayerStore } from '@/store/usePlayerStore';

export default function Visualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      requestRef.current = requestAnimationFrame(draw);

      const analyser = window.globalAudioAnalyser;
      if (!analyser || !isPlaying) {
        // If not playing or no analyser, gradually fade out bars (or just draw flat lines)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw a base flat line
        const barWidth = (canvas.width / 32) * 2.5;
        for (let i = 0; i < 32; i++) {
          const x = i * (barWidth + 2);
          ctx.fillStyle = 'rgba(168, 85, 247, 0.2)';
          ctx.fillRect(x, canvas.height - 4, barWidth, 4);
        }
        return;
      }

      const bufferLength = analyser.frequencyBinCount; // typically 128 for fftSize 256
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // We'll draw 32 bars, so average out the frequencies
      const bars = 32;
      const barWidth = (canvas.width / bars) * 2.5;
      let x = 0;

      for (let i = 0; i < bars; i++) {
        // Grab a few bins per bar
        const binSize = Math.floor(bufferLength / bars);
        let sum = 0;
        for(let j = 0; j < binSize; j++) {
            sum += dataArray[(i * binSize) + j];
        }
        const average = sum / binSize;
        
        const barHeight = (average / 255) * canvas.height;

        // Create gradient
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)'); // Secondary accent (blue)
        gradient.addColorStop(1, 'rgba(168, 85, 247, 0.8)'); // Primary accent (purple)

        ctx.fillStyle = gradient;
        
        // Add glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(168, 85, 247, 0.5)';
        
        ctx.fillRect(x, canvas.height - barHeight - 4, barWidth, barHeight + 4);
        
        // Reset shadow
        ctx.shadowBlur = 0;

        x += barWidth + 2;
      }
    };

    draw();

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <canvas 
      ref={canvasRef} 
      width={600} 
      height={150} 
      style={{ 
        width: '100%', 
        height: '100%', 
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        zIndex: 0, 
        opacity: 0.6,
        pointerEvents: 'none'
      }} 
    />
  );
}
