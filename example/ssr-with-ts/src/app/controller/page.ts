import { Context, inject, controller, get, provide } from 'midway';
const { renderToStream } = require('ykfe-utils');
const ssrConfig = require('../../../config/config.ssr');

@provide()
@controller('/')
export class Page {

  @inject()
  ctx: Context;

  @get('/')
  async index() {
    try {
      // Page为webpack打包的chunkName，项目默认的entry为Page
      this.ctx.type = 'text/html';
      this.ctx.status = 200;
      Object.assign(this.ctx.app.config, ssrConfig);
      const stream = await renderToStream(this.ctx, this.ctx.app.config);
      this.ctx.body = stream;
      console.log('123')
    } catch (error) {
      this.ctx.logger.error(`Page Controller renderToStream Error ${error}`);
    }
  }
}
