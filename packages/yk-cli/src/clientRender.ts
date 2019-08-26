// 本文件目的是以React jsx 为模版替换掉html-webpack-plugin以及传统模版引擎, 统一ssr/csr都使用React组件来作为页面的骨架和内容部分
import { Res } from './interface/ctx'

const webpack = require('webpack')
const fs = require('fs')
const promisify = require('util').promisify
const webpackWithPromise = promisify(webpack)
const cwd = process.env.BASE_DIR || process.cwd()
const WebpackDevServer = require('webpack-dev-server')
const str = require('./renderLayout')
const clientConfig = require(cwd + '/build/webpack.config.client')

process.on && process.on('message', data => {
  if (data.msg === 'start dev') {
    dev()
  }
})

const dev = () => {
  const compiler = webpack(clientConfig)
  const server = new WebpackDevServer(compiler, {
    quiet: true,
    disableHostCheck: true,
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
    before (app: any) {
      app.get('/', async (req: any, res: Res) => {
        res.write(str)
        res.end()
      })
    }
  })
  server.listen(8000, 'localhost', () => {
    console.log('Starting server on http://localhost:8000')
    process.send && process.send({ msg: 'start dev finish' })
  })
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
  fs.writeFileSync(cwd + '/dist/index.html', str)
}

module.exports = {
  dev,
  build
}
