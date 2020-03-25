const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const filemanagerWebpackPlugin = require('filemanager-webpack-plugin')

module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
  outputDir: process.env.NODE_ENV === 'publish' ? 'tmp' : 'dist', // 输出文件目录：在npm run build时，生成文件的目录名称 默认dist
  // assetsDir: "src/assets", // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  filenameHashing: false, // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变)
  lintOnSave: 'warning', // 在每次保存时 lint 代码 true 或 'warning' 时，eslint-loader 会将 lint 错误输出为编译警告。默认情况下，警告仅仅会被输出到命令行，且不会使得编译失败
  // runtimeCompiler: false, // 是否使用包含运行时编译器的 Vue 构建版本 设置为 true 后你就可以在 Vue 组件中使用 template 选项
  // productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  // crossorigin: 'anonymous', // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。anonymous（在请求中的header中的带上Origin属性）、use-credentials（请求中带上cookie和其他的一些认证信息） 用于跨域
  // integrity: false, // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI) 部署在 CDN 上会提供额外的安全
  // 传递第三方插件选项
  pluginOptions: {
  },
  // 配置路径别名
  chainWebpack: config => { // 修改loader 
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets/'))
      .set('@com', resolve('src/components/'))
    if (process.env.NODE_ENV === 'publish') {
      config
        .entryPoints
        .clear().end()
        .entry('app')
        .add('./src/index.js')
        .end()
        .plugin('copy')
        .tap(args => [[...args[0], { from: resolve('packageinfo.json'), to: 'packageinfo.json' }]])
        .end()
        .plugin('filemanagerWebpackPlugin').use(new filemanagerWebpackPlugin({
          onEnd: [
            { delete: ['publish'] },
            { mkdir: ['publish'] },
            { archive: [{ source: 'tmp', destination: 'publish/dist.zip' }] },
            { delete: ['tmp'] }
          ]
        })).end()
    }
    // console.log(config)
  },
  // css: { // css配置
  //   extract: false, // 是否独立存在
  //   sourceMap: false // 是否显示映射
  // },
  // devServer: {
  //   proxy: 'http://localhost:8050'
  // },
  // 分化配置
  configureWebpack: config => { // webpack-merge 直接覆盖
    config.performance = {
      hints: false
    }
    if (process.env.NODE_ENV === 'production') { // 为生产环境修改配置
    } else if (process.env.NODE_ENV === 'development') { // 为开发环境修改配置
    } else if (process.env.NODE_ENV = 'publish') { // 上传模式
      config.output.filename = 'js/index.js'
      // console.log(config.optimization)
      // config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true // 清除console
    }
    // console.log(config)
  }
}
