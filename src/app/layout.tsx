import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Biplob Giri — Work in Progress',
  description: 'This site is under construction. Check back soon.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black">{children}</body>
    </html>
  );
}
