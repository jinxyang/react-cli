#!/usr/bin/env node

const { Command } = require('commander')
const pkg = require('../package')

const dev = require('./dev')
const build = require('./build')

const program = new Command()
program.version(`${pkg.name} ${pkg.version}`, '-v, --version')

program.command('dev').description('start development server').action(dev)
program.command('build').description('bundle').action(build)

program.parse(process.argv)
