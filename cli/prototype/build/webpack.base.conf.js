var path = require('path')
var utils = require('./utils')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: resolve('src/main.js')
  },
  output: {
    path: path.resolve(__dirname, './src'),
    publicPath: '/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('../node_modules')
    ],
    alias: {
      'src': resolve('src'),
      components: resolve('src/components'),
      '@src': path.resolve('src'),
      '@common': path.resolve('src/common'),
      '@http': resolve('src/http')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        // 也就是说，对.js和.vue文件在编译之前进行检测，检查有没有语法错误
        loader: 'eslint-loader',
        // 此选项指定enforce: 'pre'选项可以确保，eslint插件能够在编译之前检测，如果不添加此项，就要把这个配置项放到末尾，确保第一个执行
        enforce: 'pre',
        // include选项指明这些目录下的文件要被eslint-loader检测，还有一个exclude表示排除某些文件夹
        include: [resolve('src')],
        // options表示传递给eslint-loader的参数
        options: {
          // formatter是参数的名称，eslint-friendly-formatter是eslint的一个报告总结插件，也就是说eslint的检测
          // 报告非常难看懂，这个插件就是整理这些报告方便查阅的
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        // 对js文件使用babel-loader转码,该插件是用来解析es6等代码
        loader: 'babel-loader',
        // 指明src和test目录下的js文件要使用该loader
        include: [resolve('src')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(wav)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        // 字体文件处理，和上面一样
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
