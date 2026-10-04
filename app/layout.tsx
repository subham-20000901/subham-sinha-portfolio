import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Subham Sinha | Full Stack Developer',
  description: 'Portfolio of Subham Sinha — Full Stack Developer specializing in JavaScript and the MERN stack.',
  openGraph: {
    title: 'Subham Sinha | Full Stack Developer',
    description: 'Modern web applications built with JavaScript, React, Node.js and MongoDB.',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className="noise">{children}</body></html>;
}
