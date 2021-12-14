const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { getRootPath, getAppPath } = require('../utils')

module.exports = (isProd = false, pre = '', preConfig = {}) => {
  const postcssConfigFile = getAppPath('postcss.config.js')

  const otherLoaders = [
    postcssConfigFile && {
      loader: getRootPath('node_modules/postcss-loader'),
      options: {
        postcssOptions: {
          config: postcssConfigFile,
        },
      },
    },
    pre === 'less' && getRootPath('node_modules/less-loader'),
    pre === 'sass' && getRootPath('node_modules/sass-loader'),
    pre && {
      loader: getRootPath('node_modules/style-resources-loader'),
      options: {
        ...(preConfig.resources || {}),
        patterns: (preConfig.resources && preConfig.resources.patterns) || [],
      },
    },
  ].filter(Boolean)

  const styleLoader = isProd
    ? MiniCssExtractPlugin.loader
    : getRootPath('node_modules/style-loader')
  const cssLoader = {
    loader: getRootPath('node_modules/css-loader'),
    options: {
      modules: {
        auto: /\.m\.\w+$/,
        ...(isProd
          ? {
              localIdentName: '[hash:base64:8]',
            }
          : {
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            }),
      },
      importLoaders: otherLoaders.length,
    },
  }

  return [styleLoader, cssLoader, ...otherLoaders]
}
