const { merge } = require('webpack-merge')
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const { getStyleLoader } = require('./utils')

process.env.NODE_ENV = 'production'

const prodConfig = (appDir, config = {}) => {
  const webpackCommonConfig = require('./webpack.common')(appDir, config)

  return merge(webpackCommonConfig, {
    mode: 'production',
    output: {
      filename: '[name].[contenthash:8].js',
      assetModuleFilename: 'assets/[name].[hash:8][ext][query]',
      clean: true,
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
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: getStyleLoader(true),
        },
        {
          test: /\.s[ac]ss$/,
          use: getStyleLoader(true, config.sass, 'sass'),
        },
        {
          test: /\.less$/,
          use: getStyleLoader(true, config.less, 'less'),
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
    performance: {
      hints: false,
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css',
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
      }),
    ],
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

module.exports = prodConfig
