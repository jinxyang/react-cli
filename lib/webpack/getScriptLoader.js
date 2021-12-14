const { getRootPath } = require('../utils')
const { babel } = require('../paths')

module.exports = (needRefresh = false) => {
  return [
    {
      loader: getRootPath('node_modules/babel-loader'),
      options: {
        cacheDirectory: true,
        configFile: babel.configFile,
        plugins: [needRefresh && require('react-refresh/babel')].filter(
          Boolean,
        ),
      },
    },
  ]
}
