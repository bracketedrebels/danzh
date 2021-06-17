module.exports = {
  mode: "jit",
  darkMode: "media",
  purge: ["./src/**/*.tsx", "./static/**/*.html"],
  theme: {
    extend: {
      spacing: {
        "vp-1/2": "50vw",
        "vp-1/3": "33.333333vw",
        "vp-2/3": "66.666667vw",
        "vp-1/4": "25vw",
        "vp-2/4": "50vw",
        "vp-3/4": "75vw",
        "vp-full": "100vw",
      },
      fontFamily: {
        regular: ["Inter", "sans"],
        standout: ["Jost", "sans-serif"],
      },
      fontWeight: {
        bold: 700,
        normal: 300,
        DEFAULT: 300,
      },
    },
  },
  plugins: [
    require("tailwindcss-pseudo-elements")({
      contentUtilities: true,
      emptyContent: true,
    }),
  ],
}
