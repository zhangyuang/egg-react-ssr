import { Context }from 'midway'
import { useCdn } from './useCdn'
import { Config }from './interface/config'
import { Global }from './interface/global'

declare const global: Global

const renderToStream = async (ctx: Context, config: Config) => {
  const { useCDN, serverJs, baseDir } = config
  const _baseDir = baseDir || process.cwd()
  const isLocal = process.env.NODE_ENV === 'development' || config.env === 'local' // 标志非正式环境
  let _serverJs = serverJs

  if (useCDN) {
    _serverJs = await useCdn(serverJs as string, isLocal)
  }

  if (!useCDN && isLocal && typeof serverJs === 'string') {
    // 本地开发环境下每次刷新的时候清空require服务端文件的缓存，保证服务端与客户端渲染结果一致
    delete require.cache[serverJs]
  }

  const csr = ctx.request?.query?.csr ? ctx.request.query.csr : false // 兼容express和koa的query获取

  if (config.type !== 'ssr' || csr) {
    const renderLayout = require('yk-cli/lib/renderLayout').default
    const str = await renderLayout(ctx)
    return str
  }

  if (!global.renderToNodeStream) {
    // for this issue https://github.com/ykfe/egg-react-ssr/issues/4
    global.renderToNodeStream = require(_baseDir + '/node_modules/react-dom/server').renderToNodeStream
  }

  if (!global.serverStream) {
    global.serverStream = {}
  }

  let key: string = 'default'

  if (isLocal || !global.serverStream[key]) {
    key = typeof _serverJs === 'string' && _serverJs
    global.serverStream[key] = typeof _serverJs === 'string' ? require(_serverJs).default : _serverJs
  }

  const serverComponent = await global.serverStream(ctx)
  const stream = global.renderToNodeStream[key](serverComponent)

  return stream
}

export default renderToStream
