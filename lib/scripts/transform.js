const { remove } = require('fs-extra')
const execa = require('execa')

const { mergeConfig, getAppPath, log } = require('../utils')
const { babel } = require('../paths')

module.exports = async (options = {}) => {
  const config = mergeConfig(options)

  const srcDir = getAppPath(config.src)
  if (!srcDir) {
    return log.error(`"${config.src}" is not exists.`)
  }

  const outDir = getAppPath(config.lib, false)

  const command = [
    'node',
    babel.bin,
    srcDir,
    '--out-dir',
    outDir,
    '--config-file',
    babel.configFile,
    '--extensions',
    ['.js', '.jsx'].join(','),
  ].join(' ')

  try {
    log.info('cleaning...')
    await remove(outDir)
    log.info('transforming...')
    await execa.command(command)
    log.success('Transform completed.', true)
  } catch {
    log.error('Transform failed.')
  }
}
