/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'display-xl': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        'body-lg': ['1rem', { lineHeight: '1.625' }],
        'body': ['0.9375rem', { lineHeight: '1.6' }],
        'body-sm': ['0.8125rem', { lineHeight: '1.5' }],
        'caption': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
        'overline': ['0.6875rem', { lineHeight: '1.3', letterSpacing: '0.12em' }],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
        'section': '2rem',
        'section-lg': '3rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
        '4xl': '1.5rem',
      },
      transitionDuration: {
        250: '250ms',
        400: '400ms',
        500: '500ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'bounce-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      boxShadow: {
        'neon-sm': '0 0 12px rgba(16, 185, 129, 0.45), 0 0 24px rgba(16, 185, 129, 0.15)',
        'neon': '0 0 20px rgba(16, 185, 129, 0.55), 0 0 40px rgba(16, 185, 129, 0.2)',
        'neon-lg': '0 0 28px rgba(16, 185, 129, 0.65), 0 0 56px rgba(16, 185, 129, 0.25)',
        'neon-xl': '0 0 40px rgba(16, 185, 129, 0.75), 0 0 80px rgba(16, 185, 129, 0.3)',
        'neon-inner': 'inset 0 0 20px rgba(16, 185, 129, 0.15)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2.5s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
    },
  },
  plugins: [],
}
