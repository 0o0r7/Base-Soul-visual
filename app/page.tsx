'use client';
import React, { useState, useEffect } from 'react';
import { SoulResult, UserData } from '@/lib/types';
import { computeSoul } from '@/lib/soulEngine';
import { UsernameInput } from '@/components/UsernameInput';
import { SoulDisplay } from '@/components/SoulDisplay';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { NascentSoul } from '@/components/NascentSoul';

export default function HomePage() {
  const [soul, setSoul] = useState<SoulResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSoul = async (identifier: string) => {
    setIsLoading(true);
    setError(null);
    setSoul(null);
    try {
      const response = await fetch(`/api/user/${encodeURIComponent(identifier)}`);
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch user');
      }

      const userData: UserData = await response.json();
      const soulResult = computeSoul(userData);
      setSoul(soulResult);
      
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    setSoul(null);
  };

  // Check for Farcaster context on mount
  useEffect(() => {
    // If using Farcaster Mini App SDK, you would detect context here
    // For now, we just show the input
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={handleRetry} />
      ) : soul ? (
        soul.archetype.id === 'nascent' ? (
          <NascentSoul soul={soul} />
        ) : (
          <SoulDisplay soul={soul} />
        )
      ) : (
        <UsernameInput onSubmit={fetchSoul} isLoading={isLoading} />
      )}
    </div>
  );
}