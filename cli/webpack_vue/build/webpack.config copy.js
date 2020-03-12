const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const htmlPlugin = new HtmlWebpackPlugin({ // 创建插件的实例对象
  template: './src/index.html', // 指定要用到的模板文件
  filename: 'index.html' // 指定生成的文件的名称，该文件存在于内存中，在目录中不显示
})

module.exports = {
  entry: { // 入口文件
    app: path.join(__dirname, './src/index.js') // 启动文件
  },
  output: { // 输出文件
    path: path.join(__dirname, './dist'), // 输出位置
    filename: 'bundle.js' // 输出文件的名称 // [name] -> 为app
  },
  // 编译模式
  mode: 'development', // 开发
  // mode: 'production', // 生产
  devtool: 'cheap-module-eval-source-map', // 可以将编译后的代码映射回原始源代码
  plugins: [htmlPlugin, new VueLoaderPlugin()], // plugin 数组是webpack打包期间会用到的一些插件列表
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/, use: 'url-loader?limit=193536' },
      { test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/ },
      { test: /\.vue$/, use: 'vue-loader' }
    ]
  }
}