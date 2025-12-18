import { DimensionScores, BehavioralSignals, Archetype } from './types';
import { ARCHETYPES, NASCENT_ARCHETYPE } from './constants';

export function classifyArchetype(
  dimensions: DimensionScores,
  signals: BehavioralSignals
): Archetype {
  // Check for nascent soul (not enough data)
  if (signals.castCount < 0.01) { // Less than ~5 casts
    return NASCENT_ARCHETYPE;
  }

  const entries = Object.entries(dimensions) as [keyof DimensionScores, number][];
  entries.sort((a, b) => b[1] - a[1]);
  const [top, second] = entries;
  const topDim = top[0];
  const secondDim = second[0];

  // Check for balanced (all dimensions within 0.15 of each other)
  const scores = entries.map(e => e[1]);
  const range = Math.max(...scores) - Math.min(...scores);
  if (range < 0.15) {
    return ARCHETYPES.find(a => a.id === 'balanced')!;
  }

  // Map dimension combinations to archetypes
  const archetypeMap: Record<string, string> = {
    'analytical-creative': 'builder',
    'analytical-social': 'sage',
    'analytical-expression': 'observer',
    'creative-analytical': 'creator',
    'creative-social': 'curator',
    'creative-expression': 'jester',
    'social-analytical': 'connector',
    'social-creative': 'guardian',
    'social-expression': 'flame',
    'expression-analytical': 'mystic',
    'expression-social': 'pioneer',
    'expression-creative': 'flame',
  };

  const key = `${topDim}-${secondDim}`;
  const archetypeId = archetypeMap[key] || 'balanced';

  return ARCHETYPES.find(a => a.id === archetypeId) || ARCHETYPES.find(a => a.id === 'balanced')!;
}