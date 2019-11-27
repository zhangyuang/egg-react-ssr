import { controller, provide, inject, Context, get } from 'midway'
import { IApiService } from '../../interface'
@provide()
@controller('/api')
export class Api {
  @inject()
    ctx: Context
  @inject('ApiService')
    service: IApiService
  @get('/getIndexData')
    async index () {
    try {
            // Page为webpack打包的chunkName，项目默认的entry为Page
      this.ctx.type = 'text/json'
      this.ctx.status = 200
      this.ctx.body = await this.service.index()
    } catch (error) {
      this.ctx.logger.error(`Page Controller renderToStream Error`, error)
    }
  }
}
