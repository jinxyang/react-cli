const inquirer = require('inquirer')

const { log } = require('../../utils')

const writeHusky = require('./writeHusky')
const writeIgnore = require('./writeIgnore')
const writeJSConfig = require('./writeJSConfig')
const writeNvmrc = require('./writeNvmrc')
const writePackageJSON = require('./writePackageJSON')
const writeProject = require('./writeProject')
const writeVSCodeSettings = require('./writeVSCodeSettings')

const writerByType = {
  '.husky': writeHusky,
  'ignore files': writeIgnore,
  'jsconfig.json': writeJSConfig,
  '.nvmrc': writeNvmrc,
  'package.json': writePackageJSON,
  '.vscode': writeVSCodeSettings,
}

const getBasicFilesQuestion = (fix) => {
  return {
    type: 'checkbox',
    name: 'basicFiles',
    message: 'Select basic files',
    choices: [
      { name: 'package.json', checked: !fix },
      { name: '.husky', checked: true },
      { name: '.vscode', checked: true },
      { name: 'jsconfig.json', checked: true },
      { name: 'ignore files', checked: !fix },
      { name: '.nvmrc', checked: !fix },
    ],
  }
}

const projectFilesQuestion = {
  type: 'confirm',
  name: 'needProjectFiles',
  message: 'Copy project files?',
  default: true,
}

const defaultAnswers = {
  basicFiles: Object.keys(writerByType),
  needProjectFiles: true,
}

const init = async ({ yes = false, fix = false }) => {
  try {
    const answers = yes
      ? defaultAnswers
      : await inquirer.prompt(
          [getBasicFilesQuestion(fix), !fix && projectFilesQuestion].filter(
            Boolean,
          ),
        )
    if (answers.basicFiles.length) {
      for (const type of answers.basicFiles) {
        await writerByType[type]()
      }
    }
    if (answers.needProjectFiles) {
      await writeProject()
    }
    if (answers.basicFiles.includes('.husky')) {
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
