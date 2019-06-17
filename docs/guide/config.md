# 构建配置

## 通用配置

服务器端渲染(SSR)项目的配置大体上与纯客户端项目类似，我们建议将配置分为三个文件：base, client 和 server。基本配置(base config)包含在两个环境共享的配置，例如，resolve，plugins，module，别名(alias)和 loader等配置项。服务器配置(server config)和客户端配置(client config)，可以通过使用 webpack-merge 来简单地扩展基本配置。

- base config

```javascript
module.exports = {
  // Webpack 在启动后会从配置的入口模块出发找出所有依赖的模块，Resolve 配置 Webpack 如何寻找模块所对应的文件。
  // Webpack 内置 JavaScript 模块化语法解析功能，默认会采用模块化标准里约定好的规则去寻找，但你也可以根据自己的需要修改默认的规则。
  resolve: {
    // 引用文件别名
    alias: {
      '@': path.resolve(__dirname, '../web')
    },
    // 在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在。resolve.extensions 用于配置在尝试过程中用到的后缀列表。
    extensions: [
      'web.mjs',
      'mjs',
      'web.js',
      'js',
      'web.ts',
      'ts',
      'web.tsx',
      'tsx',
      'json',
      'web.jsx',
      'jsx'
    ].map(ext => `.${ext}`)
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

## server 配置

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
  // 不要打包这些模块，而是在运行时从环境中请求他们
  // 服务端中需要对样式文件加白名单，服务端中不可以直接引用样式文件
  externals: nodeExternals({
    whitelist: /\.(css|less|sass|scss)$/
  }),
  // 生成的打包文件路径
  output: {
    path: paths.appBuild,
    publicPath: '/',
    filename: '[name].server.js',
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
  mode: process.env.NODE_ENV,
  // 通过在浏览器调试工具(browser devtools)中添加元信息(meta info)增强调试
  devtool: devtool,
  // 打包入口
  entry: {
    Page: paths.entry
  },
  // 生成的打包文件路径
  output: {
    path: paths.appBuild,
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
  // true：提供 polyfill。
  // "mock"：提供 mock 实现预期接口，但功能很少或没有。
  // "empty"：提供空对象。
  // false: 什么都不提供。预期获取此对象的代码，可能会因为获取不到此对象，触发 ReferenceError 而崩溃。尝试使用 require('modulename') 导入模块的代码，可能会触发 Cannot find module "modulename" 错误。
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  performance: false
})
```
