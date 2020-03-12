const baseConfig = require('./webpack.base.js')
const merge = require('webpack-merge')
const webpack = require('webpack')

const devConfig = {
  mode: 'development', // 开发
  // 编译模式
  devtool: 'cheap-module-eval-source-map', // 可以将编译后的代码映射回原始源代码
  devServer: {
    contentBase: './dist', // 指定服务器根目录
    open: true, // 自动打开
    hot: true // 
  },
  plugins: [ // plugin 数组是webpack打包期间会用到的一些插件列表
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(baseConfig, devConfig)