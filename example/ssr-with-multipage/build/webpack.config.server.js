const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.config.base')
const ssrConfig = require('../config/config.ssr')
const paths = require('./paths')
const getEntrys = require('./util').getEntrys
const isDev = process.env.NODE_ENV === 'development'
const entrys = getEntrys(ssrConfig)

const plugins = [
  new webpack.DefinePlugin({
    '__isBrowser__': false //eslint-disable-line
  })
]
module.exports = merge(baseConfig, {
  devtool: isDev ? 'eval-source-map' : '',
  entry: entrys.reduce((p, c) => ({
    ...p,
    [c]: `${paths.entryPath}/${c}.js`
  }), {}),
  target: 'node',
  externals: nodeExternals({
    whitelist: /\.(css|less|sass|scss)$/
  }),
  output: {
    path: paths.appBuild,
    publicPath: '/',
    filename: '[name].server.js',
    libraryTarget: 'commonjs2'
  },
  plugins: plugins
})
