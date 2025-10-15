import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'watercolor': `
          radial-gradient(circle at 15% 50%, var(--pastel-pink-rgba-60), transparent 50%),
          radial-gradient(circle at 85% 30%, var(--pastel-lime-rgba-60), transparent 50%),
          radial-gradient(circle at 70% 80%, var(--pastel-beige-rgba-60), transparent 50%),
          radial-gradient(circle at 30% 10%, var(--pastel-pink-rgba-40), transparent 60%),
          radial-gradient(circle at 90% 90%, var(--pastel-lime-rgba-40), transparent 60%)
        `,
      },
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
  plugins: [    function({ addBase, theme }: { addBase: any; theme: any }) {
      addBase({
        ':root': {
          '--pastel-pink-rgba-60': 'rgba(251, 218, 222, 0.6)',
          '--pastel-lime-rgba-60': 'rgba(218, 255, 153, 0.6)',
          '--pastel-beige-rgba-60': 'rgba(245, 210, 157, 0.6)',
          '--pastel-pink-rgba-40': 'rgba(251, 218, 222, 0.4)',
          '--pastel-lime-rgba-40': 'rgba(218, 255, 153, 0.4)',
        }
      });
    }],
} satisfies Config;
