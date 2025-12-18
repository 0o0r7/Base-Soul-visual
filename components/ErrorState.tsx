'use client';
import React from 'react';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 max-w-sm animate-scale-in">
      <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4 text-red-400">
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>

      <h3 className="text-white text-lg font-semibold mb-2">Something went wrong</h3>
      <p className="text-white/50 text-sm text-center mb-6">{message}</p>
      
      <button
        onClick={onRetry}
        className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-medium transition-all"
      >
        Try Again
      </button>
    </div>
  );
};