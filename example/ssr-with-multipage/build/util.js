const paths = require('./paths')
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
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

const getEntrys = (ssrConfig) => {
  let routesFilename = [];
  
  try {
    routesFilename = fs.readdirSync(paths.routerPath) 
  } catch (error) {
    routesFilename = [];
  }
  
  let entrys = []
  entrys = entrys.concat(
    routesFilename
      .filter((filename) => filename.indexOf('.js') > -1)
      .map((filename) => filename.replace('.js', ''))
  );
  if (ssrConfig.routes) {
    entrys = entrys.concat(
      ssrConfig.routes.map((route) => route.entry || 'Page')
    )
  }
  return [...new Set(entrys)]
}

module.exports = {
  getStyleLoaders,
  getEntrys
}
