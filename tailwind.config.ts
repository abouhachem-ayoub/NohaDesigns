import type { Config } from "tailwindcss";
const {fontFamily} = require("tailwindcss/defaultTheme");
const config: Config = {
  darkMode:'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
   theme: {
    extend: {
      colors:{
        primary:"#0D9276",
        secondary:"#FEECE2",
        tertiary:{
          dark:"#E78895",
          light:"#FEECE2"
        }
      },
      fontFamily:{
        poppins : ['var(--font-poppins)',...fontFamily.sans],
        lugrasimo : ['var(--font-lugrasimo)',...fontFamily.sans]
      }
    },
  },
  plugins: [],
};
export default config;
