/** @type {import('tailwindcss').Config} */
export default {
  presets: [require("@tailwindcss/preset-tailwind")], // default colors/utilities
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
