'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SoulResult, UserData } from '@/lib/types';
import { computeSoul } from '@/lib/soulEngine';
import { SoulDisplay } from '@/components/SoulDisplay';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { APP_URL } from '@/lib/constants';

export default function SharePage() {
  const searchParams = useSearchParams();
  const fid = searchParams.get('fid');
  const [soul, setSoul] = useState<SoulResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!fid) {
      setError('No FID provided');
      setIsLoading(false);
      return;
    }

    const fetchSoul = async () => {
      try {
        const response = await fetch(`/api/user/${fid}`);
        
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

    fetchSoul();
  }, [fid]);

  const handleRetry = () => {
    window.location.reload();
  };

  const handleDiscoverOwn = () => {
    window.location.href = APP_URL;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto py-8">
      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={handleRetry} />
      ) : soul ? (
        <>
          <SoulDisplay soul={soul} />
          
          <button 
            onClick={handleDiscoverOwn}
            className="mt-8 text-white/50 text-sm hover:text-white transition-colors border-b border-transparent hover:border-white/50 pb-0.5"
          >
            Discover Your Soul
          </button>
        </>
      ) : null}
    </div>
  );
}