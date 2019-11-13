import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, StaticRouter, Route } from 'react-router-dom'
import defaultLayout from '@/layout'
import { getWrappedComponent, getComponent } from 'ykfe-utils'
import { routes as Routes } from '../config/config.ssr'

const clientRender = async () => {
  // 客户端渲染||hydrate
  ReactDOM[window.__USE_SSR__ ? 'hydrate' : 'render'](
    <Suspense fallback={<div />}>
      <BrowserRouter>
        {
        // 使用高阶组件getWrappedComponent使得csr首次进入页面以及csr/ssr切换路由时调用getInitialProps
          Routes.map(({ path, exact, Component }) => {
            const activeComponent = Component()
            const WrappedComponent = getWrappedComponent(activeComponent)
            const Layout = WrappedComponent.Layout || defaultLayout
            return <Route exact={exact} key={path} path={path} render={() => {
              return <Layout><WrappedComponent /></Layout>
            }} />
          })
        }
      </BrowserRouter>
    </Suspense>
    , document.getElementById('app'))
  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept()
  }
}

const serverRender = async (ctx) => {
  // 服务端渲染 根据ctx.path获取请求的具体组件，调用getInitialProps并渲染
  const ActiveComponent = getComponent(Routes, ctx.path)()
  const Layout = ActiveComponent.Layout || defaultLayout
  return <Suspense fallback={<div />}>
    <StaticRouter location={ctx.req.url} >
      <Layout layoutData={ctx}>
        <ActiveComponent {...ctx} />
      </Layout>
    </StaticRouter>
  </Suspense>
}

export default __isBrowser__ ? clientRender() : serverRender
