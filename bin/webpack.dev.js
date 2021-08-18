const webpack = require('webpack')
const { merge } = require('webpack-merge')
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const { root, getStyleLoader } = require('./utils')

process.env.NODE_ENV = 'development'

const devConfig = (appDir, config = {}) => {
  const webpackCommonConfig = require('./webpack.common')(appDir, config)

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
          include: [appDir('src'), appDir('packages')],
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                plugins: [
                  [
                    root('node_modules/babel-plugin-styled-components'),
                    {
                      ssr: false,
                      displayName: true,
                    },
                  ],
                  require('react-refresh/babel'),
                ],
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: getStyleLoader(false),
        },
        {
          test: /\.scss$/,
          use: getStyleLoader(false, config.sass, 'sass'),
        },
        {
          test: /\.less$/,
          use: getStyleLoader(false, config.less, 'less'),
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
