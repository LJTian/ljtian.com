/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#FFFFFF',
          surface: '#FAFAFC',
          secondary: '#F1F5F9',
          border: '#E2E8F0',
          'border-hover': '#CBD5E1',
          primary: '#0F172A',
          muted: '#64748B',
          accent: '#0066FF',           // Electric Azure Blue
          indigo: '#4F46E5',           // Linear Indigo
          cyan: '#06B6D4',             // Spatial Cyan
          violet: '#7C3AED',           // Subtle Accent Violet
          'accent-light': '#EFF6FF',
          'indigo-light': '#EEF2FF',
          'accent-glow': 'rgba(0, 102, 255, 0.08)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'portal-sm': '0 2px 8px rgba(15, 23, 42, 0.04)',
        'portal-card': '0 4px 20px -2px rgba(15, 23, 42, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.02)',
        'portal-hover': '0 20px 35px -10px rgba(0, 102, 255, 0.12), 0 10px 20px -5px rgba(79, 70, 229, 0.06)',
        'portal-modal': '0 25px 60px -15px rgba(15, 23, 42, 0.25)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 102, 255, 0.08), rgba(255, 255, 255, 0))',
        'title-gradient': 'linear-gradient(135deg, #0F172A 0%, #0066FF 50%, #4F46E5 100%)',
        'card-glow': 'radial-gradient(circle at 100% 0%, rgba(0, 102, 255, 0.06) 0%, transparent 70%)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.85' },
        }
      }
    },
  },
  plugins: [],
}
