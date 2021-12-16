const path = require('path')
const { getAppPath, mergeConfig } = require('../utils')
const prettierConfig = require('./prettier')

const { libs } = mergeConfig()

const getFiles = (...exts) => {
  const suffix = `**/*.${
    exts.length === 1 ? exts[0] : '{' + exts.join(',') + '}'
  }`
  return [
    getAppPath(suffix, false),
    ...Object.values(libs).map((libPath) => path.join(libPath, suffix)),
  ]
}

module.exports = {
  extends: [
    // 'stylelint-config-standard',
    'stylelint-config-rational-order',
    'stylelint-prettier/recommended',
  ],
  overrides: [
    {
      files: getFiles('js', 'jsx'),
      customSyntax: '@stylelint/postcss-css-in-js',
    },
    {
      files: getFiles('less'),
      customSyntax: 'postcss-less',
    },
    {
      files: getFiles('scss'),
      customSyntax: 'postcss-scss',
    },
    {
      files: getFiles('md'),
      customSyntax: 'postcss-markdown',
    },
    {
      files: getFiles('html'),
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    'prettier/prettier': [true, prettierConfig],
    'value-keyword-case': null,
    'function-name-case': null,
  },
}
