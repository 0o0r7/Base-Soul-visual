import { Archetype, SoulVisual } from './types';

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://base-soul.vercel.app';
export const FRAME_URL = 'https://warpcast.com/~/compose';

// Signal normalization bounds
export const SIGNAL_BOUNDS = {
  castCount: { min: 0, max: 500 },
  avgCastLength: { min: 10, max: 280 },
  replyRatio: { min: 0, max: 1 },
  originalRatio: { min: 0, max: 1 },
  mediaRatio: { min: 0, max: 0.5 },
  linkRatio: { min: 0, max: 0.5 },
  emojiDensity: { min: 0, max: 3 },
  engagementRate: { min: 0, max: 0.1 },
  followerRatio: { min: 0.1, max: 10 },
  accountAgeDays: { min: 1, max: 730 },
  mentionRatio: { min: 0, max: 0.5 },
  questionRatio: { min: 0, max: 0.3 },
};

// Dimension weights
export const DIMENSION_WEIGHTS = {
  expression: {
    avgCastLength: 0.3,
    emojiDensity: 0.4,
    mediaRatio: 0.3,
  },
  social: {
    replyRatio: 0.35,
    engagementRate: 0.35,
    mentionRatio: 0.3,
  },
  creative: {
    originalRatio: 0.4,
    mediaRatio: 0.35,
    emojiDensity: 0.25,
  },
  analytical: {
    linkRatio: 0.35,
    avgCastLength: 0.35,
    questionRatio: 0.3,
  },
};

// Color mapping for dimensions
export const DIMENSION_HUE_MAP = {
  analytical: 220,   // Blue
  creative: 280,     // Purple
  social: 45,        // Orange-Yellow
  expression: 350,   // Red-Magenta
};

// Archetype definitions
export const ARCHETYPES: Archetype[] = [
  {
    id: 'builder',
    name: 'The Builder',
    description: 'You construct ideas with precision. Your words are blueprints for the future.',
    traits: ['Methodical', 'Visionary', 'Persistent'],
    colorBias: { hueRange: [200, 240], saturationMod: 0, lightnessMod: -5 },
  },
  {
    id: 'curator',
    name: 'The Curator',
    description: 'You find signal in the noise. Your attention is a gift you share wisely.',
    traits: ['Discerning', 'Amplifier', 'Tastemaker'],
    colorBias: { hueRange: [80, 140], saturationMod: -10, lightnessMod: 0 },
  },
  {
    id: 'flame',
    name: 'The Flame',
    description: 'Your energy is contagious. You ignite conversations and light up feeds.',
    traits: ['Energetic', 'Passionate', 'Magnetic'],
    colorBias: { hueRange: [10, 45], saturationMod: 15, lightnessMod: 5 },
  },
  {
    id: 'observer',
    name: 'The Observer',
    description: 'You watch, you learn, you speak only when it truly matters.',
    traits: ['Perceptive', 'Thoughtful', 'Measured'],
    colorBias: { hueRange: [260, 290], saturationMod: -15, lightnessMod: -10 },
  },
  {
    id: 'connector',
    name: 'The Connector',
    description: 'You weave the social fabric. Communities form around your presence.',
    traits: ['Networker', 'Inclusive', 'Bridge-Builder'],
    colorBias: { hueRange: [35, 60], saturationMod: 5, lightnessMod: 10 },
  },
  {
    id: 'creator',
    name: 'The Creator',
    description: 'You birth visions into pixels. Your canvas is the infinite feed.',
    traits: ['Artistic', 'Original', 'Expressive'],
    colorBias: { hueRange: [270, 310], saturationMod: 10, lightnessMod: 5 },
  },
  {
    id: 'sage',
    name: 'The Sage',
    description: 'You share knowledge freely. Your threads are textbooks for the curious.',
    traits: ['Wise', 'Educational', 'Generous'],
    colorBias: { hueRange: [180, 220], saturationMod: -5, lightnessMod: 0 },
  },
  {
    id: 'jester',
    name: 'The Jester',
    description: 'You bring joy to timelines. Your humor is a superpower that unites.',
    traits: ['Witty', 'Playful', 'Entertaining'],
    colorBias: { hueRange: [50, 80], saturationMod: 20, lightnessMod: 15 },
  },
  {
    id: 'guardian',
    name: 'The Guardian',
    description: 'You protect and uplift. Your replies are reassurance in the chaos.',
    traits: ['Supportive', 'Loyal', 'Steady'],
    colorBias: { hueRange: [20, 50], saturationMod: 0, lightnessMod: 5 },
  },
  {
    id: 'pioneer',
    name: 'The Pioneer',
    description: 'You explore the frontier. Where you go, others eventually follow.',
    traits: ['Adventurous', 'Early-Adopter', 'Bold'],
    colorBias: { hueRange: [160, 200], saturationMod: 15, lightnessMod: 10 },
  },
  {
    id: 'mystic',
    name: 'The Mystic',
    description: 'You speak in riddles that reveal truths. The feed is your oracle.',
    traits: ['Enigmatic', 'Philosophical', 'Deep'],
    colorBias: { hueRange: [250, 280], saturationMod: 5, lightnessMod: -5 },
  },
  {
    id: 'balanced',
    name: 'The Balanced',
    description: 'You contain multitudes. No single label can capture your essence.',
    traits: ['Versatile', 'Adaptive', 'Harmonious'],
    colorBias: { hueRange: [0, 360], saturationMod: 0, lightnessMod: 0 },
  },
];

// Fallback archetype for new users
export const NASCENT_ARCHETYPE: Archetype = {
  id: 'nascent',
  name: 'Nascent Soul',
  description: 'Your soul is still forming. Cast more to reveal your true colors.',
  traits: ['Emerging', 'Potential', 'Unwritten'],
  colorBias: { hueRange: [0, 0], saturationMod: -30, lightnessMod: -20 },
};

// Archetype visual mappings
export const ARCHETYPE_VISUALS: Record<string, {
  sigil: SoulVisual['sigil'];
  blobComplexity: SoulVisual['blobComplexity'];
  hasRing: boolean;
  hasParticles: boolean;
}> = {
  builder: { sigil: 'square', blobComplexity: 'smooth', hasRing: true, hasParticles: false },
  curator: { sigil: 'hexagon', blobComplexity: 'organic', hasRing: true, hasParticles: true },
  flame: { sigil: 'triangle', blobComplexity: 'glitchy', hasRing: false, hasParticles: true },
  observer: { sigil: 'circle', blobComplexity: 'smooth', hasRing: true, hasParticles: false },
  connector: { sigil: 'infinity', blobComplexity: 'organic', hasRing: true, hasParticles: true },
  creator: { sigil: 'star', blobComplexity: 'organic', hasRing: false, hasParticles: true },
  sage: { sigil: 'hexagon', blobComplexity: 'smooth', hasRing: true, hasParticles: false },
  jester: { sigil: 'star', blobComplexity: 'glitchy', hasRing: false, hasParticles: true },
  guardian: { sigil: 'square', blobComplexity: 'smooth', hasRing: true, hasParticles: false },
  pioneer: { sigil: 'triangle', blobComplexity: 'glitchy', hasRing: true, hasParticles: true },
  mystic: { sigil: 'circle', blobComplexity: 'organic', hasRing: true, hasParticles: true },
  balanced: { sigil: 'circle', blobComplexity: 'smooth', hasRing: false, hasParticles: false },
  nascent: { sigil: 'none', blobComplexity: 'smooth', hasRing: false, hasParticles: false },
};

// Signal to human-readable mapping for reasoning
export const SIGNAL_LABELS: Record<string, string> = {
  avgCastLength: 'thoughtful expression',
  replyRatio: 'conversational nature',
  originalRatio: 'original voice',
  mediaRatio: 'visual storytelling',
  linkRatio: 'curation instinct',
  emojiDensity: 'expressive energy',
  engagementRate: 'magnetic presence',
  followerRatio: 'community gravity',
  mentionRatio: 'collaborative spirit',
  questionRatio: 'curious mind',
};