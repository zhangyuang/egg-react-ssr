import { Context } from 'midway'
import mergeStream from 'merge-stream'
import { getVersion, ReadableString } from './utils'
import { renderLayout } from './renderLayout'
import { useCdn } from './useCdn'
import { Config } from './interface/config'
import { Global } from './interface/global'

declare const global: Global

const renderToStream = async (ctx: Context, config: Config) => {
  const { useCDN, serverJs, baseDir, isRax, useReactToString } = config
  const BASE_DIR = baseDir || process.cwd()
  const isLocal = process.env.NODE_ENV === 'development' || config.env === 'local' // 标志非正式环境
  let SEVER_JS = serverJs

  if (useCDN && typeof serverJs === 'string') {
    const version = getVersion(serverJs)
    const filename = `serverBundle${version}`
    SEVER_JS = await useCdn(serverJs, isLocal, filename)
  }

  if (isLocal && typeof SEVER_JS === 'string') {
    // 本地开发环境下每次刷新的时候清空require服务端文件的缓存，保证服务端与客户端渲染结果一致
    delete require.cache[SEVER_JS]
  }

  const csr = ctx.request?.query?.csr ? ctx.request.query.csr : false // 兼容express和koa的query获取

  if (config.type !== 'ssr' || csr) {
    const str = await renderLayout(ctx, config)
    return str
  }

  if (!global.renderToNodeStream) {
    // for this issue https://github.com/ykfe/egg-react-ssr/issues/4
    if (useReactToString) {
      global.renderToNodeStream = require(BASE_DIR + '/node_modules/react-dom/server').renderToString
    } else {
      global.renderToNodeStream = isRax ? require(BASE_DIR + '/node_modules/rax-server-renderer').renderToString : require(BASE_DIR + '/node_modules/react-dom/server').renderToNodeStream
    }
  }

  const serverComponent = typeof SEVER_JS === 'string' ? await require(SEVER_JS).default(ctx) : await SEVER_JS(ctx)
  // @ts-ignore
  const stream = isRax ? global.renderToNodeStream(serverComponent, {
    defaultUnit: 'rpx'
  }) : global.renderToNodeStream(serverComponent)

  if (useReactToString || isRax) {
    return '<!DOCTYPE html>' + stream
  } else {
    const doctypeStream = new ReadableString('<!DOCTYPE html>')
     // @ts-ignore
    return mergeStream(doctypeStream, stream)
  }
}

export default renderToStream
