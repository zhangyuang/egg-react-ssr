'use strict'

const paths = require('./paths')
const path = require('path')
// style files regexes
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const getStyleLoaders = require('./util').getStyleLoaders
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')

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
          include: paths.appSrc,
          loader: require.resolve('babel-loader'),
          options: {
            cacheDirectory: true,
            cacheCompression: false,
            presets: [
              '@babel/preset-react'
            ],
            plugins: [
              ['@babel/plugin-proposal-decorators', { 'legacy': true }],
              ['@babel/plugin-proposal-class-properties', { 'loose': true }]
            ]
          }
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: getStyleLoaders({
            importLoaders: 1
          })
        },
        {
          test: /\.module\.css$/,
          use: getStyleLoaders({
            importLoaders: 1,
            modules: true,
            getLocalIdent: getCSSModuleLocalIdent
          })
        },
        {
          test: /\.less$/,
          exclude: /\.module\.less$/,
          use: getStyleLoaders(
            {
              importLoaders: 2,
              localIdentName: '[local]'
            },
            'less-loader'
          ),
          sideEffects: true
        },
        {
          test: /\.module\.less$/,
          use: getStyleLoaders(
            {
              importLoaders: 2,
              modules: true,
              getLocalIdent: getCSSModuleLocalIdent
            },
            'less-loader'
          )
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
  mode: process.env.NODE_ENV,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../web')
    },
    extensions: paths.moduleFileExtensions
      .map(ext => `.${ext}`)
  },
  module: webpackModule,
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css',
      chunkFilename: 'static/css/[name].chunk.css'
    })
  ],
  performance: false
}
