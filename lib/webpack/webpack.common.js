const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const { merge } = require('webpack-merge')

const { getRootPath, getAppPath } = require('../utils')
const { eslint, stylelint } = require('../paths')

const commonConfig = (config = {}) => {
  const processEnv = config.env.reduce((acc, item) => {
    const [key, value] = item.split(':')
    return { ...acc, [key]: `"${value}"` }
  }, {})

  return {
    entry: {
      index: [getAppPath('src')],
    },
    context: getAppPath(),
    module: {
      rules: [
        {
          test: /\.(png|jpg|jpeg|svg|gif|woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.json', '.jsx'],
      modules: [
        getAppPath('src'),
        getRootPath('node_modules'),
        getAppPath('node_modules'),
        'node_modules',
      ],
      alias: { ...config.libs },
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': processEnv,
      }),
      new HtmlWebpackPlugin({
        title: config.title,
        template: getAppPath('src/index.html'),
        inject: 'body',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: getAppPath('static', false),
            to: getAppPath('dist/static', false),
            noErrorOnMissing: true,
            info: { minimized: true },
          },
        ],
      }),
      new ESLintPlugin({
        context: getAppPath('src'),
        extensions: ['js', 'jsx'],
        formatter: eslint.formatter,
        overrideConfigFile: eslint.configFile,
      }),
      new StylelintPlugin({
        configFile: stylelint.configFile,
        context: getAppPath('src'),
        extensions: ['css', 'less', 'scss', 'js', 'jsx'],
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
    snapshot: {
      managedPaths: [getRootPath('node_modules'), getAppPath('node_modules')],
      immutablePaths: [getRootPath('node_modules'), getAppPath('node_modules')],
    },
  }
}

module.exports = commonConfig
