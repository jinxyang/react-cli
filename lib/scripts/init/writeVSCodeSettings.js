const path = require('path')

const fse = require('fs-extra')

const { prettier, eslint, stylelint } = require('../../paths')
const { getAppPath, getModulePath, exists, log } = require('../../utils')

const settings = {
  'css.validate': false,
  'less.validate': false,
  'scss.validate': false,
  'prettier.prettierPath': prettier.path,
  'prettier.configPath': prettier.configFile,
  'eslint.nodePath': getModulePath(),
  'eslint.useESLintClass': true,
  'eslint.options': {
    overrideConfigFile: eslint.configFile,
    resolvePluginsRelativeTo: getModulePath(),
  },
  'stylelint.stylelintPath': stylelint.path,
  'stylelint.configBasedir': stylelint.basedir,
  'stylelint.configFile': stylelint.configFile,
  'stylelint.validate': [
    'css',
    'less',
    'scss',
    'javascript',
    'javascriptreact',
    'markdown',
    'html',
  ],
  'stylelint.snippet': [
    'css',
    'less',
    'scss',
    'javascript',
    'javascriptreact',
    'markdown',
    'html',
  ],
}

const writeVSCodeSettings = async () => {
  try {
    const folder = getAppPath('.vscode', false)
    !exists(folder) && (await fse.mkdir(folder))

    await fse.writeJSON(path.join(folder, 'settings.json'), settings, {
      spaces: 2,
    })
    log.success('-- .vscode/settings.json created.')
  } catch {
    throw log.error(`write .vscode failed.`, false)
  }
}

module.exports = writeVSCodeSettings
