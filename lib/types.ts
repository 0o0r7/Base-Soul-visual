// Neynar API response types
export interface NeynarUser {
  fid: number;
  username: string;
  display_name: string;
  pfp_url: string;
  follower_count: number;
  following_count: number;
  verifications: string[];
  active_status: string;
  profile: {
    bio: {
      text: string;
    };
  };
}

export interface NeynarCast {
  hash: string;
  text: string;
  timestamp: string;
  reactions: {
    likes_count: number;
    recasts_count: number;
  };
  replies: {
    count: number;
  };
  embeds: Array<{ url?: string }>;
  parent_hash: string | null;
  mentioned_profiles: Array<{ fid: number }>;
}

// Behavioral signals extracted from user data
export interface BehavioralSignals {
  castCount: number;
  avgCastLength: number;
  replyRatio: number;
  originalRatio: number;
  mediaRatio: number;
  linkRatio: number;
  emojiDensity: number;
  engagementRate: number;
  followerRatio: number;
  accountAgeDays: number;
  mentionRatio: number;
  questionRatio: number;
}

// Core dimensions computed from signals
export interface DimensionScores {
  expression: number;
  social: number;
  creative: number;
  analytical: number;
}

// HSL color representation
export interface SoulColor {
  hue: number;
  saturation: number;
  lightness: number;
  hex: string;
}

// Visual parameters for the animated orb
export interface SoulVisual {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  glowIntensity: number;
  glowSpread: number;
  speed: 'calm' | 'balanced' | 'energetic' | 'chaotic';
  pulseRate: number;
  blobCount: number;
  blobComplexity: 'smooth' | 'organic' | 'glitchy';
  sigil: 'circle' | 'triangle' | 'square' | 'hexagon' | 'star' | 'infinity' | 'none';
  sigilOpacity: number;
  hasParticles: boolean;
  hasRing: boolean;
  noiseOpacity: number;
  soulSignature: string;
}

// Archetype definition
export interface Archetype {
  id: string;
  name: string;
  description: string;
  traits: string[];
  colorBias: {
    hueRange: [number, number];
    saturationMod: number;
    lightnessMod: number;
  };
}

// Reasoning text
export interface SoulReasoning {
  short: string;
  long: string;
}

// Complete soul result
export interface SoulResult {
  fid: number;
  username: string;
  displayName: string;
  pfpUrl: string;
  color: SoulColor;
  visual: SoulVisual;
  archetype: Archetype;
  confidence: number;
  reasoning: SoulReasoning | null;
  signals: BehavioralSignals;
  dimensions: DimensionScores;
}

// User data from API
export interface UserData {
  user: NeynarUser;
  casts: NeynarCast[];
}