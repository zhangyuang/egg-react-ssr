
import React from 'react'
import { resolve } from 'path'
import { renderToNodeStream } from 'react-dom/server'
// @ts-ignore
import nodeExternals from 'webpack-node-externals'
import { webpackWithPromise } from './util'

const config: any = require('../../../config/config.ssr')
const serverConfig = require('../../../build/webpack.config.server')
serverConfig.entry = {
  Layout: resolve(__dirname, '../../../web/layout')
}
serverConfig.output.path = resolve(__dirname, '../dist')
serverConfig.externals = nodeExternals({
  whitelist: /\.(css|less|sass|scss)$/,
  modulesDir: resolve(__dirname, '../../') // 保证寻找第三方模块的node_modules是当前应用的node_modules
})

const reactToStream = (Component: React.FunctionComponent, props: object) => {
  return renderToNodeStream(React.createElement(Component, props))
}

const renderLayout = async () => {
  let Layout
  try {
    Layout = require('../dist/Layout.server').default
  } catch (error) {
    // 首次读取失败我们先调用webpack api构建一遍在ykcli/dist的目录下再读取
    await webpackWithPromise(serverConfig)
    Layout = require('../dist/Layout.server').default
  }

  const props = {
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
