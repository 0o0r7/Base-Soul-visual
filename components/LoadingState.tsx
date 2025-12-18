'use client';
import React from 'react';

export const LoadingState: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center py-20 animate-fade-in">
      {/* Animated Orb */}
      <div className="relative w-32 h-32 mb-8">
        <div
          className="absolute inset-0 rounded-full animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
            filter: 'blur(20px)'
          }}
        />
        <div
          className="absolute inset-4 rounded-full animate-pulse"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            animationDelay: '0.2s'
          }}
        />
        <div
          className="absolute inset-8 rounded-full animate-pulse bg-purple-500/20"
          style={{ animationDelay: '0.4s' }}
        />
      </div>

      <p className="text-white/60 font-mono text-sm animate-pulse">
        Reading your soul...
      </p>
    </div>
  );
};