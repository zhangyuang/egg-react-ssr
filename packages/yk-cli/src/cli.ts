#!/usr/bin/env node

import yargs from 'yargs'

yargs
  .command('init [appName]', 'init the program', {}, async () => {
    console.log('ykcli init 命令已废弃，请参考 README.md 使用 npm init ssr-app my-ssr-project --template=ssr-with-js 来创建应用')
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
