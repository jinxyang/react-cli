module.exports = {
  title: 'react-cli-template',
  src: 'src',
  lib: 'lib',
  // environment variables for process.env
  // ps: API:local
  env: [],
  // options for webpack-bundle-analyzer
  // https://www.npmjs.com/package/webpack-bundle-analyzer
  analyzer: false, // true: { analyzerMode: 'static }
  port: 3000,
  // options for createProxyMiddleware
  // https://www.npmjs.com/package/http-proxy-middleware
  proxy: [],
  // options for style-resources-loader
  // https://www.npmjs.com/package/style-resources-loader
  sass: {},
  less: {},
  // optimization.splitChunks
  // https://webpack.js.org/plugins/split-chunks-plugin/
  splitChunks: {},
}
