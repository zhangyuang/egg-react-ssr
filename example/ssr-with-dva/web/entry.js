import React from 'react'
import ReactDOM from 'react-dom'
import dva from 'dva'
import { BrowserRouter, StaticRouter, Route, Switch } from 'react-router-dom'
import { getWrappedComponent, getComponent } from 'ykfe-utils'
import { createMemoryHistory, createBrowserHistory } from 'history'
import { routes as Routes } from '../config/config.ssr'
import defaultLayout from '@/layout'
import models from './models'

const initDva = (options) => {
  const app = dva(options)
  models.forEach(m => app.model(m))
  app.router(() => {})
  app.start()
  return app
}

const clientRender = () => {
  const initialState = window.__INITIAL_DATA__ || {}
  const history = createBrowserHistory()
  const app = initDva({
    initialState,
    history: history
  })
  const store = app._store

  app.router(() => (
    <BrowserRouter>
      <Switch>
        {
          Routes.map(({ path, exact, Component }) => {
            const ActiveComponent = Component()
            const Layout = ActiveComponent.Layout || defaultLayout
            const WrappedComponent = getWrappedComponent(ActiveComponent)
            return <Route exact={exact} key={path} path={path} render={() => <Layout><WrappedComponent store={store} /></Layout>} />
          })
        }
      </Switch>
    </BrowserRouter>
  ))
  const DvaApp = app.start()

  ReactDOM[window.__USE_SSR__ ? 'hydrate' : 'render'](<DvaApp />, document.getElementById('app'))

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept()
  }
}

const serverRender = async ctx => {
  const app = initDva({
    history: createMemoryHistory({
      initialEntries: [ctx.req.url]
    })
  })
  const store = app._store
  ctx.store = store
  const ActiveComponent = getComponent(Routes, ctx.path)()
  const Layout = ActiveComponent.Layout || defaultLayout
  ActiveComponent.getInitialProps ? await ActiveComponent.getInitialProps(ctx) : {} // eslint-disable-line
  const storeState = store.getState()
  ctx.serverData = storeState

  app.router(() => (
    <StaticRouter location={ctx.req.url} context={storeState}>
      <Layout layoutData={ctx}>
        <ActiveComponent {...storeState} />
      </Layout>
    </StaticRouter>
  ))

  const DvaApp = app.start()
  return <DvaApp />
}

export default __isBrowser__ ? clientRender() : serverRender
