const path = require('path')

const { writeFile } = require('fs-extra')

const { getAppPath, log } = require('../../utils')

const formatIgnoreData = ['node_modules', 'dist', 'lib', 'static', ''].join(
  '\n',
)
const gitIgnoreData = [
  '.husky',
  '.vscode',
  'node_modules',
  '/dist',
  '/lib',
  'jsconfig.json',
  'releases',
  '',
].join('\n')

const writeIgnore = async () => {
  try {
    const folder = getAppPath('', false)

    await writeFile(path.join(folder, '.eslintignore'), formatIgnoreData)
    log.success('-- .eslintignore created.')

    await writeFile(path.join(folder, '.gitignore'), gitIgnoreData)
    log.success('-- .gitignore created.')

    await writeFile(path.join(folder, '.prettierignore'), formatIgnoreData)
    log.success('-- .prettierignore created.')

    await writeFile(path.join(folder, '.stylelintignore'), formatIgnoreData)
    log.success('-- .stylelintignore created.')
  } catch {
    log.error('write ignore files failed.')
  }
}

module.exports = writeIgnore
