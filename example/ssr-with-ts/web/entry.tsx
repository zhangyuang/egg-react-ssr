import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, StaticRouter, Route } from 'react-router-dom'
import defaultLayout from './layout'
import { Context } from 'midway'

import { RouteItem } from './interface/route'
const { routes } = require('../config/config.ssr')
const { getWrappedComponent, getComponent } = require('ykfe-utils')

const clientRender = async (): Promise<void> => {

  // 客户端渲染||hydrate
  ReactDOM[window.__USE_SSR__ ? 'hydrate' : 'render'](
    <BrowserRouter>
      {
        // 使用高阶组件getWrappedComponent使得csr首次进入页面以及csr/ssr切换路由时调用getInitialProps
        routes.map((item: RouteItem) => {
          const ActiveComponent = item.Component()
          const Layout = ActiveComponent.Layout || defaultLayout
          return <Route exact={item.exact} key={item.path} path={item.path} render={() => {
            const WrappedComponent = getWrappedComponent(ActiveComponent)
            return <Layout><WrappedComponent /></Layout>
          }} />
        })
      }
    </BrowserRouter>
    , document.getElementById('app'))
  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept()
  }
}

const serverRender = async (ctx: Context): Promise<JSX.Element> => {
  // 服务端渲染 根据ctx.path获取请求的具体组件，调用getInitialProps并渲染
  const ActiveComponent = getComponent(routes, ctx.path)()
  const Layout = ActiveComponent.Layout || defaultLayout
  const serverData = ActiveComponent.getInitialProps ? await ActiveComponent.getInitialProps(ctx) : {}
  ctx.serverData = serverData
  return <StaticRouter location={ctx.req.url} context={serverData}>
    <Layout layoutData={ctx}>
      <ActiveComponent {...serverData} />
    </Layout>
  </StaticRouter>
}
export default __isBrowser__ ? clientRender() : serverRender
