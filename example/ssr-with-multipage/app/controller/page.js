const Controller = require('egg').Controller
// const renderToStream = require('ykfe-utils/lib/renderToStream')
const path = require('path')
const ssrConfig = require('../../config/config.ssr')
const dist = path.resolve(process.cwd(), 'dist')


const renderToStream = async (ctx, config) => {
  const baseDir = config.baseDir || process.cwd()
  const isLocal = process.env.NODE_ENV === 'development'
  const serverJs = config.serverJs
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

  if (!global.render) {
    // for this issue https://github.com/ykfe/egg-react-ssr/issues/4
    global.render = require(baseDir + '/node_modules/react-dom/server').renderToNodeStream
  }

  if (isLocal) {
    // 本地开发环境下每次刷新的时候清空require服务端文件的缓存，保证服务端与客户端渲染结果一致
    delete require.cache[serverJs]
  }

  if (!global.serverStream) {
    global.serverStream = {};
  }

  if (!global.serverStream[serverJs] || isLocal) {
    global.serverStream[serverJs] = typeof serverJs === 'string' ? require(serverJs).default : serverJs
  }

  const serverRes = await global.serverStream[serverJs](ctx)
  const stream = global.render(serverRes)
  return stream
}

class PageController extends Controller {
  async index (ctx) {
    try {
      ctx.type = 'text/html'
      ctx.status = 200
      const entry = ctx.entry
      const injectScript = [
        `<script src="/static/js/runtime~${entry}.js"></script>`,
        `<script src="/static/js/vendor.chunk.js"></script>`,
        `<script src="/static/js/${entry}.chunk.js"></script>`
      ]
      const injectCss = [`/static/css/${entry}.chunk.css`]
      const serverJs = `${dist}/${entry}.server.js`
      Object.assign(ctx.app.config, ssrConfig, {
        serverJs,
        injectCss,
        injectScript
      })

      const stream = await renderToStream(ctx, ctx.app.config)
      ctx.body = stream
    } catch (error) {
      ctx.logger.error(`Page Controller renderToStream Error ${error}`)
    }
  }
}

module.exports = PageController
