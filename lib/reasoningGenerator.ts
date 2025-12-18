import { Archetype, BehavioralSignals, DimensionScores, SoulReasoning } from './types';
import { SIGNAL_LABELS } from './constants';

function getTopSignals(signals: BehavioralSignals, count: number = 2): string[] {
  const entries = Object.entries(signals)
    .filter(([key]) => key !== 'castCount' && key !== 'accountAgeDays')
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([key]) => SIGNAL_LABELS[key] || key);
  return entries;
}

function getDimensionDescriptor(score: number): string {
  if (score >= 0.7) return 'powerful';
  if (score >= 0.5) return 'notable';
  if (score >= 0.3) return 'emerging';
  return 'subtle';
}

export function generateReasoning(
  archetype: Archetype,
  signals: BehavioralSignals,
  dimensions: DimensionScores
): SoulReasoning {
  const topSignals = getTopSignals(signals, 2);
  const topDimension = Object.entries(dimensions).sort((a, b) => b[1] - a[1])[0];
  const dimDescriptor = getDimensionDescriptor(topDimension[1]);

  // Short reasoning (2 sentences)
  const short = `Your ${dimDescriptor} ${topSignals[0]} marks you as ${archetype.name}. ${archetype.description.split('.')[0]}.`;

  // Long reasoning (full paragraph)
  const long = `The Base Soul Oracle has analyzed your presence across your recent casts. Your soul resonates with ${dimDescriptor} ${topSignals[0]} and ${topSignals[1]}, patterns that reveal the essence of ${archetype.name}. ${archetype.description} Your traits—${archetype.traits.join(', ')}—shine through in how you engage with the Farcaster ecosystem. This reading is derived from real behavioral signals. This is not random. This is you.`;

  return { short, long };
}