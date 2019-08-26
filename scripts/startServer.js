
const egg = require('egg')
const path = require('path')
const { exec } = require('child_process')
egg.startCluster({
  baseDir: path.resolve(__dirname, '../example/ssr-with-js/'),
  port: 7001,
  workers: 1
}, () => {
  exec('nightwatch --config ./e2e/nightwatch.config.js', (err, stdout) => {
    if (err) {
      console.log(err)
      process.exit()
    }
    console.log(stdout)
  })
})
