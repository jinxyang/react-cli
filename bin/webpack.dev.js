const webpack = require('webpack')
const { merge } = require('webpack-merge')
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const { root } = require('./utils')
const defaultConfig = require('./config')

process.env.NODE_ENV = 'development'

const devConfig = (appDir, customConfig = {}) => {
  const webpackCommonConfig = require('./webpack.common')(appDir, customConfig)
  const config = { ...defaultConfig, ...customConfig }

  return merge(webpackCommonConfig, {
    mode: 'development',
    entry: {
      index: [
        root(
          'node_modules/webpack-hot-middleware/client?timeout=20000&reload=true&quiet=true',
        ),
      ],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: appDir('src'),
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                plugins: [
                  ...config.babel.plugins,
                  require('react-refresh/babel'),
                ],
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            root('node_modules/style-loader'),
            root('node_modules/css-loader'),
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
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

module.exports = devConfig
