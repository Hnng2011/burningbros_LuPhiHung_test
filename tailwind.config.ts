import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "2rem", // Padding
        screens: {
          xl: "1200px",
          "2xl": "1400px", // Max width for 2xl
        },
      },
    },
  },
  daisyui: {
    themes: ["light", "dark", "bumblebee"],
  },

  plugins: [require("daisyui")],
};
export default config;
