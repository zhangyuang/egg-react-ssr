import { Controller } from 'egg';
import { scope } from '../decorator/scope';
import { Router } from '../decorator/route';
import { AppRoute } from '../../config/config.default';


@scope()
export default class HomeController extends Controller {

  @Router(AppRoute.index)
  @Router(AppRoute.news)
  public async index() {
    const { ctx } = this;
    try {
      ctx.type = 'text/html'
      ctx.status = 200
      const stream = await await ctx.renderToStream("Page");
      ctx.body = stream;
    } catch (error) {
      ctx.logger.error(`page controller error ${error}`)
    }
  }
}
