'use client';
import React, { useState } from 'react';

interface UsernameInputProps {
  onSubmit: (username: string) => void;
  isLoading: boolean;
}

export const UsernameInput: React.FC<UsernameInputProps> = ({ onSubmit, isLoading }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !isLoading) {
      onSubmit(value.trim());
    }
  };

  return (
    <div className="w-full max-w-sm animate-scale-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 mb-2 font-mono">
          Base Soul
        </h1>
        <p className="text-white/60 text-sm">
          Discover your digital soul through your Farcaster presence
        </p>
      </div>

      {/* Input Card */}
      <div 
        className="rounded-2xl p-6"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <form onSubmit={handleSubmit}>
          <label className="block text-white/60 text-xs uppercase tracking-wider mb-2 font-mono">
            Farcaster Username
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="vitalik"
            disabled={isLoading}
            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all font-mono disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!value.trim() || isLoading}
            className="w-full mt-4 py-3.5 rounded-xl font-semibold text-black transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #3B82F6 100%)'
            }}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Reading Soul...
              </span>
            ) : (
              'Reveal My Soul'
            )}
          </button>
        </form>
      </div>

      {/* Footer */}
      <p className="text-center text-white/30 text-xs mt-6">
        Your soul is derived from real Farcaster activity. Nothing is random.
      </p>
    </div>
  );
};