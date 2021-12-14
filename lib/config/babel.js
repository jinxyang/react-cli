const { babel } = require('../paths')

const browsers = require('./browsers')

module.exports = (api) => {
  api.cache(true)

  const presets = [
    [
      babel.presets.env,
      {
        targets: { esmodules: true, ...browsers() },
        useBuiltIns: 'usage',
        shippedProposals: true,
        corejs: {
          version: 3,
        },
        modules: false,
      },
    ],
    babel.presets.react,
  ]
  const plugins = [
    [
      '@babel/transform-runtime',
      {
        useESModules: true,
      },
    ],
    [
      'babel-plugin-styled-components',
      {
        displayName: true,
        ssr: false,
      },
    ],
    '@babel/proposal-do-expressions',
    '@babel/proposal-export-default-from',
    '@babel/proposal-partial-application',
    ['@babel/proposal-pipeline-operator', { proposal: 'fsharp' }],
    [
      '@babel/proposal-record-and-tuple',
      { importPolyfill: true, syntaxType: 'hash' },
    ],
  ]

  return {
    presets,
    plugins,
  }
}
