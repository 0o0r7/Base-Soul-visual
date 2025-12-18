import { UserData, SoulResult, BehavioralSignals, DimensionScores } from './types';
import { extractSignals } from './signals';
import { computeDimensions } from './dimensions';
import { computeSoulColor } from './colorMapper';
import { generateSoulVisual } from './visualGenerator';
import { classifyArchetype } from './archetypeClassifier';
import { generateReasoning } from './reasoningGenerator';

export function computeSoul(userData: UserData): SoulResult {
  const { user, casts } = userData;

  // Step 1: Extract behavioral signals
  const signals: BehavioralSignals = extractSignals(user, casts);

  // Step 2: Compute dimensions
  const dimensions: DimensionScores = computeDimensions(signals);

  // Step 3: Compute soul color
  const color = computeSoulColor(dimensions);

  // Step 4: Classify archetype
  const archetype = classifyArchetype(dimensions, signals);

  // Step 5: Generate visual parameters
  const visual = generateSoulVisual(color, archetype, dimensions, user.fid);

  // Step 6: Generate reasoning
  const reasoning = generateReasoning(archetype, signals, dimensions);

  // Step 7: Compute confidence
  const rawCastCount = casts.length;
  const accountAgeDays = signals.accountAgeDays * 730; // denormalize
  const confidence = Math.min(1, (rawCastCount / 50) * 0.7 + (Math.min(accountAgeDays, 90) / 90) * 0.3);

  return {
    fid: user.fid,
    username: user.username,
    displayName: user.display_name,
    pfpUrl: user.pfp_url,
    color,
    visual,
    archetype,
    confidence,
    reasoning,
    signals,
    dimensions,
  };
}