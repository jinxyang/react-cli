const inquirer = require('inquirer')

const { log } = require('../../utils')

const writeAntDesign = require('./writeAntDesign')
const writeHusky = require('./writeHusky')
const writeIgnore = require('./writeIgnore')
const writeJSConfig = require('./writeJSConfig')
const writeNvmrc = require('./writeNvmrc')
const writePackageJSON = require('./writePackageJSON')
const writeVSCodeSettings = require('./writeVSCodeSettings')

const writerByType = {
  'git hooks files': writeHusky,
  'vscode files (for extensions)': writeVSCodeSettings,
  'jsconfig.json': writeJSConfig,
  'package.json': writePackageJSON,
  'ignore files': writeIgnore,
  '.nvmrc': writeNvmrc,
  'antd static files': writeAntDesign,
}

const getFilesQuestion = (fix) => {
  return {
    type: 'checkbox',
    name: 'files',
    message: 'Select files',
    choices: [
      { name: 'git hooks files', checked: true },
      { name: 'vscode files (for extensions)', checked: true },
      { name: 'jsconfig.json', checked: true },
      { name: 'package.json', checked: !fix },
      { name: 'ignore files', checked: !fix },
      { name: '.nvmrc', checked: !fix },
      { name: 'antd static files', checked: !fix },
    ],
  }
}

const defaultAnswers = {
  files: Object.keys(writerByType),
}

const init = async ({ yes = false, fix = false }) => {
  try {
    if (!yes) {
      log.warn(
        'if node version changed, need select "git hooks files", "vscode files (for extensions)" and "jsconfig.json"',
        '/n',
      )
    }
    const answers = yes
      ? defaultAnswers
      : await inquirer.prompt([getFilesQuestion(fix)])

    if (!answers.files.length) {
      return
    }

    for (const type of answers.files) {
      await writerByType[type]()
    }

    if (answers.files.includes('git hooks files')) {
      log.info(
        '\nrun "npx husky install" or "npm install" or "npm i" to install git hooks.',
      )
    }
    log.success('Initial completed.', true)
  } catch {
    log.error('Initial failed.')
  }
}

module.exports = init
