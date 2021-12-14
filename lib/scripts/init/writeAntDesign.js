const path = require('path')

const { mkdir, copyFile } = require('fs-extra')

const { getModulePath, getAppPath, exists, log } = require('../../utils')

const writeAntDesign = async () => {
  try {
    const folder = getAppPath('static', false)
    !exists(folder) && (await mkdir(folder))
    const getPath = (file) => [
      getModulePath(path.join('antd/dist', file)),
      path.join(folder, file),
    ]

    const lightCSS = 'antd.min.css'
    await copyFile(...getPath(lightCSS))
    log.success('-- static/antd.min.css created.')

    const lightCSSMap = 'antd.min.css.map'
    await copyFile(...getPath(lightCSSMap))
    log.success('-- static/antd.min.css.map created.')

    const darkCSS = 'antd.dark.min.css'
    await copyFile(...getPath(darkCSS))
    log.success('-- static/antd.dark.min.css created.')

    const darkCSSMap = 'antd.dark.min.css.map'
    await copyFile(...getPath(darkCSSMap))
    log.success('-- static/antd.dark.min.css.map created.')
  } catch {
    throw log.error('write antd files to static failed.', false)
  }
}

module.exports = writeAntDesign
