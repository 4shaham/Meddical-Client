/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        btnColor: "rgba(16,27,85)",
        bgColors: "rgba(255,255,255)",
        serviceColors: "rgba(241,237,237)",
      },
    },
  },
  plugins: [],
};