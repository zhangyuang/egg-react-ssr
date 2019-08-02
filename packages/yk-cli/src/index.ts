#!/usr/bin/env node

import ora from 'ora'
import { Optional } from './interface/option'
import { getConfig } from './config'
import { checkRepeat } from './check'
import { processPackage } from './package'
import { processWebpack } from './webpackConfig'
import { cacheMange } from './cache'
import { updateCli } from './update'
import yargs from 'yargs'

const spinner = ora('应用初始化中')

yargs
  .command('init [appName]', 'init the program', {}, async (argv: any) => {
    const option: Optional = {
      appName: argv.appName || 'app'
    }
    // 自检更新当前脚手架是否最新
    await updateCli()
    // 问询APP配置
    await getConfig(option)
    // 判断当前appName是否已存在
    await checkRepeat(option)
    // 显示loading
    spinner.start()
    // 缓存比对
    await cacheMange(option)
    // 处理 package.json
    processPackage(option)
    // 处理 webpack
    processWebpack(option)

    spinner.succeed()
    process.exit()
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
