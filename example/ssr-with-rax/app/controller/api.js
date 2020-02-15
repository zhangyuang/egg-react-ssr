
const Controller = require('egg').Controller

class PageController extends Controller {
  async index () {
    const { ctx } = this
    try {
      // Page为webpack打包的chunkName，项目默认的entry为Page
      ctx.type = 'text/json'
      ctx.status = 200
      ctx.body = await ctx.service.api.index()
    } catch (error) {
      ctx.logger.error(error)
    }
  }
}

module.exports = PageController
