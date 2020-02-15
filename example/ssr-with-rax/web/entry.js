import { createElement, render } from 'rax' // eslint-disable-line
import { useRouter } from 'rax-use-router'
import { getComponent } from 'ykfe-utils'
import { createBrowserHistory } from 'history'
import defaultLayout from '@/layout'
import { routes } from '../config/config.ssr'

function Component () {
  const config = {
    routes,
    history: createBrowserHistory()
  }
  const { component } = useRouter(config)
  return component
}

const clientRender = async () => {
  const DriverUniversal = require('driver-universal')
  render(<Component />, document.body, { driver: DriverUniversal })

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept()
  }
}

const serverRender = async (ctx) => {
  // 服务端渲染 根据ctx.path获取请求的具体组件，调用getInitialProps并渲染
  const ActiveComponent = getComponent(routes, ctx.path)()
  const Layout = ActiveComponent.Layout || defaultLayout
  const serverData = ActiveComponent.getInitialProps ? await ActiveComponent.getInitialProps(ctx) : {}
  ctx.serverData = serverData
  return <Layout layoutData={ctx}>
    <ActiveComponent {...serverData} />
  </Layout>
}

export default __isBrowser__ ? clientRender() : serverRender
