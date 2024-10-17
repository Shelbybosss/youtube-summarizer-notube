/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = theme("colors"); // Directly get colors from the theme

  // Flatten the colors for CSS variables
  let newVars = Object.entries(allColors).reduce((vars, [colorName, colorValue]) => {
    if (typeof colorValue === "object") {
      Object.entries(colorValue).forEach(([shade, value]) => {
        vars[`--${colorName}-${shade}`] = value;
      });
    } else {
      vars[`--${colorName}`] = colorValue;
    }
    return vars;
  }, {});

  addBase({
    ":root": newVars,
  });
}
