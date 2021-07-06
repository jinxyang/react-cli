const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')

const { root, exists, readdir } = require('./utils')

const commonConfig = (appDir) => {
  const staticDir = appDir('static')

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
      new HtmlWebpackPlugin({
        template: appDir('src/index.html'),
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
        extensions: ['css', 'scss', 'js', 'jsx', 'ts', 'tsx'],
      }),
    ].filter(Boolean),
    optimization: {
      minimize: false,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          react: {
            name: 'react',
            test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
          },
          antd: {
            name: 'antd',
            test: /[\\/]node_modules[\\/](antd|@antd-)/,
          },
          vendors: {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
          },
        },
      },
    },
    stats: 'none',
    infrastructureLogging: {
      level: 'none',
    },
  }
}

module.exports = commonConfig
