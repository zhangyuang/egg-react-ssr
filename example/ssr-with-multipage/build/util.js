const fs = require('fs')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const paths = require('./paths')
const publicPath = paths.servedPath
const shouldUseRelativeAssetPaths = publicPath === './'
const isDev = process.env.NODE_ENV === 'development'
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: Object.assign(
        {},
        shouldUseRelativeAssetPaths ? { publicPath: '../../' } : undefined
      )
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009'
            },
            stage: 3
          })
        ]
      }
    }
  ]
  if (isDev) {
    loaders.unshift(require.resolve('css-hot-loader'))
  }
  if (preProcessor) {
    // 添加额外的loader
    loaders.push(require.resolve(preProcessor))
  }
  return loaders
}

const getEntry = (type) => {
  const entrys = fs.readdirSync(paths.entryPath)
  const entry = {}
  if (type !== 'client') {
    entry.layout = paths.layout
  }
  entrys.map(item => {
    const fileName = item.replace(/\.(js|ts)/, '')
    entry[fileName] = type === 'client' ? ['@babel/polyfill', path.join(paths.entryPath, fileName)] : path.join(paths.entryPath, item)
  })
  return entry
}
module.exports = {
  getStyleLoaders,
  getEntry
}
