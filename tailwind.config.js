/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'background': '#23292E',
        'accent': '#373f47',
        'light': '#F6F4F5',
        'pear': '#BBCF3A',
        'pear-hover': '#D2DF7C',
        'rose': '#CA054D',
        'rose-hover': '#FA387F',
        'robin-egg': '#52D1DC', 
        'blue-accent': '#196E8A',
      },
    },
  },
  plugins: [],
};
