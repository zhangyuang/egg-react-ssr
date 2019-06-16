import { Application } from 'egg';
import { routelist, RouteInfo } from './decorator/route';

export default (app: Application) => {

  const { controller, router } = app;

  /** 自动注入路由 */
  const list = new Array<RouteInfo>().concat(routelist);
  list.forEach(p => {
    if (p.scope !== "") {
      router.all(p.routeUrl, Reflect.get(Reflect.get(Reflect.get(controller, p.scope), p.controller), p.action));
    }
    else {
      router.all(p.routeUrl, Reflect.get(Reflect.get(controller, p.controller), p.action));
    }
  });

};
