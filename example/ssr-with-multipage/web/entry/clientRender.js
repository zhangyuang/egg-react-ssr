import React from 'react'
import _get from 'lodash/get'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { getWrappedComponent } from 'ykfe-utils'
import defaultLayout from '@/layout'

const clientRender = async (Routes) => {
  // 客户端渲染||hydrate
  ReactDOM[window.__USE_SSR__ ? 'hydrate' : 'render'](
    <BrowserRouter>
      {
        // 使用高阶组件getWrappedComponent使得csr首次进入页面以及csr/ssr切换路由时调用getInitialProps
        Routes.map(({ path, exact, Component }) => {
          const ActiveComponent = Component()
          const Layout = ActiveComponent.Layout || defaultLayout
          return <Route exact={exact} key={path} path={path} render={() => {
            const WrappedComponent = getWrappedComponent(ActiveComponent)
            return <Layout><WrappedComponent /></Layout>
          }} />
        })
      }
    </BrowserRouter>,
    document.getElementById('app')
  )

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept()
  }
}

export default clientRender
