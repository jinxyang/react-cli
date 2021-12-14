const { getModulePath, getConfigPath } = require('./utils')

exports.babel = {
  bin: getModulePath('@babel/cli/bin/babel.js'),
  configFile: getConfigPath('babel.js'),
  presets: {
    env: getModulePath('@babel/preset-env'),
    react: getModulePath('@babel/preset-react'),
  },
}

exports.eslint = {
  path: getModulePath('eslint'),
  bin: getModulePath('eslint/bin/eslint.js'),
  configFile: getConfigPath('eslint.js'),
  parser: getModulePath('@babel/eslint-parser'),
  extends: {
    standard: getModulePath('eslint-config-standard'),
  },
  formatter: getModulePath('eslint-formatter-pretty'),
}

exports.prettier = {
  path: getModulePath('prettier'),
  bin: getModulePath('prettier/bin-prettier.js'),
  configFile: getConfigPath('prettier.js'),
}

exports.stylelint = {
  path: getModulePath('stylelint'),
  bin: getModulePath('stylelint/bin/stylelint.js'),
  configFile: getConfigPath('stylelint.js'),
  basedir: getModulePath(),
}

exports.commitlint = {
  bin: getModulePath('@commitlint/cli/lib/cli.js'),
  configFile: getConfigPath('commitlint.js'),
}

exports.lintStaged = {
  bin: getModulePath('lint-staged/bin/lint-staged.js'),
  configFile: getConfigPath('lint-staged.js'),
}
