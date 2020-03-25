# webpack的安装与配置

## webpack 的基本使用
### 项目中安装和配置webpack
- `npm i webpack -D` webpack包
- `npm i webpack-cli -D` webpack脚手架 \
创建 `webpack.config.js` 配置文件
```
module.exports = {
  mode: 'development', // 开发
  // mode: 'production' // 生产
...
```
  package.json
```
 "scripts": {
   "dev": "webpack"
 ...
```
通过 `npm run dev` 命令启动 `webpack`

### 配置打包的入口和出口
`webpack` 的 `4.X` 版本中默认
- 打包的`入口文件`为 `src` -> `index.js`
- 打包的`出口文件`为 `dist` -> `main.js`
- `npm i path -D` node 核心依赖，进行路径获取 \
  webpack.config.js
```
const path = require('path')
module.exports = {
  entry: { // 入口文件
    app: path.join(__dirname, './src/index.js') // 启动文件
  },
  output: { // 输出文件
    path: path.join(__dirname, './dist'), // 输出位置
    filename: 'bundle.js' // 输出文件的名称 // [name] -> 为app
  }
...
```

### webpack的自动打包功能
- `npm i webpack-dev-server -D` webpack自动打包工具
  package.json
```
 "scripts": {
   "dev": "webpack-Dev-server"
...
```
将 src/index.html 中， script 脚本的引用路径，修改为 "/bundle.js"

### 配置html-webpack-plugin生成预览页面
- `npm i html-webpack-plugin -D` 生成预览页面
  webpack.config.js
```
const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlPlugin = new HtmlWebpackPlugin({ // 创建插件的实例对象
  template: './src/index.html', // 指定要用到的模板文件
  filename: 'index.html' // 指定生成的文件的名称，该文件存在于内存中，在目录中不显示
})
module.exports = {
  plugins: [htmlPlugin] // plugin 数组是webpack打包期间会用到的一些插件列表
  ...
```

### 自动打开页面
- --open 打包完成后自动打开浏览器页面
- --host 配置ip地址
- --port 配置端口

package.json
```
"scripts": {
    "dev": "webpack-Dev-server --open"
  ...
```

## 通过webpack中的加载器
默认只能打包js文件
- 通过loader打包非js模块
loader 加载器可以协助webpack打包处理特定的文件模块
  - less-loader 可以打包处理 .less 相关的文件
  - sass-loader 可以打包处理 .sass 相关的文件
  - url-loader 可以打包处理 css 中与 url 路径相关的文件

### 打包处理css文件
- `npm i style-loader -D` 
- `npm i css-loader -D`
  webpack.config.js
  - test 匹配的文件类型
  - use 对应调用的loader
* `注意`：
  - use 数组中指定的loader顺序是固定的 Array | String
  - 多个loader的调用顺序是：`从后往前调用`
```
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
  ...
```

### 打包处理less文件
- `npm i less -D` 
- `npm i less-loader -D`
  webpack.config.js
  - test 匹配的文件类型
  - use 对应调用的loader
* `注意`：
  - use 数组中指定的loader顺序是固定的
  - 多个loader的调用顺序是：`从后往前调用`
```
module.exports = {
  module: {
    rules: [
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }
  ...
```

### 打包处理scss文件
- `npm i node-sass -D` 
- `npm i sass-loader -D`
  webpack.config.js
  - test 匹配的文件类型
  - use 对应调用的loader
* `注意`：
  - use 数组中指定的loader顺序是固定的
  - 多个loader的调用顺序是：`从后往前调用`
```
module.exports = {
  module: {
    rules: [
      { test: /\.sass$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
  ...
```

### 打包处理stylus文件
- `npm i stylus -D` 
- `npm i stylus-loader -D`
  webpack.config.js
```
module.exports = {
  module: {
    rules: [
      { test: /\.styl(us)?$/, use: ['style-loader', 'css-loader', 'stylus-loader'] }
  ...
```

### 配置postCSS自动添加css的兼容前缀
eg: input 框的 placeholder 伪类样式 是有浏览器兼容的
- `npm i autoprefixer -D` 
- `npm i postcss-loader -D`

webpack.config.js
```
module.exports = {
 module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] }
  ...
```
  postcss.config.js
```
const autoprefixer = require('autoprefixer')
module.exports = {
  plugins: [autoprefixer]
  ...
```

### 样式表中的图片和字体文件
- `npm i file-loader -D`
- `npm i url-loader -D` \
webpack.config.js
* `注意`：
  - `?` 之后是loader的参数项
  - `limir` 用来指定图片的大小，单位是字节（byte），只有小于`limit`大小的图片才能转换为`base64`图片
```
module.exports = {
 module: {
    rules: [
      { test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/, use: 'url-loader?limit=16940' }
  ...
```

### 打包处理js文件中的高级语法
-  `npm i babel-loader @babel/core @babel/runtime -D` 安装babel转化器的相关包
-  `npm i @babel/preset-env @babel/plugin-transform-runtime @babel/plugin-proposal-class-properties -D` 安装babel语法插件相关包 \
babel.config.js
```
module.exports = {
  presets: ['@babel/preset-env'],
  plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties']
  ...
```
webpack.config.js
- `注意`:
  `exclude` 排除项
```
 module: {
    rules: [
      { test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/ }
...
```

### 打包前自动清空
- `npm i clean-webpack-plugin -D`
```
  plugins: [
    new CleanWebpackPlugin()
...
```

### 热模块替换HRM
```
const webpack = require('webpack')
  devServer: {
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
...
```

### 公共代码合并
-  `npm i webpack-merge -D` \
创建 build 文件夹
创建 webpack.base.js 文件
```
...
```

## vue 中的使用
### wbepack 中配置 vue 组件的加载器
-  `npm i vue-loader vue-template-compiler -D` \
webpack.config.js
```
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  plugins: [new VueLoaderPlugin()],
  module: {
    rules: [
      { test: /\.vue$/, use: 'vue-loader' }
...
```
`注意`：
此处存在 `vue` 和 `vue-template-compiler` 的版本必须一致的问题

### webpack 项目中使用 vue
-  `npm i vue -s` \
在 src/index.js 中， 通过 `import Vue from 'vue'` 来引导 `vue` 的构造函数
创建 `vue` 的实例对象，并制定要控制的 `el` 区域
通过 `render` 函数渲染 `App` 根组件
index.js
```
import Vue from 'vue'
import App from './components/app.vue'
const vm = new Vue({
  el: '#app',
  render: h => h(App)
})
```

### webpack打包与发布
package.json
```
  "scripts": {
    "build": "webpack -p"
...
```

### vue 脚手架中
package.json
```
"vue": {
    "devServer": {
      "port": 8888, // 修改端口号
      "open": true // 自动打开
    }
  }
```
建议将vue脚手架的相关配置，单独定义到 `vue.config.js` 的文件中
vue.config.js
```
module.exports = {
  devServer: {
    port: 8888,
    open: true
  }
}
```