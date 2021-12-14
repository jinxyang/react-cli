const path = require('path')

const { writeFile } = require('fs-extra')

const { getAppPath, log } = require('../../utils')

const writeNvmrc = async () => {
  try {
    await writeFile(
      path.join(getAppPath('', false), '.nvmrc'),
      ['16', ''].join('\n'),
    )
    log.success('-- .nvmrc created.')
  } catch {
    log.warn('write .nvmrc failed.', true)
  }
}

module.exports = writeNvmrc
