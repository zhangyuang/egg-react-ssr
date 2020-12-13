import React from 'react'
import './index.less'
import { builder, BuilderComponent } from '@builder.io/react'
import '@builder.io/widgets'
import { buildKey } from '../../../config/config.ssr'
builder.init(buildKey)
function Page (props) {
  const { builderPage } = props
  return (
    <div className='normal'>
      {builderPage ? (
        <BuilderComponent model='page' content={builderPage} />
      ) : (
        <span>page not found!</span>
      )}
    </div>
  )
}

Page.getInitialProps = async (ctx) => {
  // ssr渲染模式只在服务端通过Node获取数据，csr渲染模式只在客户端通过http请求获取数据，getInitialProps方法在整个页面生命周期只会执行一次
  const { req, res } = ctx
  const [path] = req.url.split('?')
  const page = await builder.get('page', { req, res, userAttributes: { urlPath: path } }).promise()

  return {
    builderPage: page ? { ...page } : null
  }
}

export default Page
