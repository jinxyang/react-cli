const { prettier, eslint, stylelint } = require('../paths')

const prettierCommand = [
  'node',
  prettier.bin,
  '--config',
  prettier.configFile,
  '--ignore-unknown',
  '--write',
  '--loglevel',
  'error',
].join(' ')

const eslintCommand = ['node', eslint.bin, '--config', eslint.configFile].join(
  ' ',
)

const stylelintCommand = [
  'node',
  stylelint.bin,
  '--config',
  stylelint.configFile,
  '--config-basedir',
  stylelint.basedir,
  '--allow-empty-input',
  '--fix',
].join(' ')

module.exports = {
  '*': [prettierCommand],
  '*.{js,jsx}': [eslintCommand],
  '*.{js,jsx,css,less,scss,md,html}': [stylelintCommand],
}
