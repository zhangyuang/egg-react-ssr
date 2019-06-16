import "reflect-metadata";

/**
 * controller 的文件夹
 * 控制器 域
 * @export
 * @param {string} [perfix=''] 域名称 可缺省
 * @returns
 */
export function scope(perfix: string = '') {
    return (target: Function) => {
        Reflect.defineMetadata("scope", perfix, target.prototype);
        /** 启动mock配置 || 启动路由配置 */
        Object.getOwnPropertyNames(target.prototype).forEach(p => {
            if (Reflect.getMetadata("configRoute", target.prototype, p) && Array.isArray(Reflect.getMetadata("configRoute", target.prototype, p))) {
                const configRouteList: any[] = Reflect.getMetadata("configRoute", target.prototype, p);
                configRouteList.forEach(p => {
                    const configRoute: Function = p;
                    configRoute(perfix);
                });
            }
            else if (Reflect.getMetadata("configRoute", target.prototype, p) && typeof Reflect.getMetadata("configRoute", target.prototype, p) === 'function') {
                const configRoute: Function = Reflect.getMetadata("configRoute", target.prototype, p);
                configRoute(perfix);
            }
        });
    }
}