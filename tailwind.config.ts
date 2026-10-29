import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '3rem',
      },
    },
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1600px',
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'Lato', 'sans-serif'],
        serif: ['var(--font-sans)', 'Lato', 'sans-serif'],
      },
      colors: {
        teal: {
          DEFAULT: '#0E7A7A',
          hover: '#008489',
          light: '#399C9F',
          dark: '#0A5E5E',
          muted: '#E6F3F3',
        },
        primary: {
          DEFAULT: '#0E7A7A',
          hover: '#008489',
          light: '#399C9F',
          dark: '#0A5E5E',
          muted: '#E6F3F3',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          secondary: '#F7F7F7',
        },
        // Aliasuri păstrate pentru lizibilitate și tranziție curată:
        // navy -> #1F284B / #2C2C2C (titluri și text închis lizibil pe alb)
        navy: {
          DEFAULT: '#1F284B',
          dark: '#2C2C2C',
          light: '#2C2C2C',
          muted: '#777777',
        },
        // gold -> #0E7A7A (Primary Teal)
        gold: {
          DEFAULT: '#0E7A7A',
          light: '#008489',
          dark: '#008489',
          muted: '#F7F7F7',
        },
        // cream -> #FFFFFF (alb curat, iar cream-dark #F7F7F7 pentru suprafețe secundare)
        cream: {
          DEFAULT: '#FFFFFF',
          light: '#FFFFFF',
          dark: '#F7F7F7',
        },
        status: {
          success: '#00BB5D',
          'success-light': '#E6F8EF',
          warning: '#F29100',
          'warning-light': '#FEF4E5',
          danger: '#F9503D',
          'danger-light': '#FEECEB',
          info: '#008489',
          'info-light': '#E6F3F3',
        },
        category: {
          popular: '#0E7A7A',
          natura: '#008489',
          cultural: '#1F284B',
          citybreak: '#399C9F',
          exclusiv: '#2C2C2C',
        },
        gray: {
          dark: '#2C2C2C',
          DEFAULT: '#777777',
          light: '#909090',
          lighter: '#EBEBEB',
          lightest: '#F7F7F7',
        },
      },
      boxShadow: {
        float: '0 6px 20px rgba(0, 0, 0, 0.06)',
        card: '0 6px 20px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 6px 20px rgba(0, 0, 0, 0.06)',
        dropdown: '0 6px 20px rgba(0, 0, 0, 0.06)',
        hero: '0 6px 20px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        card: '0.5rem',
        badge: '0.375rem',
      },
    },
  },
  plugins: [],
};

export default config;
