var path = require('path')
var config = require('../../config').frontend
var utils = require('./utils')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.cssSourceMap, extract: true })
  },
  devtool: false,
  output: {
    path: config.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    new ExtractTextPlugin({
      use: loaders,
      fallback: 'vue-style-loader',
      publicPath: '../../',
      filename: utils.assetsPath('css/[name].[contenthash].css')
      // filename: utils.assetsPath('[name]/styles.[contenthash].css')
    }),
  ]
})

module.exports = webpackConfig
