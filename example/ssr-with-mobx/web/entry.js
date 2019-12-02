import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, StaticRouter, Route } from 'react-router-dom'
import defaultLayout from '@/layout'
import { getWrappedComponent, getComponent } from 'ykfe-utils'
import { Provider } from 'mobx-react'
import { routes as Routes } from '../config/config.ssr'
import Store from './store'

const createStore = () => new Store({
  initStore: window.__INITIAL_DATA__
})

const storeContext = React.createContext(null)

const StoreProvider = ({ children }) => {
  const store = createStore()
  return <storeContext.Provider value={store}>{children}</storeContext.Provider>
}

export const useStore = () => {
  const store = React.useContext(storeContext)
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('useStore must be used within a StoreProvider.')
  }
  return store
}
const clientRender = async () => {
  ReactDOM[window.__USE_SSR__ ? 'hydrate' : 'render'](
    <StoreProvider>
      <BrowserRouter>
        {
        // 使用高阶组件getWrappedComponent使得csr首次进入页面以及csr/ssr切换路由时调用getInitialProps
          Routes.map(({ path, exact, Component }, key) => {
            const ActiveComponent = Component()
            const Layout = ActiveComponent.Layout || defaultLayout
            const WrappedComponent = getWrappedComponent(ActiveComponent)
            return <Route exact={exact} key={path}path={path} render={() => <Layout><WrappedComponent /></Layout>} />
          })
        }
      </BrowserRouter>
    </StoreProvider>
    , document.getElementById('app'))

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept()
  }
}

const serverRender = async (ctx) => {
  const store = initStore({})
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
