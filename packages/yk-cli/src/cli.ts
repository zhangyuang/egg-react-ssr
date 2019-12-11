#!/usr/bin/env node

import yargs from 'yargs'
import init from './init'
import { Optional } from './interface/option'
// import { Argv } from './interface/argv'

interface Argv extends yargs.Arguments {
  appName: string
}
yargs
  .command('init [appName]', 'init the program', {}, async (argv: yargs.Arguments<Argv>) => {
    const option: Optional = {
      appName: argv.appName || 'app',
      language: 'javascript'
    }
    await init(option)
  })
  .command('dev', 'start clientRender', {}, async () => {
    process.env.NODE_ENV = 'development'
    const { dev } = require('./clientRender')
    await dev(yargs.argv)
  })
  .command('build', 'start clientBuild', {}, async () => {
    process.env.NODE_ENV = 'production'
    const { build } = require('./clientRender')
    await build()
  })
  .demandCommand(1, 'You need at least one command before moving on')
  .option('version', {
    alias: 'v',
    default: false
  })
  .parse()
