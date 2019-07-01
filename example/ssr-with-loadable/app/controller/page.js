
const Controller = require('egg').Controller
const { renderToStream } = require('ykfe-utils')

class PageController extends Controller {
  async index () {
    const { ctx } = this
    try {
      // Page为webpack打包的chunkName，项目默认的entry为Page
      ctx.type = 'text/html'
      ctx.status = 200
      const stream = await renderToStream(ctx, 'Page', ctx.app.config)
      ctx.body = stream
    } catch (error) {
      ctx.logger.error(`Page Controller renderToStream Error ${error}`)
    }
  }
}

module.exports = PageController
