const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.config.base')
const paths = require('./paths')
const isDev = process.env.NODE_ENV === 'development'

const plugins = [
  new webpack.DefinePlugin({
    '__isBrowser__': false //eslint-disable-line
  })
]
const webpackModule = {
  strictExportPresence: true,
  rules: [
    { parser: { requireEnsure: false } },
    {
      oneOf: [
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          loader: require.resolve('babel-loader'),
          options: {
            cacheDirectory: true,
            cacheCompression: false,
            presets: [
              [
                require.resolve('@babel/preset-env'),
                {
                  modules: false
                }
              ],
              ['@babel/preset-react', {
                'pragma': 'createElement'
              }]
            ],
            plugins: [
              'babel-plugin-transform-jsx-to-html'
            ]
          }
        }
      ]
    }
  ]
}
module.exports = merge(baseConfig, {
  devtool: isDev ? 'eval-source-map' : '',
  entry: {
    Page: paths.entry,
    Layout: paths.layout
  },
  module: webpackModule,
  target: 'node',
  externals: nodeExternals({
    whitelist: /\.(css|less|sass|scss)$|^rax-+/
  }),
  output: {
    path: paths.appBuild,
    publicPath: '/',
    filename: '[name].server.js',
    libraryTarget: 'commonjs2'
  },
  plugins: plugins
})
