const { merge } = require('webpack-merge')
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const { getAppPath } = require('../utils')

const getScriptLoader = require('./getScriptLoader')
const getStyleLoader = require('./getStyleLoader')

process.env.NODE_ENV = 'production'

module.exports = (config = {}) => {
  const webpackCommonConfig = require('./webpack.common')(config)

  return merge(webpackCommonConfig, {
    mode: 'production',
    output: {
      path: getAppPath('dist', false),
      filename: '[name].[contenthash:8].js',
      publicPath: '/',
      assetModuleFilename: 'assets/[name].[hash:8][ext][query]',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          include: [getAppPath('src'), ...Object.values(config.libs)],
          use: getScriptLoader(),
        },
        {
          test: /\.css$/,
          use: getStyleLoader(true),
        },
        {
          test: /\.scss$/,
          use: getStyleLoader(true, 'sass', config.sass),
        },
        {
          test: /\.less$/,
          use: getStyleLoader(true, 'less', config.less),
        },
      ],
    },
    performance: {
      hints: false,
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css',
      }),
      config.analyzer &&
        new BundleAnalyzerPlugin(
          typeof config.analyzer === 'boolean'
            ? {
                analyzerMode: 'static',
              }
            : config.analyzer,
        ),
    ].filter(Boolean),
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          exclude: /[\\/]node_modules[\\/]/,
          parallel: true,
          terserOptions: {
            format: {
              comments: false,
            },
            compress: {
              drop_console: true,
              drop_debugger: true,
            },
          },
        }),
        new CssMinimizerPlugin(),
      ],
    },
  })
}
