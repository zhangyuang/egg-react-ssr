
// 本文件目的是以React jsx 为模版替换掉html-webpack-plugin以及传统模版引擎, 统一ssr/csr都使用React组件来作为页面的骨架和内容部分

const webpack = require('webpack')
const fs = require('fs')
const promisify = require('util').promisify
const webpackWithPromise = promisify(webpack)
const cwd = process.cwd()
const WebpackDevServer = require('webpack-dev-server')
const baseConfig = require(cwd + '/build/webpack.config.base')
const clientConfig = require(cwd + '/build/webpack.config.client')
const React = require('react')
const { renderToString } = require('react-dom/server')
const config = require(cwd + '/config/config.default')
const Module = require('module')

// 使用babel来处理es6 jsx语法
require('@babel/register')({
  only: [
    /layout/ // babel只编译layout组件
  ],
  presets: [
    '@babel/preset-env',
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    ['babel-plugin-module-resolver', {
      root: ['./'],
      alias: baseConfig.resolve.alias
    }],
    ['transform-define', {
      __isBrowser__: false
    }]
  ]
})

Module._extensions['.less'] = () => {}
Module._extensions['.sass'] = () => {}
Module._extensions['.css'] = () => {}

const Layout = require(cwd + '/web/layout').default

const reactToString = (Component, props) => {
  return renderToString(React.createElement(Component, props))
}

const props = {
  layoutData: {
    app: {
      config: config
    }
  }
}

const string = reactToString(Layout, props)

const dev = () => {
  const compiler = webpack(clientConfig)
  const server = new WebpackDevServer(compiler, {
    publicPath: '/',
    hotOnly: true,
    host: 'localhost',
    contentBase: cwd + '/dist',
    hot: true,
    port: 8000,
    clientLogLevel: 'error',
    headers: {
      'access-control-allow-origin': '*'
    },
    before (app) {
      app.get('/', async (req, res) => {
        res.write(string)
        res.end()
      })
    }
  })
  server.listen(8000, 'localhost')
}

const build = async () => {
  const stats = await webpackWithPromise(clientConfig)
  console.log(stats.toString({
    assets: true,
    colors: true,
    hash: true,
    timings: true,
    version: true
  }))
  fs.writeFileSync(cwd + '/dist/index.html', string)
}

module.exports = {
  dev,
  build
}
