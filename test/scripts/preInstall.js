#!/usr/bin/env node

const { exec } = require('child_process')
const { promisify } = require('util')
const fs = require('fs')
const execWithPromise = promisify(exec)

const preInstall = async () => {
  fs.stat('./packages/yk-cli/node_modules', async err => {
    if (err) {
      const { stdout } = await execWithPromise('cd ./packages/yk-cli && npm i && npm run build')
      console.log(stdout)
    }
  })

  fs.stat('./example/ssr-with-js/node_modules', async err => {
    if (err) {
      const { stdout } = await execWithPromise('cd ./example/ssr-with-js && npm i')
      console.log(stdout)
    }
  })
}

preInstall().catch(err => {
  console.log('err', err)
  process.exit()
})
