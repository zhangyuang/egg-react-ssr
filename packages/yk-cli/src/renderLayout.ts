
import React from 'react'
import { resolve } from 'path'
import { renderToNodeStream } from 'react-dom/server'

const isDev = process.env.NODE_ENV === 'development'
const cwd = process.cwd()

const reactToStream = (Component: React.FunctionComponent, props: object) => {
  return renderToNodeStream(React.createElement(Component, props))
}

const renderLayout = async (ctx: any, config = {}) => {
  const dist = process.env.FE_BUILD || 'dist'
  const layoutPath = resolve(cwd, `./${dist}/Layout.server.js`)
  if (isDev) {
    delete require.cache[layoutPath]
  }
  const Layout = require(layoutPath).default

  const props = ctx ? {
    layoutData: ctx
  } : {
    layoutData: {
      app: {
        config: config
      }
    }
  }

  const str = reactToStream(Layout, props)
  return str
}

export default renderLayout
