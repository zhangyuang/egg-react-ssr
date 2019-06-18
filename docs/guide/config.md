# 构建配置

## 基础配置

服务器端渲染(SSR)项目的配置大体上与纯客户端项目类似，我们建议将配置分为三个文件：base, client 和 server。基本配置(base config)包含在两个环境共享的配置，例如，resolve，plugins，module，别名(alias)和 loader等配置项。服务器配置(server config)和客户端配置(client config)，可以通过使用 webpack-merge 来简单地扩展基本配置。

我们利用 webpack 分别对客户端代码和服务器端代码分别进行打包，服务器需要服务器 bundle 用于服务器端渲染(SSR)，而客户端 bundle 会发送给浏览器，用于客户端对服务端渲染的 html 进行事件绑定和接管。

- base config

webpack.base.conf.js 配置主要定义通用的rules，例如 MiniCssExtractPlugin 对样式文件的编译，对 js 文件 babel 编译，处理图片、字体等。其基本配置如下：

```javascript
'use strict'

const paths = require('./paths')
const path = require('path')
// style files regexes
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const getStyleLoaders = require('./util').getStyleLoaders
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')
const webpackModule = {
  strictExportPresence: true,
  rules: [
    { parser: { requireEnsure: false } },
    {
      oneOf: [
        .
        .
        .
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          // 只编译 web 目录下的文件，如果有特殊 node_modules 模块编译需求，可以在这里进行配置
          include: paths.appSrc,
          loader: require.resolve('babel-loader'),
          options: {
            cacheDirectory: true,
            cacheCompression: false
          }
        },
        // 处理样式文件配置项
        .
        .
        .
        {
          test: /\.less$/,
          exclude: /\.module\.less$/,
          use: getStyleLoaders(
            {
              importLoaders: 2,
              localIdentName: '[local]'
            },
            'less-loader'
          ),
          sideEffects: true
        },
        {
          test: /\.module\.less$/,
          use: getStyleLoaders(
            {
              importLoaders: 2,
              modules: true,
              getLocalIdent: getCSSModuleLocalIdent
            },
            'less-loader'
          )
        },
        {
          exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
          loader: require.resolve('file-loader'),
          options: {
            name: 'static/media/[name].[hash:8].[ext]'
          }
        }
      ]
    }
  ]
}

module.exports = {
  // Webpack 在启动后会从配置的入口模块出发找出所有依赖的模块，Resolve 配置 Webpack 如何寻找模块所对应的文件。
  // Webpack 内置 JavaScript 模块化语法解析功能，默认会采用模块化标准里约定好的规则去寻找，你也可以根据自己的需要修改默认的规则。
  resolve: {
    // 引用文件别名
    alias: {
      '@': xxxx
    },
    // 在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在。resolve.extensions 用于配置在尝试过程中用到的后缀列表。
    extensions: xxxx
  },
  // 1. 条件匹配：通过 test、include、exclude 三个配置项来命中 Loader 要应用规则的文件。
  // 2. 应用规则：对选中后的文件通过 use 配置项来应用 Loader，可以只应用一个 Loader 或者按照从后往前的顺序应用一组 Loader，同时还可以分别给Loader 传入参数。
  // 3. 重置顺序：一组 Loader 的执行顺序默认是从右到左执行，通过 enforce 选项可以让其中一个 Loader 的执行顺序放到最前或者最后。
  module: webpackModule,
  // 用来拓展webpack功能的，它们会在整个构建过程中生效，执行相关的任务。
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css',
      chunkFilename: 'static/css/[name].chunk.css'
    })
  ],
  // 配置如何展示性能提示。例如，如果一个资源超过 250kb，webpack 会对此输出一个警告来通知你。
  performance: false
}
```

我们为了保证开发环境和生产环境的统一，在上面配置中的 CSS 样式处理配置我们没有用 style-loader，而是用 css-hot-loader，具体解释详见 [CSS HMR 实现](/guide/hmr.html#css-hmr-实现)。

## server 配置

server 构建配置中，需要注意以下几个点：

1. 在整个输出模块里新增target选项

```
// 告诉webpack当前环境是 Node 环境，可以使用 Node.js require 加载 chunk。
target："node"
```

2. externals 白名单

这里使用 `webpack-node-externals` 模块，方便对 Node 的 externals 进行控制。该配置默认所有的第三方的依赖不会被打包编译。在配置中我们设置了白名单，对样式文件进行编译，因为在服务端代码中不能直接引用样式文件，需要借助 webpack 进行打包编译。

1. libraryTarget: 'commonjs2' 指定导出库的类型为 commonjs2

具体配置如下：

```javascript
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const nodeExternals = require('webpack-node-externals')
const paths = require('./paths')
const isDev = process.env.NODE_ENV === 'development'

const plugins = [
  new webpack.DefinePlugin({
    __isBrowser__: false
  })
]

// 合并 base 配置
module.exports = merge(baseConfig, {
  // 打包时可以通过 NODE_ENV 设置打包模式
  mode: process.env.NODE_ENV,
  // 通过在浏览器调试工具(browser devtools)中添加元信息(meta info)增强调试
  devtool: isDev ? 'eval-source-map' : '',
  // 打包入口
  entry: {
    Page: paths.entry
  },
  // 运行环境
  // 编译为类 Node.js 环境可用（使用 Node.js require 加载 chunk）
  target: 'node',
  // 不要/加白某些模块，是否需要进行编译打包，从运行时环境中引用
  // 服务端中需要对样式文件加白名单，服务端中不可以直接引用样式文件
  externals: nodeExternals({
    whitelist: /\.(css|less|sass|scss)$/
  }),
  // 生成的打包文件路径
  output: {
    path: paths.appBuild,
    publicPath: '/',
    filename: '[name].server.js',
    // 设置依赖引用规则为 commonjs2
    libraryTarget: 'commonjs2'
  },
  // 用来拓展 webpack 功能，它们会在整个构建过程中生效，执行相关的任务。
  plugins: plugins
})
```

## client 配置

```javascript
// 合并 base 配置
module.exports = merge(baseConfig, {
  // 打包时可以通过 NODE_ENV 设置打包模式
  // 'production' || 'development' || 'none'
  mode: process.env.NODE_ENV,
  // 通过在浏览器调试工具(browser devtools)中添加元信息(meta info)增强调试
  devtool: isDev ? 'cheap-module-source-map' : (process.env.GENERATE_SOURCEMAP !== 'false' ? 'source-map' : false),
  // 打包入口
  entry: {
    Page: paths.entry
  },
  // 生成的打包文件路径
  output: {
    path: 'your target output path',
    pathinfo: true,
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: publicPath,
    hotUpdateChunkFilename: '[hash].hot-update.js',
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
  },
  // 压缩配置
  optimization: optimization,
  // 用来拓展 webpack 功能，它们会在整个构建过程中生效，执行相关的任务。
  plugins: plugins.filter(Boolean),
  // node 模块
  // 1. true：提供 polyfill。
  // 2. "mock"：提供 mock 实现预期接口，但功能很少或没有。
  // 3. "empty"：提供空对象。
  // 4. false: 什么都不提供。预期获取此对象的代码，可能会因为获取不到此对象，触发 ReferenceError 而崩溃。
  // 尝试使用 require('modulename') 导入模块的代码，可能会触发 Cannot find module "modulename" 错误。
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  // 配置如何展示性能提示。例如，如果一个资源超过 250kb，webpack 会对此输出一个警告来通知你。
  performance: false
})
```

以上的配置是全部配置项的一些关键截取，在实际项目中如果对于配置有定制需求可以修改对应的 client/server 打包配置文件。所有的配置内容可以参考项目 [build](https://github.com/ykfe/egg-react-ssr/tree/master/build) 目录下的配置内容。
