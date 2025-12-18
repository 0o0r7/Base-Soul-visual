import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Base Soul | Discover Your Digital Soul',
  description: 'Your Farcaster presence reveals your true soul. Discover your unique aura, archetype, and share it with the world.',
  openGraph: {
    title: 'Base Soul',
    description: 'Discover your digital soul on Base',
    images: ['/api/og?default=true'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0a0a0f',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body>
        <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}