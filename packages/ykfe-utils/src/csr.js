
const cwd = process.cwd()
const baseConfig = require(cwd + '/build/webpack.config.base')
const React = require('react')
const { renderToString } = require('react-dom/server')
const config = require(cwd + '/config/config.default')
const Module = require('module')

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

const reactToString = (Component, props) => {
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
