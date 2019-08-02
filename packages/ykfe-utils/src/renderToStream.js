'use strict'

const fs = require('fs')
const renderToStream = async (ctx, chunkName, config) => {
  const baseDir = config.baseDir || process.cwd()
  const isLocal = config.env === 'local'
  const isCsr = config.type === 'csr'
  if (!global.renderToNodeStream) {
    const ReactDOMServer = require(baseDir + '/node_modules/react-dom/server')
    const { renderToNodeStream, renderToString } = ReactDOMServer
    global.renderToNodeStream = renderToNodeStream
    global.renderToString = renderToString
  }
  let stream
  if (!isCsr) {
    if (isLocal) {
      // 本地开发环境下每次刷新的时候清空require服务端文件的缓存，保证服务端与客户端渲染结果一致
      delete require.cache[config.serverJs(chunkName)]
    }
    const serverStream = require(config.serverJs(chunkName))
    const serverRes = await serverStream.default(ctx, chunkName)
    stream = global.renderToNodeStream(serverRes)
    const str = global.renderToString(serverRes)
    console.log(process.cwd())
    fs.writeFileSync(process.cwd() + '/web/index.html', str)
  }

  return stream
}

export default renderToStream
