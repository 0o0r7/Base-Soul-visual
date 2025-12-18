import { BehavioralSignals, DimensionScores } from './types';
import { DIMENSION_WEIGHTS } from './constants';

function weightedAverage(values: Record<string, number>, weights: Record<string, number>): number {
  let sum = 0;
  let totalWeight = 0;

  for (const [key, weight] of Object.entries(weights)) {
    if (key in values) {
      sum += values[key] * weight;
      totalWeight += weight;
    }
  }

  return totalWeight > 0 ? sum / totalWeight : 0.5;
}

export function computeDimensions(signals: BehavioralSignals): DimensionScores {
  const signalValues: Record<string, number> = { ...signals };
  
  // Invert emoji density for analytical (analytical people use fewer emojis)
  const invertedEmojiForAnalytical = 1 - signals.emojiDensity;

  return {
    expression: weightedAverage(signalValues, DIMENSION_WEIGHTS.expression),
    social: weightedAverage(signalValues, DIMENSION_WEIGHTS.social),
    creative: weightedAverage(signalValues, DIMENSION_WEIGHTS.creative),
    analytical: weightedAverage(
      { ...signalValues, emojiDensity: invertedEmojiForAnalytical },
      DIMENSION_WEIGHTS.analytical
    ),
  };
}