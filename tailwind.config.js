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
  plugins: [require("tailwindcss-filters"), require("@tailwindcss/forms")],
}
