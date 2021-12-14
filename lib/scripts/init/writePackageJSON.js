const { readJSON, writeJSON } = require('fs-extra')
const { merge } = require('lodash')

const { getAppPath, log } = require('../../utils')

const config = {
  scripts: {
    prepare: 'husky install',
    start: 'npm run dev',
    init: 'react-cli init',
    dev: 'react-cli dev',
    build: 'react-cli build',
    transform: 'react-cli transform',
  },
  devDependencies: {
    husky: '^7.0.4',
  },
  engines: {
    node: '>=16',
    npm: '>=8',
  },
  os: ['darwin', 'linux'],
}

const writePackageJSON = async () => {
  const file = getAppPath('package.json')
  if (!file) {
    throw log.error('No package.json in the project, run "npm init".', false)
  }

  try {
    const pkg = await readJSON(file)
    await writeJSON(getAppPath('package.json', false), merge(pkg, config), {
      spaces: 2,
    })
    log.success('-- package.json updated.')
  } catch {
    throw log.error('write package.json failed.', false)
  }
}

module.exports = writePackageJSON
