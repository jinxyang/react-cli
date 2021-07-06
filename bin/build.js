const path = require('path')

const chalk = require('chalk')
const webpack = require('webpack')

const { exists } = require('./utils')

const build = () => {
  const appDir = (target = '') => path.resolve(process.cwd(), target)
  const customConfigFile = appDir('react-cli.config.js')
  const customConfig = exists(customConfigFile) && require(customConfigFile)
  const webpackConfig = require('./webpack.prod')(appDir, customConfig)

  const compiler = webpack(webpackConfig)

  console.clear()
  console.log(chalk.cyan('Building...'))
  compiler.run()
}

module.exports = build
