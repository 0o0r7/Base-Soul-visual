'use client';
import React from 'react';
import { SoulResult } from '@/lib/types';
import { SoulOrb } from './SoulOrb';
import { APP_URL, FRAME_URL } from '@/lib/constants';

interface SoulDisplayProps {
  soul: SoulResult;
}

export const SoulDisplay: React.FC<SoulDisplayProps> = ({ soul }) => {
  const handleShare = () => {
    const shareText = `My Base Soul: "${soul.archetype.name}"\n\n${soul.reasoning?.short || soul.archetype.description}\n\nDiscover yours:`;
    const shareUrl = `${FRAME_URL}?text=${encodeURIComponent(shareText)}&embeds[]=${encodeURIComponent(`${APP_URL}/share?fid=${soul.fid}`)}`;
    window.open(shareUrl, '_blank');
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md animate-fade-in-up">
      {/* SoulOrb */}
      <div className="mb-6">
        <SoulOrb visual={soul.visual} size={260} showSignature={true} />
      </div>

      {/* Identity */}
      <div className="flex items-center gap-2 mb-4">
        <span 
          className="text-lg font-mono tracking-wide"
          style={{ color: soul.visual.primaryColor }}
        >
          @{soul.username}
        </span>
        <span className="text-white/25">•</span>
        <span className="text-white/50 text-sm font-mono uppercase tracking-widest">
          {soul.archetype.name}
        </span>
      </div>

      {/* Traits */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {soul.archetype.traits.map((trait, i) => (
          <span 
            key={i}
            className="text-[10px] uppercase px-3 py-1 rounded-full font-mono tracking-wider"
            style={{
              background: `${soul.visual.primaryColor}12`,
              border: `1px solid ${soul.visual.primaryColor}25`,
              color: soul.visual.primaryColor
            }}
          >
            {trait}
          </span>
        ))}
      </div>

      {/* Reading Card */}
      <div 
        className="w-full rounded-2xl p-6"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
          border: '1px solid rgba(255,255,255,0.08)'
        }}
      >
        {/* Title */}
        <h3 
          className="text-2xl font-bold text-center mb-1 font-mono"
          style={{
            background: `linear-gradient(135deg, ${soul.visual.primaryColor} 0%, white 50%, ${soul.visual.secondaryColor} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          {soul.archetype.name}
        </h3>
        
        <p className="text-center text-[10px] text-white/35 uppercase tracking-[0.25em] mb-5">
          Soul Resonance Detected
        </p>

        {/* Reading */}
        <div 
          className="mb-5 pl-4"
          style={{ borderLeft: `2px solid ${soul.visual.primaryColor}30` }}
        >
          <p className="text-white/75 leading-relaxed italic text-sm">
            "{soul.reasoning?.long || soul.archetype.description}"
          </p>
        </div>

        {/* Confidence */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <span className="text-[10px] text-white/35 uppercase tracking-wider">Confidence</span>
          <div className="w-20 h-1 rounded-full bg-white/10 overflow-hidden">
            <div 
              className="h-full rounded-full"
              style={{ 
                width: `${soul.confidence * 100}%`,
                background: `linear-gradient(90deg, ${soul.visual.primaryColor}, ${soul.visual.accentColor})`
              }}
            />
          </div>
          <span 
            className="text-[10px] font-mono"
            style={{ color: soul.visual.primaryColor }}
          >
            {Math.round(soul.confidence * 100)}%
          </span>
        </div>

        {/* Share */}
        <button 
          onClick={handleShare}
          className="w-full py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2 text-sm"
          style={{
            background: 'linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)'
          }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
            <polyline points="16,6 12,2 8,6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
          Share on Farcaster
        </button>
      </div>
    </div>
  );
};