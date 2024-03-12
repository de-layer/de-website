import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
          inter: ["var(--font-inter)"],
          ropa: ["var(--font-ropa)"],
          cinzel: ["var(--font-cinzel)"],
          italiana: ["var(--font-italiana)"],
          nova: ["var(--font-nova)"],
          novanew: ["var(--font-novanew)"],
      },
      colors:{
        accent:'#08a1e3',
        primary: '#000000',
        secondary: '#F3F3F3',
        light: '#BABABA',
      }
    },
  },
  plugins: [],
};
export default config;
