import 'egg';

declare module 'egg' {

    /**
     * 扩展应用程序的配置
     */
    interface EggAppConfig extends NewEggAppConfig {

        /**
         * 使用的模版文件路径
         *
         * @type {string}
         * @memberof EggAppConfig
         */
        template: string;

        /**
         * webpack 构建的css产物
         * 客户端注入的css
         * @param {string} chunkName
         * @returns {string[]}
         * @memberof EggAppConfig
         */
        injectCss(chunkName: string): string[];

        /**
         * webpack 构建的css产物
         * 客户端注入的js
         * @param {*} chunkName
         * @returns {string}
         * @memberof EggAppConfig
         */
        injectSrcipt(chunkName): string[];

        /**
         * 服务端构建产物
         * 服务端读取的基本渲染js
         * @param {*} chunkName
         * @returns {string}
         * @memberof EggAppConfig
         */
        serverJs(chunkName): string;

    }

    /**
     * 服务端路由
     *
     * @interface ServerRoute
     */
    interface ServerRoute {
        /**
         * 服务端渲染解析的路由
         *
         * @type {string}
         * @memberof ServerRoute
         */
        path: string;

        /**
         *
         *
         * @type {boolean}
         * @memberof ServerRoute
         */
        exact?: boolean;

        /**
         * 服务端渲染的React组件
         *
         * @returns {React.Component}
         * @memberof ServerRoute
         */
        Component(): React.Component;

        /**
         * 服务端控制器
         *
         * @type {string}
         * @memberof ServerRoute
         */
        controller: string;

        /**
         * 服务端的action方法
         *
         * @type {string}
         * @memberof ServerRoute
         */
        handler: string;
    }
}