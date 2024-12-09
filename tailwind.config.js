/** @type {import('tailwindcss').Config} */
export const content = [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {
    colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",
      "main-gray": "#1E1E1E",
      "main-green": "#4A8073",
      "main-red": "#b82e30",
      "main-brown": "#A09489",
    },
  },
};
export const plugins = [];
