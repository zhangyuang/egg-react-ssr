const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const nodeExternals = require('webpack-node-externals')
const path = require('path')
const paths = require('./paths')
const isDev = process.env.NODE_ENV === 'development'

const plugins = [
  new webpack.DefinePlugin({
    __isBrowser__: false
  })
].filter(Boolean);

const config = merge(baseConfig, {
  mode: 'development',
  devtool: isDev ? 'eval-source-map' : '',
  entry: {
    Page: path.resolve("./web/page/index/index.tsx")
  },
  target: 'node',
  externals: nodeExternals({
    whilelist: /\.(css|less|sass|scss)$/
  }),
  output: {
    path: paths.appBuild,
    publicPath: '/',
    filename: '[name].server.js',
    libraryTarget: 'commonjs2'
  },
  plugins: plugins,
  performance: false
})

module.exports = config; 
