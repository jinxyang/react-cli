const { getAppPath } = require('../utils')
const prettierConfig = require('./prettier')

module.exports = {
  extends: [
    // 'stylelint-config-standard',
    'stylelint-config-rational-order',
    'stylelint-prettier/recommended',
  ],
  overrides: [
    {
      files: [getAppPath('**/*.{js,jsx}', false)],
      customSyntax: '@stylelint/postcss-css-in-js',
    },
    {
      files: [getAppPath('**/*.less', false)],
      customSyntax: 'postcss-less',
    },
    {
      files: [getAppPath('**/*.scss', false)],
      customSyntax: 'postcss-scss',
    },
    {
      files: [getAppPath('**/*.md', false)],
      customSyntax: 'postcss-markdown',
    },
    {
      files: [getAppPath('**/*.html', false)],
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    'prettier/prettier': [true, prettierConfig],
    'value-keyword-case': null,
    'function-name-case': null,
  },
}
