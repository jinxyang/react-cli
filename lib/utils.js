const os = require('os')
const path = require('path')

const { cosmiconfigSync } = require('../node_modules/cosmiconfig/dist')

const archiver = require('archiver')

const { existsSync, createWriteStream, statSync } = require('fs-extra')
const chalk = require('chalk')
const { merge } = require('webpack-merge')

const defaultConfig = require('./config/react-cli')

exports.log = {
  info: (text, withLabel = false) => {
    console.log(
      ...[
        withLabel && chalk.black.bgCyanBright(' INFO '),
        chalk.cyan(text),
      ].filter(Boolean),
    )
  },
  success: (text, withLabel = false) => {
    withLabel && console.log()
    console.log(
      ...[
        withLabel && chalk.black.bgGreenBright(' SUCCESS '),
        chalk.greenBright(text),
      ].filter(Boolean),
    )
    withLabel && console.log()
  },
  warn: (text, withLabel = false) => {
    withLabel && console.log()
    console.log(
      ...[
        withLabel && chalk.black.bgYellowBright(' WARN '),
        chalk.yellowBright(text),
      ].filter(Boolean),
    )
    withLabel && console.log()
  },
  error: (text, withLabel = true) => {
    withLabel && console.log()
    console.log(
      ...[
        withLabel && chalk.black.bgRedBright(' ERROR '),
        chalk.redBright(text),
      ].filter(Boolean),
    )
    withLabel && console.log()
    return new Error(text)
  },
}

exports.exists = (fullPath) => (fullPath ? existsSync(fullPath) : null)

exports.getRootPath = (target = '') => path.join(__dirname, '../', target)

exports.getModulePath = (target = '') =>
  exports.getRootPath(path.join('node_modules', target))

exports.getConfigPath = (target) =>
  exports.getRootPath(path.join('lib/config/', target))

exports.getAppPath = (target = '', verify = true) => {
  const fullPath = path.resolve(process.cwd(), target)
  return !verify || exports.exists(fullPath) ? fullPath : null
}

exports.getLibPath = (name) => {
  // TODO: rc
  const uri = exports.getRootPath('packages/' + name)
  return exports.exists(uri) && uri
}

exports.getRC = () => {
  const homeDir = os.homedir()
  const explorerSync = cosmiconfigSync('rc')

  const result = explorerSync.search(homeDir)
  return result?.config ?? { libs: {} }
}

exports.mergeConfig = (...configs) => {
  const configFile = exports.getAppPath('react-cli.config.js')
  const { libs } = exports.getRC()
  return {
    ...merge(defaultConfig, configFile ? require(configFile) : {}, ...configs),
    libs,
  }
}

exports.functionCatcher =
  (func = () => {}) =>
  (...args) => {
    try {
      func(...args)
    } catch {
      process.exitCode = 1
    }
  }

exports.compress = async (src, dest, options = {}) => {
  return new Promise((resolve) => {
    const output = createWriteStream(dest)
    output.on('close', () => resolve(null))

    const archive = archiver('zip')
    archive.on('warning', (error) => {
      if (error.code === 'ENOENT') {
        console.log(error)
        resolve(null)
      } else {
        resolve(error)
      }
    })
    archive.on('error', resolve)
    archive.pipe(output)

    if (statSync(src).isDirectory()) {
      archive.directory(src, options.name || src.split('/').slice(-1).join(''))
    } else {
      archive.file(src, options)
    }

    archive.finalize()
  })
}
