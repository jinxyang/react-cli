const path = require('path')

const root = (target = '') => path.join(__dirname, '../', target)

module.exports = {
  port: 3000,
  babel: {
    plugins: [
      [
        root('node_modules/babel-plugin-styled-components'),
        {
          ssr: false,
          displayName: true,
        },
      ],
    ],
  },
}
