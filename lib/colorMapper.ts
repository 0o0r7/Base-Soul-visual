import { DimensionScores, SoulColor } from './types';
import { DIMENSION_HUE_MAP } from './constants';

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

export function computeSoulColor(dimensions: DimensionScores): SoulColor {
  // Find dominant dimensions
  const entries = Object.entries(dimensions) as [keyof DimensionScores, number][];
  entries.sort((a, b) => b[1] - a[1]);
  const [dominant, secondary] = entries;

  // Calculate hue as weighted blend of top two dimensions
  const dominantHue = DIMENSION_HUE_MAP[dominant[0]];
  const secondaryHue = DIMENSION_HUE_MAP[secondary[0]];
  
  // Weight by relative strength
  const dominantWeight = dominant[1] / (dominant[1] + secondary[1]);

  // Handle hue wraparound for smooth blending
  let hueDiff = secondaryHue - dominantHue;
  if (hueDiff > 180) hueDiff -= 360;
  if (hueDiff < -180) hueDiff += 360;

  let hue = dominantHue + (hueDiff * (1 - dominantWeight));
  if (hue < 0) hue += 360;
  if (hue >= 360) hue -= 360;

  // Saturation from expression dimension
  const saturation = Math.round(50 + dimensions.expression * 35);
  
  // Lightness from social dimension
  const lightness = Math.round(45 + dimensions.social * 18);

  return {
    hue: Math.round(hue),
    saturation: Math.max(40, Math.min(90, saturation)),
    lightness: Math.max(40, Math.min(65, lightness)),
    hex: hslToHex(hue, saturation, lightness),
  };
}