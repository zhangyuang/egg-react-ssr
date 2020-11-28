import React from 'react'
import './index.less'
import { builder, BuilderComponent } from '@builder.io/react'
import '@builder.io/widgets'

function Page(props) {
  return (
    <div className='normal'>
      <BuilderComponent model='page' content={props.builderPage} />
    </div>
  )
}

Page.getInitialProps = async (ctx) => {
  // ssr渲染模式只在服务端通过Node获取数据，csr渲染模式只在客户端通过http请求获取数据，getInitialProps方法在整个页面生命周期只会执行一次
  const { req, res, app } = ctx
  const [path] = req.url.split('?')
  builder.init(app.config.buildKey)
  const page = await builder.get('page', { req, res, userAttributes: { urlPath: path } }).promise()

  return {
    builderPage: page ? { ...page } : null
  }
}

export default Page
