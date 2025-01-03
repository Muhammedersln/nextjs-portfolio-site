/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
        mulish: ['var(--font-mulish)', 'sans-serif'],
      },
      colors: {
        accent: {
          DEFAULT: '#DD4242',  // Main Color
        },
        text: {
          body: '#A9AFC3',    // Body Text Color
          heading: '#FFFFFF',  // Headings Color
        },
        bg: {
          primary: '#111319',   // Background 1 Color
          secondary: '#191C26', // Background 2 Color
        },
      },
      keyframes: {
        rainbow: {
          '0%, 100%': {
            'background-position': '0% 50%',
            'filter': 'hue-rotate(0deg)',
          },
          '50%': {
            'background-position': '100% 50%',
            'filter': 'hue-rotate(360deg)',
          }
        },
      },
      animation: {
        rainbow: 'rainbow 20s linear infinite',
      },
      backgroundSize: {
        'gradient-size': '400% 400%',
      },
    },
  },
  plugins: [],
};

export default config;
