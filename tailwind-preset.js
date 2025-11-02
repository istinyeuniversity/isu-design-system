// tailwind-preset.js
export default {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx,vue,svelte}",
    "./index.html",
    "./**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        // ISU Design System Colors
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',  // ISU Blue
          600: '#2563eb',
          900: '#1e3a8a',
          DEFAULT: '#007fff',  // Main ISU Blue
          dark: '#003eff'      // Dark ISU Blue
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          DEFAULT: '#ededed',  // Light neutral
          dark: '#1a1a1a'      // Dark neutral
        },
        // Semantic colors for dark theme
        success: { DEFAULT: '#10b981', dark: '#34d399' },
        error: { DEFAULT: '#ef4444', dark: '#f87171' },
        warning: { DEFAULT: '#f59e0b', dark: '#fbbf24' },
        info: { DEFAULT: '#3b82f6', dark: '#60a5fa' }
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        sans: ['Poppins', 'sans-serif'],
        body: ['Poppins', 'sans-serif']
      },
      fontSize: {
        // ISU Typography Scale
        'isu-h1': ['3rem', { lineHeight: '1', fontWeight: '700' }],
        'isu-h2': ['2.25rem', { lineHeight: '1.1', fontWeight: '700' }],
        'isu-h3': ['1.875rem', { lineHeight: '1.2', fontWeight: '600' }],
        'isu-h4': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'isu-h5': ['1.25rem', { lineHeight: '1.4', fontWeight: '500' }],
        'isu-h6': ['1.125rem', { lineHeight: '1.4', fontWeight: '500' }],
        'isu-body': ['1rem', { lineHeight: '1.6' }],
        'isu-body-sm': ['0.875rem', { lineHeight: '1.6' }],
        'isu-body-lg': ['1.125rem', { lineHeight: '1.6' }]
      },
      spacing: {
        // ISU Spacing Scale
        'isu-section': '3rem',
        'isu-section-sm': '2rem',
        'isu-section-lg': '4rem'
      },
      borderRadius: {
        'isu': '0.5rem',
        'isu-lg': '0.75rem'
      },
      boxShadow: {
        'isu-sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'isu': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'isu-md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'isu-lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'isu-xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
      }
    }
  },
  darkMode: ['class', '[data-theme="dark"]'],
  plugins: []
};
