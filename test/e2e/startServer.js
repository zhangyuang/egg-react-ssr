#!/usr/bin/env node

const egg = require('egg')
const path = require('path')
const { exec, fork, spawn } = require('child_process')
const { promisify } = require('util')
const execWithPromise = promisify(exec)
const baseDir = process.env.BASE_DIR = path.resolve(__dirname, '../../example/ssr-with-js/')

egg.startCluster({
  baseDir: baseDir,
  port: 7001,
  workers: 1
}, async () => {
  try {
    await execWithPromise('cd ./example/ssr-with-js && npm run build:server')
    const child = fork('./packages/yk-cli/bin/clientRender')
    child.send({
      msg: 'start dev'
    })
    child.on('message', async data => {
      if (data.msg === 'start dev finish') {
        const runner = spawn('./node_modules/.bin/nightwatch', ['--config', './test/e2e/nightwatch.config.js'], {
          stdio: 'inherit'
        })
        runner.on('exit', code => {
          process.exit(code)
        })
        runner.on('error', err => {
          throw err
        })
      }
    })
    process.on('exit', () => {
      child.kill()
    })
  } catch (error) {
    console.log('err', error)
    process.exit()
  }
})
