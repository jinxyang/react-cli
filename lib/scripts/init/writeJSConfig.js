const fse = require('fs-extra')

const { getRootPath, getAppPath, log } = require('../../utils')

const config = {
  compilerOptions: {
    jsx: 'react',
    baseUrl: '.',
    paths: {
      '@jinxyang/react-lib': [getRootPath('packages/react-lib/src')],
      '*': [
        './src/*',
        getRootPath('packages/*'),
        getRootPath('node_modules/*'),
      ],
    },
  },
}

const writeJSConfig = async () => {
  try {
    await fse.writeJSON(getAppPath('jsconfig.json', false), config, {
      spaces: 2,
    })
    log.success('-- jsconfig.json created.')
  } catch {
    throw log.error('write jsconfig.json failed.', false)
  }
}

module.exports = writeJSConfig