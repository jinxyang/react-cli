# react-cli

**project template is here: [react-cli-template](https://github.com/jinxyang/react-cli-template)**



## Getting started

### Installation

```bash
npm i react-cli -g
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

**react-cli.config.js**

- **port** - development server port

## Feature

- eslint
- stylelint
- splitChunks
  - react (react, react-dom, react-router-dom)
  - antd (antd, @ant-design/icons, @ant-design/colors)
  - venders (others in node_modules)
- copy files (/static)
- styled-components

## Todos

- custom splitChunks
- sass & less
- commitlint
- changelog
- development server proxy