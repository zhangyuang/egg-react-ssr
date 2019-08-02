'use strict'

const multiStream = require('multistream')
const fs = require('fs')
const stringToStream = require('string-to-stream')
const serialize = require('serialize-javascript')

const renderToStream = async (ctx, chunkName, config) => {
  const baseDir = config.baseDir || process.cwd()
  const isLocal = config.env === 'local'
  const isCsr = config.type === 'csr'
  let baseHtml = config.baseHtml || fs.readFileSync(config.template, 'utf-8').toString()
  if (!global.renderToNodeStream) {
    const ReactDOMServer = require(baseDir + '/node_modules/react-dom/server')
    const { renderToNodeStream } = ReactDOMServer
    global.renderToNodeStream = renderToNodeStream
  }
  let stream
  if (!isCsr) {
    if (isLocal) {
      // 本地开发环境下每次刷新的时候清空require服务端文件的缓存，保证服务端与客户端渲染结果一致
      delete require.cache[config.serverJs(chunkName)]
    }
    const serverStream = config.serverStream || require(config.serverJs(chunkName))
    const serverRes = await serverStream.default(ctx)
    stream = global.renderToNodeStream(serverRes)
  }

  baseHtml = baseHtml.replace('<!-- Start Server Render Head -->', config.head ? config.head.join('') : '')

  const docArr = baseHtml.split('<!-- Start Server Render Document -->')

  const beginDoc = docArr[0].trim().replace('\n', '')
  const beginDocStream = stringToStream(beginDoc.replace('<!-- Start Injecting Style Flows Up and Down -->', `${config.injectCss(chunkName).join('')}`))
  const initialData = !isCsr ? `<script>window.__USE_SSR__=true;window.__USESSR__=true;window.__INITIAL_DATA__ =${serialize(ctx.serverData || {})};</script>` : ''
  const injectScript = config.injectScript ? config.injectScript(chunkName).join('') : config.injectSrcipt(chunkName).join('')

  const endDoc = docArr[1].trim().replace('\n', '')
  const endDocStream = stringToStream(endDoc.replace('<!-- Start InitialData Script  -->', initialData).replace('<!-- Start Client Script -->', injectScript))
  const streamArr = isCsr ? [beginDocStream, endDocStream] : [beginDocStream, stream, endDocStream]
  return multiStream(streamArr)
}

export default renderToStream
