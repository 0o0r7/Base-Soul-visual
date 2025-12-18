'use client';
import React, { useMemo } from 'react';
import { SoulVisual } from '@/lib/types';

interface SoulOrbProps {
  visual: SoulVisual;
  size?: number;
  showSignature?: boolean;
}

export const SoulOrb: React.FC<SoulOrbProps> = ({
  visual,
  size = 280,
  showSignature = true
}) => {
  const timing = useMemo(() => {
    const base = {
      calm: { blob: 12, pulse: 6, ring: 20 },
      balanced: { blob: 8, pulse: 4, ring: 15 },
      energetic: { blob: 5, pulse: 2.5, ring: 10 },
      chaotic: { blob: 2, pulse: 1.5, ring: 5 }
    };
    return base[visual.speed] || base.balanced;
  }, [visual.speed]);

  const blobConfigs = useMemo(() => {
    const count = visual.blobCount || 3;
    const configs = [];
    for (let i = 0; i < count; i++) {
      configs.push({
        size: 55 + (i * 17) % 35,
        top: 12 + (i * 23) % 55,
        left: 15 + (i * 31) % 50,
        delay: i * 0.6,
        color: i === 0 ? visual.primaryColor : i === 1 ? visual.secondaryColor : visual.accentColor
      });
    }
    return configs;
  }, [visual]);

  const sigilPath = useMemo(() => {
    const sigils: Record<string, string> = {
      circle: 'M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10',
      triangle: 'M50,15 L85,75 L15,75 Z',
      square: 'M25,25 L75,25 L75,75 L25,75 Z',
      hexagon: 'M50,12 L82,30 L82,70 L50,88 L18,70 L18,30 Z',
      star: 'M50,8 L61,38 L93,38 L67,56 L78,88 L50,70 L22,88 L33,56 L7,38 L39,38 Z',
      infinity: 'M25,50 C25,35 40,35 50,50 C60,65 75,65 75,50 C75,35 60,35 50,50 C40,65 25,65 25,50'
    };
    return sigils[visual.sigil] || null;
  }, [visual.sigil]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Ambient Glow */}
      <div
        className="absolute inset-0 rounded-full animate-pulse-slow"
        style={{
          background: `radial-gradient(circle, ${visual.primaryColor}35 0%, transparent 70%)`,
          filter: `blur(${visual.glowSpread || 55}px)`,
          opacity: visual.glowIntensity || 0.6,
          animationDuration: `${timing.pulse}s`
        }}
      />
      
      {/* Secondary Glow */}
      <div 
        className="absolute inset-6 rounded-full"
        style={{ 
          background: `radial-gradient(circle at 35% 35%, ${visual.secondaryColor}25 0%, transparent 60%)`,
          filter: 'blur(35px)',
          opacity: 0.7
        }}
      />

      {/* Orbital Ring */}
      {visual.hasRing && (
        <div 
          className="absolute inset-2 rounded-full animate-slow-spin"
          style={{ 
            border: `1px solid ${visual.accentColor}40`,
            transform: 'rotateX(72deg)',
          }}
        />
      )}

      {/* Particles */}
      {visual.hasParticles && (
        <div className="absolute inset-0">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full animate-float"
              style={{
                backgroundColor: i % 2 === 0 ? visual.accentColor : visual.primaryColor,
                top: `${12 + (i * 12) % 76}%`,
                left: `${8 + (i * 14) % 84}%`,
                opacity: 0.7,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${3.5 + (i % 3)}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Glass Shell */}
      <div 
        className="absolute inset-5 rounded-full overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
          backdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: `inset 0 0 35px rgba(0,0,0,0.4), 0 0 25px ${visual.primaryColor}15`
        }}
      >
        {/* Plasma Blobs */}
        {blobConfigs.map((blob, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-blob"
            style={{
              width: `${blob.size}%`,
              height: `${blob.size}%`,
              top: `${blob.top}%`,
              left: `${blob.left}%`,
              backgroundColor: blob.color,
              filter: visual.blobComplexity === 'glitchy' ? 'blur(10px) contrast(1.4)' : 'blur(22px)',
              mixBlendMode: i === 0 ? 'screen' : i === 1 ? 'overlay' : 'color-dodge',
              opacity: 0.85,
              animationDuration: `${timing.blob + i * 0.8}s`,
              animationDelay: `${blob.delay}s`,
              animationDirection: i % 2 === 0 ? 'normal' : 'reverse'
            }}
          />
        ))}

        {/* Core Light */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-pulse-slow"
          style={{
            width: '22%',
            height: '22%',
            background: `radial-gradient(circle, rgba(255,255,255,0.9) 0%, ${visual.primaryColor} 45%, transparent 70%)`,
            opacity: 0.85,
            animationDuration: `${timing.pulse}s`
          }}
        />

        {/* Sigil */}
        {sigilPath && visual.sigil !== 'none' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg 
              viewBox="0 0 100 100" 
              className="w-2/5 h-2/5 animate-slow-spin"
              style={{ 
                opacity: visual.sigilOpacity || 0.18,
                animationDuration: '25s'
              }}
            >
              <path 
                d={sigilPath} 
                fill="none" 
                stroke="white" 
                strokeWidth="0.6"
              />
            </svg>
          </div>
        )}

        {/* Noise Overlay */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none mix-blend-overlay"
          style={{
            opacity: visual.noiseOpacity || 0.04,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Signature */}
      {showSignature && visual.soulSignature && (
        <div 
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider"
          style={{
            background: 'rgba(0,0,0,0.7)',
            border: `1px solid ${visual.primaryColor}35`,
            color: visual.primaryColor
          }}
        >
          {visual.soulSignature}
        </div>
      )}
    </div>
  );
};