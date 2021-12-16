const webpack = require('webpack')
const { merge } = require('webpack-merge')
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const { getRootPath, getAppPath } = require('../utils')

const getScriptLoader = require('./getScriptLoader')
const getStyleLoader = require('./getStyleLoader')

process.env.NODE_ENV = 'development'

module.exports = (config = {}) => {
  const commonConfig = require('./webpack.common')(config)

  return merge(commonConfig, {
    mode: 'development',
    entry: {
      index: [
        getRootPath(
          'node_modules/webpack-hot-middleware/client?timeout=20000&reload=true&quiet=true',
        ),
      ],
    },
    output: {
      path: getAppPath('dist', false),
      filename: '[name].js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: [getAppPath('src'), ...Object.values(config.libs)],
          use: getScriptLoader(true),
        },
        {
          test: /\.css$/,
          use: getStyleLoader(false),
        },
        {
          test: /\.less$/,
          use: getStyleLoader(false, 'less', config.less),
        },
        {
          test: /\.scss$/,
          use: getStyleLoader(false, 'sass', config.sass),
        },
      ],
    },
    devtool: 'eval-cheap-module-source-map',
    plugins: [
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [`App is running here http://localhost:${config.port}`],
        },
      }),
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin(),
    ],
  })
}
