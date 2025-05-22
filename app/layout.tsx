import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://decktype.vsrecorder.mobi'),
  title: 'ポケカ デッキタイプ診断',
  description: 'ポケカのデッキタイプを診断します',
  openGraph: {
    url: '/',
    type: 'website',
    title: "ポケカ デッキタイプ診断",
    images: `/images/thumbnail.jpg`,
    description: "ポケカのデッキタイプを診断します",
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@vsrecorder_mobi',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
};