const { join } = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const plugins = [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)]

plugins.push(
  new PrerenderSPAPlugin({
    staticDir: join(__dirname, 'dist'),
    routes: ['/'],
    minify: {
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      decodeEntities: true,
      keepClosingSlash: true,
      sortAttributes: true,
      minifyCSS: true,
      removeComments: true,
    },
  })
)

if (process.env.VUE_APP_BUNDLE === 'true') {
  plugins.push(new BundleAnalyzerPlugin())
}

module.exports = {
  devServer: {
    disableHostCheck: true,
  },
  configureWebpack: {
    plugins,
  },
}
