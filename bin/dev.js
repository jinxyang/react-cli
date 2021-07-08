const path = require('path')

const chalk = require('chalk')
const express = require('express')
const history = require('connect-history-api-fallback')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const { createProxyMiddleware } = require('http-proxy-middleware')

const { exists } = require('./utils')
const defaultConfig = require('./config')

const dev = () => {
  const appDir = (target = '') => path.resolve(process.cwd(), target)
  const customConfigFile = appDir('react-cli.config.js')
  const customConfig = exists(customConfigFile) && require(customConfigFile)
  const config = { ...defaultConfig, ...customConfig }

  const webpackConfig = require('./webpack.dev')(appDir, config)
  const compiler = webpack(webpackConfig)

  const app = express()
  if (config.proxy) {
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

  console.log(chalk.cyan('Starting the development server...'))
  app.listen(config.port)
}

module.exports = dev
