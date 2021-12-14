const path = require('path')

const { mkdir, writeFile, chmod } = require('fs-extra')

const { commitlint, lintStaged } = require('../../paths')
const { getAppPath, exists, log } = require('../../utils')

const prefix = ['#!/bin/sh', '. "$(dirname "$0")/_/husky.sh"']

const commitMsgData = [
  ...prefix,
  '',
  [
    'node',
    commitlint.bin,
    '--config',
    commitlint.configFile,
    '--edit',
    '$1',
  ].join(' '),
  '',
].join('\n')

const preCommitData = [
  ...prefix,
  '',
  ['node', lintStaged.bin, '--config', lintStaged.configFile].join(' '),
  '',
].join('\n')

const executeFileMode = 0o755

const writeHusky = async () => {
  try {
    const folder = getAppPath('.husky', false)
    !exists(folder) && (await mkdir(folder))

    await writeFile(path.join(folder, '.gitignore'), '-\n')
    log.success('-- .husky/.gitignore created.')

    const commitMsgFile = path.join(folder, 'commit-msg')
    await writeFile(commitMsgFile, commitMsgData)
    await chmod(commitMsgFile, executeFileMode)
    log.success('-- .husky/commit-msg created.')

    const preCommitFile = path.join(folder, 'pre-commit')
    await writeFile(preCommitFile, preCommitData)
    await chmod(preCommitFile, executeFileMode)
    log.success('-- .husky/pre-commit created.')
  } catch {
    throw log.error('write .husky failed.', false)
  }
}

module.exports = writeHusky
