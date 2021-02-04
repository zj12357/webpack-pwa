module.exports = {
  plugins: [
    require('autoprefixer'),
    require("postcss-plugin-px2rem")({
      rootValue: 16,
      unitPrecision: 4
    })
  ]
}