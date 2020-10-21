const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const plugins = [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)]

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
