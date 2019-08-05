
// 本文件目的是以React jsx 为模版替换掉html-webpack-plugin以及传统模版引擎, 统一ssr/csr都使用React组件来作为页面的骨架和内容部分

const webpack = require('webpack')
const fs = require('fs')
const promisify = require('util').promisify
const webpackWithPromise = promisify(webpack)
const WebpackDevServer = require('webpack-dev-server')
const baseConfig = require('./build/webpack.config.base')
const clientConfig = require('./build/webpack.config.client')
const React = require('react')
const { renderToNodeStream } = require('react-dom/server')
const config = require('./config/config.default')
const Module = require('module')

const isDev = process.env.NODE_ENV === 'development'
// 使用babel来处理es6 jsx语法
require('@babel/register')({
  ignore: [
    /node_modules/
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
      __isBrowser__: false,
      __renderCsrTpl__: true
    }]
  ]
})

Module._extensions['.less'] = () => {}
Module._extensions['.sass'] = () => {}
Module._extensions['.css'] = () => {}

const Layout = require('./web/layout').default

const reactToStream = (Component, props) => {
  return renderToNodeStream(React.createElement(Component, props))
}

config.chunkName = 'Page'

const props = {
  layoutData: {
    app: {
      config: config
    }
  }
}

if (isDev) {
  const compiler = webpack(clientConfig)
  const server = new WebpackDevServer(compiler, {
    publicPath: '/',
    hotOnly: true,
    host: 'localhost',
    contentBase: './dist',
    hot: true,
    port: 8000,
    clientLogLevel: 'error',
    headers: {
      'access-control-allow-origin': '*'
    },
    before (app) {
      app.get('/', async (req, res) => {
        const stream = reactToStream(Layout, props)
        stream.pipe(res, { end: false })
        stream.on('end', () => {
          res.end()
        })
      })
    }
  })

  server.listen(8000, 'localhost', () => {
    console.log('Starting server on http://localhost:8000')
  })
} else {
  (async () => {
    const stats = await webpackWithPromise(clientConfig)
    console.log(stats.toString({
      assets: true,
      colors: true,
      hash: true,
      timings: true,
      version: true
    }))
    const readStream = renderToNodeStream(React.createElement(Layout, props))
    const writeStream = fs.createWriteStream('./dist/index.html')
    readStream.pipe(writeStream)
  })()
}
