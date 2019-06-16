'use strict'

const paths = require('./paths')
const fs = require('fs')
const path = require('path')
// style files regexes
const useTypeScript = fs.existsSync(paths.appTsConfig)
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin')
const typescriptFormatter = require('react-dev-utils/typescriptFormatter')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const resolve = require('resolve')
const getStyleLoaders = require('./util').getStyleLoaders
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')

const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;


let webpackModule = {
  strictExportPresence: true,
  rules: [
    { parser: { requireEnsure: false } },
    {
      oneOf: [
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: require.resolve('url-loader'),
          options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]'
          }
        },
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          include: [paths.appSrc, paths.resolveApp('config')],
          loader: require.resolve('babel-loader'),
          options: {
            plugins: [
              [
                require.resolve('babel-plugin-named-asset-import'),
                {
                  loaderMap: {
                    svg: {
                      ReactComponent: '@svgr/webpack?-prettier,-svgo![path]'
                    }
                  }
                }
              ]
            ],
            cacheDirectory: true,
            cacheCompression: false
          }
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: getStyleLoaders({
            importLoaders: 1
          }, null, false)
        },
        {
          test: /\.module\.css$/,
          use: getStyleLoaders({
            importLoaders: 1,
            modules: true,
            getLocalIdent: getCSSModuleLocalIdent
          }, null, true)
        },
        {
          test: sassRegex,
          exclude: sassModuleRegex,
          use: getStyleLoaders(
            {
              importLoaders: 2,
              sourceMap: true,
            },
            'sass-loader',
            false
          ),
          // Don't consider CSS imports dead code even if the
          // containing package claims to have no side effects.
          // Remove this when webpack adds a warning or an error for this.
          // See https://github.com/webpack/webpack/issues/6571
          sideEffects: true,
        },
        // Adds support for CSS Modules, but using SASS
        // using the extension .module.scss or .module.sass
        {
          test: sassModuleRegex,
          use: getStyleLoaders(
            {
              importLoaders: 2,
              sourceMap: true,
              modules: true,
              getLocalIdent: getCSSModuleLocalIdent,
            },
            'sass-loader',
            true
          ),
        },
        {
          exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
          loader: require.resolve('file-loader'),
          options: {
            name: 'static/media/[name].[hash:8].[ext]'
          }
        }
      ]
    }
  ]
}

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../web')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: webpackModule,
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css',
      chunkFilename: 'static/css/[name].chunk.css'
    }),
    useTypeScript &&
    new ForkTsCheckerWebpackPlugin({
      typescript: resolve.sync('typescript', {
        basedir: paths.appNodeModules
      }),
      async: false,
      useTypescriptIncrementalApi: true,
      checkSyntacticErrors: true,
      tsconfig: paths.appTsConfig,
      reportFiles: [
        '**',
        '!**/*.json',
        '!**/__tests__/**',
        '!**/?(*.)(spec|test).*',
        '!src/setupProxy.js',
        '!src/setupTests.*'
      ],
      watch: paths.appSrc,
      silent: true,
      formatter: typescriptFormatter
    })
  ].filter(Boolean),
  performance: false
}
