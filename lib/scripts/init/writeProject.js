const path = require('path')

const { mkdir, copy, copyFile } = require('fs-extra')

const { getRootPath, getAppPath, exists, log } = require('../../utils')
const writeAntDesign = require('./writeAntDesign')

const writeProject = async () => {
  try {
    await writeAntDesign()
    const staticFolder = getAppPath('static', false)
    !exists(staticFolder) && (await mkdir(staticFolder))

    await copyFile(
      getRootPath('lib/static/favicon.ico'),
      path.join(staticFolder, 'favicon.ico'),
    )

    const templateFolder = getRootPath('lib/template')
    const srcFolder = getAppPath('src', false)

    if (exists(srcFolder)) {
      log.info('-- ignore project files.')
    } else {
      await copy(templateFolder, srcFolder)
      log.success('-- project files created.')
    }
  } catch {
    throw log.error('write project files failed.', false)
  }
}

module.exports = writeProject
