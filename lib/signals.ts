import { NeynarUser, NeynarCast, BehavioralSignals } from './types';
import { SIGNAL_BOUNDS } from './constants';

// Count emojis in text
function countEmojis(text: string): number {
  const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;
  const matches = text.match(emojiRegex);
  return matches ? matches.length : 0;
}

// Check if cast has media
function hasMedia(cast: NeynarCast): boolean {
  return cast.embeds.some(embed =>
    embed.url && (
      embed.url.includes('imgur') ||
      embed.url.includes('imagedelivery') ||
      embed.url.match(/\.(jpg|jpeg|png|gif|webp|mp4|webm)$/i)
    )
  );
}

// Check if cast has links
function hasLink(cast: NeynarCast): boolean {
  return cast.embeds.some(embed =>
    embed.url && !hasMedia({ ...cast, embeds: [embed] })
  );
}

// Normalize a value to 0-1 range
function normalize(value: number, min: number, max: number): number {
  if (max === min) return 0.5;
  const normalized = (value - min) / (max - min);
  return Math.max(0, Math.min(1, normalized));
}

export function extractSignals(user: NeynarUser, casts: NeynarCast[]): BehavioralSignals {
  const castCount = casts.length;
  if (castCount === 0) {
    return {
      castCount: 0,
      avgCastLength: 0,
      replyRatio: 0,
      originalRatio: 0,
      mediaRatio: 0,
      linkRatio: 0,
      emojiDensity: 0,
      engagementRate: 0,
      followerRatio: 0,
      accountAgeDays: 1,
      mentionRatio: 0,
      questionRatio: 0,
    };
  }

  // Calculate raw signals
  const totalLength = casts.reduce((sum, cast) => sum + cast.text.length, 0);
  const avgCastLength = totalLength / castCount;

  const replies = casts.filter(cast => cast.parent_hash !== null).length;
  const replyRatio = replies / castCount;
  const originalRatio = 1 - replyRatio;

  const withMedia = casts.filter(hasMedia).length;
  const mediaRatio = withMedia / castCount;

  const withLinks = casts.filter(hasLink).length;
  const linkRatio = withLinks / castCount;

  const totalEmojis = casts.reduce((sum, cast) => sum + countEmojis(cast.text), 0);
  const emojiDensity = totalEmojis / castCount;

  const totalEngagement = casts.reduce((sum, cast) =>
    sum + cast.reactions.likes_count + cast.reactions.recasts_count, 0
  );
  const engagementRate = user.follower_count > 0
    ? totalEngagement / (castCount * user.follower_count)
    : 0;

  const followerRatio = user.following_count > 0
    ? user.follower_count / user.following_count
    : user.follower_count;

  const withMentions = casts.filter(cast => cast.mentioned_profiles.length > 0).length;
  const mentionRatio = withMentions / castCount;

  const withQuestions = casts.filter(cast => cast.text.includes('?')).length;
  const questionRatio = withQuestions / castCount;

  // Estimate account age from oldest cast
  const timestamps = casts.map(cast => new Date(cast.timestamp).getTime());
  const oldestTimestamp = Math.min(...timestamps);
  const accountAgeDays = Math.max(1, Math.floor((Date.now() - oldestTimestamp) / (1000 * 60 * 60 * 24)));

  // Return normalized signals
  return {
    castCount: normalize(castCount, SIGNAL_BOUNDS.castCount.min, SIGNAL_BOUNDS.castCount.max),
    avgCastLength: normalize(avgCastLength, SIGNAL_BOUNDS.avgCastLength.min, SIGNAL_BOUNDS.avgCastLength.max),
    replyRatio: normalize(replyRatio, SIGNAL_BOUNDS.replyRatio.min, SIGNAL_BOUNDS.replyRatio.max),
    originalRatio: normalize(originalRatio, SIGNAL_BOUNDS.originalRatio.min, SIGNAL_BOUNDS.originalRatio.max),
    mediaRatio: normalize(mediaRatio, SIGNAL_BOUNDS.mediaRatio.min, SIGNAL_BOUNDS.mediaRatio.max),
    linkRatio: normalize(linkRatio, SIGNAL_BOUNDS.linkRatio.min, SIGNAL_BOUNDS.linkRatio.max),
    emojiDensity: normalize(emojiDensity, SIGNAL_BOUNDS.emojiDensity.min, SIGNAL_BOUNDS.emojiDensity.max),
    engagementRate: normalize(engagementRate, SIGNAL_BOUNDS.engagementRate.min, SIGNAL_BOUNDS.engagementRate.max),
    followerRatio: normalize(followerRatio, SIGNAL_BOUNDS.followerRatio.min, SIGNAL_BOUNDS.followerRatio.max),
    accountAgeDays: normalize(accountAgeDays, SIGNAL_BOUNDS.accountAgeDays.min, SIGNAL_BOUNDS.accountAgeDays.max),
    mentionRatio: normalize(mentionRatio, SIGNAL_BOUNDS.mentionRatio.min, SIGNAL_BOUNDS.mentionRatio.max),
    questionRatio: normalize(questionRatio, SIGNAL_BOUNDS.questionRatio.min, SIGNAL_BOUNDS.questionRatio.max),
  };
}