import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F3F0E8',
          50: '#FBFAF6',
          100: '#F3F0E8',
          200: '#E8E3D6',
          300: '#D9D2C1',
        },
        ink: {
          DEFAULT: '#111412',
          950: '#0B0D0C',
          900: '#111412',
          800: '#1A1E1B',
          700: '#262B27',
          600: '#3A403B',
          500: '#5A615B',
          400: '#838A84',
        },
        citron: {
          DEFAULT: '#D9F26B',
          300: '#E6F79A',
          400: '#D9F26B',
          500: '#C4E03F',
          600: '#9DB82A',
        },
        tp: '#00B67A',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        rise: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        mark: {
          from: { backgroundSize: '0% 100%' },
          to: { backgroundSize: '100% 100%' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        rise: 'rise .8s cubic-bezier(.2,.7,.2,1) both',
        blink: 'blink 1s step-end infinite',
        mark: 'mark .9s cubic-bezier(.6,.1,.2,1) both',
      },
    },
  },
  plugins: [],
};

export default config;
