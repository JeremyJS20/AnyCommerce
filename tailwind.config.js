const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    "./src/Main/*.{html,js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/Presentation/Components/*.{js,ts,jsx,tsx}",
    "./src/Presentation/Components/**/*.{js,ts,jsx,tsx}",
    "./src/Presentation/Components/**/**/*.{js,ts,jsx,tsx}",

    "./src/Presentation/Pages/**/*.{js,ts,jsx,tsx}",
    "./src/Presentation/Hooks/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      transitionProperty: {
        'width': 'width',
      },
    colors: {
      'ideal-green': '#48bb78'
    }
    },
    fontFamily: {
      RB: ["Roboto Mono", "cursive"],
    },
    screens: {
      mobile: '360px',
      tablet: '640px',
      laptop: '1024px',
      desktop: '1280px',
      desktopW: '1536px',
    }
  },
  darkMode: "class",
  plugins: [nextui()],
};