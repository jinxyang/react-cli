#!/usr/bin/env node

const { Command } = require('commander')
const pkg = require('../package')

const dev = require('./dev')
const build = require('./build')

const program = new Command()
program.version(`${pkg.name} ${pkg.version}`, '-v, --version')

program
  .command('dev')
  .description('start development server')
  .option('-e, --env <variables...>', 'Define "process.env", eg: API:local')
  .action(dev)
program
  .command('build')
  .description('bundle')
  .option('-e, --env <variables...>', 'Define "process.env"')
  .action(build)

program.parse(process.argv)
