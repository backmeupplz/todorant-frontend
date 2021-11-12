const { join } = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const TerserPlugin = require('terser-webpack-plugin')
const JsDomRenderer = require('@prerenderer/renderer-jsdom')

// This env property added by vue builder automatically
const isProd = import.meta.env.VITE_NODE_ENV === 'production'

const plugins = []
const optimization = {
  minimize: false,
  minimizer: [],
}

if (isProd) {
  // Plugins
  const webpackPlugin = new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  const prerender = new PrerenderSPAPlugin({
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
    renderer: new JsDomRenderer(),
  })
  // const bundleAnalyzer = new BundleAnalyzerPlugin()
  // plugins.push(bundleAnalyzer)
  plugins.push(webpackPlugin, prerender)
  // Optimizations
  const terser = new TerserPlugin({
    terserOptions: {
      compress: {
        drop_console: true,
      },
      output: {
        comments: false,
      },
    },
  })
  optimization.minimize = true
  optimization.minimizer.push(terser)
}

module.exports = {
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
  },
  configureWebpack: {
    plugins,
    optimization,
  },
}
