#!/usr/bin/env node

import yargs from 'yargs'
import { Optional } from './interface/option'
import init from './init'

yargs
  .command('init [appName]', 'init the program', {}, async (argv: any) => {
    const option: Optional = {
      appName: argv.appName || 'app'
    }
    await init(option)
  })
  .command('dev', 'start clientRender', {}, async () => {
    process.env.NODE_ENV = 'development'
    const { dev } = require('./clientRender')
    await dev()
  })
  .command('build', 'start clientRender', {}, async () => {
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
