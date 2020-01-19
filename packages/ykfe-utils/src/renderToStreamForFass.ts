import renderLayoutForFass from 'yk-cli/es/renderLayoutForFass'
import ReactDOMServer from 'react-dom/server'
import { Context }from 'midway'
import { Config }from './interface/config'
import { Global }from './interface/global'

declare const global: Global

const renderToStreamForFaas = async (ctx: Context, config: Config) => {
  const isLocal = config.env === 'local'
  const serverJs = config.serverJs
  let SEVER_JS = serverJs

  if (config.type !== 'ssr') {
    const str = await renderLayoutForFass(ctx)
    return str
  }

  if (isLocal && typeof serverJs === 'string') {
    // 本地开发环境下每次刷新的时候清空require服务端文件的缓存，保证服务端与客户端渲染结果一致
    delete require.cache[serverJs]
  }

  const serverComponent = typeof SEVER_JS === 'string' ? await require('@/' + serverJs).default(ctx) : SEVER_JS(ctx)
  const stream = ReactDOMServer.renderToNodeStream(serverComponent)
  return stream
}

export default renderToStreamForFaas
