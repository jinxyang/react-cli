const execa = require('execa')
const { mkdir } = require('fs-extra')

const { getRootPath, log, getLibPath, exists } = require('../utils')

const repositories = {
  '@jinxyang/react-lib': 'git@github.com:jinxyang/react-lib.git',
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

    const builtInRepo = repositories[name]
    const targetDirectory = builtInRepo ? name : directory

    const uri =
      builtInRepo || ((await execa.command('git ls-remote ' + name)) && name)

    const folder = getRootPath('packages')
    !exists(folder) && (await mkdir(folder))

    await execa.command(
      `git clone ${uri}${targetDirectory ? ' ' + targetDirectory : ''}`,
      {
        cwd: folder,
      },
    )

    log.success(
      `Install ${name}${
        targetDirectory ? ' as ' + targetDirectory : ''
      } completed.`,
      true,
    )
  } catch (e) {
    e?.stderr && console.log(e?.stderr)
    log.error('Install failed.')
  }
}

module.exports = install
