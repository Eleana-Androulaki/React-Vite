export const themeConfig = {
  colors: {
    primary: {
      DEFAULT: '#3B82F6', // Tailwind 'blue-500'
      light: '#60A5FA', // Tailwind 'blue-400'
      dark: '#2563EB', // Tailwind 'blue-600'
      contrastText: '#ffffff'
    },
    secondary: {
      DEFAULT: '#10B981', // Tailwind 'green-500'
      light: '#6EE7B7', // Tailwind 'green-300'
      dark: '#047857', // Tailwind 'green-700'
      contrastText: '#ffffff'
    },
    error: '#EF4444', // Tailwind 'red-500'
    warning: '#F59E0B', // Tailwind 'yellow-500'
    info: '#3B82F6', // Tailwind 'blue-500'
    success: '#10B981', // Tailwind 'green-500'
    gray: {
      light: '#F3F4F6', // Tailwind 'gray-200'
      DEFAULT: '#6B7280', // Tailwind 'gray-500'
      dark: '#1F2937' // Tailwind 'gray-900'
    }
  },

  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
    sizes: {
      h1: '2.25rem', // Tailwind 'text-4xl'
      h2: '1.875rem', // Tailwind 'text-3xl'
      h3: '1.5rem', // Tailwind 'text-2xl'
      body: '1rem', // Tailwind 'text-base'
      small: '0.875rem' // Tailwind 'text-sm'
    },
    fontWeight: {
      light: 300,
      normal: 400,
      bold: 700
    }
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 40,
    '3xl': 48,
    '4xl': 64
  },

  breakpoints: {
    xs: '0px', // Mobile-first
    sm: '640px', // Tailwind 'sm'
    md: '768px', // Tailwind 'md'
    lg: '1024px', // Tailwind 'lg'
    xl: '1280px', // Tailwind 'xl'
    '2xl': '1536px' // Tailwind '2xl'
  },

  borderRadius: {
    sm: '4px',
    md: '8px', // Tailwind 'rounded-md'
    lg: '12px',
    xl: '16px',
    '2xl': '24px'
  }
};
