export const routelist: RouteInfo[] = [];

/**
 * 路由配置项
 *
 * @export
 * @param {string} _route
 */
export function Router(route?: string) {
    let approutelist = routelist
    return (target: any, methodName: string, _descriptor: PropertyDescriptor) => {

        /** 控制器名称 */
        const controller = CharService.toSmallHump(String(target.constructor.name).replace("Controller", ""));

        const configRoute = (scope: string) => {
            let routeItem: RouteInfo | null = null;
            if (route && route != "") {
                routeItem = {
                    controller: controller,
                    action: methodName,
                    routeUrl: route,
                    scope: scope
                };
            }
            else {
                routeItem = {
                    controller: controller,
                    action: methodName,
                    routeUrl: `${scope !== '' ? `/${scope}` : ``}${controller != "home" ? `/${controller}` : ``}/${CharService.toLine(methodName)}`,
                    scope: scope
                };
            }
            approutelist.push(routeItem);
        }

        /** 支持复用路由 如果有多个路由 则元数据 为 设置路由函数数组 */
        if (Reflect.getMetadata("configRoute", target.constructor.prototype, methodName)) {
            const configRouteList = [Reflect.getMetadata("configRoute", target.constructor.prototype, methodName)];
            configRouteList.push(configRoute);
            Reflect.defineMetadata("configRoute", configRouteList, target.constructor.prototype, methodName);
        }
        else {
            Reflect.defineMetadata("configRoute", configRoute, target.constructor.prototype, methodName);
        }
    }
}

/**
 * 服务端路由信息接口
 *
 * @export
 * @interface RouteInfo
 */
export interface RouteInfo {

    /**
     * 控制器名称
     *
     * @type {string}
     * @memberof RouteConfig
     */
    controller: string;

    /**
     * 动作名称
     *
     * @type {string}
     * @memberof RouteConfig
     */
    action: string;

    /**
     * 域
     *
     * @type {string}
     * @memberof RouteConfig
     */
    scope: string;

    /**
     * 路由地址
     *
     * @type {string}
     * @memberof RouteConfig
     */
    routeUrl: string;
}

/**
 * 文字操作类
 *
 * @class CharService
 */
class CharService {

    // 下划线转换驼峰
    public static toHump(word: string) {
        // Support: IE9-11+
        return word.replace(/-([a-z])/g, (_all, letter) => {
            return letter.toUpperCase();
        });
    }


    // 驼峰转换下划线
    public static toLine(name): string {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
    }

    public static toSmallHump(word: string) {
        return word.substring(0, 1).toLowerCase() + word.substring(1, word.length);
    }
}