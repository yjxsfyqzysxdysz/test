const path = require('path')
// const fs = require('fs')
const { defineConfig } = require('@vue/cli-service')
const resolve = dir => path.join(__dirname, dir)
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 体积分析
const Compressionplugin = require('compression-webpack-plugin') // gzip
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin') // 优化lodash
// const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin') // html中添加引入
// const DllReferencePlugin = require('webpack/lib/DllReferencePlugin') // dll

module.exports = defineConfig({
  transpileDependencies: true,
  // 分化配置
  configureWebpack: config => {
    const plugins = [
      // 优化lodash
      new LodashModuleReplacementPlugin(),
      // gzip
      new Compressionplugin({
        filename: '[file].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false // 是否删除源文件
      }),
      // 压缩提取出的css，并解决ExtractTextPlugin分离出的js重复问题(多个文件引入同一css文件)
      new OptimizeCSSPlugin()
    ]
    if (process.env.analyzer) {
      // 体积分析
      plugins.push(
        new BundleAnalyzerPlugin({
          //  可以是`server`，`static`或`disabled`。
          //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
          //  在`static`模式下，会生成带有报告的单个HTML文件。
          //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
          analyzerMode: 'server',
          //  将在“服务器”模式下使用的主机启动HTTP服务器。
          analyzerHost: '127.0.0.1',
          //  将在“服务器”模式下使用的端口启动HTTP服务器。
          analyzerPort: 8888,
          //  路径捆绑，将在`static`模式下生成的报告文件。
          //  相对于捆绑输出目录。
          reportFilename: 'index.html',
          //  模块大小默认显示在报告中。
          //  应该是`stat`，`parsed`或者`gzip`中的一个。
          //  有关更多信息，请参见“定义”一节。
          defaultSizes: 'parsed',
          //  在默认浏览器中自动打开报告
          openAnalyzer: false,
          //  如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
          generateStatsFile: false,
          //  如果`generateStatsFile`为`true`，将会生成Webpack Stats JSON文件的名字。
          //  相对于捆绑输出目录。
          statsFilename: 'stats.json',
          //  stats.toJson（）方法的选项。
          //  例如，您可以使用`source：false`选项排除统计文件中模块的来源。
          //  在这里查看更多选项：https：  //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
          statsOptions: null,
          logLevel: 'info' // 日志级别。可以是'信息'，'警告'，'错误'或'沉默'。
        })
      )
    }

    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      // 压缩代码并去掉console
      // config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
      // config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      // config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
      // config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log']
    } else {
      // 为开发环境修改配置...
    }
    config.plugins = [...config.plugins, ...plugins]
  },
  // 配置路径别名
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@com', resolve('src/components'))
      .set('@tools', resolve('src/tools'))
      .set('@img', resolve('src/assets/img'))

    // const files = fs.readdirSync(resolve('dll'))
    // files.forEach((file, index) => {
    //   if (/.*\.dll.js/.test(file)) {
    //     config
    //       .plugin('AddAssetHtmlWebpackPlugin' + index)
    //       .use(AddAssetHtmlWebpackPlugin, [{ filepath: resolve(`dll/${file}`) }])
    //   }
    //   if (/.*\.manifest.json/.test(file)) {
    //     config.plugin('DllReferencePlugin' + index).use(DllReferencePlugin, [
    //       {
    //         context: __dirname,
    //         manifest: resolve(`dll/${file}`)
    //       }
    //     ])
    //   }
    // })

    // htmlWebpackPlugin.options.title
  },
  // 传递第三方插件选项
  pluginOptions: {},
  // 全局注入通用样式
  css: {
    // extract: true, // 是否使用css分离插件 ExtractTextPlugin
    extract: {
      filename: 'style/[name].[hash:8].css',
      chunkFilename: 'style/[name].[hash:8].css'
    },
    sourceMap: true, // 开启 CSS source maps
    loaderOptions: {} // css预设器配置项
  }
})
