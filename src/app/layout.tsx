import type { Metadata } from 'next';
import { Instrument_Serif, JetBrains_Mono, Schibsted_Grotesk } from 'next/font/google';
import { getContent } from '@/lib/content';
import './globals.css';

const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display',
});
const sans = Schibsted_Grotesk({ subsets: ['latin'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

import { siteUrl } from '@/lib/site';

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  return {
    metadataBase: new URL(siteUrl),
    title: c.meta_title,
    description: c.meta_description,
    openGraph: {
      title: c.meta_title,
      description: c.meta_description,
      siteName: c.brand_name,
      locale: 'fr_FR',
      type: 'website',
    },
    alternates: { canonical: '/' },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
