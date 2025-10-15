import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", ...defaultTheme.fontFamily.sans],
  cursive: ['"Dancing Script"', "cursive"],
      },
      colors: {
        "pastel-pink": "#FBDADE",
        "pastel-beige": "#F5D29D",
        "off-white": "#FEFEFE",
        "pastel-lime": "#DAFF99",
        "dark-charcoal": "#071B20",
      },
    },
  },
  plugins: [],
} satisfies Config;
