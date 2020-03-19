import { createElement, render } from 'rax' // eslint-disable-line
import { useRouter } from 'rax-use-router'
import { getComponent } from 'ykfe-utils'
import raxGetWrappedComponent from 'ykfe-utils/lib/components/raxGetinitialProps'
import { createBrowserHistory } from 'history'
import Layout from '@/layout'
import { routes } from '../config/config.ssr'

function Component () {
  const raxRoutes = routes.map((item, index) => {
    const Component = raxGetWrappedComponent(item.Component())
    item.component = () => <Layout key={`layout${index}`}><Component /></Layout>
    return item
  })

  const InitialComponent = raxGetWrappedComponent(getComponent(routes, window.location.pathname)())
  const config = {
    routes: raxRoutes,
    history: createBrowserHistory(),
    InitialComponent: <Layout><InitialComponent /></Layout>
  }

  const component = useRouter(config).component
  return component
}

const clientRender = () => {
  const DriverUniversal = require('driver-dom')
  render(<Component />, document.getElementById('app'), { driver: DriverUniversal, hydrate: true })
  // hmr存在问题，先关掉，采用刷新的策略，有兴趣的同学可以帮忙修复
  // if (process.env.NODE_ENV === 'development' && module.hot) {
  //   module.hot.accept()
  // }
}

const serverRender = async (ctx) => {
  // 服务端渲染 根据ctx.path获取请求的具体组件，调用getInitialProps并渲染
  const ActiveComponent = getComponent(routes, ctx.path)()
  const serverData = ActiveComponent.getInitialProps ? await ActiveComponent.getInitialProps(ctx) : {}
  ctx.serverData = serverData
  return <Layout layoutData={ctx}>
    <ActiveComponent {...serverData} />
  </Layout>
}

export default __isBrowser__ ? clientRender() : serverRender
