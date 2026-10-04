import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#09090b',
        panel: '#111113',
        line: '#27272a',
        accent: '#7c3aed',
        accent2: '#a78bfa',
      },
      boxShadow: {
        glow: '0 0 60px rgba(124,58,237,.18)',
      },
    },
  },
  plugins: [],
};
export default config;
