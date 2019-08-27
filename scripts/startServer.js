
const egg = require('egg')
const path = require('path')
const { exec, fork } = require('child_process')
const baseDir = process.env.BASE_DIR = path.resolve(__dirname, '../example/ssr-with-js/')

egg.startCluster({
  baseDir: baseDir,
  port: 7001,
  workers: 1
}, () => {
  const child = fork('./packages/yk-cli/bin/clientRender')
  child.send({
    msg: 'start dev'
  })
  child.on('message', data => {
    if (data.msg === 'start dev finish') {
      exec('nightwatch --config ./e2e/nightwatch.config.js', (err, stdout) => {
        if (err) {
          console.log(err)
          process.exit()
        }
        console.log(stdout)
      })
    }
  })
})
