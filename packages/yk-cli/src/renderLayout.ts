
/* tslint:disable */

import * as React from 'react';
import { renderToString }from 'react-dom/server'

const Module = require('module')
const cwd = process.cwd()
const baseConfig = require(cwd + '/build/webpack.config.base')
const config = require(cwd + '/config/config.default')

// 使用babel来处理es6 jsx语法
require('@babel/register')({
  only: [
    /layout/ // babel只编译layout组件
  ],
  presets: [
    '@babel/preset-env',
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    ['babel-plugin-module-resolver', {
      root: ['./'],
      alias: baseConfig.resolve.alias
    }],
    ['transform-define', {
      __isBrowser__: false
    }]
  ]
})

Module._extensions['.less'] = () => {}
Module._extensions['.sass'] = () => {}
Module._extensions['.css'] = () => {}

const Layout = require(cwd + '/web/layout').default

const reactToString = (Component: React.ComponentClass, props: object) => {
  return renderToString(React.createElement(Component, props))
}

const props = {
  layoutData: {
    app: {
      config: config
    }
  }
}

const string = reactToString(Layout, props)

module.exports = string
