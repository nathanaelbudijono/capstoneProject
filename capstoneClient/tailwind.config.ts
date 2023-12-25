/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "typography-50": "#fafafa",
        "typography-100": "#f5f5f5",
        "typography-200": "#e5e5e5",
        "typography-300": "#d4d4d4",
        "typography-400": "#a3a3a3",
        "typography-500": "#737373",
        "typography-600": "#525252",
        "typography-700": "#404040",
        "typography-800": "#262626",
        "typography-900": "#171717",
        "typography-950": "#0a0a0a",

        "primary-100": "#e6e9ef",
        "primary-200": "#8b9cb4",
        "primary-300": "#35527d",
        primary: "#02275d",

        "secondary-100": "#f5f6f7",
        "secondary-200": "#d1d5da",
        "secondary-300": "#bdc1c9",
        secondary: "#9ca3af",

        grey: "#363537",
        accent: "#a7accb",

        info: "#7dd3fc",
        warning: "#fac000",
        success: "#4ade80",
        danger: "#f87272",
      },
      screens: {
        xs: "400px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
