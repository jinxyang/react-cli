const execa = require('execa')

const { log, getAppPath } = require('../utils')
const { stylelint } = require('../paths')

module.exports = async () => {
  try {
    log.info('formatting...')
    const { stdout } = await execa.command(
      [
        'node',
        stylelint.bin,
        '"**/*.{js,jsx,css,less,scss,md,html}"',
        '--config',
        stylelint.configFile,
        '--config-basedir',
        stylelint.basedir,
        '--allow-empty-input',
        '--fix',
      ].join(' '),
      {
        cwd: getAppPath(),
      },
    )
    if (stdout) {
      console.log()
      console.log(stdout)
    }
    log.success('Format completed.', true)
  } catch (e) {
    e?.stderr && console.log(e?.stderr)
    log.error('Format failed.')
  }
}
