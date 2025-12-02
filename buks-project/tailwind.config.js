/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        generalsans: ["GeneralSans", "sans-serif"],
      },
      fontWeight: {
        extraLight: 200,
        medium: 500,
        bold: 700,
      }
    },
  },
  plugins: [],
};
