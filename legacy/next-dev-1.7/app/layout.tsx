import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'FORMA OPUS', template: '%s — FORMA OPUS' },
  description: 'FORMA OPUS is a design studio spanning GREA, PARVUS and MACHINA.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
