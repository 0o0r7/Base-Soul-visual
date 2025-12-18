import { DimensionScores, Archetype, SoulColor, SoulVisual } from './types';
import { ARCHETYPE_VISUALS } from './constants';

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function generateSoulVisual(
  color: SoulColor,
  archetype: Archetype,
  dimensions: DimensionScores,
  fid: number
): SoulVisual {
  const archetypeVisual = ARCHETYPE_VISUALS[archetype.id] || ARCHETYPE_VISUALS.balanced;

  // Generate secondary and accent colors
  const secondaryHue = (color.hue + 35) % 360;
  const accentHue = (color.hue + 180) % 360;

  const secondaryColor = hslToHex(secondaryHue, color.saturation - 10, color.lightness + 8);
  const accentColor = hslToHex(accentHue, Math.min(color.saturation + 15, 95), color.lightness + 12);

  // Determine speed from expression
  let speed: SoulVisual['speed'] = 'balanced';
  if (dimensions.expression < 0.3) speed = 'calm';
  else if (dimensions.expression < 0.55) speed = 'balanced';
  else if (dimensions.expression < 0.75) speed = 'energetic';
  else speed = 'chaotic';

  // Blob count from creative dimension
  const blobCount = Math.max(3, Math.min(6, Math.round(3 + dimensions.creative * 3)));

  // Glow intensity from social dimension
  const glowIntensity = 0.4 + (dimensions.social * 0.4);

  // Generate deterministic signature
  const sigHash = ((fid * 7919) % 65536).toString(16).toUpperCase().padStart(4, '0');
  const signature = `0x${sigHash}`;

  return {
    primaryColor: color.hex,
    secondaryColor,
    accentColor,
    glowIntensity,
    glowSpread: 50 + (dimensions.expression * 30),
    speed,
    pulseRate: 6 - (dimensions.expression * 3.5),
    blobCount,
    blobComplexity: archetypeVisual.blobComplexity,
    sigil: archetypeVisual.sigil,
    sigilOpacity: 0.12 + (dimensions.analytical * 0.18),
    hasParticles: archetypeVisual.hasParticles,
    hasRing: archetypeVisual.hasRing,
    noiseOpacity: 0.025 + (dimensions.creative * 0.035),
    soulSignature: signature,
  };
}