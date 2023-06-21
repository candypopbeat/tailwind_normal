module.exports = (ctx) => ({
  map: ctx.options.map,
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
});