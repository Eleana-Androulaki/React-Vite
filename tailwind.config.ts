import { themeConfig } from './theme.js';

const { borderRadius, breakpoints, colors, spacing, typography } = themeConfig;

/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
    './index.html'
  ],
  theme: {
    extend: {
      colors: colors,
      fontFamily: {
        sans: typography.fontFamily
      },
      fontSize: typography.sizes,
      spacing: spacing,
      borderRadius: borderRadius,
      screens: {
        xs: breakpoints.xs,
        sm: breakpoints.sm,
        md: breakpoints.md,
        lg: breakpoints.lg,
        xl: breakpoints.xl,
        '2xl': breakpoints['2xl']
      }
    }
  },
  plugins: []
};
