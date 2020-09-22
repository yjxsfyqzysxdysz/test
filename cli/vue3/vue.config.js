'use strict';
const path = require('path');
const resolve = dir => path.join(__dirname, dir);

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'dist', // 输出文件目录：在npm run build时，生成文件的目录名称
  // assetsDir: 'src/assets', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  lintOnSave: 'warning', // 在每次保存时 lint 代码 true 或 'warning' 时，eslint-loader 会将 lint 错误输出为编译警告。默认情况下，警告仅仅会被输出到命令行，且不会使得编译失败
  filenameHashing: true, // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变)
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本 设置为 true 后你就可以在 Vue 组件中使用 template 选项
  transpileDependencies: [], // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来
  productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  // 分化配置
  configureWebpack: config => {
    // htmlWebpackPlugin.options.title
    // webpack-merge
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  },
  // 配置路径别名
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets/'))
      .set('@com', resolve('src/components/'))
      .set('@img', resolve('src/assets/img/'))
      .set('@tools', resolve('src/tools/'))
      .set('@lib', resolve('src/lib/'))
  },
  // 传递第三方插件选项
  pluginOptions: {},
  // 全局注入通用样式
  css: {
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: true, // 开启 CSS source maps
    loaderOptions: {}, // css预设器配置项
  },
  /* webpack-dev-server 相关配置 */
  devServer: {
    /* 自动打开浏览器 */
    open: true,
    /* 设置为0.0.0.0则所有的地址均能访问 */
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false
    /* 使用代理 */
    // proxy: {
    //   '/api': {
    //     /* 目标代理服务器地址 */
    //     target: 'http://47.100.47.3/',
    //     /* 允许跨域 */
    //     changeOrigin: true
    //   }
    // }
  }
};
