const execa = require('execa')

const { log, getLibPath } = require('../utils')

module.exports = async (name) => {
  const libPath = getLibPath(name)

  if (!libPath) {
    console.log(
      `"${name}" not found, run "react-cli install ${name}" to install.`,
    )
    return new Error()
  }

  try {
    log.info('updating...')
    const { stdout } = await execa.command('git pull', {
      cwd: libPath,
    })
    console.log()
    console.log(stdout)
    log.success(`Update ${name} completed.`, true)
  } catch (e) {
    e?.stderr && console.log(e?.stderr)
    log.error(`Update ${name} failed.`)
  }
}
