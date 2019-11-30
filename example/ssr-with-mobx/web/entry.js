import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, StaticRouter, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'
import defaultLayout from '@/layout'
import { getWrappedComponent, getComponent } from 'ykfe-utils'
import { routes as Routes } from '../config/config.ssr'
import Store from './store'

const clientRender = async () => {
  const store = window.store || new Store({
    initialState: window.__INITIAL_DATA__
  })
  window.store = store
  ReactDOM[window.__USE_SSR__ ? 'hydrate' : 'render'](
    <Provider store={store}>
      <BrowserRouter>
        {
        // 使用高阶组件getWrappedComponent使得csr首次进入页面以及csr/ssr切换路由时调用getInitialProps
          Routes.map(({ path, exact, Component }) => {
            const ActiveComponent = Component()
            const Layout = ActiveComponent.Layout || defaultLayout
            const WrappedComponent = getWrappedComponent(ActiveComponent)
            return <Route exact={exact} key={path} path={path} render={() => <Layout><WrappedComponent store={store} /></Layout>} />
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
  const store = new Store({})
  ctx.store = store
  // 服务端渲染 根据ctx.path获取请求的具体组件，调用getInitialProps并渲染
  const ActiveComponent = getComponent(Routes, ctx.path)()
  const serverData = ActiveComponent.getInitialProps ? await ActiveComponent.getInitialProps(ctx) : {}
  const Layout = ActiveComponent.Layout || defaultLayout
  ctx.serverData = store

  return <Provider store={store}>
    <StaticRouter location={ctx.req.url} context={serverData}>
      <Layout layoutData={ctx}>
        <ActiveComponent {...serverData} />
      </Layout>
    </StaticRouter>
  </Provider>
}

export default __isBrowser__ ? clientRender() : serverRender
