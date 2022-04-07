#!/usr/bin/env node
const { Command } = require('commander')
const pkg = require('../package')

const { functionCatcher } = require('../lib/utils')
const { init, dev, build, lint, transform, update } = require('../lib/scripts')

const envOption = [
  '-e, --env <variables...>',
  'define "process.env", eg: API:local',
]

const program = new Command()

program.version(`${pkg.name} ${pkg.version}`, '-v, --version')
program
  .command('update')
  .alias('u')
  .description('update libs')
  .action(functionCatcher(update))
program
  .command('init')
  .description('initial project with needed files')
  .option('-y, --yes')
  .option('-f, --fix', 'fix the react-cli resolve path')
  .action(functionCatcher(init))
program
  .command('dev')
  .description('serve by express')
  .option(...envOption)
  .action(functionCatcher(dev))
program
  .command('build')
  .description('bundle with webpack')
  .option(...envOption)
  .option('-c, --compress [name]')
  .action(functionCatcher(build))
program
  .command('lint')
  .description('lint and format')
  .action(functionCatcher(lint))
program
  .command('transform')
  .description('compile with babel')
  .option('-s, --src <dirname>', 'default: src')
  .option('-l, --lib <dirname>', 'default: lib')
  .action(functionCatcher(transform))
program.parse(process.argv)
