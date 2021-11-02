const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const { merge } = require('webpack-merge')

const { root, exists, readdir } = require('./utils')

const commonConfig = (appDir, config = {}) => {
  const staticDir = appDir('static')

  const processEnv = config.env.reduce((acc, item) => {
    const [key, value] = item.split(':')
    return { ...acc, [key]: `"${value}"` }
  }, {})

  return {
    entry: {
      index: [appDir('src')],
    },
    context: appDir(),
    output: {
      path: appDir('dist'),
      filename: '[name].js',
      publicPath: '/',
    },
    resolve: {
      extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
      modules: ['src', 'node_modules'],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': processEnv,
      }),
      new HtmlWebpackPlugin({
        template: appDir('src/index.html'),
        inject: 'body',
      }),
      exists(staticDir) &&
        readdir(staticDir).length &&
        new CopyWebpackPlugin({
          patterns: [
            {
              from: staticDir,
              to: appDir('dist/static'),
            },
          ],
        }),
      new ESLintPlugin({
        eslintPath: appDir('node_modules/eslint'),
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        formatter: root('node_modules/eslint-formatter-pretty'),
      }),
      new StylelintPlugin({
        context: appDir('src'),
        stylelintPath: appDir('node_modules/stylelint'),
        extensions: ['css', 'less', 'sass', 'scss', 'js', 'jsx', 'ts', 'tsx'],
      }),
    ].filter(Boolean),
    optimization: {
      minimize: false,
      splitChunks: merge(
        {
          chunks: 'all',
          cacheGroups: {
            vendors: {
              name: 'vendors',
              test: /[\\/]node_modules[\\/]/,
            },
          },
        },
        config.splitChunks || {},
      ),
    },
    stats: 'none',
    infrastructureLogging: {
      level: 'none',
    },
    cache: {
      type: 'filesystem',
    },
  }
}

module.exports = commonConfig
