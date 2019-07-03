import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, StaticRouter, Route } from 'react-router-dom'
import defaultLayout from '@/layout'
import { getWrappedComponent, getComponent } from 'ykfe-utils'
import { routes as Routes } from '../config/config.default'
import { Provider, useStaticRendering } from 'mobx-react'
import initStore from './store'

const clientRender = async () => {
  const store = initStore({
    __isBrowser__: __isBrowser__,
    initialState: window.__INITIAL_DATA__ || {}
  })
  // 客户端渲染||hydrate
  ReactDOM[window.__USE_SSR__ ? 'hydrate' : 'render'](
    <Provider store={store}>
      <BrowserRouter>
        {
        // 使用高阶组件getWrappedComponent使得csr首次进入页面以及csr/ssr切换路由时调用getInitialProps
          Routes.map(({ path, exact, Component }, key) => {
            const ActiveComponent = Component()
            const Layout = ActiveComponent.Layout || defaultLayout
            return <Route exact={exact} key={key} path={path} render={() => {
              const WrappedComponent = getWrappedComponent(ActiveComponent)
              return <Layout><WrappedComponent store={store} /></Layout>
            }} />
          })
        }
      </BrowserRouter>

    </Provider>
    , document.getElementById('app'))

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept()
  }
}

const serverRender = async (ctx) => {
  useStaticRendering(true)
  const store = initStore({
    __isBrowser__: __isBrowser__
  })
  ctx.store = store
  // 服务端渲染 根据ctx.path获取请求的具体组件，调用getInitialProps并渲染
  const ActiveComponent = getComponent(Routes, ctx.path)()
  const serverData = ActiveComponent.getInitialProps ? await ActiveComponent.getInitialProps(ctx) : {}
  const Layout = ActiveComponent.Layout || defaultLayout
  ctx.serverData = store

  return <Provider store={store}>
    <StaticRouter location={ctx.req.url} context={serverData}>
      <Layout>
        <ActiveComponent {...serverData} />
      </Layout>
    </StaticRouter>
  </Provider>
}

export default __isBrowser__ ? clientRender() : serverRender
