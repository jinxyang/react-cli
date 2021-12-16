const fse = require('fs-extra')

const { getRootPath, getAppPath, log, mergeConfig } = require('../../utils')

const writeJSConfig = async () => {
  const { libs } = mergeConfig()
  const config = {
    compilerOptions: {
      jsx: 'react',
      baseUrl: '.',
      paths: {
        ...Object.keys(libs).reduce(
          (alias, name) => ({
            ...alias,
            [name]: [libs[name]],
          }),
          {},
        ),
        '*': ['./src/*', getRootPath('node_modules/*')],
      },
    },
    exclude: ['node_modules'],
    include: ['./src', ...Object.values(libs)],
  }

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
