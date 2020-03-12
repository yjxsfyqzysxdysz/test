const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const htmlPlugin = new HtmlWebpackPlugin({ // 创建插件的实例对象
  template: './src/index.html', // 指定要用到的模板文件
  filename: 'index.html' // 指定生成的文件的名称，该文件存在于内存中，在目录中不显示
})

module.exports = {
  entry: { // 入口文件
    app: path.join(__dirname, '../src/index.js') // 启动文件
  },
  output: { // 输出文件
    path: path.join(__dirname, '../dist'), // 输出位置
    filename: 'bundle.js' // 输出文件的名称 // [name] -> 为app
  },
  // 编译模式
  plugins: [ // plugin 数组是webpack打包期间会用到的一些插件列表
    htmlPlugin,
    new VueLoaderPlugin(),
    new CleanWebpackPlugin()
  ],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.js'
    }
  },
  module: { // 打包规则
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] },
      // { test: /\.jpg|jpeg|png|svg$/, loader: 'file-loader', options: { name: '[name].[ext]' } }, // 修改输出名称
      // { test: /\.jpg|jpeg|png|gif|bmp|ttf|eot|svg|woff|woff2$/, use: 'url-loader?limit=193536' },
      { test: /\.jpg|jpeg|png|gif|bmp|ttf|eot|svg|woff|woff2$/, use: [{ loader: 'url-loader', options: { name: '[name].[ext]', limit: 2048 } }] },
      { test: /\.styl(us)?$/, use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'stylus-loader'] },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, // 刨除掉node_modules
      { test: /\.vue$/, use: 'vue-loader' }
    ]
  }
}