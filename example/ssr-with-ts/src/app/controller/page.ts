import { controller, get, provide, inject, Context } from 'midway'
const renderToStream = require('ykfe-utils/lib/renderToStream')
const ssrConfig = require('../../../config/config.ssr')
import { IApiService } from '../../interface'

@provide()
@controller('/')
export class Page {

  @inject()
  ctx: Context

  @inject('ApiService')
  service: IApiService

  async index () {
    try {
      // Page为webpack打包的chunkName，项目默认的entry为Page
      this.ctx.type = 'text/html'
      this.ctx.status = 200
      this.ctx.apiService = this.service.index // 将service挂载到上下文对象
      Object.assign(this.ctx.app.config, ssrConfig)
      const stream = await renderToStream(this.ctx, this.ctx.app.config)
      this.ctx.res.write('<!DOCTYPE html>')
      this.ctx.body = stream
    } catch (error) {
      this.ctx.logger.error(`Page Controller renderToStream Error`, error)
    }
  }

}
@provide()
@controller('/user')
export class User {

  @inject()
  ctx: Context

  @get('/')
  async index () {
    try {
      // Page为webpack打包的chunkName，项目默认的entry为Page
      this.ctx.type = 'text/html'
      this.ctx.status = 200
      this.ctx.body = 'hello user'
    } catch (error) {
      this.ctx.logger.error(`Page Controller renderToStream Error`, error)
    }
  }

}
