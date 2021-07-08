const path = require('path')
const fs = require('fs')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

exports.root = (target) => path.join(__dirname, '../', target)
exports.exists = (target) => fs.existsSync(target)
exports.readdir = (target) => fs.readdirSync(target)

exports.getStyleLoader = (isProd = false, config = {}, pre = '') => {
  const postcssConfigFile = path.resolve(process.cwd(), 'postcss.config.js')

  const otherLoaders = [
    exports.exists(postcssConfigFile) && {
      loader: exports.root('node_modules/postcss-loader'),
      options: {
        postcssOptions: {
          config: path.resolve(process.cwd(), 'postcss.config.js'),
        },
      },
    },
    pre === 'less' && exports.root('node_modules/less-loader'),
    pre === 'sass' && exports.root('node_modules/sass-loader'),
    pre && {
      loader: exports.root('node_modules/style-resources-loader'),
      options: {
        ...(config.resources || {}),
        patterns: (config.resources && config.resources.patterns) || [],
      },
    },
  ].filter(Boolean)

  const styleLoader = isProd
    ? MiniCssExtractPlugin.loader
    : exports.root('node_modules/style-loader')
  const cssLoader = {
    loader: exports.root('node_modules/css-loader'),
    options: {
      modules: {
        auto: (path) => !/[\\/]node_modules[\\/]/.test(path),
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
