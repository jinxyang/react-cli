const { eslint, babel } = require('../paths')
const prettierConfig = require('./prettier')

module.exports = {
  root: true,
  parser: eslint.parser,
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 12,
    babelOptions: {
      configFile: babel.configFile,
    },
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    eslint.extends.standard,
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      version: '17',
    },
  },
  rules: {
    'prettier/prettier': ['error', prettierConfig],
    'react/prop-types': 'off',
    'react/display-name': 'off',
  },
}
