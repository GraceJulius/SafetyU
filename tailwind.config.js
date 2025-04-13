/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          brand: {
            light: "#fcefee",
            pink: "#f9d5e5",
            purple: "#cfa0c9",
            dark: "#644c5c",
            accent: "#b3cde0",
          },
        },
        fontFamily: {
          sans: ["Poppins", "sans-serif"],
        },
        borderRadius: {
          xl: "1rem",
        },
      },
    },
    plugins: [],
  };
  