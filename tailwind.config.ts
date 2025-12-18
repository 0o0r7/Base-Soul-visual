import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        soul: {
          dark: '#0a0a0f',
          darker: '#050508',
          card: 'rgba(255,255,255,0.03)',
          border: 'rgba(255,255,255,0.08)',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'blob': 'blob 8s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'slow-spin': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(20%, -20%) scale(1.1)' },
          '50%': { transform: 'translate(-10%, 20%) scale(0.9)' },
          '75%': { transform: 'translate(-20%, -10%) scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)', opacity: '0.6' },
          '50%': { transform: 'translateY(-20px) translateX(10px)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;