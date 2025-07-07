/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563eb", // blue-600
          dark: "#60a5fa", // blue-400
        },
        accent: {
          DEFAULT: "#f59e42", // orange-400
          dark: "#fbbf24", // yellow-400
        },
        background: {
          DEFAULT: "#f8fafc",
          dark: "#18181b",
        },
        foreground: {
          DEFAULT: "#18181b",
          dark: "#f8fafc",
        },
        card: {
          DEFAULT: "#fff",
          dark: "#23272f",
        },
        border: {
          DEFAULT: "#e5e7eb",
          dark: "#2d3748",
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#2563eb", // blue-600 (for buttons, highlights)
          accent: "#fb7185", // coral-400 (for accents)
          background: "#e0f2fe", // soft blue gradient base
          foreground: "#18181b", // dark for readability
          card: "#fff", // clean white cards
          border: "#bae6fd", // light blue border
        },
        dark: {
          primary: "#3b82f6", // blue-500 (for buttons, highlights)
          accent: "#fbbf24", // gold-400 (for accents)
          background: "#0a1833", // deep navy blue
          foreground: "#e0e7ef", // light blue-gray for text
          card: "#16213a", // slightly lighter navy for cards
          border: "#223056", // muted blue border
        },
      },
    ],
  },
}; 