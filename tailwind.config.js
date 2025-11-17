/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        russo: ['"Russo One"', "sans-serif"],
      },
      width: {
        112: "28rem", // 448px - double the Product dropdown width (224px)
      },
    },
  },
  plugins: [],
};
