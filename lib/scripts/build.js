const path = require('path')

const { mkdir } = require('fs-extra')
const webpack = require('webpack')
const moment = require('moment')

const { mergeConfig, getAppPath, log, exists, compress } = require('../utils')

const build = async (options = {}) => {
  const config = mergeConfig(options, { env: ['NODE:production'] })
  const webpackConfig = require('../webpack/webpack.prod')(config)

  log.info('building...', true)
  const run = () => {
    return new Promise((resolve) => {
      webpack(webpackConfig).run((error, stats) => {
        if (error) {
          console.error(error)
          return resolve(false)
        }

        if (stats.hasErrors()) {
          return resolve(false)
        }

        stats.hasWarnings() && console.log()
        console.log(
          stats.toString({
            assets: false,
            children: false,
            chunks: false,
            colors: true,
            modules: false,
            warnings: false,
          }),
        )
        resolve(true)
      })
    })
  }

  const builded = await run()
  if (!builded) return

  if (config.compress) {
    console.log()
    log.info('compress...', true)

    const folder = getAppPath('releases', false)
    !exists(folder) && (await mkdir(folder))

    const name = `${config.compress}_${moment().format('YYYYMMDD_HHmmss')}`
    const error = await compress(
      getAppPath('dist'),
      path.join(folder, `${name}.zip`),
      {
        name,
      },
    )

    if (!error) {
      log.success('Compress completed.')
    } else {
      log.warn('Compress failed.')
    }
  }

  log.success('Build completed.', true)
}

module.exports = build
