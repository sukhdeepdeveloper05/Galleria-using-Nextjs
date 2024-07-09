/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        black: "#111",
        gray: "#555",
        lightGray: "#767676"
      },
    },
  },
  plugins: [],
};
