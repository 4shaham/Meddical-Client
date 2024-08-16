/** @type {import('tailwindcss').Config} */

import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}","/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}"],
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
});