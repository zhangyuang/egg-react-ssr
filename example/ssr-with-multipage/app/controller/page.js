const Controller = require('egg').Controller
const renderToStream = require('ykfe-utils/lib/renderToStream')
const path = require('path')
const ssrConfig = require('../../config/config.ssr')
const dist = path.resolve(process.cwd(), 'dist')

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
      const injectCss = [
        `/static/css/vendor.chunk.css`,
        `/static/css/${entry}.chunk.css`
      ]
      const serverJs = `${dist}/${entry}.server.js`
      const layout = `${dist}/Layout.server.js`
      Object.assign(ctx.app.config, ssrConfig, {
        serverJs,
        injectCss,
        injectScript,
        layout
      })

      const stream = await renderToStream(ctx, ctx.app.config)
      ctx.body = stream
    } catch (error) {
      ctx.logger.error(`Page Controller renderToStream Error ${error}`)
    }
  }
}

module.exports = PageController
