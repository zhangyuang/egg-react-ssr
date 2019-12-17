import fs from 'fs'
import Shell from 'shelljs'
import axios from 'axios'
import { resolve } from 'path'
import { Context }from 'midway'
import { Config }from './interface/config'
import { Global }from './interface/global'

declare const global: Global

const isCDN = (url: string) => /.com/i.test(url)

const resolveDir = (path: string) => resolve(process.cwd(), path)

const getServerBundle = async (cdn: string, path: string) => {
  console.log('\x1B[32m get serverBundle from CDN file', cdn)
  const res = await axios.get(cdn)
  const str = res.data
  Shell.mkdir(resolveDir('./.serverBundle'))
  fs.writeFileSync(path, str)
  const serverJs = require(path).default
  return serverJs
}

const renderToStream = async (ctx: Context, config: Config) => {
  const baseDir = config.baseDir || process.cwd()
  const isLocal = process.env.NODE_ENV === 'development' || config.env === 'local' // 标志非正式环境
  let serverJs = config.serverJs
  const _isCDN = (typeof serverJs === 'string' && isCDN(serverJs)) ? serverJs : false
  let version
  let serverJsPath: string = ''
  if (_isCDN) {
    try {
      version = (/\d+(\.\d+)+/.exec(serverJs as string) as string[])[0] // cdn地址必须带有版本号
      serverJsPath = resolveDir(`./.serverBundle/server${version}.js`)
    } catch (error) {
      console.log('请检查cdn地址是否符合规范并带有版本号', error)
      return
    }
  }

  if (isLocal && typeof serverJs === 'string') {
    // 本地开发环境下每次刷新的时候清空require服务端文件的缓存，保证服务端与客户端渲染结果一致
    _isCDN ? delete require.cache[serverJsPath] : delete require.cache[serverJs]
  }
  if (_isCDN) {
    try {
      try {
        fs.statSync(serverJsPath)
        if (isLocal) {
          // 本地开发环境每次都从cdn拉取文件
          serverJs = await getServerBundle(serverJs as string, serverJsPath)
        }
      } catch (error) {
        // 首次访问本地没有对应的serverJsPath的情况需要从cdn拉取文件
        serverJs = await getServerBundle(serverJs as string, serverJsPath)
      }
      if (!isLocal) {
        // 正式环境直接require serverBundle
        console.log('\x1B[32m get serverBundle from local file', serverJsPath)
        serverJs = require(serverJsPath).default
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  let csr
  if (ctx.request && ctx.request.query) {
    // 兼容express和koa的query获取
    csr = ctx.request.query.csr
  }
  if (config.type !== 'ssr' || csr) {
    const renderLayout = require('yk-cli/lib/renderLayout').default
    const str = await renderLayout(ctx)
    return str
  }

  if (!global.renderToNodeStream) {
    // for this issue https://github.com/ykfe/egg-react-ssr/issues/4
    global.renderToNodeStream = require(baseDir + '/node_modules/react-dom/server').renderToNodeStream
  }
  if (!global.serverStream || isLocal) {
    global.serverStream = typeof serverJs === 'string' ? require(serverJs).default : serverJs
  }
  const serverRes = await global.serverStream(ctx)
  const stream = global.renderToNodeStream(serverRes)
  return stream
}

export default renderToStream
