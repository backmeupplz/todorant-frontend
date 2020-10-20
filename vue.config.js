const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const plugins = []
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
