/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#0066cc',
        'primary-dark': '#001a33',
        'primary-light': '#f0f6ff',
        'accent-orange': '#ff9500',
        percentile: {
          critical: '#ef4444',
          warning: '#f97316',
          normal: '#3b82f6',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
