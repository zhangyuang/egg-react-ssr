import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, StaticRouter, Switch, Route } from 'react-router-dom'
import defaultLayout from '@/layout'
import { getWrappedComponent, getComponent } from 'ykfe-utils'
import { routes as Routes } from '../config/config.default'

import dva from 'dva-no-router'
import models from './models'

// ---------------------------------------------------------
// initializeDVA 用于 clientRender/serverRender 公用
const initializeDVA = (initialState) => {
  let options = {}
  if (initialState) {
    options.initialState = initialState ? initialState : {}
  }
  const app = dva(options)
  models.forEach(m => app.model(m))
  app.router(() => { })
  app.start()
  return app
}

// clientRender
const clientRender = () => {
  const initialState = window['__INITIAL_DATA__'] ? window['__INITIAL_DATA__'] : {}
  const app = initializeDVA(initialState)
  const store = app._store

  app.router(() => (
    <BrowserRouter>
      <Switch>
        {Routes.map(({ path, exact, Component }, key) => {
          const ActiveComponent = Component()
          const Layout = ActiveComponent.Layout || defaultLayout
          return <Route exact={exact} key={key} path={path} render={() => {
            const WrappedComponent = getWrappedComponent(ActiveComponent)
            return <Layout><WrappedComponent store={store} /></Layout>
          }} />
        })}
      </Switch>
    </BrowserRouter>
  ))

  const DvaApp = app.start()
  // note: 客户端渲染||hydrate
  ReactDOM[window.__USE_SSR__ ? 'hydrate' : 'render'](<DvaApp />, document.getElementById('app'))

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept()
  }
}

// serverRender
const serverRender = async ctx => {

  const app = initializeDVA({})
  // @note: 这个可能需要删掉 没有用了吧？
  const store = app._store
  const ActiveComponent = getComponent(Routes, ctx.path)()
  const Layout = ActiveComponent.Layout || defaultLayout
  ctx.store = store
  const asyncData = ActiveComponent.getInitialProps ? await ActiveComponent.getInitialProps(ctx) : {} // note: 获取异步数据 发起 dispatch
  const curState = store.getState() // note: 重置csr dvaStore状态
  ctx.serverData = curState

  app.router(() => (
    <StaticRouter location={ctx.req.url} context={asyncData}>
      <Layout>
        <ActiveComponent {...asyncData} />
      </Layout>
    </StaticRouter>
  ))

  const DvaApp = app.start()
  return <DvaApp />
}

export default (__isBrowser__ ? clientRender() : serverRender)
