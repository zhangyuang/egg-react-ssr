// 本文件目的是以React jsx 为模版替换掉html-webpack-plugin以及传统模版引擎, 统一ssr/csr都使用React组件来作为页面的骨架和内容部分
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import { resolve } from 'path'
import { webpackWithPromise } from './util/webpack'
import { Argv } from './interface/argv'

const ora = require('ora')('正在构建')
const cwd = process.env.BASE_CWD || process.cwd()
const baseDir = process.env.BASE_DIR || '.'
const clientConfig = require(resolve(cwd, baseDir, './build/webpack.config.client'))

process.on && process.on('message', async data => {
  if (data.msg === 'start dev') {
    await dev()
  }
})

const dev = async (argv?: Argv) => {
  const PORT = (argv && argv.PORT) || process.env.FE_PORT || 8000
  const compiler = webpack(clientConfig)
  // @ts-ignore
  const server = new WebpackDevServer(compiler, Object.assign({
    stats: {
      assets: true, // 添加资源信息
      cachedAssets: false, // 显示缓存的资源（将其设置为 `false` 则仅显示输出的文件）
      children: false, // 添加 children 信息
      chunks: false, // 添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
      colors: true, // 以不同颜色区分构建信息
      modules: false, // 添加构建模块信息
      warnings: false,
      entrypoints: false
    },
    disableHostCheck: true,
    publicPath: clientConfig.output.publicPath || '/',
    host: '0.0.0.0',
    sockPort: PORT,
    contentBase: cwd + '/dist',
    hot: true,
    // @ts-ignore
    port: PORT,
    clientLogLevel: 'warning',
    headers: {
      'access-control-allow-origin': '*'
    },
    proxy: {
      '/api': 'http://localhost:7001'
    }
  }, clientConfig.devServer))
  // @ts-ignore
  server.listen(PORT, '0.0.0.0', (err) => {
    if (err) {
      throw err
    }
    process.send && process.send({ msg: 'start dev finish' })
  })
}

const build = async () => {
  ora.start()
  const stats: any = await webpackWithPromise(clientConfig)
  console.log(stats.toString(Object.assign({
    assets: true,
    colors: true,
    hash: true,
    timings: true,
    version: true,
    warnings: false
  }, clientConfig.stats)))
  ora.succeed('构建成功')
}

module.exports = {
  dev,
  build
}
