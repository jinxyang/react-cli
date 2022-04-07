const execa = require('execa')
const inquirer = require('inquirer')
const _ = require('lodash')

const { log, getRC } = require('../utils')
const rc = getRC()
const SOURCE_LIBS = rc.libs

const pullLib = async (name, libs = SOURCE_LIBS) => {
  const libPath = libs[name]

  try {
    log.info(`pull ${name}...`)
    const { stdout } = await execa.command(`
    git -C ${libPath} pull
    `)
    log.success(stdout)
  } catch (e) {
    e?.stderr && console.log(e?.stderr)
    log.error(`pull ${name} failed.`)
  }
}

const getChoices = (libs = {}) => {
  const libNames = Object.keys(libs)

  const grouped = _.groupBy(libNames, (libName) => {
    return libName.split('/')[0]
  })

  let choices = []
  for (const key in grouped) {
    choices.push(new inquirer.Separator(` = ${key} = `))
    const aliasChoices = grouped[key].map((libName) => {
      const alias = libName.split('/')[1]
      return {
        name: alias,
        value: libName,
      }
    })
    choices = [...choices, ...aliasChoices]
  }

  return choices
}

const getLibsQuestion = () => {
  return {
    loop: false,
    name: 'libs',
    type: 'checkbox',
    message: 'Select libs',
    pageSize: 10,
    choices: getChoices(SOURCE_LIBS),
  }
}

const selectLibs = async () => {
  try {
    const { libs } = await inquirer.prompt([getLibsQuestion()])

    if (!libs.length) {
      log.error('you should select One lib at least!')
      return
    }

    return libs
  } catch (e) {
    e?.stderr && log.error(e?.stderr)
  }
}

module.exports = async () => {
  try {
    const libs = await selectLibs()

    log.info('pulling...')

    for (const lib of libs) {
      await pullLib(lib)
    }
  } catch (e) {
    e?.stderr && log.error(e?.stderr)
  }
}
