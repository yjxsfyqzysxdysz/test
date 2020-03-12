const baseConfig = require('./webpack.base.js')
const merge = require('webpack-merge')

const prodConfig = {
  // 编译模式
  mode: 'production' // 生产
}

module.exports = merge(baseConfig, prodConfig)
