const path = require('path')

const chalk = require('chalk')
const webpack = require('webpack')

const { exists } = require('./utils')
const defaultConfig = require('./config')

const build = () => {
  const appDir = (target = '') => path.resolve(process.cwd(), target)
  const customConfigFile = appDir('react-cli.config.js')
  const customConfig = exists(customConfigFile) && require(customConfigFile)
  const config = { ...defaultConfig, ...customConfig }
  const webpackConfig = require('./webpack.prod')(appDir, config)

  const compiler = webpack(webpackConfig)

  console.clear()
  console.log(chalk.cyan('Building...'))
  compiler.run()
}

module.exports = build
