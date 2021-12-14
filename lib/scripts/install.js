const execa = require('execa')
const { mkdir } = require('fs-extra')

const { getRootPath, log, getLibPath, exists } = require('../utils')

const repositories = {
  'react-lib': 'git@github.com:jinxyang/react-lib.git',
}

const install = async (name, { directory }) => {
  if (getLibPath(name)) {
    console.log(
      `"${name}" already installed, run "react-cli update ${name}" to update.`,
    )
    return new Error()
  }

  try {
    log.info('installing...')

    const uri =
      repositories[name] ??
      ((await execa.command('git ls-remote ' + name)) && name)

    const folder = getRootPath('packages')
    !exists(folder) && (await mkdir(folder))

    await execa.command(`git clone ${uri}${directory ? ' ' + directory : ''}`, {
      cwd: folder,
    })

    log.success(
      `Install ${name}${directory ? ' as ' + directory : ''} completed.`,
      true,
    )
  } catch (e) {
    e?.stderr && console.log(e?.stderr)
    log.error('Install failed.')
  }
}

module.exports = install
