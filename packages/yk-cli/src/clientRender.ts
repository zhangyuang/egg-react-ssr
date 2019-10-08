// 本文件目的是以React jsx 为模版替换掉html-webpack-plugin以及传统模版引擎, 统一ssr/csr都使用React组件来作为页面的骨架和内容部分
import { mkdir } from 'shelljs'
import { Res } from './interface/ctx'
import { Argv } from './interface/argv'

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const fs = require('fs')
const promisify = require('util').promisify
const ora = require('ora')('正在构建')
const webpackWithPromise = promisify(webpack)
const cwd = process.env.BASE_DIR || process.cwd()
const str = require('./renderLayout')
const clientConfig = require(cwd + '/build/webpack.config.client')
process.on && process.on('message', data => {
  if (data.msg === 'start dev') {
    dev()
  }
})

const dev = (argv?: Argv) => {
  const PORT = (argv && argv.PORT) || 8000
  const compiler = webpack(clientConfig)
  const server = new WebpackDevServer(compiler, {
    quiet: true,
    disableHostCheck: true,
    publicPath: clientConfig.output.publicPath || '/',
    hotOnly: true,
    host: 'localhost',
    sockPort: PORT,
    contentBase: cwd + '/dist',
    hot: true,
    port: PORT,
    clientLogLevel: 'error',
    headers: {
      'access-control-allow-origin': '*'
    },
    before (app: any) {
      app.get('/', async (req: any, res: Res) => {
        res.write(str)
        res.end()
      })
    },
    after (app: any) {
      app.get(/^\//, async (req: any, res: Res) => {
        res.write(str)
        res.end()
      })
    }
  })
  server.listen(PORT, 'localhost', () => {
    console.log(`Starting server on http://localhost:${PORT}`)
    process.send && process.send({ msg: 'start dev finish' })
  })
}

const build = async () => {
  ora.start()
  const stats = await webpackWithPromise(clientConfig)
  console.log(stats.toString({
    assets: true,
    colors: true,
    hash: true,
    timings: true,
    version: true,
    warnings: false
  }))
  try {
    fs.writeFileSync(cwd + '/dist/index.html', str)
  } catch (error) {
    mkdir(cwd + '/dist')
    fs.writeFileSync(cwd + '/dist/index.html', str)
  }
  ora.succeed()
}

module.exports = {
  dev,
  build
}
