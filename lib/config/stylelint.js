const { getAppPath, getRootPath } = require('../utils')
const prettierConfig = require('./prettier')

module.exports = {
  extends: [
    // 'stylelint-config-standard',
    'stylelint-config-rational-order',
    'stylelint-prettier/recommended',
  ],
  overrides: [
    {
      files: [
        getAppPath('**/*.{js,jsx}', false),
        getRootPath('packages/**/*.{js,jsx}'),
      ],
      customSyntax: '@stylelint/postcss-css-in-js',
    },
    {
      files: [
        getAppPath('**/*.less', false),
        getRootPath('packages/**/*.less'),
      ],
      customSyntax: 'postcss-less',
    },
    {
      files: [
        getAppPath('**/*.scss', false),
        getRootPath('packages/**/*.scss'),
      ],
      customSyntax: 'postcss-scss',
    },
    {
      files: [getAppPath('**/*.md', false), getRootPath('packages/**/*.md')],
      customSyntax: 'postcss-markdown',
    },
    {
      files: [
        getAppPath('**/*.html', false),
        getRootPath('packages/**/*.html'),
      ],
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    'prettier/prettier': [true, prettierConfig],
    'value-keyword-case': null,
    'function-name-case': null,
  },
}
