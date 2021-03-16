module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  dark: "media",
  experimental: {
    darkModeVariant: true,
  },
  purge: ["./src/**/*.tsx", "./src/**/*.html"],
  prefix: "",
  important: false,
  separator: ":",
  corePlugins: {},
  theme: {
    fontFamily: {
      sans: ["Nunito", "sans-serif"],
      serif: ["Maitree", "serif"],
    },
  },
  plugins: [
    require("tailwindcss-css-filters"),
    require("tailwindcss-blend-mode")(),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
}
