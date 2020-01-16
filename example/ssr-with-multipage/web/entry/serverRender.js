import React from 'react'
import _get from 'lodash/get'
import { StaticRouter } from 'react-router-dom'
import { getComponent } from 'ykfe-utils'
import defaultLayout from '@/layout'

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

export default serverRender
