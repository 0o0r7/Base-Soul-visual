import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || 'Anonymous';
  const archetype = searchParams.get('archetype') || 'Soul';
  const color = searchParams.get('color') || '#8B5CF6';
  const secondaryColor = searchParams.get('secondary') || '#3B82F6';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0f',
          position: 'relative',
        }}
      >
        {/* Background gradient */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at 50% 50%, ${color}20 0%, transparent 50%)`,
          }}
        />
        
        {/* Soul Orb */}
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: `radial-gradient(circle at 30% 30%, ${color}, ${secondaryColor})`,
            boxShadow: `0 0 60px ${color}60, 0 0 120px ${color}30`,
            marginBottom: 40,
          }}
        />
        
        {/* Username */}
        <div
          style={{
            color: color,
            fontSize: 32,
            fontFamily: 'monospace',
            marginBottom: 12,
          }}
        >
          @{username}
        </div>
        
        {/* Archetype */}
        <div
          style={{
            color: 'white',
            fontSize: 48,
            fontWeight: 'bold',
            marginBottom: 20,
          }}
        >
          {archetype}
        </div>
        
        {/* Branding */}
        <div
          style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: 18,
            position: 'absolute',
            bottom: 30,
          }}
        >
          Base Soul • Discover yours
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}