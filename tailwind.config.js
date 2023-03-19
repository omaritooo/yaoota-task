/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        offWhite: "#F9F7F7",
        offBlue: "#DBE2EF",
        blue: "#3F72AF",
        darkBlue: "#112D4E",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1440px",
        "2xl": "1536px",
      },
      container: {
        center: true,
        padding: "",
        screens: {
          sm: "560px",
          md: "713px",
          lg: "950px",
          xl: "1280px",
          "2xl": "1280px",
        },
      },
    },
  },
  plugins: [],
};
