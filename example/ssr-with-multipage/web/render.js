import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, StaticRouter } from 'react-router-dom'
import { getWrappedComponent, getComponent } from 'ykfe-utils'
import defaultLayout from '@/layout'

const clientRender = async (Routes) => {
  // 客户端渲染||hydrate
  ReactDOM[window.__USE_SSR__ ? 'hydrate' : 'render'](
    <BrowserRouter>
      {
        // 使用高阶组件getWrappedComponent使得csr首次进入页面以及csr/ssr切换路由时调用getInitialProps
        Routes.map(({ path, exact, Component }) => {
          const activeComponent = Component()
          const Layout = activeComponent.Layout || defaultLayout
          return <Route exact={exact} key={path} path={path} render={() => {
            const WrappedComponent = getWrappedComponent(activeComponent)
            return <Layout><WrappedComponent /></Layout>
          }} />
        })
      }
    </BrowserRouter>,
    document.getElementById('app')
  )
}

const serverRender = async (ctx, Routes) => {
  // 服务端渲染 根据ctx.path获取请求的具体组件，调用getInitialProps并渲染
  const ActiveComponent = getComponent(Routes, ctx.path)()
  const serverData = ActiveComponent.getInitialProps ? await ActiveComponent.getInitialProps(ctx) : {}
  const Layout = ActiveComponent.Layout || defaultLayout
  ctx.serverData = serverData

  return <StaticRouter location={ctx.req.url} context={serverData}>
    <Layout layoutData={ctx}>
      <ActiveComponent {...serverData} />
    </Layout>
  </StaticRouter>
}

export {
  clientRender,
  serverRender
}
