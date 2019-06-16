import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, StaticRouter, matchPath } from 'react-router-dom'
import { Context } from 'egg';
import { Layout } from '@/layout';
import { clientroutelist } from './Route';
import { GetinitialProps } from 'ykfe-utils';


/**
 * 应用启动装饰器
 *
 * @export
 * @returns
 */
export function Startup() {

    let routelist = clientroutelist;


    return function (target) {

        if (!target.$IsCompile) {
            target.$IsCompile = true;

            /**
             * 客户端渲染
             */
            const clientRender = () => {
                ReactDOM.hydrate(
                    <BrowserRouter>
                        <Layout>
                            {
                                routelist.length > 0 ? (
                                    <Switch>
                                        {
                                            routelist.map((item, index) => {
                                                return (
                                                    <Route key={index} path={item.routeUrl} render={(props) => {
                                                        return React.createElement(GetinitialProps(item.component), props);
                                                    }} />
                                                )
                                            })
                                        }
                                    </Switch>
                                )
                                    : React.createElement(target)
                            }
                        </Layout>
                    </BrowserRouter>,
                    document.getElementById('app') as HTMLElement
                );

                if (process.env.NODE_ENV === 'development' && module.hot) {
                    module.hot.accept()
                }
            }

            /**
             * 服务端渲染方法
             * @param ctx egg context 上下文
             */
            const serverRender = async (ctx: Context) => {


                let component: any;
                if (routelist.length > 0) {
                    component = routelist.findIndex(p => matchPath(ctx.path, p.routeUrl)) > -1 ? routelist.find(p => matchPath(ctx.path, p.routeUrl))!.component : target
                }
                else {
                    component = target;
                }

                const serverData = component!.getInitialProps ? await component.getInitialProps(ctx) : {}
                ctx.serverData = serverData;

                return (
                    <StaticRouter location={ctx.req.url} context={ctx.serverData}>
                        <Layout>
                            {
                                React.createElement(component, serverData)
                            }
                        </Layout>
                    </StaticRouter>
                );
            }

            /** 赋值给当前渲染原型对象上 */
            Reflect.set(target, '$serverRender', serverRender);
            /** 从装饰器中启动客户端渲染 */
            if (__isBrowser__) {
                clientRender();
            }
        }
    }
}