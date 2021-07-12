# react-cli

**project template is here: [react-cli-template](https://github.com/jinxyang/react-cli-template)**

## Getting started

### Installation

```bash
npm i @jinxyang/react-cli -g
```

### Basic usage

development

```bash
react-cli dev
```

bundle

```bash
react-cli build
```

## Options

**react-cli.config.js** (optional)

#### development server port

```javascript
module.exports = {
  port: 8080, // default is 3000
}
```

#### sass (less)

for now, just support [style-resources-loader](https://www.npmjs.com/package/style-resources-loader)

```javascript
module.exports = {
  sass: {
    // for /\.scss$/
    resources: {}, // style-resources-loader's options
  },
  less: {
    // for /\.less$/
    resources: {}, // style-resources-loader's options
  },
}
```

#### development server proxy

use [http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware)

```javascript
module.exports = {
  proxy: [
    {
      path: '/api',
      options: {}, // createProxyMiddleware's options
    },
  ],
}
```

#### custom splitChunks

```javascript
module.exports = {
  splitChunks: {
    cacheGroups: {
      react: {
        name: 'react',
        priority: 10,
        test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
      },
      antd: {
        name: 'antd',
        priority: 10,
        test: /[\\/]node_modules[\\/](antd|@antd-)/,
      },
    },
  },
}
```

---

## Feature

- copy files (/static to /dist)
- styled-components & sass & less
- css-modules (ext with .m.[ext])
- postcss (autoprefixer)
