const express = require('express')
const history = require('connect-history-api-fallback')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const { createProxyMiddleware } = require('http-proxy-middleware')

const { mergeConfig, log } = require('../utils')

module.exports = (options = {}) => {
  const config = mergeConfig(options, { env: ['NODE:development'] })
  const webpackConfig = require('../webpack/webpack.dev')(config)
  const compiler = webpack(webpackConfig)

  const app = express()

  if (Array.isArray(config.proxy)) {
    config.proxy.forEach(({ path, options }) => {
      app.use(path, createProxyMiddleware(options))
    })
  }

  app.use(history())
  app.use(webpackDevMiddleware(compiler))
  app.use(
    webpackHotMiddleware(compiler, {
      log: false,
      heartbeat: 10000,
    }),
  )

  log.info('starting...', true)
  app.listen(config.port)
}
