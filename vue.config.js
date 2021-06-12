const { join } = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const TerserPlugin = require('terser-webpack-plugin')

// This env property added by vue builder automatically
const isProd = process.env.NODE_ENV === 'production'

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
    postProcess: (result) => {
      const dom = new JSDOM(result.html)
      const app = dom.window.document.querySelector('div#app')
      if (app) {
        app.innerHTML = ''
      }

      result.html = dom.serialize()
      return result
    },
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
