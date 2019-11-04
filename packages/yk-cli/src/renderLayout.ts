
/* tslint:disable */

import React from 'react'
import { renderToString } from 'react-dom/server'
import path from 'path'

let config:any

try {
  config = require('../../../config/config.ssr')
} catch (error) {
  config = require('../../../config/config.default')
}

const isServerless = config.runtime === 'serverless'
let serverConfig:any

if (!process.env.FC_FUNC_CODE_PATH) {
  const nodeExternals = require('webpack-node-externals')
  serverConfig = require('../../../build/webpack.config.server')
  serverConfig.entry = {
    Layout: path.resolve(__dirname, '../../../web/layout')
  }
  serverConfig.output.path = path.resolve(__dirname, '../dist')
  serverConfig.externals = nodeExternals({
    whitelist: /\.(css|less|sass|scss)$/,
    modulesDir: path.resolve(__dirname, '../../') // 保证寻找第三方模块的node_modules是当前应用的node_modules
  })
}

const reactToStream = (Component: React.FunctionComponent, props: object) => {
  return renderToString(React.createElement(Component, props))
}

const renderLayout = async () => {
  let Layout
  try {
    // serverless 场景我们从事先构建好的应用目录下的dist文件夹中读取layout
    Layout = isServerless ? require('../../../dist/Layout.server').default : require('../dist/Layout.server').default
  } catch (error) {
    // 非serverless场景首次读取失败我们先调用webpack api构建一遍在ykcli的目录下再读取
    const { webpackWithPromise } = require('./util')
    await webpackWithPromise(serverConfig)
    try {
      // 兼容serverless场景webpack静态分析打包错误情况以及webpack编译错误情况
      Layout = require('../dist/Layout.server').default
    } catch (error) {
    }
  }

  const props = {
    layoutData: {
      app: {
        config: config
      }
    }
  }
  
  const str = Layout ? reactToStream(Layout, props) : '<html></html>'
  return str
}

export default renderLayout
