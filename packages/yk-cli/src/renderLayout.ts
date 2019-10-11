
/* tslint:disable */

import * as React from 'react';
import { renderToString }from 'react-dom/server'
import path from 'path'
import { webpackWithPromise } from './util'

const fs = require('fs')
const nodeExternals = require('webpack-node-externals');
const cwd = process.env.BASE_DIR || process.cwd()
const serverConfig = require(cwd + '/build/webpack.config.server')
const isDev = process.env.NODE_ENV === 'development'
let config: object

try {
  fs.statSync(cwd + `/config/config.ssr.js`)
  config = require(cwd + `/config/config.ssr`)
} catch (error) {
  config = require(cwd + `/config/config.default`)
}

serverConfig.entry = {
  Layout: cwd + '/web/layout'
}

serverConfig.output.path = path.resolve(__dirname, '../dist')
serverConfig.externals = nodeExternals({
  whitelist: /\.(css|less|sass|scss)$/,
  modulesDir: path.resolve(__dirname, '../../') // 保证寻找第三方模块的node_modules是当前应用的node_modules
})

const reactToString = (Component: React.ComponentClass, props: object) => {
  return renderToString(React.createElement(Component, props))
}

const renderLayout = async () => {
  let Layout

  if (isDev) {
    delete require.cache[path.resolve(__dirname, '../dist/Layout.server.js')]
  }

  try {
    Layout = require('../dist/Layout.server').default
  } catch (error) {
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

  const str = reactToString(Layout, props)
  return str
}

export default renderLayout


