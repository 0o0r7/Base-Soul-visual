import { NeynarUser, NeynarCast, UserData } from './types';

const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY || '';
const NEYNAR_BASE_URL = 'https://api.neynar.com/v2/farcaster';

async function neynarFetch<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${NEYNAR_BASE_URL}${endpoint}`, {
    headers: {
      'accept': 'application/json',
      'api_key': NEYNAR_API_KEY,
    },
    next: { revalidate: 300 }, // Cache for 5 minutes
  } as RequestInit);

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Neynar API error: ${response.status} - ${error}`);
  }

  return response.json();
}

export async function fetchUserByFid(fid: number): Promise<NeynarUser> {
  const data = await neynarFetch<{ users: NeynarUser[] }>(`/user/bulk?fids=${fid}`);
  if (!data.users || data.users.length === 0) {
    throw new Error('User not found');
  }
  return data.users[0];
}

export async function fetchUserByUsername(username: string): Promise<NeynarUser> {
  const cleanUsername = username.replace('@', '').toLowerCase().trim();
  const data = await neynarFetch<{ user: NeynarUser }>(`/user/by_username?username=${cleanUsername}`);
  if (!data.user) {
    throw new Error('User not found');
  }
  return data.user;
}

export async function fetchUserCasts(fid: number, limit: number = 100): Promise<NeynarCast[]> {
  const data = await neynarFetch<{ casts: NeynarCast[] }>(`/feed/user/casts?fid=${fid}&limit=${limit}`);
  return data.casts || [];
}

export async function fetchFullUserData(identifier: string | number): Promise<UserData> {
  let user: NeynarUser;
  if (typeof identifier === 'number' || /^\d+$/.test(String(identifier))) {
    user = await fetchUserByFid(Number(identifier));
  } else {
    user = await fetchUserByUsername(String(identifier));
  }

  const casts = await fetchUserCasts(user.fid, 100);
  return { user, casts };
}