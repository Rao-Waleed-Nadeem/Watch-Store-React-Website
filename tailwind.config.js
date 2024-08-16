/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      phone: "320px",
      // => @media (min-width: 320px) { ... }

      tabletPortrait: "600px",
      // => @media (min-width: 600px) { ... }

      tabletLandscape: "768px",
      // => @media (min-width: 768px) { ... }

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }

      largeScreen: "1440px",
      // => @media (min-width: 1440px) { ... }
    },
  },
  plugins: [],
};
